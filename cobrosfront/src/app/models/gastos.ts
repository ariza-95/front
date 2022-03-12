export class Gastos {
  id?: number;
  descripcion: string;
  precio: number;
  tipoEmpleado: string;
  fchPago: string;

  constructor(id: number, descripcion: string, precio: number, tipoEmpleado: string, fchPago: string) {
    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.tipoEmpleado = tipoEmpleado;
    this.fchPago = fchPago;
  }
}
