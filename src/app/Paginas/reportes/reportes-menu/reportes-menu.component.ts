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
  selector: 'app-reportes-menu',
   standalone:true,
  imports: [CommonModule, Card],
  templateUrl: './reportes-menu.component.html',
  styleUrl: './reportes-menu.component.css',
})

export class ReportesMenuComponent {
  // Módulos centrales
  modules: ModuleCard[] = [
    {
      title: 'Reporte  del EMC',
      description: 'Repsorte diario del EMC',
      icon: 'pi pi-search',
      route: '/menu/menu-repo-emc',
      code:['Re_0001']
    } ,
    {
      title: 'Reporte  de Fuerzas',
      description: 'Repsorte diario de una Fuerza',
      icon: 'pi pi-search',
      route: '/menu/menu-repo-fuerza',
      code:['Re_0003']

    } ,
    {
      title: 'Reporte de Unidad',
      description: 'Reposte personalizado por unidad.',
      icon: 'pi pi-search-plus',
      route: '/menu/menu-repo-unidad',
      code:['Re_0002']

    },
    {
      title: 'Reporte de Historial',
      description: 'Reposte personalizado por unidad.',
      icon: 'pi pi-face-smile',
      route: '/menu/menu-repo-historial',
      code:['Re_0004']

    } 
 
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
