import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/inicio', title: 'Inicio', icon: 'dashboard', class: '' },
  { path: '/usuario', title: 'Usuarios', icon: 'manage_accounts', class: '' },
  { path: '/cliente', title: 'Cliente', icon: 'persons', class: '' },
  { path: '/proveedor', title: 'Proveedores', icon: 'business_center', class: '' },
  { path: '/orden', title: 'Orden Trabajo', icon: 'task', class: '' },
  { path: '/producto/productos', title: 'Inventario', icon: 'inventory_2', class: '' },
  { path: '/producto/cambioproveedor', title: 'Cambiar Producto', icon: 'published_with_changes', class: '' },
  { path: '/inventario', title: 'Historial', icon: 'storage', class: '' },
  { path: '/categoria', title: 'Categorias Producto', icon: 'category', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 500) {
      return false;
    }
    return true;
  };

}
