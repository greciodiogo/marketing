import { Identidade } from '../models/Identidade';

export class AgenteComercial {
  id?: number = null;
  nome: string = null;
  telefone?: string;
  email: string;
  endereco: string;
  identidade: Identidade = new Identidade();
  id_actived: boolean;
  is_deleted: boolean;
}
