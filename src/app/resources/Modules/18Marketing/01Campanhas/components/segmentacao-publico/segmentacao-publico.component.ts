import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';

import { CampanhaService } from '../../../services/campanhas.service';
import { Pagination } from "@app/shared/models/pagination";
import { Observable, Subject } from 'rxjs';
import { AddOrEditsegmentacaoComponent } from '../add-or-editsegmentacao/add-or-editsegmentacao.component';
import { FnService } from '@app/shared/services/fn.helper.service';
import { finalize } from 'rxjs/operators';
import { FormService } from '@app/shared/services/form.service';

@Component({
  selector: 'app-segmentacao-publico',
  templateUrl: './segmentacao-publico.component.html',
  styleUrls: ['./segmentacao-publico.component.css']
})
export class SegmentacaoPublicoComponent implements OnInit {

  @ViewChild(AddOrEditsegmentacaoComponent, { static: true })
  public addOrEditsegmentacaoComponent: AddOrEditsegmentacaoComponent;

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Definir Público Alvo';
  @Input() campanha: any;
  public pagination = new Pagination();
  public segmentacoes: any[] = []
  criteriosJsonList: any[] = [];

  public selectForms = {
    generos: [],
    tipoClientes: [],
    provincias:[]
  };

  submitted = false;

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();


  constructor(
    public campanhaService: CampanhaService,
    public configService: FnService,
    public formService: FormService,
  ) {

  }

  ngOnInit() {
    this.getTypesClientes()
    this.getProvincesByPais(1);
    this.getGeneros()
  }


  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  setData(campanha: any) {
    this.getTypesClientes()
    this.getGeneros()
    this.campanha = campanha
    this.criteriosJsonList = campanha?.segmentacoes.map(item => this.parseJson(item.criterios));
    this.criteriosJsonList = this.transformarArray(this.criteriosJsonList);
  }

  onReset() {
    this.campanha = null
  }

  getCampanhaOnDb() {
    this.campanhaService.getById(this.campanha.id).pipe(finalize(() => { })).subscribe((response) => {
      this.campanha = response;
      this.setData(response)
    });
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

}
