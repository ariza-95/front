import {Cobradores} from './cobradores';
import {Clientes} from './clientes';

export class PagosClientes {
  id?: number;
  valor: number;
  fchPago: string;
  cobrador: Cobradores;
  movimiento: string;
  cliente: Clientes;


  constructor(valor: number, fchPago: string, cobrador: Cobradores, movimiento: string, cliente: Clientes) {
    this.valor = valor;
    this.fchPago = fchPago;
    this.cobrador = cobrador;
    this.movimiento = movimiento;
    this.cliente = cliente;
  }
}
