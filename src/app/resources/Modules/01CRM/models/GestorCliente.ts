import { GestorClienteInterface } from "../interfaces/GestorClienteInterface";

export class GestorCliente implements GestorClienteInterface {
  id?: number;
  cliente_id: number;
  gestor_id: number;
  funcao: String;
}
