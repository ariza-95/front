import { Component, OnInit } from '@angular/core';
import {Clientes} from '../../models/clientes';
import {Clienteservice} from '../../service/clienteservice';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import {VendedorService} from '../../service/vendedorService';
import {Vendedor} from '../../models/vendedor';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {


  vendedores: Vendedor[] = [];
  roles: string[];
  isAdmin = false;
  busqueda: string;

  constructor(
    private vendedoresService: VendedorService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  onBuscar() {
    if(this.busqueda === ''){
      this.cargarProductos();
    } else {
      this.vendedoresService.listaContains(this.busqueda).subscribe(
        data => {
          this.vendedores = data;
        },
        err => {
          console.log(err);
        });
    }
  }
  cargarProductos(): void {
    this.vendedoresService.lista().subscribe(
      data => {
        this.vendedores = data;
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
            this.vendedoresService.delete(id).subscribe(
              response => {
                this.spinner.hide('sp2');
                Swal.fire('SUCCESS', 'Vendedor Borrado', 'success' );
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
