import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PromocaoService extends BaseStorageService {
  private route: string = `promocao`;

  constructor(protected http: ApiService) {
    super(`promocao`);
  }

  /**
   * @author 'neleosmar.cabanga@ideiasdinamicas.com'
   * @description 'dashboard'
   * @return getTipoAnexos
   */


  public validarPromocao(filters?: HttpParams): Observable<any> {
    return this.http.put(`${this.url}/validarPromocao`,filters).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }


}
