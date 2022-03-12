import {Rutas} from './rutas';

export class Clientes {
  id?: number;
  codigo: string;
  nombre: string;
  direccion: string;
  telefono: string;
  antiguo: string;
  estado: string;
  fchVenta: string;
  fchFinPago: string;
  saldo: number;
  deuda: number;
  rutas: Rutas;
  // tslint:disable-next-line:max-line-length
  constructor(codigo: string, nombre: string, direccion: string, telefono: string, antiguo: string, estado: string, fchVenta: string, fchFinPago: string, saldo: number, deuda: number, rutas: Rutas) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.antiguo = antiguo;
    this.estado = estado;
    this.fchVenta = fchVenta;
    this.fchFinPago = fchFinPago;
    this.saldo = saldo;
    this.deuda = deuda;
    this.rutas = rutas;
  }
}
