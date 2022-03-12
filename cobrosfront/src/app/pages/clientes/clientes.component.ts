import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto';
import {ProductoService} from '../../service/productoService';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import {Clientes} from '../../models/clientes';
import {Clienteservice} from '../../service/clienteservice';
import {Rutas} from '../../models/rutas';
import {RutasService} from '../../service/rutasService';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: Clientes[] = [];
  roles: string[];
  isAdmin = false;
  busqueda: string;
  select: string;
  rutas: Rutas[];
  constructor(
    private clientesService: Clienteservice,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private _modalService: NgbModal,
    private  rutasService: RutasService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.getRutas();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  getRutas() {
    this.rutasService.lista().subscribe(
      data => {
        this.rutas = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  onBuscar() {
    if(this.busqueda === ''){
      this.cargarProductos();
    } else {
      this.clientesService.listaContains(this.busqueda).subscribe(
        data => {
          this.clientes = data;
        },
        err => {
          console.log(err);
        });
    }
  }
  onBuscarSelect() {
    if (this.select === '') {
      this.cargarProductos();
    } else {
      this.clientesService.findByRuta(this.select).subscribe(
        data => {
          this.clientes = data;
        },
        err => {
          console.log(err);
        });
    }
  }
  cargarProductos(): void {
    this.clientesService.lista().subscribe(
      data => {
        this.clientes = data;
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
            this.clientesService.delete(id).subscribe(
              response => {
                this.spinner.hide('sp2');
                Swal.fire('SUCCESS', 'Producto Borrado', 'success' );
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
