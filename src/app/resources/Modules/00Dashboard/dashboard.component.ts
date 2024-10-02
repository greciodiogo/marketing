import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { DashboardService } from '@app/shared/services/dashboard.service';
import { FnService } from '@app/shared/services/fn.helper.service';
import { diffString, diff } from 'json-diff';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public dashboard: any = {
    facturas: 0,
    clientes: 0,
    produtos: 0,
    recibos: 0,
    servicos:0,
    vendas:0
  };


  public log:Array<Object> = new Array<Object>();

  constructor(public dash: DashboardService,private permission: PermissionService,public fnService: FnService) {}

  public getDashboardInit() {
    this.dash.getDashboardInit().subscribe((data) => {
      this.dashboard = data;
    },error => this.dash.loading = false);
  }

  ngOnInit() {
    this.getDashboardInit();
    // var _new = ({"id":12,"nome":"test test","data_nascimento":"2021-10-18T23:00:00.000Z","contribuente":null,"telefone":"943889544","codigo_chamada":null,"genero":null,"email":"teste@hotmail.com","morada":"Luanda, Angola","direccao":null,"direccao_id":1,"gestor_conta":null,"gestor_id":null,"unificado":null,"observacao":null,"contribuinte_comercial":null,"estado":"PENDENTE","is_deleted":0,"tipo_cliente_id":1,"identidade_id":27,"user_id":null,"city":null,"contactPerson":null,"buildingNumber":null,"streetName":null,"addressDetail":null,"distrito_id":3060,"municipio_id":26,"provincia_id":6,"pais_id":1,"estado_civil_id":1,"created_at":null,"updated_at":"2021-10-25T11:00:04.000Z","genero_id":1,"facebook":null,"numero_whatsapp":null,"aprovacao_documentacao":"PENDENTE"})
    // var _old = ({"id":12,"nome":"test test","data_nascimento":"2021-10-14T23:00:00.000Z","contribuente":null,"telefone":"943889544","codigo_chamada":null,"genero":null,"email":"teste@hotmail.com","morada":"Luanda, Angola","direccao":null,"direccao_id":1,"gestor_conta":null,"gestor_id":null,"unificado":null,"observacao":null,"contribuinte_comercial":null,"estado":"PENDENTE","is_deleted":0,"tipo_cliente_id":1,"identidade_id":27,"user_id":null,"city":null,"contactPerson":null,"buildingNumber":null,"streetName":null,"addressDetail":null,"distrito_id":3401,"municipio_id":208,"provincia_id":3,"pais_id":1,"estado_civil_id":1,"created_at":null,"updated_at":"2021-10-14T23:27:49.000Z","genero_id":1,"facebook":null,"numero_whatsapp":null,"aprovacao_documentacao":"PENDENTE"});
    // this.log = this.fnService.diffDataJson(_new, _old);
    // console.log(this.log);
  }
  public canActivateRouterLink(permission:string){
    return this.permission.isOptionRouterLinkPermission(permission)
  }

  ngOnDestroy(): void {}
}

