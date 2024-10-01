import { EntidadeCativadoraInterface } from '../interfaces/EntidadecativadoraInterface';
import { ClienteInterface } from '../interfaces/ClienteInterface';

export class EntidadeCativadora implements EntidadeCativadoraInterface {
    id?: number;
    cliente_id: number; 
    tipo_entidade_cativadora_id: number; 
    valor: number; 
    is_deleted: boolean;
    is_actived: boolean; 
    cliente :ClienteInterface;
}
