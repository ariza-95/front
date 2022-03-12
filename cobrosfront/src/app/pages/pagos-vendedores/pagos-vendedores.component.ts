import { Component, OnInit } from '@angular/core';
import {Inventario} from '../../models/inventario';
import {InventarioService} from '../../service/inventarioService';
import {Router} from '@angular/router';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";
import {EmpleadosPagos} from '../../models/empleadosPagos';
import {Vendedor} from '../../models/vendedor';
import {Cobradores} from '../../models/cobradores';
import {CobradorService} from '../../service/cobradorService';
import {VendedorService} from '../../service/vendedorService';

@Component({
  selector: 'app-pagos-vendedores',
  templateUrl: './pagos-vendedores.component.html',
  styleUrls: ['./pagos-vendedores.component.css']
})
export class PagosVendedoresComponent implements OnInit {

  roles: string[];
  isAdmin = false;
  busqueda: string;
  paraPagos: EmpleadosPagos[] = [];
  vendedor: Vendedor[];
  cobradores: Cobradores[];
  constructor(
    private inventarioService: InventarioService,
    private router: Router,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private cobradoresService: CobradorService,
    private vendedoresService: VendedorService) {}

  ngOnInit() {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarProductos(): void {
    this.vendedoresService.lista().subscribe(
      data => {
        data.forEach(obj => {
          this.paraPagos.push(new EmpleadosPagos(obj.id , obj.nombre, 'Vendedor'));
        });
      },
      err => {
        console.log(err);
      }
    );
    this.cobradoresService.lista().subscribe(
      data => {
        data.forEach(obj => {
          this.paraPagos.push(new EmpleadosPagos(obj.id, obj.nombre, 'Cobrador'));
        });
      },
      err => {
        console.log(err);
      }
    );
  }


}
