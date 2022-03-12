import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {CreateProductComponent} from '../../pages/tables/create-product/create-product.component';
import {RutasComponent} from '../../pages/rutas/rutas.component';
import {CreateRutasComponent} from '../../pages/rutas/create-rutas/create-rutas.component';
import {ClientesComponent} from '../../pages/clientes/clientes.component';
import {CreateClientesComponent} from '../../pages/clientes/create-clientes/create-clientes.component';
import {GastosComponent} from '../../pages/gastos/gastos.component';
import {CreateGastosComponent} from '../../pages/gastos/create-gastos/create-gastos.component';
import {CrearVendedoresComponent} from '../../pages/vendedores/crear-vendedores/crear-vendedores.component';
import {VendedoresComponent} from '../../pages/vendedores/vendedores.component';
import {CobradoresComponent} from '../../pages/cobradores/cobradores.component';
import {CrearCobradorComponent} from '../../pages/cobradores/crear-cobrador/crear-cobrador.component';
import {InventariosComponent} from '../../pages/inventarios/inventarios.component';
import {CrearMovimientoComponent} from '../../pages/inventarios/crear-movimiento/crear-movimiento.component';
import {PagosVendedoresComponent} from '../../pages/pagos-vendedores/pagos-vendedores.component';
import {RegistrarPagosVendedorComponent} from '../../pages/pagos-vendedores/registrar-pagos-vendedor/registrar-pagos-vendedor.component';
import {CobroDiarioComponent} from '../../pages/cobro-diario/cobro-diario.component';
import {PagosClienteComponent} from '../../pages/cobro-diario/pagos-cliente/pagos-cliente.component';
import {PagosCobradoresComponent} from '../../pages/pagos-vendedores/pagos-cobradores/pagos-cobradores.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'createProduct/:idProduct',  component: CreateProductComponent },
    { path: 'rutas',         component: RutasComponent },
    { path: 'createRutas/:idRuta',  component: CreateRutasComponent },
    { path: 'clientes',         component: ClientesComponent },
    { path: 'createClientes/:idCliente',  component: CreateClientesComponent },
    { path: 'gastos',         component: GastosComponent },
    { path: 'createGastos/:idGasto',  component: CreateGastosComponent },
    { path: 'vendedores',         component: VendedoresComponent },
    { path: 'createVendedores/:idVendedor',  component: CrearVendedoresComponent },
    { path: 'cobradores',         component: CobradoresComponent },
    { path: 'createCobrador/:idCobrador',  component: CrearCobradorComponent },
    { path: 'inventarios',         component: InventariosComponent },
    { path: 'createInventarios/:idInventario',  component: CrearMovimientoComponent },
    { path: 'pagos',         component: PagosVendedoresComponent },
    { path: 'pagosVendedores/:idVendedor',         component: RegistrarPagosVendedorComponent },
    { path: 'pagosCobradores/:idVendedor',         component: PagosCobradoresComponent},
    { path: 'cobros/:idCobro',         component: CobroDiarioComponent },
    { path: 'cobrosRegistrar/:idCobro',         component: PagosClienteComponent }
];
