
import { EquipaInterface } from '../interfaces/EquipaInterface';

export class Equipa implements EquipaInterface {
  id?: number = null;
  nome: string = null;
  tipo_equipa_id: number;
  responsavel_id: number;
  estado: string = null;
  user_id:number=null;
  created_at:Date;
  updated_at:Date;
  elementosInfo: any[] = [];
}
