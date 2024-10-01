import { Distrito } from './../Localizacao/models/Distrito';
import { Desconto } from './Desconto';

import { ClienteInterface } from '../interfaces/ClienteInterface';
import { EstadoCivil } from './EstadoCivil';
import { Genero } from './Genero';
import { Identidade } from './Identidade';
import { TipoCliente } from './TipoCliente';
import { Pais } from '../Localizacao/models/Pais';
import { Municipio } from '../Localizacao/models/Municipio';
import { Provincia } from '../Localizacao/models/Provincia';

export class Saldo {
  id?: number = null;
  valor: number = null;
  bonus:number=null;
  movimentos:any[] = []
}
export class Cliente implements ClienteInterface {
  id?: number = null;
  nome: string = null;
  data_nascimento: Date;
  telefone?: string;
  email: string;
  morada: string;
  numero_whatsapp:string;
  facebook:string;
  pais_id: number;
  provincia_id: number;
  municipio_id: number;
  distrito_id: number;
  tipo_cliente_id: number;
  estado:string;
  generico:string=null;
  identidade: Identidade = new Identidade();
  contas?: any;
  estado_civil:EstadoCivil = new EstadoCivil();
  genero: Genero = new Genero();
  tipoCliente:TipoCliente = new TipoCliente();
  descontos: Desconto[]=[];
  pais: Pais = new Pais();
  provincia: Provincia = new Provincia();
  municipio: Municipio = new Municipio();
  distrito: Distrito = new Distrito();
  saldo:Saldo[] = [];
  user_id:number=null;
  created_at:Date;
  aprovacao_documentacao:any;
}
