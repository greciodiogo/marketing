export interface FlateRateInteface {
    id?: number;
    servico_id: number; 
/*     is_deleted: boolean;  */
    capacidade: string;
    valor: number; 
    origem: string;
    destino: string;
    moeda_id: number;
    artigo_id: number;
    user_id: number;
  }