export class Pagos {
    saldo: number;
    semana: string;
    totalPagar: number;
    devolucion: number;
    totalDeducir: number;
    abono: number;
    otrasDeducir: number;
    totalPrecio: number;
  // tslint:disable-next-line:max-line-length
  constructor(saldo: number, semana: string, totalPagar: number, devolucion: number, totalDeducir: number, abono: number, otrasDeducir: number, totalPrecio: number) {
    this.saldo = saldo;
    this.semana = semana;
    this.totalPagar = totalPagar;
    this.devolucion = devolucion;
    this.totalDeducir = totalDeducir;
    this.abono = abono;
    this.otrasDeducir = otrasDeducir;
    this.totalPrecio = totalPrecio;
  }
}
