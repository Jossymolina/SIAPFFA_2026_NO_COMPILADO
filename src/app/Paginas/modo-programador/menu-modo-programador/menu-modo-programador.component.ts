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
  selector: 'app-menu-modo-programador',
  standalone:true,
   imports: [CommonModule, Card],
  templateUrl: './menu-modo-programador.component.html',
  styleUrl: './menu-modo-programador.component.css',
})
export class MenuModoProgramadorComponent {
 // Módulos centrales
  modules: ModuleCard[] = [
    {
      title: 'Consultas SQL',
      description: 'Consulta sql',
      icon: 'pi pi-star-fill',
      route: '/menu/consultas-sql',
      code:['PRG_0001']
    } 
 
  ];
    constructor(private router: Router,private _ServicioBackendService:ServicioBackendService) {

  }
   openModule(m: ModuleCard) {
 
    if (m.route) {
      this.router.navigate([m.route]);
    }
  }
      sacarPermisoPersonalVista(permiso:string[]){
   return this._ServicioBackendService.verificarPermisos(permiso)
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}
