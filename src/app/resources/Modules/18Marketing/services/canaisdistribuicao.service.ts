import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';


@Injectable({
  providedIn: 'root',
})
export class CanaisDistribuicaoService extends BaseStorageService {
  private route: string = `canaldistribuicaos`;

  constructor(protected http: ApiService) {
    super(`canaldistribuicaos`);
  }

}
