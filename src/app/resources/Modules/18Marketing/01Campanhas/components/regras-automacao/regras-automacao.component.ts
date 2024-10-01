import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { first } from 'rxjs/operators';

import { CampanhaService } from '../../../services/campanhas.service';

@Component({
  selector: 'app-regras-automacao',
  templateUrl: './regras-automacao.component.html',
  styleUrls: ['./regras-automacao.component.css']
})
export class RegrasAutomacaoComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() is_modal: boolean = false;
  public title: string = 'Regras de Automação';
  @Input() campanha: any;

  submitted = false;
  private loading: boolean = false;

  @Output() private loadList = new EventEmitter<any>();
  @Output() private close = new EventEmitter<any>();

  diasSemana = [
    { nome: 'Seg', selected: false },
    { nome: 'Ter', selected: false },
    { nome: 'Qua', selected: false },
    { nome: 'Qui', selected: false },
    { nome: 'Sex', selected: false },
    { nome: 'Sáb', selected: false },
    { nome: 'Dom', selected: false }
  ];

  hora: number = 0;  // Valor inicial para hora
  minuto: number = 0; // Valor inicial para minuto

  constructor(
    public campanhaService: CampanhaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const diasSelecionados = this.diasSemana.filter(dia => dia.selected).map(dia => dia.nome);
    const hora_divulgacao= `${this.hora}:${this.minuto}`

    this.createOrEdit(diasSelecionados,hora_divulgacao);
  }

  createOrEdit(dias: any,hora) {
    const data={hora_divulgacao:hora,dias:dias}
    this.campanhaService
      .RegrasAutomacao(this.campanha.id, data)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          this.loadList.emit(Object(response).data);
          this.closeModal.nativeElement.click();
        },
        (error) => {
          this.submitted = false;
          this.loading = false;
        }
      );
  }

  SetCampanha(campanha:any) {
    this.campanha=campanha
    this.insertInto(campanha?.regrasAutomacao)
  }

  insertInto(regras){
    this.separarHoraMinuto(regras.hora_divulgacao)
    const dias = JSON.parse(regras.dias);

    // Atualiza os dias da semana com base nos dias vindos das regras
    this.diasSemana.forEach(diaSemana => {
      diaSemana.selected = dias.includes(diaSemana.nome);
    });
  }

  separarHoraMinuto(tempo: string): void {
    const partes = tempo.split(':');    
    // Atribuindo hora e minuto às variáveis
    this.hora = parseInt(partes[0],10);
    this.minuto = parseInt(partes[1],10);
  }


  // Alternar seleção do dia
  toggleDia(dia: any): void {
    dia.selected = !dia.selected;
  }

  onReset(): void {
    // Redefinir seleção de dias e outros campos
    this.diasSemana.forEach(dia => dia.selected = false);
    this.hora = 0;  // Reseta hora
    this.minuto = 0; // Reseta minuto

    this.submitted = false;
    this.close.emit();
  }
}



