import {Component, OnInit, Type} from '@angular/core';
import {Producto} from '../../models/producto';
import {ProductoService} from '../../service/productoService';
import {ToastrService} from 'ngx-toastr';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})

export class TablesComponent implements OnInit {

  productos: Producto[] = [];
  roles: string[];
  isAdmin = false;
  busqueda: string;
  constructor(
    private productoService: ProductoService,
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
      this.productoService.listaContains(this.busqueda).subscribe(
        data => {
          this.productos = data;
        },
        err => {
          console.log(err);
        });
    }
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
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
            this.productoService.delete(id).subscribe(
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
