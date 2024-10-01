import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TipoclienteService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`tipo_clientes`);
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'dashboard'
   * @return getTipoAnexos
   */
   public getTipoAnexos(typeClientId, httpParams: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.url}/getTipoAnexos?typeClientId=${typeClientId}`, httpParams).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

   /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'assocTipoAnexos'
   * @return Observable
   */
    public assocTipoAnexos(body: Object = {}): Observable<any> {
      return this.http.post(`${this.url}/tipoAnexoClientes`, body).pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
    }

    public EditarAssocTipoAnexos(body: Object = {}, id): Observable<any> {
      return this.http.put(`${this.url}/updateTipoAnexos/${id}`, body).pipe(
        debounceTime(500),
        finalize(() => {
          this.loading = false;
        }),
        map((data) => Object(data).data)
      );
    }

}
