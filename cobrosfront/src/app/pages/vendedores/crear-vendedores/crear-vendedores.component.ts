import { Component, OnInit } from '@angular/core';
import {Gastos} from '../../../models/gastos';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {GastosService} from '../../../service/gastosService';
import Swal from "sweetalert2";
import {Vendedor} from '../../../models/vendedor';
import {VendedorService} from '../../../service/vendedorService';

@Component({
  selector: 'app-crear-vendedores',
  templateUrl: './crear-vendedores.component.html',
  styleUrls: ['./crear-vendedores.component.css']
})
export class CrearVendedoresComponent implements OnInit {
  idVendedor: number;
  isEdit = false;
  vendedor: Vendedor;
  vendedorFrom: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private vendedorService: VendedorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idVendedor = param.idVendedor;
      if (param.idVendedor !== 0  && param.idVendedor !== '' && param.idVendedor !== '0') {
        console.log(param.idVendedor);
        this.isEdit = true;
        this.idVendedor = param.idVendedor;
        this.getProduct(this.idVendedor);
      }
      this.cargarForm();
    });
  }
  cargarForm() {
    if (this.vendedorFrom) {
      this.vendedorFrom.setValue({
        nombre: this.vendedor ? this.vendedor.nombre : '',
        identificacion: this.vendedor ? this.vendedor.identificacion : '',
        telefono: this.vendedor ? this.vendedor.telefono : '',
        fchIngreso: this.vendedor ? this.parseDateToPicker(this.vendedor.fchIngreso) : '',
        saldo: this.vendedor ? this.vendedor.saldo : 0,
      });
    } else {
      this.vendedorFrom = new FormGroup({
        nombre: new FormControl(this.vendedor ? this.vendedor.nombre : '',[Validators.required]),
        identificacion: new FormControl(this.vendedor ? this.vendedor.identificacion : '',[Validators.required]),
        telefono: new FormControl(this.vendedor ? this.vendedor.telefono : '',[Validators.required, Validators.maxLength(10)]),
        fchIngreso: new FormControl(this.vendedor ? this.parseDateToPicker(this.vendedor.fchIngreso) : '', [Validators.required]),
        saldo: new FormControl(this.vendedor ? this.vendedor.saldo : 0, [Validators.required]),
      });
    }
  }
  getProduct(id: number) {
    this.vendedorService.detail(id).subscribe(
      data => {
        this.vendedor = data;
        this.cargarForm();
      },
      err => {
        console.log(err);
      }
    );
  }
  onSave() {
    this.spinner.show('sp2');
    this.vendedor = this.vendedorFrom.getRawValue();
    this.vendedor.fchIngreso = this.parsePickerToDate(this.vendedor.fchIngreso).toUTCString()
    if (this.isEdit) {
      this.vendedor.id = this.idVendedor;
      this.vendedorService.update(this.idVendedor, this.vendedor).subscribe(
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
                this.router.navigate(['/vendedores']);
              } else {
                this.router.navigate(['/vendedores']);

              }
            });
        },
        err => {
          console.log(err);
          Swal.fire('ERROR', err.error.mensaje, 'error');
        }
      );
    } else {
      this.vendedorService.save(this.vendedor).subscribe(
        data => {
          this.spinner.hide('sp2');
          Swal.fire({
            title: 'Guardado con exito',
            text: 'Deseas Guardar Otro Vendedor',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'No Guardar Más',
          }).then(
            (result) => {
              if (result.dismiss) {
                this.router.navigate(['/vendedores']);
              } else {
                this.vendedor = null;
                this.router.navigate(['/createVendedores/0']);
                this.vendedorFrom.reset();
                this.cargarForm();
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
