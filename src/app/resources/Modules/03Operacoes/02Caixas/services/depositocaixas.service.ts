import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepositocaixasService  extends BaseStorageService{
  private route: string = `depositocaixas`;
  constructor(protected http: ApiService) { 
    super(`depositocaixas`)
  }
  public loading: boolean = false;

  public getCaixasFechadosByDataAbertura(data): Observable<any> {
    this.loading = true;
    return this.http
      .get(`${this.route}/getCaixasFechadosByDataAbertura`,data).pipe(
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }
  public Resumodedeposito(data): Observable<any> {
    this.loading = true;
    return this.http
      .get(`${this.route}/Resumodedeposito`,data).pipe(
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }

  public aprovarDepositoCaixa(deposito_id, loja_id, transacaoId): Observable<any> {
    return this.http
      .get(`${this.route}/aprovarDepositoCaixa?deposito_id=${deposito_id}&loja_id=${loja_id}&transacao_id=${transacaoId}`)
      .pipe(map((data) => Object(data).data));
  }

  public rejeitarDepositoCaixa(deposito_id, loja_id , motivo,transacaoId): Observable<any> {
    return this.http
      .get(`${this.route}/rejeitarDepositoCaixa?deposito_id=${deposito_id}&loja_id=${loja_id}&transacao_id=${transacaoId}`,motivo)
      .pipe(map((data) => Object(data).data));
  }

}
