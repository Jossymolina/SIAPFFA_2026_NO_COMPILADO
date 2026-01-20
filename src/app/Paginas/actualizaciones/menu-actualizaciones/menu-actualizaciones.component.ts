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
  selector: 'app-menu-actualizaciones',
  standalone:true,
  imports: [CommonModule, Card],
  templateUrl: './menu-actualizaciones.component.html',
  styleUrl: './menu-actualizaciones.component.css',
})
export class MenuActualizacionesComponent {
 
  // Módulos centrales 
  modules: ModuleCard[] = [
    {
      title: 'Ascensos',
      description: 'Modulo de ascensos/cambios de grado del personal de FFAA',
      icon: 'pi pi-graduation-cap',
      route: '/menu/actualizar-ascensos',
      code:['A_0001']
    },
    {
      title: 'Cambio categoria',
      description: 'Aqui puedes cambiar la categoria de un perfil',
      icon: 'pi pi-briefcase',
      route: '/menu/cambio-categoria',
      code:['A_0002']
    },
     {
      title: 'Modificar Perfil',
      description: 'Aqui puedes modificar un perfil completo sin restricciones',
      icon: 'pi pi-reddit',
      route: '/menu/modificar-perfil',
      code:['A_0003']
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
  //ServicioBackendService
     sacarPermisoPersonalVista(permiso:string[]){
   return this._ServicioBackendService.verificarPermisos(permiso)
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}

