import { TipoContaInterface } from '../interfaces/TipoContaInterface';

export class TipoConta implements TipoContaInterface {
  id?: number;
  nome: string;
  slug: string;
  is_actived: boolean;
  is_venda: boolean;
  is_deleted: boolean;
}
