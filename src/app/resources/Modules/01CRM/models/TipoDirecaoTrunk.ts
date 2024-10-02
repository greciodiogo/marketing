import { TipoDirecaoTrunkInterface } from "../interfaces/TipoDirecaoTrunk";

export class TipoDirecaoTrunk implements TipoDirecaoTrunkInterface{
    id?: number;
    nome: string;
    descricao: string;
    slug: string;
    is_actived: boolean;
    is_deleted: boolean;
    user_id: number;
    created_at: string;
}