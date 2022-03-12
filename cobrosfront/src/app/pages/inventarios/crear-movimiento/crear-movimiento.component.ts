import { Component, OnInit } from '@angular/core';
import {Clientes} from '../../../models/clientes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Rutas} from '../../../models/rutas';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Clienteservice} from '../../../service/clienteservice';
import {RutasService} from '../../../service/rutasService';
import Swal from 'sweetalert2';
import {Inventario} from '../../../models/inventario';
import {InventarioService} from '../../../service/inventarioService';
import {ProductoService} from '../../../service/productoService';
import {VendedorService} from '../../../service/vendedorService';
import {Vendedor} from '../../../models/vendedor';
import {Producto} from '../../../models/producto';
import {SumGastosDto} from '../../../models/SumGastosDto';

@Component({
  selector: 'app-crear-movimiento',
  templateUrl: './crear-movimiento.component.html',
  styleUrls: ['./crear-movimiento.component.css']
})
export class CrearMovimientoComponent implements OnInit {

  idInventario: number;
  isEdit = false;
  movimiento: Inventario;
  movimientoFrom: FormGroup;
  clientes: Clientes[];
  cliente: Clientes;
  vendedores: Vendedor[];
  vendedor: Vendedor;
  productos: Producto[];
  producto: Producto;
  productoTotal: Producto;
  total: number = 0;
  select: string;
  rutas: Rutas[];
  onrun = false;
  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private movimientoService: InventarioService, private productoService: ProductoService,
              private vendedorService: VendedorService, private clienteservice: Clienteservice,
              private rutasService: RutasService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idInventario = param.idInventario;
      this.getVendedores();
      this.getProductos();
      this.getRutas();
      if (param.idInventario !== 0  && param.idInventario !== '' && param.idInventario !== '0') {
        console.log(param.idInventario);
        this.isEdit = true;
        this.idInventario = param.idInventario;
        this.getProduct(this.idInventario);
        this.getClientes();
      }
      this.cargarForm();
    });
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
  updateTotal() {
    this.findProductoTotal(this.movimientoFrom.controls['producto'].value);
    // tslint:disable-next-line:radix triple-equals
    if(this.movimientoFrom.controls['cantidadProducto'].value != '') {
      this.total = this.productoTotal.precio * parseInt(this.movimientoFrom.controls['cantidadProducto'].value);
      this.movimientoFrom.controls['totalPrecio'].setValue(this.total);
    }
  }
  cargarForm() {
    if (this.movimientoFrom) {
      if (this.isEdit){
        this.select = this.movimiento.cliente.rutas.id.toString();
      }
      this.movimientoFrom.setValue({
        producto: this.movimiento ? this.movimiento.producto.id : '',
        vendedor: this.movimiento ? this.movimiento.vendedor.id : '',
        fchEntrega: this.movimiento ? this.parseDateToPicker(this.movimiento.fchEntrega) : '',
        estado: this.movimiento ? this.movimiento.estado : '',
        cliente: this.movimiento ? this.movimiento.cliente.id : '',
        cantidadProducto: this.movimiento ? this.movimiento.cantidadProducto : '',
        totalPrecio: this.movimiento ? this.movimiento.totalPrecio : this.total,
      });
    } else {
      this.movimientoFrom = new FormGroup({
        producto: new FormControl( this.movimiento ? this.movimiento.producto.id : '', [Validators.required]),
        vendedor: new FormControl( this.movimiento ? this.movimiento.vendedor.id : '', [Validators.required]),
        fchEntrega: new FormControl(this.movimiento ? this.parseDateToPicker(this.movimiento.fchEntrega) : '', [Validators.required]),
        estado: new FormControl(this.movimiento ? this.movimiento.estado : '', [Validators.required]),
        cliente: new FormControl(this.movimiento ? {value: this.movimiento.cliente.id, disabled: true} : {value: '', disabled: false}, [Validators.required]),
        cantidadProducto: new FormControl(this.movimiento ? this.movimiento.cantidadProducto : '', [Validators.required]),
        // tslint:disable-next-line:max-line-length
        totalPrecio: new FormControl(this.movimiento ? {value: this.movimiento.totalPrecio, disabled: true } : {value: this.total, disabled: true}),
      });
    }
  }

  getVendedores() {
    this.vendedorService.lista().subscribe(
      data => {
        this.vendedores = data;
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
  findProducto(id: number) {
    this.productos.forEach(obj => {
      // tslint:disable-next-line:triple-equals
      if (obj.id == id) {
        this.producto = obj;
      }
    });
  }
  findCliente(id: number) {
    this.clientes.forEach(obj => {
      // tslint:disable-next-line:triple-equals
      if (obj.id == id) {
        this.cliente = obj;
      }
    });
  }
  findVendedor(id: number) {
    this.vendedores.forEach(obj => {
      // tslint:disable-next-line:triple-equals
      if (obj.id == id) {
        this.vendedor = obj;
      }
    });
  }
  onSave() {
    this.onrun = true;
    this.spinner.show('sp2');
    const cliente: Inventario = this.movimientoFrom.getRawValue();
    this.findProducto(this.movimientoFrom.controls['producto'].value);
    this.findVendedor(this.movimientoFrom.controls['vendedor'].value);
    this.findCliente(this.movimientoFrom.controls['cliente'].value)
        this.movimiento = new Inventario(this.producto,
          this.vendedor, this.parsePickerToDate(cliente.fchEntrega).toUTCString(), cliente.estado,
          this.cliente, '', cliente.cantidadProducto, cliente.totalPrecio);
        if (this.isEdit) {
          this.movimiento.id = this.idInventario;
          this.movimientoService.update(this.idInventario, this.movimiento).subscribe(
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
                    this.router.navigate(['/inventarios']);
                  } else {
                    this.onrun = false;
                    this.router.navigate(['/inventarios']);

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
          this.movimientoService.save(this.movimiento).subscribe(
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
                    this.onrun = false;
                    this.router.navigate(['/inventarios']);
                  } else {
                    this.onrun = false;
                    this.movimiento = null;
                    this.router.navigate(['/createInventarios/0']);
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
    return new Date(dateString.year, dateString.month - 1, dateString.day);
  }

}
