import { Component, OnInit } from '@angular/core';
import {Clientes} from '../../models/clientes';
import {Clienteservice} from '../../service/clienteservice';
import {TokenService} from '../../service/tokenService';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import {Cobradores} from '../../models/cobradores';
import {CobradorService} from '../../service/cobradorService';

@Component({
  selector: 'app-cobradores',
  templateUrl: './cobradores.component.html',
  styleUrls: ['./cobradores.component.css']
})
export class CobradoresComponent implements OnInit {


  cobrador: Cobradores[] = [];
  roles: string[];
  isAdmin = false;
  busqueda: string;

  constructor(
    private cobradoresService: CobradorService,
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
      this.cobradoresService.listaContains(this.busqueda).subscribe(
        data => {
          this.cobrador = data;
        },
        err => {
          console.log(err);
        });
    }
  }
  cargarProductos(): void {
    this.cobradoresService.lista().subscribe(
      data => {
        this.cobrador = data;
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
            this.cobradoresService.delete(id).subscribe(
              response => {
                this.spinner.hide('sp2');
                Swal.fire('SUCCESS', 'Cobrador Borrado', 'success' );
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
