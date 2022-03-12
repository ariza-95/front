export class Vendedor {
  id?: number;
  nombre: string;
  identificacion: string;
  telefono: string;
  fchIngreso: string;
  saldo: number;

  constructor(nombre: string, identificacion: string, telefono: string, fchIngreso: string, saldo: number) {
    this.nombre = nombre;
    this.identificacion = identificacion;
    this.telefono = telefono;
    this.fchIngreso = fchIngreso;
    this.saldo = saldo;
  }
}
