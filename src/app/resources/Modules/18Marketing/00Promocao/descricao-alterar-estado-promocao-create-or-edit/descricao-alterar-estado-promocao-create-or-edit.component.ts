import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PromocaoService } from '../../services/promocao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-descricao-alterar-estado-promocao',
  templateUrl: './descricao-alterar-estado-promocao-create-or-edit.component.html',
  styleUrls: ['./descricao-alterar-estado-promocao-create-or-edit.component.css']
})
export class DescricaoAlterarEstadoPromocaoCreateOrEditComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() is_modal: boolean = false;
  @Input() title: string = 'VALIDAR PROMOÇÃO';

  //public tipoAnexo: TipoAnexo = new TipoAnexo();

  tipoCliente: any = [];
  impostos: any = [];
  infoData
  tipoAccao

  submitted = false;
  private loading: boolean = false;

  public selectForms = {
    tipoClientes: [],
  };

  @Input() simpleForm: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  @Output() private close = new EventEmitter<any>();

  constructor(
    public promocaoService: PromocaoService,
    private formBuilder: FormBuilder,

  ) {
    this.createForm();
  }

  ngOnInit() {
    //this.getFamilias();
    //this.getTypesClientes();
  }

  createForm() {
    this.simpleForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      descricao: [null, Validators.required],
      estado_id: [null],
      infoPromocao: [null],
      tipoAccao:[null]

    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
    this.close.emit();
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleForm.invalid) {
      return;
    }
    this.loading = true;
    const id = this.simpleForm.getRawValue().id;

    if(this.tipoAccao == 'ANULADO'){
      this.ConfirmarValidação(id)
    }else{
      // TODO: usado para fazer a requisição com a api de criação de objsct or update
      this.createOrEdit(this.simpleForm, id === null ? true : false, id);
    }
    
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.promocaoService
      .validarPromocao(formulario.value)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          if (isCreate) {
            formulario.reset();
          }
          this.loadList.emit(Object(response).data);
          this.closeModal.nativeElement.click();
        },
        (error) => {
          this.submitted = false;
          this.loading = false;
        }
      );
  }

  setLoadData(item, tipoAccao){
    this.simpleForm.patchValue({infoPromocao: item, tipoAccao:tipoAccao });
    this.infoData = item;
    this.tipoAccao = tipoAccao;
    
  }


  public ConfirmarValidação(id){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `Tem Certeza que Deseja Activar Este Plano ?`,
      text: "Activar Plano!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Activar!',
      cancelButtonText: 'Não, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.createOrEdit(this.simpleForm, id === null ? true : false, id)
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Operação Cancelada',
          '',
          'error'
        )
      }
    })


  }

}
