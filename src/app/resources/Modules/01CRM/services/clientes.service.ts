import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ClientesService extends BaseStorageService {
  constructor(protected http: ApiService, public permission: PermissionService) {
    super(`clientes`);
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'dashboard'
   * @return Observable
   */
  public findIncumprimentos(httpParams): Observable<any> {
    return this.http.get(`${this.url}/incumprimentos`, httpParams).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'dashboard'
   * @return Observable
   */
  public findBirthdayPerson(httpParams): Observable<any> {
    return this.http.get(`${this.url}/birthday`, httpParams).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'findValidarDocumentos:  lista os documentos sumbmetidos para aprovação e os em faltas'
   * @return Observable
   */
  public findAllDocumentos(ClientId): Observable<any> {
    return this.http.get(`${this.url}/${ClientId}/documentos/all`).pipe(finalize(() => {
      this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'getAllDireccao'
   * @return Observable
   */
  public getAllDireccaos(): Observable<any> {
    return this.http.get(`${this.url}/getDireccaos`).pipe(finalize(() => {
      this.loading = false;
    }), map((data) => Object(data).data)
    );
  }
  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @param data
   * @returns
   */

  public validarDocumento(anexoId: number, data: Object): Observable<any> {
    return this.http.patch(`${this.url}/documentos/validarDocumento/${anexoId}`, data).pipe(finalize(() => {
      this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @param data
   * @returns
   */

  public saldosInfoByCliente(clienteId: number): Observable<any> {
    return this.http.get(`${this.url}/saldosInfoByCliente/${clienteId}`).pipe(finalize(() => {
      this.loading = false;
    }), map((data) => Object(data).data)
    );
  }


  public canActivateRouterLink(permission: string) {
    return this.permission.isOptionRouterLinkPermission(permission);
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'dashboardPerfilByClienteId'
   * @return Observable
   */
  public dashboardPerfilByClienteId(ClientId): Observable<any> {
    return this.http.get(`${this.url}/${ClientId}/dashboard`).pipe(finalize(() => {
      this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  /**
   * @author 'caniggia.moreira@ideiasdinamicas.com'
   * @description 'getPerfilByClienteId'
   * @return Observable
   */
  public getPerfilByClienteId(ClientId): Observable<any> {
    return this.http.get(`${this.url}/${ClientId}/perfil`).pipe(finalize(() => {
      this.loading = false;
    }), map((data) => Object(data).data)
    );
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'agentes'
   * @return Observable
   */
  public findAllAgentes(search?: string, filters?: HttpParams, url?: string): Observable<any> {
    this.loading = true;
    filters == undefined ? filters : filters.set('search', search.toString());
    return this.http.get(`${this.url}/findAllAgentes`, filters).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }
  

}
