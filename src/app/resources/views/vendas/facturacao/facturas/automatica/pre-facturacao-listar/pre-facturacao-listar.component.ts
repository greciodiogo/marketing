import { Component, OnInit } from "@angular/core";
import {  Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { Filter } from "@app/shared/models/Filters/Filter";
import { ChargeService } from "@app/resources/Modules/01CRM/services/charge.service";
import { FnService } from "@app/shared/services/fn.helper.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-pre-facturacao-listar',
  templateUrl: './pre-facturacao-listar.component.html',
  styleUrls: ['./pre-facturacao-listar.component.css']
})
export class PreFacturacaoListarComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter()
  public charges: any = [];
  public charge:any = null

  public  meses = [
    { nome: "Janeiro", numero: "01" },
    { nome: "Fevereiro", numero: "02" },
    { nome: "Março", numero: "03" },
    { nome: "Abril", numero: "04" },
    { nome: "Maio", numero: "05" },
    { nome: "Junho", numero: "06" },
    { nome: "Julho", numero: "07" },
    { nome: "Agosto", numero: "08" },
    { nome: "Setembro", numero: "09" },
    { nome: "Outubro", numero: "10" },
    { nome: "Novembro", numero: "11" },
    { nome: "Dezembro", numero: "12" }
  ];

  public anos = []

  public  observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public _route: Router,
    public chargeService: ChargeService,
    public configService: FnService
  ) {}

  ngOnInit() {
    this.gerarAno();
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarCharge(),
    });
    this.subjectObj.next(1);
  }


  /**
   * @name "Listar charges"
   * @descriptio "Esta Função permite Listar todas as charges"
   * @author "caniggia.moreira@itgest.pt"
   * @param start
   * @param end
   */
  public listarCharge() {
    this.chargeService.loading = true;
    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("periodo", this.filter.ano+""+this.filter.mes)
      .set("typeFilter", this.filter.typeFilter.toString());
      const search = this.filter.search;

    this.chargeService.list(search, httpParams).subscribe(data => {
        this.charges  = data.data
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
    },error=>{
      this.chargeService.loading = false
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

  setCharge(charge: any){
    this.charge = charge
  }


  public gerarAno() {
    var fecha = new Date();
    var anyo = fecha.getFullYear();

    let j = 0;
    for (let i = anyo; i >= 2000; i--) {
      this.anos[j] = i;
      j++;
    }
  }
}
