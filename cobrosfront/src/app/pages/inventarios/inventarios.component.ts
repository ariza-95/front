import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Inventario} from '../../models/inventario';
import {InventarioService} from '../../service/inventarioService';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {
  roles: string[];
  isAdmin = false;
  busqueda: string;
  inventario: Inventario[];
  constructor(
    private inventarioService: InventarioService,
    private router: Router,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService) {}

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
    this.inventarioService.lista().subscribe(
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
            this.inventarioService.delete(id).subscribe(
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
