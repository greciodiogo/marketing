import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { PermissionService } from '@app/core/security/authentication/permission.service';
@Injectable({
  providedIn: 'root'
})
export class CaixasService extends BaseStorageService {
  private route: string = `caixas`;
  constructor(protected http: ApiService,public permission: PermissionService) {
    super(`caixas`)
  }
  public loading: boolean = false;
  public getCaixaAbertoByUserId(): Observable<any> {
    return this.http
      .get(`${this.route}/getCaixaAbertoByUserId`)
      .pipe(map((data) => Object(data).data));
  }

  public findUsersSemCaixaAberto(): Observable<any> {
    return this.http
      .get(`${this.route}/findUsersSemCaixaAberto`)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }

  public listar(search?: string, filters?: HttpParams): Observable<any> {
    this.loading = true;
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http.get(`${this.route}/resumoDeCaixaByLojaAbertura`, filters).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public historiocoMovimentosDeCaixa(search?: string, filters?: HttpParams): Observable<any> {
    this.loading = true;
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http.get(`${this.route}/historiocoMovimentosDeCaixa`, filters).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public aberturaDeCaixaMassivo(form): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.route}/aberturaDeCaixaMassivo`, form).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public getResumoFechoCaixaById(caixaId,user_caixa:any=null): Observable<any> {
    this.loading = true;
    return this.http
      .get(`${this.route}/${caixaId}` + `/getResumoFechoCaixaById?user_caixa=${user_caixa}`).pipe(
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }

  public getResumoDinheiroByCaixaID(caixaId): Observable<any> {
    this.loading = true;
    return this.http
      .get(`${this.route}/getResumoDinheiroByCaixaID/${caixaId}`).pipe(
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }


  FechoCaixa(form: FormGroup, id): Observable<any> {
    return this.update(form, id, '/fechoDeCaixaOperador')
  }

  estacionarCaixa(form: FormGroup, id): Observable<any> {
    return this.update(form, id, '/estacionarCaixa')
  }

  public resumoDeCaixaById(caixa_id): Observable<any> {
    this.loading = true;
    return this.http
      .get(`${this.route}/resumoDeCaixaById?caixa_id=${caixa_id}`)
      .pipe(  finalize(() => {
        this.loading = false;
      }),map((data) => Object(data).data));
  }

  public confirmarAberturaCaixa(caixa_id): Observable<any> {
    return this.http
      .get(`${this.route}/confirmarAberturaCaixa?caixa_id=${caixa_id}`)
      .pipe(map((data) => Object(data).data));
  }

}
