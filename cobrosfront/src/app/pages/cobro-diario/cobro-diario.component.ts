import { Component, OnInit } from '@angular/core';
import {Inventario} from '../../models/inventario';
import {InventarioService} from '../../service/inventarioService';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";
import {PagosService} from '../../service/pagosService';
import {PagosClientes} from '../../models/pagosClientes';
import {Clienteservice} from '../../service/clienteservice';
import {Clientes} from '../../models/clientes';

@Component({
  selector: 'app-cobro-diario',
  templateUrl: './cobro-diario.component.html',
  styleUrls: ['./cobro-diario.component.css']
})
export class CobroDiarioComponent implements OnInit {

  roles: string[];
  isAdmin = false;
  isEdit = false;
  busqueda: string;
  inventario: PagosClientes[];
  idCobro: number;
  cliente: Clientes;
  constructor(
    private pagosService: PagosService,
    private inventarioService: InventarioService,
    private router: Router,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private clienteService: Clienteservice) {}

  ngOnInit() {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
    this.route.params.subscribe(param => {
      this.idCobro = param.idCobro;
      if (param.idCobro !== 0 && param.idCobro !== '' && param.idCobro !== '0') {
        this.isEdit = true;
        this.cargarCliente();

      }
    });
  }
  cargarCliente(): void {
    this.clienteService.detail(this.idCobro).subscribe(
      data => {
        this.cliente = data;
        this.cargarProductosByCliente(this.cliente);
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarProductosByCliente(cliente: Clientes): void {
    this.pagosService.getByClientes(cliente).subscribe(
      data => {
        this.inventario = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarProductos(): void {
    this.pagosService.lista().subscribe(
      data => {
        this.inventario = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  borrar(id: number) {
    if (id === null) {
      Swal.fire('ERROR', 'Error al Borrar', 'error');
    } else {
      Swal.fire({
        title: 'Estas Seguro de borrar?',
        text: 'si te equivocas no podras revertirlo',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then(
        result => {
          if (result.value) {
            this.spinner.show('sp2');
            this.pagosService.delete(id).subscribe(
              response => {
                this.spinner.hide('sp2');
                Swal.fire('SUCCESS', 'Movimiento Borrado', 'success' );
                this.cargarProductos();
              }, err => {
                this.spinner.hide('sp2');
                Swal.fire('ERROR', err.error.mensaje, 'error');
              }
            );
          }
        }
      );
    }
  }
}
