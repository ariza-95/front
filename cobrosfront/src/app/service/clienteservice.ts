import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clientes} from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class Clienteservice {

  productoURL = 'http://localhost:8180/crud-0.0.1-SNAPSHOT/clientes/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Clientes[]> {
    return this.httpClient.get<Clientes[]>(this.productoURL + 'lista');
  }
  public listaRutas(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.productoURL + 'listaRutas');
  }
  public detail(id: number): Observable<Clientes> {
    return this.httpClient.get<Clientes>(this.productoURL + `detail/${id}`);
  }
  public listaContains(id: string): Observable<Clientes[]>{
    return this.httpClient.get<Clientes[]>(this.productoURL + `listaContains/${id}`);
  }
  public findByRuta(id: string): Observable<Clientes[]>{
    return this.httpClient.get<Clientes[]>(this.productoURL + `findByRuta/${id}`);
  }
  public detailName(nombre: string): Observable<Clientes> {
    return this.httpClient.get<Clientes>(this.productoURL + `detailname/${nombre}`);
  }

  public save(producto: Clientes): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id: number, producto: Clientes): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
