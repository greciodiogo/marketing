import { Component, OnInit, ViewChild } from "@angular/core";
import {  Subject } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { Filter } from "@app/shared/models/Filters/Filter";
import { FnService } from "@app/shared/services/fn.helper.service";
import { HttpParams } from "@angular/common/http";
import { CampanhaTipoCreateOrEditComponent } from "../campanha-tipo-create-or-edit/campanha-tipo-create-or-edit.component";
import { TipoCampanhaService } from './../../../../services/tipocampanha.service';

@Component({
  selector: 'app-campanha-tipo-listar',
  templateUrl: './campanha-tipo-listar.component.html',
  styleUrls: ['./campanha-tipo-listar.component.css']
})
export class CampanhaTipoListarComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter()

  public tipoCampanhas: any = [];

  public  observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  
  @ViewChild(CampanhaTipoCreateOrEditComponent, { static: true })
  public campanhaTipoCreateOrEditComponent: CampanhaTipoCreateOrEditComponent

  constructor(
    public _route: Router,
    
    public tipoCampanhaService: TipoCampanhaService,
    public configService: FnService
  ) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarTipoCampanhas(),
    });
    this.subjectObj.next(1);
  }


  /**
   * @name "Listar tipoCampanhas"
   * @descriptio "Esta Função permite Listar todas as tipoCampanhas"
   * @author "grecio.diogo@itgest.pt"
   * @param start
   * @param end
   */
  public listarTipoCampanhas() {
    this.tipoCampanhaService.loading = true;
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString());
      const search = this.filter.search;

    this.tipoCampanhaService.list(search, httpParams).pipe(finalize(()=>{this.tipoCampanhaService.loading = false})).subscribe(data => {
        this.tipoCampanhas  = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
    },error=>{
      this.tipoCampanhaService.loading = false
    });
  }

  //--------------------------------------------------------------------------

 public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }


  public delete(id:number){
    this.tipoCampanhaService.delete(id).subscribe(error=>{this.tipoCampanhaService.loading = false});
  }

}
