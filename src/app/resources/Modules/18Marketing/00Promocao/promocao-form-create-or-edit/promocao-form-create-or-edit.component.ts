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
import { finalize, first } from 'rxjs/operators';

import { FormService } from '@app/shared/services/form.service';
import { FnService } from '@app/shared/services/fn.helper.service';
import { Desconto } from '@app/resources/Modules/01CRM/models/Desconto';
import { PromocaoService } from '../../services/promocao.service';
import * as moment from 'moment';

@Component({
  selector: 'app-promocao-form-create-or-edit',
  templateUrl: './promocao-form-create-or-edit.component.html',
  styleUrls: ['./promocao-form-create-or-edit.component.css'],
})
export class PromocaoFormCreateOrEditComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Configurar Promoção';
  @Input() desconto: Desconto = new Desconto();
  @Input() selects: any = null;
  @Input() produtoGrupos: any[] = [];
  tipoOperacao
  gruposExistentesNoDesconto: any[] = [];

  selectForms: any = {
    tipoClientes: [],
    tipoPromocao: [],
    produtos: [],
  };

  tipoContas: any[] = [];
  volume: number = 0
  dadosASubmeter
  submitted = false;
  private loading: boolean = false;



  @Input() simpleFormPromocao: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  @Output() private close = new EventEmitter<any>();

  constructor(
    public promocaoService: PromocaoService,
    private formService: FormService,
    private formBuilder: FormBuilder, public configService: FnService,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.simpleFormPromocao = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      tipo_cliente_id: [null, Validators.required],
      tipo_promocao_id: [null, Validators.required],
      data_inicio: [null, Validators.required],
      data_fim: [null, Validators.required],
      grupos: [null],      
      produtoGrupo: [null]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormPromocao.controls;
  }

  onReset() {
    this.title = 'Configurar Promoção';
    this.submitted = false;
    this.simpleFormPromocao.reset();
    this.close.emit();
    this.desconto = null;
    this.selectForms.produtos = []
    this.title = 'Configurar Promoção';
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleFormPromocao.invalid) {
      return;
    }
    if (this.loading) return;
    this.loading = true;
    const id = this.simpleFormPromocao.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.createOrEdit(this.simpleFormPromocao, id === null ? true : false, id);
  }

  setarDadosParaAdicionarGrupo() {

    let descontosSeleccionados = $('.descontos:checkbox:checked').map(function () {
      return { grupo_produto_id: $(this).val(), desconto: Number($(".inputDesconto" + $(this).val()).val().toString().replace(/,/g, '.')) };
    }).get();

    let soGruposSeleccionados = $('.descontos:checkbox:checked').map(function () {
      return $(this).val();
    }).get();
    soGruposSeleccionados = <any>soGruposSeleccionados.map((i) => Number(i));

    let soGruposExistentes = this.gruposExistentesNoDesconto.map(function (cada) {
      return cada.produto_grupo_id;
    });
    soGruposExistentes = <any>soGruposExistentes.map((i) => Number(i));

    const gruposAExcluir = soGruposExistentes.filter(x => !soGruposSeleccionados.includes(x))
    this.dadosASubmeter["gruposAExcluir"] = gruposAExcluir

    const gruposAAdicionar = soGruposSeleccionados.filter(x => !soGruposExistentes.includes(x))
    this.dadosASubmeter["gruposAAdicionar"] = descontosSeleccionados.filter(x => gruposAAdicionar.indexOf(Number(x.grupo_produto_id)) > -1)

    const gruposAActualizar = soGruposExistentes.filter(x => soGruposSeleccionados.includes(x))
    this.dadosASubmeter["gruposAActualizar"] = descontosSeleccionados.filter(x => gruposAActualizar.indexOf(Number(x.grupo_produto_id)) > -1)

  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.getGruposChecked();
    this.dadosASubmeter = formulario.value;
    
    this.dadosASubmeter["tipoOperacao"] = this.tipoOperacao;
    if (this.tipoOperacao != "Editar") {
      this.setarDadosParaAdicionarGrupo();
    }

    this.promocaoService
      .storeOrUpdate(this.dadosASubmeter, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          if (isCreate) {
            formulario.reset();
            for (let i = 0; i < this.produtoGrupos.length; i++) {
              this.produtoGrupos[i].desconto = null;
              this.produtoGrupos[i].checked = false;
            }
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

  editarConfPromocao(promocao, tipoOperacao = "Editar") {
    this.desconto = promocao;    
    this.createForm();
    this.tipoOperacao = tipoOperacao;
    this.title = (tipoOperacao == "Editar") ? 'Editar Configurar Promoção' : ' Configurar Promoção';
  
    if(tipoOperacao == "Editar"){
      this.simpleFormPromocao.patchValue({
        ...promocao,
        data_inicio: moment(promocao?.data_inicio).format('YYYY-MM-DD').toString(), 
        data_fim: moment(promocao?.data_fim).format('YYYY-MM-DD').toString(),
        grupo: ['1'], //São valores que não se mudar ao editar a promoção
        produtoGrupo: ['1'] //São valores que não se mudar ao editar a promoção
      });
    }
    
    // this.checkedGrupoEditar();
  }

  public getTipoClientes() {
    this.loading = true;
    this.formService.getTypesClient().pipe(finalize(() => this.loading = false)).subscribe((response) => {
      this.selectForms.tipoClientes = response;
    },
      (error) => {
        this.loading = false;
      });
  }


  public getGruposChecked() {
    const descontosSeleccionados = $('.descontos:checkbox:checked').map(function () {
      const produtoId = $(this).val();
      const desconto = $(".inputDesconto" + produtoId).val();
      const valorPromocional = $(".inputValorPromocional" + produtoId).val();
  
      return {
        id: produtoId,
        desconto: desconto ? Number(desconto.toString().replace(/,/g, '.')) : 0,
        valorPromocional: valorPromocional ? Number(valorPromocional.toString().replace(/,/g, '.')) : 0
      };
    }).get();
  
    let soGruposSeleccionados = $('.descontos:checkbox:checked').map(function () {
      return $(this).val();
    }).get();
  
    const grupos = descontosSeleccionados.filter(p => soGruposSeleccionados.indexOf(<any>p.id) > -1);
    this.simpleFormPromocao.patchValue({
      grupos: grupos
    });
  }
  
  


  public checkedGrupoEditar(produtoGrupos = null) {
    for (let i = 0; i < this.produtoGrupos.length; i++) {
      for (let j = 0; j < this.f.grupos.value.length; j++) {
        const grupo = this.f.grupos.value[j];
        if (grupo.produto_grupo_id === this.produtoGrupos[i].id) {
          this.produtoGrupos[i].desconto = grupo.grupoInfo.desconto;
          this.produtoGrupos[i].checked = true;
        } else {
          this.produtoGrupos[i].desconto = null;
          this.produtoGrupos[i].checked = false;
        }
      }
    }
  }

  trocarEstadoCheckBox(classeElemento, estado) {
    $(".checkbox" + classeElemento).prop("checked", estado)
  }

  trocarValorInPutDesconto(elemento) {
    $(".inputDesconto" + elemento.produto_grupo_id).val(elemento.desconto)
  }
  

  trocarSoEstadoInPutDesconto(elemento, estado) {
    $(".inputDesconto" + elemento.id).prop("disabled", estado)
  }

  trocarSoEstadoInPutDesconto2(elemento, estado) {
    $(".inputValorPromocional" + elemento.id).prop("disabled", estado);
  }

  public checkedGrupo(produtoGrupo) {
    const res = (this.gruposExistentesNoDesconto.find(cada=>cada.produto_grupo_id==produtoGrupo.produto_grupo_id))?true:false
    this.trocarEstadoCheckBox(produtoGrupo.produto_grupo_id, res)
    this.trocarValorInPutDesconto(produtoGrupo)
    this.trocarSoEstadoInPutDesconto2(produtoGrupo, !res)
    if($(".inputDesconto" + produtoGrupo.produto_grupo_id).val().toString().length==0){
      this.trocarValorInPutDesconto(produtoGrupo)
    }
  }


  manipularTodosCheckBoxes(evento=null) {
      $('.descontos').prop("checked", evento?.target.checked?true:false);
      $('.inputDesconto').prop("disabled", evento?.target.checked?false:true);
   }

  resetarTodosCheckBoxes() {
    $('.descontos').prop("checked", false)
    $('.inputDesconto').prop("disabled", true);
    $('.inputDesconto').val("");
  }

  manipularCheckedBox(elemento, evento) {
    if (evento.target.checked) {
      this.trocarSoEstadoInPutDesconto(elemento, false);
      this.trocarSoEstadoInPutDesconto2(elemento, false); // Também atualize o estado do valor promocional
    } else {
      this.trocarSoEstadoInPutDesconto(elemento, true);
      this.trocarSoEstadoInPutDesconto2(elemento, true); // Também atualize o estado do valor promocional
    }
  }
  

  getProdutosByProdutoGrupoId(e) {
    const grupo_id = e?.target?.value || e;
    this.formService
      .getProdutosByGrupoId(grupo_id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response) => {
        this.selectForms.produtos = response;
      });
  }

  public getTipoPromocao() {
    this.loading = true;
    this.formService.getTipoPromocao().pipe(finalize(() => this.loading = false)).subscribe((response) => {
      this.selectForms.tipoPromocao = response;
    },
      (error) => {
        this.loading = false;
      });
  }

}
