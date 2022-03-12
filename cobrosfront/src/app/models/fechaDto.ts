export class FechaDto {
  id: number;
  from: string;
  until: string;

  constructor(id: number,from: string, until: string) {
    this.id = id;
    this.from = from;
    this.until = until;
  }
}
