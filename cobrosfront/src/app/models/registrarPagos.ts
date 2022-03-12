import {FechaDto} from './fechaDto';
import {Pagos} from './pagos';

export class RegistrarPagos {
  fecha: FechaDto;
  pagos: Pagos;

  constructor(fecha: FechaDto, pagos: Pagos) {
    this.fecha = fecha;
    this.pagos = pagos;
  }
}
