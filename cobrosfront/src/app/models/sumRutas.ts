import {Rutas} from './rutas';

export class SumRutas {
  rutas: Rutas;
  abonado: number;
  total: number;


  constructor(rutas: Rutas, abonado: number, total: number) {
    this.rutas = rutas;
    this.abonado = abonado;
    this.total = total;
  }
}
