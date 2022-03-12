export class SumGastosDto {
  tipoEmpleado: string;
  anio: string;
  total: string;


  constructor(tipoEmpleado: string, anio: string, total: string) {
    this.tipoEmpleado = tipoEmpleado;
    this.anio = anio;
    this.total = total;
  }
}
