import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clientes} from '../models/clientes';
import {Gastos} from '../models/gastos';
import {FechaDto} from '../models/fechaDto';
import {SumGastosDto} from '../models/SumGastosDto';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  productoURL = 'http://localhost:8180/crud-0.0.1-SNAPSHOT/gastos/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Gastos[]> {
    return this.httpClient.get<Gastos[]>(this.productoURL + 'lista');
  }

  public detail(id: number): Observable<Gastos> {
    return this.httpClient.get<Gastos>(this.productoURL + `detail/${id}`);
  }
  public listaContains(id: string): Observable<Gastos[]> {
    return this.httpClient.get<Gastos[]>(this.productoURL + `listaContains/${id}`);
  }
  public listaSumYear(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.productoURL + `listaSumYear`);
  }
  public listaSumMonth(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.productoURL + `listaSumMonth`);
  }
  public detailsFech(producto: FechaDto): Observable<Gastos[]> {
    return this.httpClient.post<Gastos[]>(this.productoURL + 'detailsFch', producto);
  }
  public detailName(nombre: string): Observable<Clientes> {
    return this.httpClient.get<Clientes>(this.productoURL + `detailname/${nombre}`);
  }

  public save(producto: Gastos): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id: number, producto: Gastos): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
