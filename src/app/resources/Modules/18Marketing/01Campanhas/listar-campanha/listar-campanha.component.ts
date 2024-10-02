import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pagination } from "@app/shared/models/pagination";
import { Filter } from "@app/shared/models/Filters/Filter";
import { FnService } from "@app/shared/services/fn.helper.service";
import { HttpParams } from "@angular/common/http";
import { CampanhaService } from '../../services/campanhas.service';
import { FormService } from '@app/shared/services/form.service';
import { SegmentacaoPublicoComponent } from '../components/segmentacao-publico/segmentacao-publico.component';

import Swal from 'sweetalert2';
import { CanaisDistribuicaoComponent } from '../components/canais-distribuicao/canais-distribuicao.component';
import { RegrasAutomacaoComponent } from '../components/regras-automacao/regras-automacao.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisualizarCampanhaComponent } from '../components/visualizar-campanha/visualizar-campanha.component';

@Component({
  selector: 'app-listar-campanha',
  templateUrl: './listar-campanha.component.html',
  styleUrls: ['./listar-campanha.component.css']
})
export class ListarCampanhaComponent implements OnInit {

  public pagination = new Pagination();
  public filter = new Filter()
  public tipo_estado_id
  public estadosCampanha
  @Input() campanhaForm: FormGroup;


  @ViewChild(SegmentacaoPublicoComponent, { static: true })
  public segmentacaoPublicoComp: SegmentacaoPublicoComponent;

  @ViewChild(CanaisDistribuicaoComponent, { static: true })
  public canaisDistribuicaoComponent: CanaisDistribuicaoComponent;

  @ViewChild(RegrasAutomacaoComponent, { static: true })
  public regrasAutomacaoComponent: RegrasAutomacaoComponent;

  @ViewChild(VisualizarCampanhaComponent, { static: true })
  public visualizarCampanhaComponent: VisualizarCampanhaComponent; 

  public campanha: any = null;
  public campanhas: any[];

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(
    public _route: Router,
    public campanhaService: CampanhaService,    
    public configService: FnService,
    public formService: FormService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getTipoEstados()
    this.getCampanhas(),
    this.createForm()
    this.cdr.detectChanges();
  }

  createForm() {
    this.campanhaForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      estado: [null, Validators.required]
    }
    );
  }

  public getCampanhas() {
    this.campanhaService.loading = true;

    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.perPage || 5).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString())
      .set('tipo_estado_id', this.tipo_estado_id?.toString())
      .set("isPaginate", "1");
    const search = this.filter.search;

    this.campanhaService.list(search, httpParams).subscribe(data => {
      this.campanhas = data.data
      this.pagination.page = data.page;
      this.pagination.perPage = data.perPage;
      this.pagination.lastPage = data.lastPage;
      this.pagination.total = data.total;
      this.campanhaService.loading = false

    }, error => {

      this.campanhaService.loading = false
    });
  }

  //--------------------------------------------------------------------------

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.getCampanhas()
  }

  setCampanha(campanha: any) {
    this.campanha = campanha
  }

  public getCanais(canais: any): string {
    let colecaoOrganizada = '';
    canais.forEach((canal: any, index: number) => {
      colecaoOrganizada += canal.descricao;

      if (index !== canais.length - 1) {
        colecaoOrganizada += ' | ';
      }
    });
    return colecaoOrganizada || '---';
  }

 
  getTipoEstados() {
    this.formService.getTiposPedido().subscribe(
      (data) => {
        this.estadosCampanha = data
        this.estadosCampanha = data.filter((doc) => 
          ["PENDENTE", "APROVADO","REJEITADO","PUBLICADO","DESPUBLICADO","FECHADO"].includes(doc.slug)
        );
      },
      (error) => {
        this.campanhaService.loading = false;
      })
  }

  async apagarCampanha(item: any) {
    const result = await Swal.fire({
      title: `Desejas realmente eliminar a campanha ${item.nome} ?`,
      text: 'Você não poderá reverter isso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sim`,
      cancelButtonText: 'Não, Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        this.campanhaService.loading = true;
        await this.campanhaService.delete(item.id).toPromise();
        await this.getCampanhas();
      } catch (error) {
        console.error('Erro ao eliminar campanha:', error);
      } finally {
        this.campanhaService.loading = false;
      }
    }
  }
}