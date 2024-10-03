import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, first } from 'rxjs/operators';

import { SegmentacaoService } from '../../../services/segmentacao.service';
import { Pagination } from "@app/shared/models/pagination";
import { Observable, Subject } from 'rxjs';
import { FormService } from '@app/shared/services/form.service';
import { ClientesService } from '@app/resources/Modules/01CRM/services/clientes.service';
import { valordateRangeValidator, idadedateRangeValidator, emptyFieldsValidator } from '../../../validators/data.validator';


@Component({
  selector: 'app-add-or-editsegmentacao',
  templateUrl: './add-or-editsegmentacao.component.html',
  styleUrls: ['./add-or-editsegmentacao.component.css']
})
export class AddOrEditsegmentacaoComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Criar Segmentação';
  @Input() segmentacao: any;
  public pagination = new Pagination();
  public campanha: any
  @ViewChild('closeModal') closeModal: ElementRef;

  submitted = false;
  private loading: boolean = false;
  @Input() segmentacaoForm: FormGroup;

  @Output() private loadList = new EventEmitter<any>();

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

    opcoesSelecionadas = {
      GEO: false,
      IDADE: false,
      GENERO: false,
      HISTORY: false,
      DR: false,
      TPC: false,
      SERVICE: false,
      FACTURACAO: false,
      tecnologia: false,
      tarifario: false
    };
  
    // Alterna a seleção de uma opção
    toggleOpcao(opcao: string) {
      this.opcoesSelecionadas[opcao] = !this.opcoesSelecionadas[opcao];
    }

        // Método para verificar se alguma opção está selecionada
    isAnyOptionSelected(): boolean {
      return Object.values(this.opcoesSelecionadas).some(value => value);
    }


  public selectForms = {
    generos: [],
    provincias: [],
    municipios: [],
    tipoClientes: [],
    estadoCivils: [],
    segmentacoes: [],
    direccaos: []
  };

  loadings = {
    provincias: false,
    municipios: false
  }


  constructor(
    public segmentacaoService: SegmentacaoService,
    public formService: FormService,
    public clientService: ClientesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getGeneros();
    this.findSegmentacoes();
    this.getProvincesByPais(1);
    this.getTypesClientes();
    this.getAllDireccaos();
    this.cdr.detectChanges();
  }

  createForm() {
    this.segmentacaoForm = this.fb.group({
      tipoCliente: [null],
      genero: [null],
      direcao: [null],
      provincia: [null],
   //   municipio: [null],
      idadeMinima: ['', [Validators.min(0)]],
      idadeMaxima: ['', [Validators.min(0)]],
      valorMaximo: ['', [Validators.min(0)]],
      valorMinimo: ['', [Validators.min(0)]],
    //  estadoCivil: [null]
    },
      { validators: [idadedateRangeValidator(), valordateRangeValidator(), emptyFieldsValidator()] }
    );
  }

  get f() {
    return this.segmentacaoForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.segmentacaoForm.invalid) {
      return;
    }

    this.loading = true;
    const id = this.segmentacaoForm.value.id; // Supondo que o ID venha do formulário

    const dadosParaEnvio = this.formatarDadosParaEnvio();
    this.createOrEdit(dadosParaEnvio, !id, id);
  }

  createOrEdit(formulario: any, isCreate: boolean = true, id: any) {
    this.segmentacaoService
      .storeOrUpdate(formulario, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          if (isCreate) {
            this.onReset() // Corrige reset do form
          }
          this.loadList.emit();
          this.closeModal.nativeElement.click();
        },
        (error) => {
          this.submitted = false;
          this.loading = false;
          console.error(error); // Aumenta a visibilidade do erro
        }
      );
  }


  onReset() {
    this.segmentacao = null
    this.segmentacaoForm.reset();
  }

  public setData(item: any) {
    this.campanha = item
    console.log(item);
    
  }


  formatarDadosParaEnvio(): any {
    const formValues = this.segmentacaoForm.getRawValue();

    const criterios = [];

    // Verifica se há dados preenchidos para "provincia" ou "municipio"
    if (formValues?.provincia) {
      const criterioProvincias = {
        id: 1,
        criterioJSON: {
          provincias: formValues?.provincia
            ? [{
              id: formValues?.provincia
            }]
            : []
        }
      };
      criterios.push(criterioProvincias);
    }

    // Verifica se há dados preenchidos para "idadeMinima" ou "idadeMaxima"
    if (formValues?.idadeMinima || formValues?.idadeMaxima) {
      const criterioIdade = {
        id: 2,
        criterioJSON: {
          max: formValues?.idadeMaxima || null,
          min: formValues?.idadeMinima || null
        }
      };
      criterios.push(criterioIdade);
    }

    // Verifica se há dado preenchido para "genero"
    if (formValues?.genero) {
      const criterioGenero = {
        id: 3,
        criterioJSON: { genero: formValues?.genero }
      };
      criterios.push(criterioGenero);
    }

    // Verifica se há dados preenchidos para "valorMinimo" ou "valorMaximo"
    if (formValues?.valorMinimo || formValues?.valorMaximo) {
      const criterioValor = {
        id: 4,
        criterioJSON: {
          maior: formValues?.valorMinimo || null,
          menor: formValues?.valorMaximo || null
        }
      };
      criterios.push(criterioValor);
    }

    // Verifica se tem direcção preenchida
    if (formValues?.direcao) {
      const criterioValor = {
        id: 7,
        criterioJSON: {
          direcao: formValues?.direcao || null
        }
      };
      criterios.push(criterioValor);
    }
      // Verifica se tem tipo de cliente
      if (formValues?.tipoCliente) {
        const criterioValor = {
          id: 8,
          criterioJSON: {
            tipoCliente: formValues?.tipoCliente || null
          }
        };
        criterios.push(criterioValor);
      }

    // Estrutura final do objeto a ser enviado
    const dadosParaEnvio = {
      campanha_id: this.campanha.id,
      criterios: criterios
    };

    return dadosParaEnvio;
  }



  public getTypesClientes() {
    this.formService.getTypesClient().subscribe((response) => {
      this.selectForms.tipoClientes = response
    });
  }

  public getAllDireccaos() {
    this.clientService.getAllDireccaos().subscribe((response) => {
      this.selectForms.direccaos = response;
    });
  }
  public getGeneros() {
    this.selectForms.generos = localStorage.getItem('generos') == null ? [] : JSON.parse(localStorage.getItem('generos'));
    if (this.selectForms.generos.length > 0) return;
    this.formService.getGeneros().subscribe((response) => {
      this.selectForms.generos = response;
      localStorage.setItem('generos', JSON.stringify(this.selectForms.generos))
    });
  }

  public findSegmentacoes() {
    this.formService.segmentacoes().subscribe((response) => {
      this.selectForms.segmentacoes = response;
    });
  }

  public getProvincesByPais(e) {
    this.loadings.provincias = true;
    this.selectForms.municipios = [];
    const paisId = e?.target?.value || e;
    this.formService.getProvincesByPais(paisId).pipe(finalize(() => { this.loadings.provincias = false; })).subscribe((response) => {
      this.selectForms.provincias = response;
    });
  }
}
