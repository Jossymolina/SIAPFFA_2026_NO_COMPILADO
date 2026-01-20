import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 
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
  selector: 'app-menu-registros',
  standalone:true,
  imports: [CommonModule, Card],
  templateUrl: './menu-registros.component.html',
  styleUrl: './menu-registros.component.css',
})
export class MenuRegistrosComponent {

  // Módulos centrales
  modules: ModuleCard[] = [
    {
      title: 'Registrar nueva personal',
      description: 'Modulo para registrar personal nuevo en FFAA',
      icon: 'pi pi-user-plus',
      route: '/menu/registras-personal',
      code:['R_0001']
    },
    {
      title: 'Registar Bajas',
      description: 'Aqui se aplican las bajas del personal de FFAA',
      icon: 'pi pi-chart-bar',
      route: '/menu/registras-bajas',
      code:['R_0002']

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

