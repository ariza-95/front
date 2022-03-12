import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Inventario} from '../models/inventario';
import {FechaDto} from '../models/fechaDto';
import {Pagos} from '../models/pagos';
import {RegistrarPagos} from '../models/registrarPagos';
import {PagosClientes} from '../models/pagosClientes';
import {Clientes} from '../models/clientes';
import {EstadisticasCobradores} from '../models/estadisticasCobradores';
@Injectable({
  providedIn: 'root'
})
export class PagosService {
  productoURL = 'http://localhost:8180/crud-0.0.1-SNAPSHOT/pagosClientes/';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<PagosClientes[]> {
    return this.httpClient.get<PagosClientes[]>(this.productoURL + 'lista');
  }

  public detail(id: number): Observable<PagosClientes> {
    return this.httpClient.get<PagosClientes>(this.productoURL + `detail/${id}`);
  }
  public getByVendedorAndEstado(id: string, producto: PagosClientes): Observable<PagosClientes[]> {
    return this.httpClient.post<PagosClientes[]>(this.productoURL + 'detailsEstado/${id}', producto);
  }
  public getByClientes(pagos: Clientes): Observable<PagosClientes[]> {
    return this.httpClient.post<PagosClientes[]>(this.productoURL + 'cliente', pagos);
  }
  public getPagos(pagos: FechaDto): Observable<Pagos> {
    return this.httpClient.post<Pagos>(this.productoURL + 'pagos', pagos);
  }
  public getEstadisticas(pagos: FechaDto): Observable<EstadisticasCobradores[]> {
    return this.httpClient.post<EstadisticasCobradores[]>(this.productoURL + 'estadisticasCobrador', pagos);
  }
  public savePagosSinDeducion(pagos: RegistrarPagos): Observable<RegistrarPagos> {
    return this.httpClient.post<RegistrarPagos>(this.productoURL + 'pagosSinDeducion', pagos);
  }
  public getByFechas(estado: FechaDto): Observable<Inventario[]> {
    return this.httpClient.post<Inventario[]>(this.productoURL + 'detailsFch', estado);
  }

  public save(producto: PagosClientes): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }
  public update(id: number, producto: PagosClientes): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
