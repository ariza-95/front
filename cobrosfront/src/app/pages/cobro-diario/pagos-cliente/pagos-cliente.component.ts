import { Component, OnInit } from '@angular/core';
import {Inventario} from '../../../models/inventario';
import {Pagos} from '../../../models/pagos';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Clientes} from '../../../models/clientes';
import {Vendedor} from '../../../models/vendedor';
import {Producto} from '../../../models/producto';
import {Rutas} from '../../../models/rutas';
import {FechaDto} from '../../../models/fechaDto';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {InventarioService} from '../../../service/inventarioService';
import {ProductoService} from '../../../service/productoService';
import {VendedorService} from '../../../service/vendedorService';
import {Clienteservice} from '../../../service/clienteservice';
import {RutasService} from '../../../service/rutasService';
import {GastosService} from '../../../service/gastosService';
import Swal from "sweetalert2";
import {RegistrarPagos} from '../../../models/registrarPagos';
import {Cobradores} from '../../../models/cobradores';
import {CobradorService} from '../../../service/cobradorService';
import {PagosClientes} from '../../../models/pagosClientes';
import { DatePipe } from '@angular/common';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {PagosService} from '../../../service/pagosService';
@Component({
  selector: 'app-pagos-cliente',
  templateUrl: './pagos-cliente.component.html',
  styleUrls: ['./pagos-cliente.component.css']
})
export class PagosClienteComponent implements OnInit {

  idCobro: number;
  isEdit = false;
  movimiento: Inventario;
  pagos: Pagos;
  movimientoFrom: FormGroup;
  busquedaFrom: FormGroup;
  clientes: Clientes[];
  cliente: Clientes;
  vendedores: Cobradores[];
  vendedor: Cobradores;
  productos: Producto[];
  producto: Producto;
  productoTotal: Producto;
  from: NgbDate;
  until: string;
  total: number = 0;
  select: string;
  rutas: Rutas[];
  onrun = false;
  fechas: FechaDto;
  pagosCliente: PagosClientes;
  pagosList: PagosClientes[];
  pagosEdit: PagosClientes;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private calendar: NgbCalendar, private datePipe: DatePipe, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private movimientoService: InventarioService, private productoService: ProductoService,
              private vendedorService: VendedorService, private clienteservice: Clienteservice,
              // tslint:disable-next-line:max-line-length
              private rutasService: RutasService, private pagosService: PagosService, private gastosService: GastosService, private cobradoresService: CobradorService) {

  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.getVendedoresList();
      this.getClientes();
      this.idCobro = param.idCobro;
      if (param.idCobro !== 0  && param.idCobro !== '' && param.idCobro !== '0') {
        this.isEdit = true;
      } else {
        this.from = this.calendar.getToday();
      }
      this.cargarForm();
    });
  }
  cargarPagos(id: number) {
    this.pagosService.lista().subscribe(
      data => {
        this.pagosList = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  cargarForm() {
    if (this.isEdit) {
      this.pagosService.detail(this.idCobro).subscribe(
        data => {
          this.until = data.cobrador.id.toString();
          this.pagosEdit = data;
          this.movimientoFrom.setValue({
            valor: this.pagosEdit ? this.pagosEdit.valor : '',
            cliente: this.pagosEdit ? this.pagosEdit.cliente.codigo : '',
          });
          this.from = new NgbDate(this.parseDateToPicker(data.fchPago).year,
            this.parseDateToPicker(data.fchPago).month,
            this.parseDateToPicker(data.fchPago).day - 1);
        },
        error => {
          console.log(error);
        }
      );
    }
    if (this.movimientoFrom) {
      this.movimientoFrom.setValue({
        valor: this.pagosEdit ? this.pagosEdit.valor : '',
        cliente: this.pagosEdit ? this.pagosEdit.cliente.codigo : '',
      });
    } else {
      this.movimientoFrom = new FormGroup({
        // tslint:disable-next-line:max-line-length
        valor: new FormControl(   this.pagosEdit ? this.pagosEdit.valor : '', [Validators.required]),
        // tslint:disable-next-line:max-line-length
        cliente: new FormControl( this.pagosEdit ? this.pagosEdit.cliente.codigo : '', [Validators.required]),
    });
    }
  }
  getClientes() {
    this.clienteservice.lista().subscribe(
      data => {
        this.clientes = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  getCliente() {
    this.clienteservice.lista().subscribe(
      data => {
        this.clientes = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  findCliente(id: string) {
    this.clientes.forEach(obj => {
      // tslint:disable-next-line:triple-equals
      if (obj.codigo == id) {
        this.cliente = obj;
      }
    });
  }
  findVendedor(id: string) {
    this.vendedores.forEach(obj => {
      // tslint:disable-next-line:triple-equals
      if (obj.id == parseInt(id, 10)) {
        this.vendedor = obj;
      }
    });
  }
  getVendedoresList() {
    this.cobradoresService.lista().subscribe(
      data => {
        this.vendedores = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  onEdit() {
    this.parsePickerToDate(this.from).toUTCString();
  }
  onSave() {
    this.onrun = true;
    this.spinner.show('sp2');
    const pagos: PagosClientes = this.movimientoFrom.getRawValue();
    this.vendedores.forEach(obj => {
      // tslint:disable-next-line:triple-equals
      if (obj.id == parseInt(this.until, 10)) {
        this.vendedor = obj;
      }
    });
    this.findCliente(this.movimientoFrom.controls['cliente'].value)
    this.pagosCliente = new PagosClientes(pagos.valor, this.parsePickerToDate(this.from).toUTCString(), this.vendedor, '1', this.cliente);
    if (this.isEdit) {
      this.pagosCliente.id = this.idCobro;
      this.pagosService.update(this.idCobro, this.pagosCliente).subscribe(
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
                this.onrun = false;
                this.router.navigate(['/cobros']);
              } else {
                this.onrun = false;
                this.router.navigate(['/cobros']);

              }
            });
        },
        err => {
          this.onrun = false;
          console.log(err);
          Swal.fire('ERROR', err.error.mensaje, 'error');
        }
      );
    } else {
      this.pagosService.save(this.pagosCliente).subscribe(
        data => {
          this.spinner.hide('sp2');
          Swal.fire({
            title: 'Guardado con exito',
            text: 'Deseas Guardar Otro Pago',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'No Guardar Más',
          }).then(
            (result) => {
              if (result.dismiss) {
                this.onrun = false;
                this.router.navigate(['/cobros']);
              } else {
                this.onrun = false;
                this.movimiento = null;
                this.router.navigate(['/cobrosRegistrar/0']);
                this.movimientoFrom.reset();
                this.cargarForm();
                this.ngOnInit();
              }
            });
        },
        err => {
          this.onrun = false;
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
  parsePickerToDate(dateString: any) {
    return new Date(dateString.year, dateString.month - 1, dateString.day + 1);
  }

}
