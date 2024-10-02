import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { CampanhaService } from '../../../services/campanhas.service';
import { CanaisDistribuicaoService } from '../../../services/canaisdistribuicao.service';
@Component({
  selector: 'app-canair-distribuicao',
  templateUrl: './canais-distribuicao.component.html',
  styleUrls: ['./canais-distribuicao.component.css']
})
export class CanaisDistribuicaoComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() is_modal: boolean = false;
  @Input() title: string = 'Canais de Distribuição';

  canaisDisponiveis: any = [];

  submitted = false;
  private loading: boolean = false;
  @Input() campanhaForm: FormGroup;
  @Input() campanha: any;

  @Output() private loadList = new EventEmitter<any>();
  @Output() private close = new EventEmitter<any>();

  constructor(
    public campanhaService: CampanhaService,
    public canaisDistribuicaoService: CanaisDistribuicaoService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.campanhaForm = this.fb.group({
      id: [{ value: null, disabled: false}],
      canais: this.fb.array([], Validators.required)
    }
    );
  }

  get f() {
    return this.campanhaForm?.controls;
  }


  onReset() {
    this.submitted = false;

    // Reseta o formulário e o campo 'canais'
    this.campanhaForm.reset();

    // Limpa o FormArray 'canais'
    const checkArray: FormArray = this.campanhaForm.get('canais') as FormArray;
    while (checkArray.length !== 0) {
      checkArray.removeAt(0);
    }

    // Redefine o valor de todos os checkboxes no HTML
    this.canaisDisponiveis.forEach(() => {
      checkArray.push(this.fb.control(false));
    });

    this.close.emit();
  }


  onSubmit() {
    this.submitted = true;

    if (this.campanhaForm.invalid) {
      return;
    }
    this.loading = true;
    this.cleanCanaisArray()
    this.createOrEdit(this.campanhaForm);
  }

  createOrEdit(formulario: FormGroup) {
    this.campanhaService
      .associarCanaisCampanha(formulario.value.id, formulario.value)
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

  async SetCampanha(campanha: any) {
    this.campanha=campanha
    await this.getCanais(); // Carrega os canais disponíveis

    // Organiza os IDs dos canais selecionados para garantir que sejam números
    const canaisSelecionados = campanha.canais.map((item: any) => parseInt(item.id, 10));

    // Inicializa o array de controle de checkboxes com os canais disponíveis
    const checkArray: FormArray = this.campanhaForm.get('canais') as FormArray;
    checkArray.clear(); // Limpa o FormArray antes de popular

    this.canaisDisponiveis.forEach((canal: any) => {
      // Define o estado inicial (true/false) do checkbox com base nos canais selecionados
      const isSelected = canaisSelecionados.includes(canal.id);
      checkArray.push(this.fb.control(isSelected ? canal.id : null));
    });

    this.campanhaForm.patchValue({
      id: campanha.id,
    });
  }


  OrganiseArraCanais(list: any) {
    return list.map((item: any) => parseInt(item.id, 10));
  }

  cleanCanaisArray() {
    const checkArray: FormArray = this.campanhaForm.get('canais') as FormArray;
      // Remove todos os registros que não são números
  const newCanaisArray = checkArray.controls.filter(control => typeof control.value === 'number');


    // Atualiza o FormArray 'canais' com os valores filtrados
    this.campanhaForm.setControl('canais', this.fb.array(newCanaisArray));
  }

  onCheckboxChange(event: any) {
    const checkArray: FormArray = this.campanhaForm.get('canais') as FormArray;
    const valueAsNumber = parseInt(event.target.value, 10); // Converte o valor para número

    if (event.target.checked) {
      // Adiciona o ID do canal (como número) ao FormArray quando o checkbox for selecionado
      checkArray.push(this.fb.control(valueAsNumber));
    } else {
      // Remove o ID do canal do FormArray quando o checkbox for desmarcado
      const index = checkArray.controls.findIndex(
        (item) => item.value === valueAsNumber
      );
      if (index !== -1) {
        checkArray.removeAt(index);
      }
    }
  }

  get canaisFormArray(): FormArray {
    return this.campanhaForm.get('canais') as FormArray;
  }

  async getCanais(): Promise<void> {
    this.campanhaService.loading = true;
    try {
      const data = await this.canaisDistribuicaoService.list().toPromise();
      this.canaisDisponiveis = data.data;
    } catch (error) {
      this.campanhaService.loading = false;
    } finally {
      this.campanhaService.loading = false;
    }
  }
}
