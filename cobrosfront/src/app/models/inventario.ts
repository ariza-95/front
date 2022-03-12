import {Producto} from './producto';
import {Vendedor} from './vendedor';
import {Clientes} from './clientes';

export class Inventario {
  id?: number;
  producto: Producto;
  vendedor: Vendedor;
  fchEntrega: string;
  estado: string;
  cliente: Clientes;
  tipoMovimiento: string;
  cantidadProducto: number;
  totalPrecio: number;

  constructor(producto: Producto, vendedor: Vendedor, fchEntrega: string, estado: string, cliente: Clientes, tipoMovimiento: string, cantidadProducto: number, totalPrecio: number) {
    this.producto = producto;
    this.vendedor = vendedor;
    this.fchEntrega = fchEntrega;
    this.estado = estado;
    this.cliente = cliente;
    this.tipoMovimiento = tipoMovimiento;
    this.cantidadProducto = cantidadProducto;
    this.totalPrecio = totalPrecio;
  }
}
