import { ContaInterface } from "./ContaInterface";
import { IdentidadeInterface } from "./IdentidadeInterface";

export interface ClienteInterface {
  id?: number;
  nome: string;
  telefone?: string;
  email: string;
  morada: string;
  provincia_id: number;
  municipio_id: number;
  distrito_id: number;
  identidade: IdentidadeInterface;
  contas?: ContaInterface[];
  data_nascimento: Date;
}
