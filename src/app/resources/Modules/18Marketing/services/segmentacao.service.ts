import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';


@Injectable({
  providedIn: 'root',
})
export class SegmentacaoService extends BaseStorageService {
  private route: string = `segmentacao`;

  constructor(protected http: ApiService) {
    super(`campanhas/segmentarPublico`);
  }

}
