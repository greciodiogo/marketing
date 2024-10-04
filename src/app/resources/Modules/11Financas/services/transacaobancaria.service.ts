import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, finalize, debounceTime } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { FnService } from '@app/shared/services/fn.helper.service';

@Injectable({
  providedIn: 'root'
})
export class TransacaobancariaService extends BaseStorageService {

  constructor(protected http: ApiService) { 
    super(`transacaobancaria`)
  }
  public loading: boolean = false;
}
