import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import {Rutas} from '../models/rutas';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  productoURL = 'http://localhost:8180/crud-0.0.1-SNAPSHOT/rutas/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Rutas[]> {
    return this.httpClient.get<Rutas[]>(this.productoURL + 'lista');
  }

  public detail(id: number): Observable<Rutas> {
    return this.httpClient.get<Rutas>(this.productoURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Rutas> {
    return this.httpClient.get<Rutas>(this.productoURL + `detailname/${nombre}`);
  }

  public save(ruta: Rutas): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', ruta);
  }

  public update(id: number, ruta: Rutas): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, ruta);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
