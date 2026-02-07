
/**
 * BagType: Define os tipos de armazenamento/transporte
 * - SECA: Produtos que não requerem refrigeração
 * - GELADA: Produtos que requerem refrigeração
 * - GENERICO: Tipo genérico (usado em placas de aviso)
 */
export enum BagType {
  SECA = 'SECA',
  GELADA = 'GELADA',
  GENERICO = 'GENERICO'
}

/**
 * LabelMode: Define os modos de funcionamento da aplicação
 * - IFOOD: Gera etiquetas para pedidos do iFood
 * - COMPRA: Gera etiquetas para compras (Compra na Hora)
 * - PLACA: Gera placas de aviso (reservado, fechado, etc)
 */
export enum LabelMode {
  IFOOD = 'IFOOD',
  COMPRA = 'COMPRA',
  PLACA = 'PLACA'
}

/**
 * LabelData: Estrutura dos dados de uma etiqueta
 * Usado para renderizar tanto na tela quanto na impressão
 */
export interface LabelData {
  title: string;       // Número do pedido (IFOOD), Número da compra (COMPRA) ou Título da Placa (PLACA)
  clientName?: string; // Nome do cliente (usado em COMPRA e PLACA)
  type: BagType;       // Tipo de armazenamento (seco, gelado, genérico)
  currentVolume: number; // Volume/sequência atual (ex: 1 de 3)
  totalVolumes: number; // Total de volumes
  dryTotal: number;    // Total de volumes secos
  coldTotal: number;   // Total de volumes gelados
  mode: LabelMode;     // Modo da etiqueta (IFOOD, COMPRA ou PLACA)
}
