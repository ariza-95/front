import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CreateProductComponent} from '../../pages/tables/create-product/create-product.component';
import {RutasComponent} from '../../pages/rutas/rutas.component';
import {CreateGastosComponent} from '../../pages/gastos/create-gastos/create-gastos.component';
import {CreateRutasComponent} from '../../pages/rutas/create-rutas/create-rutas.component';
import {CreateClientesComponent} from '../../pages/clientes/create-clientes/create-clientes.component';
import {GastosComponent} from '../../pages/gastos/gastos.component';
import {ClientesComponent} from '../../pages/clientes/clientes.component';
import {VendedoresComponent} from '../../pages/vendedores/vendedores.component';
import {CrearVendedoresComponent} from '../../pages/vendedores/crear-vendedores/crear-vendedores.component';
import {CobradoresComponent} from '../../pages/cobradores/cobradores.component';
import {CrearCobradorComponent} from '../../pages/cobradores/crear-cobrador/crear-cobrador.component';
import {InventariosComponent} from '../../pages/inventarios/inventarios.component';
import {CrearMovimientoComponent} from '../../pages/inventarios/crear-movimiento/crear-movimiento.component';
import {PagosVendedoresComponent} from '../../pages/pagos-vendedores/pagos-vendedores.component';
import {RegistrarPagosVendedorComponent} from '../../pages/pagos-vendedores/registrar-pagos-vendedor/registrar-pagos-vendedor.component';
import {CobroDiarioComponent} from '../../pages/cobro-diario/cobro-diario.component';
import {PagosClienteComponent} from '../../pages/cobro-diario/pagos-cliente/pagos-cliente.component';
import {PagosCobradoresComponent} from '../../pages/pagos-vendedores/pagos-cobradores/pagos-cobradores.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CreateProductComponent,
    RutasComponent,
    CreateGastosComponent,
    CreateRutasComponent,
    CreateClientesComponent,
    GastosComponent,
    ClientesComponent,
    VendedoresComponent,
    CrearVendedoresComponent,
    CobradoresComponent,
    CrearCobradorComponent,
    InventariosComponent,
    CrearMovimientoComponent,
    PagosVendedoresComponent,
    RegistrarPagosVendedorComponent,
    CobroDiarioComponent,
    PagosClienteComponent,
    PagosCobradoresComponent
  ]
})

export class AdminLayoutModule {}
