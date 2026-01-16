import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// PrimeNG
// PrimeNG
 
import { Card } from 'primeng/card';
 
 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
}
@Component({
  selector: 'app-menu-busquedas',
  standalone:true,
  imports: [CommonModule, Card],
  templateUrl: './menu-busquedas.component.html',
  styleUrl: './menu-busquedas.component.css',
})
export class MenuBusquedasComponent {
  // Módulos centrales
  modules: ModuleCard[] = [
    {
      title: 'Busquedas Global',
      description: 'Busquedas de perfiles a nivel global',
      icon: 'pi pi-search',
      route: '/menu/busqueda-global'
    },
    {
      title: 'Buequeda DNI/Nombre',
      description: 'Busqueda solo por DNI o Nombre.',
      icon: 'pi pi-search-minus',
      route: '/menu/busqueda-dni-nombre'
    },
    {
      title: 'Busqueda Personalizada',
      description: 'La mejor busqueda Combinada',
      icon: 'pi pi-search-plus',
      route: '/menu/busqueda-personalizada'
    },
 
  ];
    constructor(private router: Router) {

  }
   openModule(m: ModuleCard) {
    console.log(m.route)
    if (m.route) {
      this.router.navigate([m.route]);
    }
  }
}
