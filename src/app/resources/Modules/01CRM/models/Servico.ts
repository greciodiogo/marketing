import { Tarifario } from '@app/resources/Modules/03Operacoes/20Ofertas/models/Tarifario';
import { Plano } from '@app/resources/Modules/02Comercial/01Facturacao/models/Plano';
import { Conta } from '@app/resources/Modules/01CRM/models/Conta';
 import { Simcard } from '../../03Operacoes/05Aprovisionamento/01Simcards/models/Simcard';
import { ServicoInterface } from './../interfaces/ServicoInterface';

export class Servico implements ServicoInterface {
    id?: number=null;
    chaveServico: string;
    tipoServico: number;
    estado: number;
    dataEstado: Date;
    dataCriacao: Date;
    conta_id: number;
    tecnologia_id: number;
    tarifario_id: number;
    tarifario_plano_id:number=null;
    sim_card_id: number;
    valor:number;
    simCard: Simcard = new Simcard()
    conta: Conta = new Conta();
    plano: Plano = new Plano();
    tarifario: Tarifario = new Tarifario();
    statusSubscriber:any=null;
    planos:any[]=[]
    created_at: Date;
}
