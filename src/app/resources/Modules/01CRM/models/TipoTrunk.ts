import { TipoTrunkInterface } from "../interfaces/TipoTrunk";

export class TipoTrunk implements TipoTrunkInterface{
    id?: number;
    nome: string;
    descricao: string;
    is_actived: boolean;
    is_deleted: boolean;
    user_id: number;
    created_at: string;
}