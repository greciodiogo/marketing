import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { ChargeService } from '@app/resources/Modules/01CRM/services/charge.service';
import { first } from 'rxjs/operators';
import { FormService } from '@app/shared/services/form.service';

@Component({
  selector: 'app-pre-facturacao-form-lacamento',
  templateUrl: './pre-facturacao-form-lacamento.component.html',
  styleUrls: ['./pre-facturacao-form-lacamento.component.css']
})
export class PreFacturacaoFormLacamentoComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() simpleFormCharge: FormGroup;
  @Output() private loadList = new EventEmitter<any>();


 public  meses = [
    { nome: "Janeiro", numero: "01" },
    { nome: "Fevereiro", numero: "02" },
    { nome: "Março", numero: "03" },
    { nome: "Abril", numero: "04" },
    { nome: "Maio", numero: "05" },
    { nome: "Junho", numero: "06" },
    { nome: "Julho", numero: "07" },
    { nome: "Agosto", numero: "08" },
    { nome: "Setembro", numero: "09" },
    { nome: "Outubro", numero: "10" },
    { nome: "Novembro", numero: "11" },
    { nome: "Dezembro", numero: "12" }
  ];
  public anos = []
  submitted = false;

  public checkedAll: boolean = false;

  constructor(
    public registoConsumoService: ChargeService,
    private formBuilder: FormBuilder,public formService: FormService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.gerarAno();
  }

  createForm() {
    this.simpleFormCharge = this.formBuilder.group({
      mes: [null, Validators.required],
      ano: [null, Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormCharge.controls;
  }

  onReset() {
    this.submitted = false;
    this.simpleFormCharge.reset();
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleFormCharge.invalid) {
      return;
    }
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.createOrEdit(this.simpleFormCharge);
  }

  createOrEdit(formulario: FormGroup) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.registoConsumoService
      .store(formulario.value)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          formulario.reset();
          this.checkedAll = false;
        },
        (error) => {
          this.submitted = false;
          this.registoConsumoService.loading = false;
        }
      );
  }

  public gerarAno() {
    var fecha = new Date();
    var anyo = fecha.getFullYear();

    let j = 0;
    for (let i = anyo; i >= 2000; i--) {
      this.anos[j] = i;
      j++;
    }
  }
}
