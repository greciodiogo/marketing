import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TipoCampanhaService } from './../../../../services/tipocampanha.service';
@Component({
  selector: 'app-campanha-tipo-create-or-edit',
  templateUrl: './campanha-tipo-create-or-edit.component.html',
  styleUrls: ['./campanha-tipo-create-or-edit.component.css']
})
export class CampanhaTipoCreateOrEditComponent implements OnInit {

    @Input() is_modal: boolean = false;
    @Input() title: string = 'Registar Novo Tipo de Campanhas';
    tipoCampanha
    @Input() ngForm: FormGroup;
    @Output() private loadList = new EventEmitter<any>();
  
    submitted = false;
  
    constructor(
      public tipoCampanhaService: TipoCampanhaService,
      private formBuilder: FormBuilder
    ) {
      this.createForm();
    }
  
    ngOnInit() {}
  
    createForm() {
      this.ngForm = this.formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        slug: [null, Validators.required],
        is_actived: [null, Validators.required]
      });
    }
    // convenience getter for easy access to form fields
    get f() {
      return this.ngForm.controls;
    }
  
    onReset() {
      this.title = 'Registar Novo Tipos de Campanhas';
      this.submitted = false;
      this.ngForm.reset();
    }
  
    onSubmit() {
      this.submitted = true;
      // parar aquei se o formulário for inválido
      if (this.ngForm.invalid) {
        return;
      }
      const id = this.ngForm.getRawValue().id;
      //return;
      // TODO: usado para fazer a requisição com a api de criação de objsct or update
      this.createOrEdit(this.ngForm, id === null ? true : false, id);
    }
  
    createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
      // TODO: usado para fazer a requisição com a api de criação de object
      this.tipoCampanhaService
        .storeOrUpdate(formulario.value, id)
        .pipe(first())
        .subscribe(
          (response) => {
            this.submitted = false;
            if (isCreate) {
              formulario.reset();
            }
            this.loadList.emit(Object(response).data);
          },
          (error) => {
            this.submitted = false;
            this.tipoCampanhaService.loading = false;
          }
        );
    }
  
    setTipoCampanha(campanha: any){
      if (campanha !== null) {
        this.tipoCampanha = campanha;
        this.title = 'Editar Tipos de Campanhas';
        this.ngForm.patchValue(this.tipoCampanha);
      } else {
        this.title = 'Registar Novo Tipos de Campanhas';
      }
    }
  }
  
