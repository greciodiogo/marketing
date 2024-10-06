import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { PermissionService } from '@app/core/security/authentication/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AdiantamentoSolicitacaoService extends BaseStorageService {

  constructor(protected http: ApiService ,  public permission: PermissionService) {
    super(`cliente/adiantamentos/solicitacao`);
  }

  public solicitacaoAdiantamentoStatus(solicitacaoId): Observable<any> {
    return this.http.post(`${this.url}/mudancadeEstadoAnalise/${solicitacaoId}`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public Aprovarsolicitacao(solicitacaoId,transacaoId): Observable<any> {
    return this.http.get(`${this.url}/aprovarSolicitacao/${solicitacaoId}?transacao_id=${transacaoId}`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  rejeitar(motivo,transacao_id,id): Observable<any> {
    return this.update({motivo:motivo, transacao_id:transacao_id}, id,'/rejeitarSolicitacao')
  }

}
