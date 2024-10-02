import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import { FnService } from '@app/shared/services/fn.helper.service';
import { HttpParams } from '@angular/common/http';

import { FormService } from '@app/shared/services/form.service';
import { TipoclienteService } from '@app/resources/Modules/01CRM/services/tipocliente.service';
import { PromocaoFormCreateOrEditComponent } from '../promocao-form-create-or-edit/promocao-form-create-or-edit.component';
import { PromocaoService } from '../../services/promocao.service';
import { ConsultarProdutosPromocaoComponent } from '../consultar-produtos-promocao/consultar-produtos-promocao.component';
import { DescricaoAlterarEstadoPromocaoCreateOrEditComponent } from '../descricao-alterar-estado-promocao-create-or-edit/descricao-alterar-estado-promocao-create-or-edit.component';

@Component({
  selector: 'app-listar-promocao',
  templateUrl: './listar-promocao.component.html',
  styleUrls: ['./listar-promocao.component.css'],
})
export class PromocaoListarComponent implements OnInit {

  @ViewChild(PromocaoFormCreateOrEditComponent, { static: true })
  public PromocaoFormCreateOrEditComponent: PromocaoFormCreateOrEditComponent;

  @ViewChild(ConsultarProdutosPromocaoComponent, { static: true })
  public consultarProdutosPromocaoComponent: ConsultarProdutosPromocaoComponent;

  @ViewChild(DescricaoAlterarEstadoPromocaoCreateOrEditComponent, { static: true })
  public alterarEstadoPromocaoCreateOrEditComponent: DescricaoAlterarEstadoPromocaoCreateOrEditComponent;



  public pagination = new Pagination();
  public filter = new Filter();

  public tipoClientes: any = [];
  public promocoes: any = [];

  public desconto: any = null

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  public selectForms = {
    tipoClientes: [],
    promocaoTipo: [],
    produtoGrupos: [],
    Groupheaders: []
  };

  constructor(
    public _route: Router,
    public tipoClienteService: TipoclienteService,
    public promocaoService: PromocaoService,
    public configService: FnService, private formService: FormService
  ) { }

  ngOnInit() {
    this.getProdutosGrupos();
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarPromocao(),
    });
    this.subjectObj.next(1);
  }

  /**
   * @name "Listar Promoção"
   * @descriptio "Esta Função permite Listar todas as Promoções"
   * @author "neleosmar.cabanga@ideiasdinamicas.com"
   * @param start
   * @param end
   */
  public listarPromocao() {

    this.promocaoService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.pagination.page || 1).toString())
      .set('perPage', (this.pagination.perPage || 5).toString())
      .set('search', this.filter.search.toString())
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString());
    const search = this.filter.search;

    this.promocaoService
      .list(search, httpParams)
      .pipe(
        finalize(() => {
          this.promocaoService.loading = false;
        })
      )
      .subscribe(
        (data) => {
          this.promocoes = data.data;          
          this.pagination.page = data.page;
          this.pagination.perPage = data.perPage;
          this.pagination.lastPage = data.lastPage;
          this.pagination.total = data.total;
        },
        (error) => {
          this.promocaoService.loading = false;
        }
      );
  }

  //--------------------------------------------------------------------------

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }


  setElementDesconto(desconto: any) {
    this.desconto = desconto;
  }

  public getProdutosGrupos() {
    this.selectForms.produtoGrupos = localStorage.getItem('produtoGrupos') == null ? [] : JSON.parse(localStorage.getItem('produtoGrupos'));
    this.selectForms.produtoGrupos.forEach(element => { Object.assign(element, { desconto: null, checked: false }); });
    if (this.selectForms.produtoGrupos.length > 0) return;
    this.formService.searchGruposProduto("", new HttpParams()).subscribe((data) => {
      this.selectForms.produtoGrupos = data.data;
      localStorage.setItem('produtoGrupos', JSON.stringify(this.selectForms.produtoGrupos))
    });
  }
}
