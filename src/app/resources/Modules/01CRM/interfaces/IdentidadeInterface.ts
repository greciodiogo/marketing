import { TipoIdentidadeInterface } from "./TipoIdentidadeInterface";

export interface IdentidadeInterface {
  id?: number;
  numero_identidade: string;
  tipoIdentidade: TipoIdentidadeInterface;
  is_deleted: boolean;
}
