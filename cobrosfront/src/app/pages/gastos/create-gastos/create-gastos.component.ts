import { Component, OnInit } from '@angular/core';
import {Clientes} from '../../../models/clientes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rutas} from '../../../models/rutas';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Clienteservice} from '../../../service/clienteservice';
import {RutasService} from '../../../service/rutasService';
import Swal from "sweetalert2";
import {GastosService} from '../../../service/gastosService';
import {Gastos} from '../../../models/gastos';

@Component({
  selector: 'app-create-gastos',
  templateUrl: './create-gastos.component.html',
  styleUrls: ['./create-gastos.component.css']
})
export class CreateGastosComponent implements OnInit {

  idGasto: number;
  isEdit = false;
  gasto: Gastos;
  clienteFrom: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private gastosService: GastosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idGasto = param.idGasto;
      if (param.idGasto !== 0  && param.idGasto !== '' && param.idGasto !== '0') {
        console.log(param.idGasto);
        this.isEdit = true;
        this.idGasto = param.idGasto;
        this.getProduct(this.idGasto);
      }
      this.cargarForm();
    });
  }
  cargarForm() {
    if (this.clienteFrom) {
      this.clienteFrom.setValue({
        descripcion: this.gasto ? this.gasto.descripcion : '',
        precio: this.gasto ? this.gasto.precio : '',
        tipoEmpleado: this.gasto ? this.gasto.tipoEmpleado : '',
        fchPago: this.gasto ? this.parseDateToPicker(this.gasto.fchPago) : '',
      });
    } else {
      this.clienteFrom = new FormGroup({
        descripcion: new FormControl(this.gasto ? this.gasto.descripcion : '',[Validators.required]),
        precio: new FormControl(this.gasto ? this.gasto.precio : '',[Validators.required]),
        tipoEmpleado: new FormControl(this.gasto ? this.gasto.tipoEmpleado : '',[Validators.required]),
        fchPago: new FormControl(this.gasto ? this.parseDateToPicker(this.gasto.fchPago) : '', [Validators.required]),
      });
    }
  }
  getProduct(id: number) {
    this.gastosService.detail(id).subscribe(
      data => {
        this.gasto = data;
        this.cargarForm();
      },
      err => {
        console.log(err);
      }
    );
  }
  onSave() {
    this.spinner.show('sp2');
     this.gasto = this.clienteFrom.getRawValue();
     this.gasto.fchPago = this.parsePickerToDate(this.gasto.fchPago).toUTCString()
        if (this.isEdit) {
          this.gasto.id = this.idGasto;
          this.gastosService.update(this.idGasto, this.gasto).subscribe(
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
                    this.router.navigate(['/gastos']);
                  } else {
                    this.router.navigate(['/gastos']);

                  }
                });
            },
            err => {
              console.log(err);
              Swal.fire('ERROR', err.error.mensaje, 'error');
            }
          );
        } else {
          this.gastosService.save(this.gasto).subscribe(
            data => {
              this.spinner.hide('sp2');
              Swal.fire({
                title: 'Guardado con exito',
                text: 'Deseas Guardar Otro Gasto',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continuar',
                cancelButtonText: 'No Guardar Más',
              }).then(
                (result) => {
                  if (result.dismiss) {
                    this.router.navigate(['/gastos']);
                  } else {
                    this.gasto = null;
                    this.router.navigate(['/createGastos/0']);
                    this.clienteFrom.reset();
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
