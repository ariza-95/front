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
import {PagosService} from '../../../service/pagosService';
import {PagosClientes} from '../../../models/pagosClientes';

@Component({
  selector: 'app-pagos-cobradores',
  templateUrl: './pagos-cobradores.component.html',
  styleUrls: ['./pagos-cobradores.component.css']
})
export class PagosCobradoresComponent implements OnInit {

  idVendedor: number;
  isEdit = false;
  isCobrador = true;
  movimiento: PagosClientes;
  pagos: Pagos;
  movimientoFrom: FormGroup;
  busquedaFrom: FormGroup;
  clientes: Clientes[];
  cliente: Clientes;
  vendedores: Vendedor[];
  vendedor: Cobradores;
  productos: Producto[];
  producto: Producto;
  productoTotal: Producto;
  total: number = 0;
  select: string;
  rutas: Rutas[];
  onrun = false;
  from: string;
  untill: string;
  aPagar = 0;
  aPagarSd: number;
  fechas: FechaDto;
  saldoAnterior: number;
  constructor(private router: Router, private cobradorService: CobradorService, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private movimientoService: PagosService, private productoService: ProductoService,
              private vendedorService: VendedorService, private clienteservice: Clienteservice,
              private rutasService: RutasService, private gastosService: GastosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idVendedor = param.idVendedor;
      if (param.idVendedor !== 0  && param.idVendedor !== '' && param.idVendedor !== '0') {
        console.log(param.idVendedor);
        this.isEdit = true;
        this.idVendedor = param.idVendedor;
        this.getVendedores(this.idVendedor);
        this.getClientes();
      }
      this.cargarForm();
    });
  }
  onFindPagos() {
    // tslint:disable-next-line:max-line-length
    const fechas2: FechaDto = this.busquedaFrom.getRawValue();
    console.log(fechas2.until);
    this.fechas = new FechaDto(this.vendedor.id, this.parsePickerToDate(fechas2.from).toUTCString(),
      this.parsePickerToDate(fechas2.until).toUTCString());

    this.movimientoService.getPagos(this.fechas).subscribe(
      data => {
        this.pagos = data;
        this.cargarForm();
        this.saldoAnterior = this.pagos.saldo;
        this.aPagarSd = this.pagos.totalPagar + this.pagos.saldo;
        Swal.fire('Exito', 'Datos Cargados con exito', 'success');
      }, error => {
        console.log(error);
        Swal.fire('ERROR', error.error.mensaje, 'error');
      }
    );
  }
  onBuscarSelect() {
    if (this.select === '') {
      this.clientes = [];
    } else {
      this.clienteservice.findByRuta(this.select).subscribe(
        data => {
          this.clientes = data;
        },
        err => {
          console.log(err);
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
  findProductoTotal(id: number) {
    this.productos.forEach(obj => {
      // tslint:disable-next-line:triple-equals
      if (obj.id == id) {
        this.productoTotal = obj;
      }
    });
  }
  cargarForm() {
    if (this.busquedaFrom) {
      this.busquedaFrom.setValue({
        from: '',
        until:  '',
      });
    } else {
      this.busquedaFrom = new FormGroup({
        // tslint:disable-next-line:max-line-length
        from: new FormControl('', [Validators.required]),
        // tslint:disable-next-line:max-line-length
        until: new FormControl('', [Validators.required]),
      });
    }
    if (this.movimientoFrom) {
      this.movimientoFrom.setValue({
        semana: this.pagos ? this.pagos.semana : '',
        totalPagar: this.pagos ? this.pagos.totalPagar : '',
        devolucion: this.pagos ? this.pagos.devolucion : '',
        totalDeducir: this.pagos ? this.pagos.totalDeducir : '',
        abono: this.pagos ? this.pagos.abono : 0,
        otrasDeducir: this.pagos ? this.pagos.otrasDeducir : 0,
        totalPrecio: this.pagos ? this.pagos.totalPrecio : 0,
      });
    } else {
      this.movimientoFrom = new FormGroup({
        // tslint:disable-next-line:max-line-length
        semana: new FormControl( this.pagos ? {value: this.pagos.semana, disabled: true} : {value: '', disabled: true}, [Validators.required]),
        // tslint:disable-next-line:max-line-length
        totalPagar: new FormControl( this.pagos ? {value: this.pagos.totalPagar, disabled: true} : {value: '', disabled: true}, [Validators.required]),
        // tslint:disable-next-line:max-line-length
        devolucion: new FormControl(this.pagos ? {value: this.pagos.devolucion, disabled: true} : {value: '', disabled: true}, [Validators.required]),
        // tslint:disable-next-line:max-line-length
        totalDeducir: new FormControl(this.pagos ? {value: this.pagos.totalDeducir, disabled: true} : {value: '', disabled: true}, [Validators.required]),
        abono: new FormControl(this.pagos ? this.pagos.abono : '', [Validators.required]),
        otrasDeducir: new FormControl(this.pagos ? this.pagos.otrasDeducir : '', [Validators.required]),
        // tslint:disable-next-line:max-line-length
        totalPrecio: new FormControl(this.pagos ? {value: this.pagos.totalPrecio, disabled: true } : {value: this.total, disabled: true}),
      });
    }
  }

  getVendedores(id: number) {
    this.cobradorService.detail(id).subscribe(
      data => {
        this.vendedor = data;
      },
      error => {
        console.log(error);
      }
    );
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

  getProductos() {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
        this.cargarForm();
      },
      err => {
        console.log(err);
      }
    );
  }
  getProduct(id: number) {
    this.movimientoService.detail(id).subscribe(
      data => {
        this.movimiento = data;
        this.cargarForm();
      },
      err => {
        console.log(err);
      }
    );
  }
  onSaveDeduccion() {
    this.onrun = true;
    this.spinner.show('sp2');
    const pagos: Pagos = this.movimientoFrom.getRawValue();
    const registrar: RegistrarPagos = new RegistrarPagos(this.fechas, pagos);
    if (this.isEdit) {
      this.movimientoService.savePagosSinDeducion(registrar).subscribe(
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
                this.router.navigate(['/pagos']);
              } else {
                this.onrun = false;
                this.router.navigate(['/pagos']);

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
    return new Date(dateString.year, dateString.month - 1, dateString.day);
  }

}
