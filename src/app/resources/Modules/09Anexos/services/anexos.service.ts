import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnexosService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`anexos`);
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'anexarDocumento'
   * @return Observable
   */
   public anexarDocumento(form:FormGroup): Observable<any> {
    return this.store(form).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'anexoPreview'
   * @return Observable
   */
   public _anexoPreview(httpParams): Observable<any> {
    return this.http.get(`${this.url}/attachment`, httpParams).pipe(finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public anexoStatus(form: Object, id): Observable<any> {
    return this.update(form, id,'/anexoStatus').pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }


  anexoPreview(filename): Observable<any> {
    this.loading = true;
    return this.http.readFileFromServer(`${this.url}/attachment`,{filename:filename}).pipe(
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data))
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'anexarDocumento'
   * @return Observable
   */

  public submeterDocumento(url, form:FormGroup): Observable<any> {
    return this.http.post(`${url}`, form).pipe(finalize(() => {
      this.loading = false;
    }), map((data) => Object(data).data)
    );
  }
}
