import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TipoPromocaoService extends BaseStorageService {
  constructor(protected http: ApiService) {
    super(`promocaoTipo`);
  }

  /**
   * @author 'neleosmar.cabanga@ideiasdinamicas.com'
   * @description 'dashboard'
   * @return getTipoAnexos
   */


}
