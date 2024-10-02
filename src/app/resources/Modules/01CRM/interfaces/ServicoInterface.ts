export interface ServicoInterface {
    id?: number;
    chaveServico: string;
    tipoServico: number;
    estado: number;
    dataEstado: Date;
    dataCriacao: Date;
    conta_id: number;
    tecnologia_id: number;
    tarifario_id: number;
    sim_card_id: number;
}
