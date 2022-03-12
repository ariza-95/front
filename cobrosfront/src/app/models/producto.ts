import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class Producto {
  id?: number;
  descripcion: string;
  nombre: string;
  precio: number;
  cantidadInicial: number;
  cantidadDisponible: number;
  fchIngreso: string ;

  constructor(descripcion: string, nombre: string, precio: number, cantidadInicial: number,
              cantidadDisponible: number, fchIngreso: string ) {
    this.descripcion = descripcion;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidadInicial = cantidadInicial;
    this.cantidadDisponible = cantidadDisponible;
    this.fchIngreso = fchIngreso;
  }
}
