import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clientes} from '../models/clientes';
import {Cobradores} from '../models/cobradores';

@Injectable({
  providedIn: 'root'
})
export class CobradorService {

  productoURL = 'http://localhost:8180/crud-0.0.1-SNAPSHOT/cobradores/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Cobradores[]> {
    return this.httpClient.get<Cobradores[]>(this.productoURL + 'lista');
  }

  public detail(id: number): Observable<Cobradores> {
    return this.httpClient.get<Cobradores>(this.productoURL + `detail/${id}`);
  }
  public listaContains(id: string): Observable<Cobradores[]>{
    return this.httpClient.get<Cobradores[]>(this.productoURL + `listaContains/${id}`);
  }
  public detailName(nombre: string): Observable<Cobradores> {
    return this.httpClient.get<Cobradores>(this.productoURL + `detailname/${nombre}`);
  }

  public save(producto: Cobradores): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id: number, producto: Cobradores): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
