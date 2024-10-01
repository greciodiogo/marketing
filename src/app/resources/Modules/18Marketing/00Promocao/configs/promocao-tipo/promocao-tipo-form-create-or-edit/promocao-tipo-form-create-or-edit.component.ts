import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoPromocaoService } from '@app/resources/Modules/18Marketing/services/tipoPromocao.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-promocao-tipo-form-create-or-edit',
  templateUrl: './promocao-tipo-form-create-or-edit.component.html',
  styleUrls: ['./promocao-tipo-form-create-or-edit.component.css']
})
export class TipoPromocaoFormCreateOrEditComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registar Novo Tipo de Promoção';
  @Input() tipoPromocao: any
  @Input() ngForm: FormGroup;
  @Output() private loadList = new EventEmitter<any>();

  submitted = false;

  constructor(
    public tipoPromocaoService: TipoPromocaoService,
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
      status: [null, Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.ngForm.controls;
  }

  onReset() {
    this.title = 'Registar Novo Tipo de Promoção';
    this.tipoPromocao = null
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
    this.tipoPromocaoService
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
          this.tipoPromocaoService.loading = false;
        }
      );
  }

  setTipoPromocao(item: any){
    if (item !== null) {
      this.tipoPromocao = item;
      this.title = 'Editar Tipo de Promoção';
      this.ngForm.patchValue(this.tipoPromocao);
    } else {
      this.title = 'Registar Novo Tipo de Promoção';
    }
  }
}
