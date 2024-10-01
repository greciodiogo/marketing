export interface ContaInterface {
  id?: number;
  nome: string; 
  is_deleted: boolean; 
  contaDescricao: string;
  gestorConta: number; 
  tipoFacturacao: string;
  moeda_id: number;
  estado: number;
  cliente_id: number;
  user_id: number;
}
