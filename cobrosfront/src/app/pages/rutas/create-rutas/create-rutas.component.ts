import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../models/producto';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductoService} from '../../../service/productoService';
import Swal from "sweetalert2";
import {Rutas} from '../../../models/rutas';
import {RutasService} from '../../../service/rutasService';

@Component({
  selector: 'app-create-rutas',
  templateUrl: './create-rutas.component.html',
  styleUrls: ['./create-rutas.component.css']
})
export class CreateRutasComponent implements OnInit {

  nombre: string;
  idRuta: number;
  isEdit = false;
  rutas: Rutas;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private rutaService: RutasService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idRuta = param.idRuta;
      if (param.idRuta !== 0  && param.idRuta !== '' && param.idRuta !== '0') {
        console.log(param.idRuta)
        this.isEdit = true;
        this.getProduct(this.idRuta);
      } else {
        this.nombre = '';
      }
    });
  }

  getProduct(id: number) {
    this.rutaService.detail(id).subscribe(
      data => {
        this.rutas = data;
        this.nombre = this.rutas.ciudad;
      },
      err => {
        console.log(err);
      }
    );
  }
  onSave() {
    this.spinner.show('sp2');
    let id = 0;
    if (this.isEdit) {
      id = this.rutas.id;
    }
    this.rutas = new Rutas(this.nombre);

    if (this.isEdit) {
      this.rutaService.update(this.idRuta, this.rutas).subscribe(
        data => {
          this.spinner.hide('sp2');
          Swal.fire({
            title: 'Guardado con exito',
            text: '',
            type: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ok',
          }).then(
            (result) => {
              if (result.dismiss) {
                this.router.navigate(['/rutas']);
              } else {
                this.router.navigate(['/rutas']);

              }
            });
        },
        err => {
          console.log(err);
          Swal.fire('ERROR', err.error.mensaje, 'error');
        }
      );
    } else {
      this.rutaService.save(this.rutas).subscribe(
        data => {
          this.spinner.hide('sp2');
          Swal.fire({
            title: 'Guardado con exito',
            text: 'Deseas Guardar Otro Producto',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'No Guardar Más',
          }).then(
            (result) => {
              if (result.dismiss) {
                this.router.navigate(['/rutas']);
              } else {
                this.router.navigate(['/createRutas/0']);
                this.ngOnInit();
              }
            });
        },
        err => {
          Swal.fire('ERROR', err.error.mensaje, 'error');
        }
      );
    }
  }
}
