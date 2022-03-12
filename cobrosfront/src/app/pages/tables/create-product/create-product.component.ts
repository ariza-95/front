import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductoService} from '../../../service/productoService';
import {Producto} from '../../../models/producto';
import Swal from "sweetalert2";
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  descripcion: string;
  nombre: string;
  precio: number;
  cantidadInicial: number;
  cantidadDisponible: number;
  fchIngreso: string ;
  idProducto: number;
  isEdit = false;
  producto: Producto;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private productoService: ProductoService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idProducto = param.idProduct;
      console.log(param.idProduct);
      if (param.idProduct !== 0  && param.idProduct !== '') {
        this.isEdit = true;
        this.getProduct(this.idProducto);
      }
    });
  }

  getProduct(id: number) {
    this.productoService.detail(id).subscribe(
      data => {
        this.producto = data;
        this.fchIngreso = this.producto.fchIngreso;
        this.cantidadDisponible = this.producto.cantidadDisponible;
        this.cantidadInicial = this.producto.cantidadInicial;
        this.precio = this.producto.precio;
        this.descripcion = this.producto.descripcion;
        this.nombre = this.producto.nombre;
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
          id = this.producto.id;
      }
      this.producto = new Producto(this.descripcion, this.nombre, this.precio, this.cantidadInicial,
        this.cantidadDisponible, this.parsePickerToDate(this.fchIngreso).toUTCString());

      if (this.isEdit) {
        this.productoService.update(id, this.producto).subscribe(
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
                  this.router.navigate(['/tables']);
                } else {
                  this.router.navigate(['/tables']);

                }
              });
          },
          err => {
            console.log(err);
            Swal.fire('ERROR', err.error.mensaje, 'error');
          }
        );
      } else {
        this.productoService.save(this.producto).subscribe(
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
                  this.router.navigate(['/tables']);
                } else {
                  this.router.navigate(['/createProduct/0']);
                  this.ngOnInit();
                }
              });
          },
          err => {
            console.log(err);
            Swal.fire('ERROR', err.error.mensaje, 'error');
          }
        );
      }
  }
  parseDateToPicker(dateString: string) {
    const date: Date = new Date(dateString.replace('+0000', ''));
    return {
      'day': date.getUTCDate(),
      'month': date.getUTCMonth() + 1,
      'year': date.getUTCFullYear()
    };
  }
  parsePickerToDate(dateString: any){
    return new Date(dateString.year, dateString.month - 1, dateString.day);
  }
}
