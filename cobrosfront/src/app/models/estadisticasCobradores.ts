import {Cobradores} from './cobradores';

export class EstadisticasCobradores {
  cobradores: Cobradores;
  totalCobros: number;
  totalCobrado: number;

  constructor(cobradores: Cobradores, totalCobros: number, totalCobrado: number) {
    this.cobradores = cobradores;
    this.totalCobros = totalCobros;
    this.totalCobrado = totalCobrado;
  }
}
