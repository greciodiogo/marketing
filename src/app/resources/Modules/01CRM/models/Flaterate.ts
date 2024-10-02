import { Produto } from '../../04Logistica/models/Produto';
import { Imposto } from '../../07Configs/models/Imposto';
import { Moeda } from '../../07Configs/models/Moeda';
import { FlateRateInteface } from '../interfaces/FlateRateInterface';

export class Flaterate implements FlateRateInteface {
    id?: number;
    servico_id: number; 
    capacidade: string;
    valor: number; 
    origem: string;
    destino: string;
    moeda_id: number;
    artigo_id: number;
    user_id: number;
    moeda: Moeda = new Moeda();
    imposto: Imposto = new Imposto();
    artigo: Produto = new Produto();
  
}
