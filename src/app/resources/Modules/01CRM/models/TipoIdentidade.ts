import { TipoIdentidadeInterface } from './../interfaces/TipoIdentidadeInterface';

export class TipoIdentidade implements TipoIdentidadeInterface {
  id?: number;
  nome: string;
  slug: string;
  estado: boolean;
  is_deleted: boolean;
}
