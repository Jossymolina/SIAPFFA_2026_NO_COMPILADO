import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// PrimeNG
// PrimeNG
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';

 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
  code:string[]
}
@Component({
  selector: 'app-menu-conexion-planffaa',
  standalone:true,
  imports: [CommonModule, Card],
  templateUrl: './menu-conexion-planffaa.component.html',
  styleUrl: './menu-conexion-planffaa.component.css',
})
export class MenuConexionPlanffaaComponent {
 // Módulos centrales
  modules: ModuleCard[] = [
    {
      title: 'Lista de Personal con Pagos x Cargo',
      description: 'Aqui puedes ver el personal que recibe pagos por cargo',
      icon: 'pi pi-dollar',
      route: '/menu/lista-personal-pagos-cargo',
      code :['P_0001']
    },
    {
      title: 'Acuerdo de pago por cargo',
      description: 'Aqui puedes ver los cargos que tienen pagos asignados',
      icon: 'pi pi-box',
      route: '/menu/lista-cargos-con-pago',
      code :['P_0002']

    },
    {
      title: 'Solicitud constancia',
      description: 'Aqui puedes solicitar constancias',
      icon: 'pi pi-tablet',
      route: '/menu/solicitud-constancias-planffaa',
      code :['P_0003']

    },
    {
      title: 'Detalle del Pago',
      description: 'Aqui puedes ver el detalle de los pagos del personal',
      icon: 'pi pi-dollar',
      route: '/menu/menu-planillas-planffaa',
      code :['P_0005']

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
  //"P_0001","P_0002","P_0003","P_0004","P_0005"
   sacarPermisoPersonalVista(permiso:string[]){
   return this._ServicioBackendService.verificarPermisos(permiso)
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}
