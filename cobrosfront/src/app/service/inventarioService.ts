import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Clientes} from '../models/clientes';
import {Vendedor} from '../models/vendedor';
import {Inventario} from '../models/inventario';
import {FechaDto} from '../models/fechaDto';
import {Pagos} from '../models/pagos';
import {RegistrarPagos} from '../models/registrarPagos';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  productoURL = 'http://localhost:8180/crud-0.0.1-SNAPSHOT/inventario/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Inventario[]> {
    return this.httpClient.get<Inventario[]>(this.productoURL + 'lista');
  }

  public detail(id: number): Observable<Inventario> {
    return this.httpClient.get<Inventario>(this.productoURL + `detail/${id}`);
  }
  public getByVendedorAndEstado(id: string, producto: Inventario): Observable<Inventario[]> {
    return this.httpClient.post<Inventario[]>(this.productoURL + 'detailsEstado/${id}', producto);
  }
  public getByVendedorAndEstadoIsNot(id: string, producto: Inventario): Observable<Inventario[]> {
    return this.httpClient.post<Inventario[]>(this.productoURL + 'detailsEstadoNot/${id}', producto);
  }

  public getByEstado(estado: string): Observable<any> {
    return this.httpClient.get<any>(this.productoURL + 'estado/${estado}');
  }
  public getByTipo(estado: string): Observable<any> {
    return this.httpClient.get<any>(this.productoURL + 'tipo/${estado}');
  }
  public getPagos(pagos: FechaDto): Observable<Pagos> {
    return this.httpClient.post<Pagos>(this.productoURL + 'pagos', pagos);
  }
  public savePagosDeducion(pagos: RegistrarPagos): Observable<RegistrarPagos> {
    return this.httpClient.post<RegistrarPagos>(this.productoURL + 'pagosDeducion', pagos);
  }
  public savePagosSinDeducion(pagos: RegistrarPagos): Observable<RegistrarPagos> {
    return this.httpClient.post<RegistrarPagos>(this.productoURL + 'pagosSinDeducion', pagos);
  }
  public getByFechas(estado: FechaDto): Observable<Inventario[]> {
    return this.httpClient.post<Inventario[]>(this.productoURL + 'detailsFch', estado);
  }

  public save(producto: Inventario): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }
  public update(id: number, producto: Inventario): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
