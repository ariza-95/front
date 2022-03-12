import { Component, OnInit } from '@angular/core';
import {Clientes} from '../../../models/clientes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rutas} from '../../../models/rutas';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Clienteservice} from '../../../service/clienteservice';
import {RutasService} from '../../../service/rutasService';
import Swal from "sweetalert2";
import {Cobradores} from '../../../models/cobradores';
import {CobradorService} from '../../../service/cobradorService';

@Component({
  selector: 'app-crear-cobrador',
  templateUrl: './crear-cobrador.component.html',
  styleUrls: ['./crear-cobrador.component.css']
})
export class CrearCobradorComponent implements OnInit {

  idCobrador: number;
  isEdit = false;
  cobrador: Cobradores;
  cobradorFrom: FormGroup;
  rutas: Rutas[];
  ruta: Rutas;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private cobradorService: CobradorService, private rutasService: RutasService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idCobrador = param.idCobrador;
      this.getRutas();
      if (param.idCobrador !== 0  && param.idCobrador !== '' && param.idCobrador !== '0') {
        console.log(param.idCobrador);
        this.isEdit = true;
        this.idCobrador = param.idCobrador;
        this.getProduct(this.idCobrador);
      }
      this.cargarForm();
    });
  }
  cargarForm() {
    if (this.cobradorFrom) {
      this.cobradorFrom.setValue({
        nombre: this.cobrador ? this.cobrador.nombre : '',
        cedula: this.cobrador ? this.cobrador.cedula : '',
        telefono: this.cobrador ? this.cobrador.telefono : '',
        saldo: this.cobrador ? this.cobrador.saldo : '',
        rutas: this.cobrador ? this.cobrador.rutas.id : '',
      });
    } else {
      this.cobradorFrom = new FormGroup({
        nombre: new FormControl( this.cobrador ? this.cobrador.nombre : '',[Validators.required]),
        cedula: new FormControl(this.cobrador ? this.cobrador.cedula : '',[Validators.required]),
        telefono: new FormControl(this.cobrador ? this.cobrador.telefono : '',[Validators.required, Validators.maxLength(10)]),
        saldo: new FormControl(this.cobrador ? this.cobrador.saldo : '',[Validators.required]),
        rutas: new FormControl(this.cobrador ? this.cobrador.rutas.id : '',[Validators.required]),
      });
    }
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


  getProduct(id: number) {
    this.cobradorService.detail(id).subscribe(
      data => {
        this.cobrador = data;
        this.cargarForm();
      },
      err => {
        console.log(err);
      }
    );
  }
  onSave() {
    this.spinner.show('sp2');
    const cliente: Cobradores = this.cobradorFrom.getRawValue();
    this.rutasService.detail(this.cobradorFrom.controls['rutas'].value).subscribe(
      response => {
        this.cobrador = new Cobradores(cliente.nombre, cliente.cedula, cliente.telefono, cliente.saldo, response);
        if (this.isEdit) {
          this.cobrador.id = this.idCobrador;
          this.cobradorService.update(this.idCobrador, this.cobrador).subscribe(
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
                    this.router.navigate(['/cobradores']);
                  } else {
                    this.router.navigate(['/cobradores']);

                  }
                });
            },
            err => {
              console.log(err);
              Swal.fire('ERROR', err.error.mensaje, 'error');
            }
          );
        } else {
          this.cobradorService.save(this.cobrador).subscribe(
            data => {
              this.spinner.hide('sp2');
              Swal.fire({
                title: 'Guardado con exito',
                text: 'Deseas Guardar Otro Cobrador',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continuar',
                cancelButtonText: 'No Guardar Más',
              }).then(
                (result) => {
                  if (result.dismiss) {
                    this.router.navigate(['/cobradores']);
                  } else {
                    this.cobrador = null;
                    this.router.navigate(['/createCobrador/0']);
                    this.cobradorFrom.reset();
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

      },
      error => {
        console.log(error);
      }
    );
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
