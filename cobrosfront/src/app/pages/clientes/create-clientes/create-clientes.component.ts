import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../models/producto';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductoService} from '../../../service/productoService';
import Swal from "sweetalert2";
import {Clienteservice} from '../../../service/clienteservice';
import {Clientes} from '../../../models/clientes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Rutas} from '../../../models/rutas';
import {RutasService} from '../../../service/rutasService';
@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css']
})
export class CreateClientesComponent implements OnInit {
  idCliente: number;
  isEdit = false;
  cliente: Clientes;
  clienteFrom: FormGroup;
  rutas: Rutas[];
  ruta: Rutas;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private clienteService: Clienteservice, private rutasService: RutasService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idCliente = param.idCliente;
      this.getRutas();
      if (param.idCliente !== 0  && param.idCliente !== '' && param.idCliente !== '0') {
        console.log(param.idCliente);
        this.isEdit = true;
        this.idCliente = param.idCliente;
        this.getProduct(this.idCliente);
      }
      this.cargarForm();
    });
  }
  cargarForm() {
    if (this.clienteFrom) {
      this.clienteFrom.setValue({
        codigo: this.cliente ? this.cliente.codigo : '',
        nombre: this.cliente ? this.cliente.nombre : '',
        direccion: this.cliente ? this.cliente.direccion : '',
        telefono: this.cliente ? this.cliente.telefono : '',
        antiguedad: 'No',
        estado: this.cliente ? this.cliente.estado : '',
        fchVenta: this.cliente ? this.parseDateToPicker(this.cliente.fchVenta) : '',
        fchFinPago: '',
        saldo: this.cliente ? this.cliente.saldo : '',
        deuda: this.cliente ? this.cliente.deuda : '',
        rutas: this.cliente ? this.cliente.rutas.id : '',
      });
    } else {
      this.clienteFrom = new FormGroup({
        codigo: new FormControl( this.cliente ? this.cliente.codigo : '',[Validators.required]),
        nombre: new FormControl( this.cliente ? this.cliente.nombre : '',[Validators.required]),
        direccion: new FormControl(this.cliente ? this.cliente.direccion : '',[Validators.required]),
        telefono: new FormControl(this.cliente ? this.cliente.telefono : '',[Validators.required, Validators.maxLength(10)]),
        antiguedad: new FormControl('No'),
        estado: new FormControl(this.cliente ? this.cliente.estado : '',[Validators.required]),
        fchVenta: new FormControl(this.cliente ? this.parseDateToPicker(this.cliente.fchVenta) : '', [Validators.required]),
        fchFinPago: new FormControl(''),
        saldo: new FormControl(this.cliente ? this.cliente.saldo : '',[Validators.required]),
        deuda: new FormControl(this.cliente ? this.cliente.deuda : '',[Validators.required]),
        rutas: new FormControl(this.cliente ? this.cliente.rutas.id : '',[Validators.required]),
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
    this.clienteService.detail(id).subscribe(
      data => {
        this.cliente = data;
        this.cargarForm();
      },
      err => {
        console.log(err);
      }
    );
  }
  onSave() {
    this.spinner.show('sp2');
    const cliente: Clientes = this.clienteFrom.getRawValue();
    this.rutasService.detail(this.clienteFrom.controls['rutas'].value).subscribe(
      response => {
        this.cliente = new Clientes(cliente.codigo, cliente.nombre, cliente.direccion, cliente.telefono, cliente.antiguo,
          cliente.estado, this.parsePickerToDate(cliente.fchVenta).toUTCString(), '', cliente.saldo,
          cliente.deuda, response);
        if (this.isEdit) {
          this.cliente.id = this.idCliente;
          this.clienteService.update(this.idCliente, this.cliente).subscribe(
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
                    this.router.navigate(['/clientes']);
                  } else {
                    this.router.navigate(['/clientes']);

                  }
                });
            },
            err => {
              console.log(err);
              Swal.fire('ERROR', err.error.mensaje, 'error');
            }
          );
        } else {
          this.clienteService.save(this.cliente).subscribe(
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
                    this.router.navigate(['/clientes']);
                  } else {
                    this.cliente = null;
                    this.router.navigate(['/createClientes/0']);
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
