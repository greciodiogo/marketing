import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { PermissionService } from '@app/core/security/authentication/permission.service';

@Injectable({
  providedIn: 'root',
})
export class TipocontasService extends BaseStorageService {
  constructor(
    protected http: ApiService,
    public permission: PermissionService
  ) {
    super(`tipo_conta`);
  }

  public getProdutoTipoConta(tipo_conta_id): Observable<any> {
    return this.http
      .get(`${this.url}/getProdutoByTipoConta/${tipo_conta_id}`)
      .pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }

  public getProdutoByTipoContaPagination(params: HttpParams): Observable<any> {
    // console.log('params service:' + JSON.stringify(params));
    return this.http
      .get(`${this.url}/getProdutoByTipoContaPagination`, params)
      .pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }

  public associarProdutoComTipoConta(produtos): Observable<any> {
    // console.log(produtos);
    return this.http.post(`${this.url}/produto_tipo_Conta/`, produtos);
  }

  public desassociarProdutoComTipoConta(produtos): Observable<any> {
    return this.http.put(
      `${this.url}/desassociar_produto_tipo_Conta/`,
      produtos
    );
  }

  // /**
  //  * @author 'caniggia.moreira@ideiasdinamicas.com'
  //  * @description 'dashboard'
  //  * @return getTipoAnexos
  //  */
  //  public getTipoAnexos(typeClientId, httpParams: HttpParams = new HttpParams()): Observable<any> {
  //   return this.http.get(`${this.url}/getTipoAnexos?typeClientId=${typeClientId}`, httpParams).pipe(
  //     debounceTime(500),
  //     finalize(() => {
  //       this.loading = false;
  //     }),
  //     map((data) => Object(data).data)
  //   );
  // }

  //  /**
  //  * @author 'caniggia.moreira@ideiasdinamicas.com'
  //  * @description 'assocTipoAnexos'
  //  * @return Observable
  //  */
  //   public assocTipoAnexos(body: Object = {}): Observable<any> {
  //     return this.http.post(`${this.url}/tipoAnexoClientes`, body).pipe(
  //       debounceTime(500),
  //       finalize(() => {
  //         this.loading = false;
  //       }),
  //       map((data) => Object(data).data)
  //     );
  //   }

  public assocTipoAnexos(body: Object = {}): Observable<any> {
    return this.http.post(`${this.url}/tipoanexoconta`, body).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public EditarAssocTipoAnexos(body: Object = {}, id): Observable<any> {
    return this.http.put(`${this.url}/tipoanexoconta/${id}`, body).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  CriateOrEdit(body: Object = {}, id: number): Observable<any> {
    if (id === null) {
      return this.assocTipoAnexos(body)
    } else {
      return this.EditarAssocTipoAnexos(body, id)
    }
  }

  public getTipoAnexos(
    typeContaId,
    httpParams: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${this.url}/getTipoAnexos?typeContaId=${typeContaId}`, httpParams)
      .pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }

  public excluirAssociacao(associacaoId) {
    return this.http
      .delete(`${this.url}/ExcluirAssociacaoTipoDocumento/${associacaoId}`)
      .pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
  }
}
