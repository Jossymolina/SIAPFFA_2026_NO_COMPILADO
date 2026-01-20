import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// PrimeNG
// PrimeNG
 
import { Card } from 'primeng/card';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
 
 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
  code:string[]
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
      route: '/menu/busqueda-global',
      code:['B_0001']
    },
    {
      title: 'Buequeda DNI/Nombre',
      description: 'Busqueda solo por DNI o Nombre.',
      icon: 'pi pi-search-minus',
      route: '/menu/busqueda-dni-nombre',
      code:['B_0002']

    },
    {
      title: 'Busqueda Personalizada',
      description: 'La mejor busqueda Combinada',
      icon: 'pi pi-search-plus',
      route: '/menu/busqueda-personalizada',
      code:['B_0003']

    },
 
  ];
    constructor(private router: Router,private _ServicioBackendService:ServicioBackendService) {

  }
   openModule(m: ModuleCard) {
    console.log(m.route)
    if (m.route) {
      this.router.navigate([m.route]);
    }
  }
    sacarPermisoPersonalVista(permiso:string[]){
   return this._ServicioBackendService.verificarPermisos(permiso)
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}
