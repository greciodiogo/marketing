import { IdentidadeInterface } from "../interfaces/IdentidadeInterface";
import { TipoIdentidade } from "./TipoIdentidade";

export class Identidade implements IdentidadeInterface {
  id?: number;
  numero_identidade: string;
  tipoIdentidade: TipoIdentidade = new TipoIdentidade();
  is_deleted: boolean;
}
