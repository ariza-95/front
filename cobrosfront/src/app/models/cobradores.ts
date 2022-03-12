import {Rutas} from './rutas';

export class Cobradores {
  id?: number;
  nombre: string;
  cedula: string;
  telefono: string;
  saldo: number;
  rutas: Rutas;

  constructor(nombre: string, cedula: string, telefono: string, saldo: number, rutas: Rutas) {
    this.nombre = nombre;
    this.cedula = cedula;
    this.telefono = telefono;
    this.saldo = saldo;
    this.rutas = rutas;
  }
}
