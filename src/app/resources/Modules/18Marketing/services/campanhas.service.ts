import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/providers/api.service';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CampanhaService extends BaseStorageService {
  private route: string = `campanha`;

  constructor(protected http: ApiService) {
    super(`campanhas`);
  }

  /**
 * @author 'eldade.bondo@ideiasdinamicas.com'
 * @description 'Permite trazer um elemento dado o seu ID'
 * @return Observable
 */
  public getById(id): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.url}/${id}`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public validarCampanha(id, data): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}/${id}/validarCampanha`, data).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public publicarCampanha(id): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}/${id}/publicarCampanha`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public despublicarCampanha(id): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}/${id}/despublicarCampanha`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }
  public finalizarCampanha(id): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}/${id}/finalizarCampanha`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public associarCanaisCampanha(id, data): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}/${id}/associarCanaisCampanha`, data).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public RegrasAutomacao(id, data): Observable<any> {
    this.loading = true;
    return this.http.put(`${this.url}/${id}/definirRegraAutomacao`, data).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  public executarCampanha(id): Observable<any> {
    this.loading = true;
    return this.http.post(`${this.url}/${id}/executarCampanha`).pipe(
      debounceTime(500),
      finalize(() => {
        this.loading = false;
      }),
      map((data) => Object(data).data)
    );
  }

  async uploadFiles(selectedFiles: File[]): Promise<any> {
    const formData = new FormData();
  
    for (const file of selectedFiles) {
      formData.append('files', file, file.name);
    }
  
    // Envia a requisição e captura a resposta
    return this.http.file(`${this.url}/upload`, formData,true).toPromise()
      .then((response) => {
        console.log('Resposta do backend:', response);
        return response;
      })
      .catch((error) => {
        console.error('Erro no envio dos arquivos:', error);
        throw error;
      });
  }
  

}
