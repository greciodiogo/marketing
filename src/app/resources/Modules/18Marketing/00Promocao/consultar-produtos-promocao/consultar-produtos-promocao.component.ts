
import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '@app/shared/services/form.service';
import { HttpParams } from '@angular/common/http';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import Swal from 'sweetalert2';


import { FnService } from '@app/shared/services/fn.helper.service';
import { PromocaoProdutoService } from '../../services/promocaoProduto.service';


@Component({
  selector: 'app-consultar-produtos-promocao',
  templateUrl: './consultar-produtos-promocao.component.html',
  styleUrls: ['./consultar-produtos-promocao.component.css'],
})
export class ConsultarProdutosPromocaoComponent implements OnInit {
  @Input() is_modal: boolean = false;

  public title = "Produtos Associados a Promoção ";
  public pagination = new Pagination();
  public filter = new Filter();

  public detalhes;
  public detalheInfo;


  constructor(
    public formservice: FormService,
    public configService: FnService,
    public promocaoProdutoService: PromocaoProdutoService,
  ) {

  }

  ngOnInit(): void {

  }

  onReset() {
    this.pagination = new Pagination();
    this.filter = new Filter();
  }



  public async findAllProdutoPromocao(promocao_id) {
    this.promocaoProdutoService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.pagination.page || 1).toString())
      .set('perPage', (this.pagination.perPage || 10).toString())
      .set('search', this.filter.search.toString())
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString())
      .set('promocao_id', promocao_id)
    const search = this.filter.search;
    return await this.promocaoProdutoService.list(search, httpParams).subscribe(datas => {
      this.detalhes = datas.data;
      this.pagination.page = datas.page;
      this.pagination.perPage = datas.perPage;
      this.pagination.lastPage = datas.lastPage;
      this.pagination.total = datas.total;
    }),
      (error) => {
        this.promocaoProdutoService.loading = false;
      }
  }

  public getPageFilterData(page: number) {
    this.pagination.page = page;
    // this.findAllServicosByContaId(this.conta)
  }


 

  setProdutoPromocao(detalhe) {
    this.detalheInfo = detalhe    
    this.findAllProdutoPromocao(detalhe.id)
  }



}
