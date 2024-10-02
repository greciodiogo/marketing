
import { Component, OnInit, ViewChild } from "@angular/core";
import {  Subject } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { Filter } from "@app/shared/models/Filters/Filter";
import { FnService } from "@app/shared/services/fn.helper.service";
import { HttpParams } from "@angular/common/http";
import { TipoPromocaoFormCreateOrEditComponent } from "../promocao-tipo-form-create-or-edit/promocao-tipo-form-create-or-edit.component";
import { TipoPromocaoService } from "@app/resources/Modules/18Marketing/services/tipoPromocao.service";
@Component({
  selector: 'app-promocao-tipo-listar',
  templateUrl: './promocao-tipo-listar.component.html',
  styleUrls: ['./promocao-tipo-listar.component.css']
})
export class TipoPromocaoListarComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter()

  public tipoPromocoes: any = [];
  public tipoIdentidade: any



  public  observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  @ViewChild(TipoPromocaoFormCreateOrEditComponent, { static: true })
  public tipoPromocaoFormCreateOrEditComponent: TipoPromocaoFormCreateOrEditComponent;

  constructor(
    public _route: Router,
    public tipoPromocaoService: TipoPromocaoService,
    public configService: FnService
  ) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarTipoPromocao(),
    });
    this.subjectObj.next(1);
  }


  /**
   * @name "Listar TipoPromocao"
   * @descriptio "Esta Função permite Listar todas as TipoPromocao"
   * @author "neleosmar.cabanga@ideiasdinamicas.com"
   * @param start
   * @param end
   */
  public listarTipoPromocao() {
    this.tipoPromocaoService.loading = true;
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString());
      const search = this.filter.search;

    this.tipoPromocaoService.list(search, httpParams).pipe(finalize(()=>{this.tipoPromocaoService.loading = false})).subscribe(data => {
        this.tipoPromocoes  = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
    },error=>{
      this.tipoPromocaoService.loading = false
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

  // settipoIdentidade(tipoIdentidade: TipoIdentidade){
  //   this.tipoIdentidade = tipoIdentidade;
  //   console.log("Tipo ", this.tipoIdentidade);
    
  // }

  public delete(id:number){
    this.tipoPromocaoService.delete(id).subscribe(error=>{this.tipoPromocaoService.loading = false});
  }

}
