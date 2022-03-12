import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clientes} from '../models/clientes';
import {Vendedor} from '../models/vendedor';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  productoURL = 'http://localhost:8180/crud-0.0.1-SNAPSHOT/vendedor/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Vendedor[]> {
    return this.httpClient.get<Vendedor[]>(this.productoURL + 'lista');
  }

  public detail(id: number): Observable<Vendedor> {
    return this.httpClient.get<Vendedor>(this.productoURL + `detail/${id}`);
  }
  public listaContains(id: string): Observable<Vendedor[]>{
    return this.httpClient.get<Vendedor[]>(this.productoURL + `listaContains/${id}`);
  }
  public save(producto: Vendedor): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id: number, producto: Vendedor): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
