import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import {TokenService} from '../../service/tokenService';
import {AuthService} from '../../service/authService';
import {Router} from '@angular/router';
import {GastosService} from '../../service/gastosService';
import {Gastos} from '../../models/gastos';
import {SumGastosDto} from '../../models/SumGastosDto';
import {Clienteservice} from '../../service/clienteservice';
import {SumRutas} from '../../models/sumRutas';
import {RutasService} from '../../service/rutasService';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FechaDto} from '../../models/fechaDto';
import Swal from "sweetalert2";
import {PagosService} from '../../service/pagosService';
import {EstadisticasCobradores} from '../../models/estadisticasCobradores';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  busquedaFrom: FormGroup;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  gastos: SumGastosDto[] = [];
  gastosMonth: SumGastosDto[] = [];
  dineroRutas: SumRutas[] = [];
  estadisticasCobros: EstadisticasCobradores[] = [];
  pendiente = 0;
  total = 0;
  numeroCliente = 0;
  fechas: FechaDto;
  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router, private gastosService: GastosService,
              private clienteService: Clienteservice,
              private movimientoService: PagosService,
              private rutasService: RutasService) {}
  ngOnInit() {
    this.cargarGastos();
    this.cargarGastosmonth();
    this.cargarRutasSum();
    this.cargarClientes();
    this.cargarForm();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    // tslint:disable-next-line:prefer-const
    let chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());
    // tslint:disable-next-line:prefer-const
    let chartSales = document.getElementById('chart-sales');
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
  }
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  cargarClientes(){
    this.clienteService.lista().subscribe(
      data => {
          this.numeroCliente = data.length;
      },
      err => {
        console.log(err);
      }
    );
  }
  onFindPagos() {
    // tslint:disable-next-line:max-line-length
    const fechas2: FechaDto = this.busquedaFrom.getRawValue();
    this.fechas = new FechaDto(0, this.parsePickerToDate(fechas2.from).toUTCString(),
      this.parsePickerToDate(fechas2.until).toUTCString());

    this.movimientoService.getEstadisticas(this.fechas).subscribe(
      data => {
        this.estadisticasCobros = data;
        this.cargarForm();
        Swal.fire('Exito', 'Datos Cargados con exito', 'success');
      }, error => {
        console.log(error);
        Swal.fire('ERROR', error.error.mensaje, 'error');
      }
    );
  }
  cargarRutasSum(): void {
    this.clienteService.listaRutas().subscribe(
      data => {
        data.forEach(obj => {
          this.rutasService.detail(obj[0]).subscribe(dataR => {
            this.dineroRutas.push(new SumRutas(dataR, obj[1], obj[2]));
            this.pendiente = obj[1] + this.pendiente;
            this.total = obj[2] + this.total;
          });
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarGastos(): void {
    this.gastosService.listaSumYear().subscribe(
      data => {
        data.forEach(obj => {
          this.gastos.push(new SumGastosDto(obj[0], obj[1], obj[2]));
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarGastosmonth(): void {
    this.gastosService.listaSumMonth().subscribe(
      data => {
        data.forEach(obj => {
          this.gastosMonth.push(new SumGastosDto(obj[0], obj[1], obj[2]));
        });
      },
      err => {
        console.log(err);
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
  parsePickerToDate(dateString: any) {
    return new Date(dateString.year, dateString.month - 1, dateString.day);
  }
}
