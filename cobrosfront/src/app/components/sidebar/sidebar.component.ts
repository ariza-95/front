import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TokenService} from '../../service/tokenService';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/tables', title: 'Productos',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/rutas', title: 'Rutas',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/clientes', title: 'Clientes',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/gastos', title: 'Gastos',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/vendedores', title: 'Vendedores',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/cobradores', title: 'Cobradores',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/inventarios', title: 'Movimientos Productos',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/pagos', title: 'Pagos Empleados',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/cobros/0', title: 'Cobros Diarios' ,  icon:'ni-bullet-list-67 text-red', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  onLogout() {
    this.tokenService.logout();
    this.router.navigate(['login']);
  }
}
