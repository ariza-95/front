import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto';
import {ProductoService} from '../../service/productoService';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import {Rutas} from '../../models/rutas';
import {RutasService} from '../../service/rutasService';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {


  rutas: Rutas[] = [];
  roles: string[];
  isAdmin = false;

  constructor(
    private rutasService: RutasService,
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


  cargarProductos(): void {
    this.rutasService.lista().subscribe(
      data => {
        this.rutas = data;
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
            this.rutasService.delete(id).subscribe(
              response => {
                this.spinner.hide('sp2');
                Swal.fire('SUCCESS', 'Producto Borrado', 'success' );
                this.cargarProductos();
              }, err => {
                this.spinner.hide('sp2');
                Swal.fire('ERROR', err.error.message, 'error');
              }
            );
          }
        }
      );
    }
  }
}
