import { ClienteInterface } from "./ClienteInterface";

export interface EntidadeCativadoraInterface{
    id?: number;
    cliente_id: number; 
    tipo_entidade_cativadora_id: number; 
    valor: number; 
    is_deleted: boolean;
    is_actived: boolean;  
    cliente: ClienteInterface;
  }