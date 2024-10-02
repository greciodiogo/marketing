import { TipoClienteInterface } from './../interfaces/TipoClienteInterface';
export class TipoAnexo {}
export class TipoCliente implements TipoClienteInterface {
  id?: number = null;
  nome: string;
  estado: boolean;
  slug:string="PARTICULAR";
  is_deleted: boolean;
  tipoAnexos: TipoAnexo[] = [];
  descontos:any[] = [];
  requer_reserva: boolean;
  canal:string="";
}
