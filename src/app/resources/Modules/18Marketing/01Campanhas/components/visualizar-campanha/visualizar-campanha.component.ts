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

import { finalize, first } from 'rxjs/operators';

import { CampanhaService } from '../../../services/campanhas.service';
import { FnService } from '@app/shared/services/fn.helper.service';
import { FormService } from '@app/shared/services/form.service';
import { RegrasAutomacaoComponent } from '../regras-automacao/regras-automacao.component';
import { CanaisDistribuicaoComponent } from '../canais-distribuicao/canais-distribuicao.component';
import { AddOrEditsegmentacaoComponent } from './../add-or-editsegmentacao/add-or-editsegmentacao.component';
import Swal from 'sweetalert2';
import { OpenFileComponent } from '@app/shared/components/files/open-file/open-file.component';
@Component({
  selector: 'view-campanha',
  templateUrl: './visualizar-campanha.component.html',
  styleUrls: ['./visualizar-campanha.component.css']
})
export class VisualizarCampanhaComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() is_modal: boolean = false;
  @Input() title: string = 'Validar Campanha';
  @Input() campanha: any;
  is_open:boolean=false

  decisoes: any = [{ id: 1, slug: 'APROVADO', nome: 'APROVAR' }, { id: 2, slug: 'REJEITADO', nome: 'REJEITAR' }];
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

  submitted = false;
  private loading: boolean = false;
  @Input() campanhaForm: FormGroup;

  @Output() private loadList = new EventEmitter<any>();
  @Output() private close = new EventEmitter<any>();

  @ViewChild(CanaisDistribuicaoComponent, { static: true })
  public canaisDistribuicaoComponent: CanaisDistribuicaoComponent;

  @ViewChild(RegrasAutomacaoComponent, { static: true })
  public regrasAutomacaoComponent: RegrasAutomacaoComponent;

  @ViewChild(AddOrEditsegmentacaoComponent, { static: true })
  public addOrEditsegmentacaoComponent: AddOrEditsegmentacaoComponent;

  @ViewChild(OpenFileComponent, { static: true })
  public OpenFile: OpenFileComponent;

  
  constructor(
    public campanhaService: CampanhaService,
    public configService: FnService,
    public formService: FormService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getTypesClientes()
    this.getProvincesByPais(1);
    this.getGeneros()
  }

  createForm() {
    this.campanhaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      validacaoSlug: [null, Validators.required],
      descricao_validacao:[null,Validators.required]
    });
  }

  get f() {
    return this.campanhaForm?.controls;
  }


  onReset() {
    this.submitted = false;

    // Reseta o formulário e o campo 'canais'
    this.campanhaForm.reset();
    this.close.emit();
  }


  onSubmit() {
    this.submitted = true;

    if (this.campanhaForm.invalid) {
      return;
    }
    this.loading = true;
    this.createOrEdit(this.campanhaForm);
  }

  handleOption(slug: string){
    this.campanhaForm.patchValue({validacaoSlug: slug})
    this.onSubmit()
  }

  createOrEdit(formulario: FormGroup) {
    this.campanhaService
      .validarCampanha(this.campanha.id, formulario.value)
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

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.campanha) {
      this.campanhaForm.patchValue(this.campanha);
    }
  }


 parseItem(item){
   return JSON.parse(item);
  }

  // *******************************************

  public selectForms = {
    generos: [],
    tipoClientes: [],
    provincias:[]
  };

  ;
  public segmentacoes: any[] = []
  criteriosJsonList: any[] = [];

  setData(campanha: any) {
    this.getTypesClientes()
    this.getGeneros()
    this.campanha = campanha
    this.criteriosJsonList = campanha?.segmentacoes.map(item => this.parseJson(item.criterios));
    this.criteriosJsonList = this.transformarArray(this.criteriosJsonList);
    this.is_open=true
  }
  closeModalAside(){
    this.is_open=false
  }

  parseJson(value: string) {
    try {
      // Remove barras invertidas extras da string
      const cleanedString = value.replace(/\\/g, '');
      // Converte a string limpa para JSON
      const jsonObject = JSON.parse(cleanedString);
      return jsonObject;
    } catch (error) {
      console.error('Erro ao converter string para JSON:', error);
      return null;
    }
  }
 // Método para buscar o nome do gênero
  getGeneroNome(id: string): string {
    const genero = this.selectForms.generos.find((g) => g.id == id);
    return genero ? genero.slug : 'Desconhecido';
  }

  // Método para buscar o nome do tipo de cliente
  getTipoClienteNome(id: string): string {
    const tipoCliente = this.selectForms.tipoClientes.find((t) => t.id == id);
    return tipoCliente ? tipoCliente.nome : 'Desconhecido';
  }
  getProvinciaNome(provincias: any[]): any[] {
    return provincias.map((provincia) => {
      const provNome = this.selectForms.provincias.find((p) => p.id == provincia.id);
      return provNome ? { ...provincia, nome: provNome.nome } : { ...provincia, nome: 'Desconhecido' };
    });
  }
  transformarArray(array: any[]): any[] {
    return array.map((item) => {
      if (item.genero) {
        item.genero = this.getGeneroNome(item.genero);
      }
      if (item.tipoCliente) {
        item.tipoCliente = this.getTipoClienteNome(item.tipoCliente);
      }
      if (item.provincias) {
        item.provincias = this.getProvinciaNome(item.provincias);
      }

      return item;
    });
  }
  
  getCampanhaOnDb() {
    this.campanhaService.getById(this.campanha.id).pipe(finalize(() => { })).subscribe((response) => {
      this.campanha = response;
      this.setData(response)
    });
  }

  public getTypesClientes() {
    this.formService.getTypesClient().subscribe((response) => {
      this.selectForms.tipoClientes = response
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
  public getProvincesByPais(e) {
    const paisId = e?.target?.value || e;
    this.formService.getProvincesByPais(paisId).pipe(finalize(() => { })).subscribe((response) => {
      this.selectForms.provincias = response;
    });
  }
  // *******************************************

  async publicar(item: any) {
    const result = await Swal.fire({
      title: `Desejas realmente publicar a campanha ${item.nome} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sim`,
      cancelButtonText: 'Não, Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        this.campanhaService.loading = true;
        await this.campanhaService.publicarCampanha(item.id).toPromise();
        await this.getCampanhaOnDb();
      } catch (error) {
        console.error('Erro ao publicar campanha:', error);
      } finally {
        this.campanhaService.loading = false;
      }
    }
  }
  
  async despublicar(item: any) {
    const result = await Swal.fire({
      title: `Desejas realmente despublicar a campanha ${item.nome} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sim`,
      cancelButtonText: 'Não, Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        this.campanhaService.loading = true;
        await this.campanhaService.despublicarCampanha(item.id).toPromise();
        await this.getCampanhaOnDb();
      } catch (error) {
        console.error('Erro ao despublicar campanha:', error);
      } finally {
        this.campanhaService.loading = false;
      }
    }
  }

  async execucaoManual(item: any) {
    const result = await Swal.fire({
      title: `Desejas realmente executar a campanha ${item.nome} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sim`,
      cancelButtonText: 'Não, Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        this.campanhaService.loading = true;
        await this.campanhaService.executarCampanha(item.id).toPromise();
        await this.getCampanhaOnDb();
      } catch (error) {
        console.error('Erro ao executar campanha:', error);
      } finally {
        this.campanhaService.loading = false;
      }
    }
  }

  filePreviews: { url: string; name: string; type: string }[] = [];

  convertTitle(data: string) {
    const regex = /(?:file_[\w\d]+_)+\d+_\d+_(\d+_)+([\w]+)/g;
    let match;
  
    while ((match = regex.exec(data)) !== null) {
      return match[2]; // Imprime cada título diretamente
    }
  }

 }
