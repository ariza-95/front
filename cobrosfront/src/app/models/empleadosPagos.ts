export class EmpleadosPagos {
  id: number;
  nombre: string;
  tipo: string;

  constructor(id:number,nombre: string, tipo: string) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
  }
}
