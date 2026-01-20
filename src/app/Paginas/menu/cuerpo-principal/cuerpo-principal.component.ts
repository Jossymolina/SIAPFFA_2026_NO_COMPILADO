import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// PrimeNG
// PrimeNG
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';

 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
  code:string[]
}
import { ButtonModule } from 'primeng/button';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';

@Component({
  selector: 'app-cuerpo-principal',
  standalone:true,
   imports: [
    CommonModule,
    Card,
    DrawerModule,
    ButtonModule   // 👈 aquí
  ],
  templateUrl: './cuerpo-principal.component.html',
  styleUrl: './cuerpo-principal.component.css',
})
export class CuerpoPrincipalComponent {
  // Módulos centrales
  modules: ModuleCard[] = [
    {
      title: 'Busquedas',
      description: 'Busquedas de perfiles.',
      icon: 'pi pi-search',
      route: '/menu/menu-busqueda',
       code:['B_0001','B_0002','B_0003']
    },
   {
      title: 'Reportes',
      description: 'Reportes diarios.',
      icon: 'pi pi-flag-fill',
      route: '/menu/menu-reportes',
      code:['Re_0002','Re_0003','Re_0001']

    },
    {
      title: 'Registro',
      description: 'Registro de personal al sistema.',
      icon: 'pi pi-receipt',
      route: '/menu/menu-registro',
   code:['R_0001','R_0002']

    },
    {
      title: 'Actualizaciones',
      description: 'Actualizacion, cambio de categoria y ascensos',
      icon: 'pi pi-chart-bar',
      route: '/menu/menu-actualizaciones',
       code:['A_0001','A_0002','A_0003']

    },
    {
      title: 'Configuración',
      description: 'Parámetros del sistema, roles y catálogos.',
      icon: 'pi pi-cog',
      route: '/menu/menu-confi-sistema',
       code:['C_0001','C_0002','C_0003','C_0004','C_0005']

    }
    ,
    {
      title: 'Conexion PLANFFAA',
      description: 'Aqui se muestran algunos servicios de PLANFFAA',
      icon: 'pi pi-link',
      route: '/menu/menu-conexion-planffaa',
       code:["P_0001","P_0002","P_0003","P_0004","P_0005"]

    }
    ,
    {
      title: 'Movimientos',
      description: 'Aqui se registran los movimientos del personal',
      icon: 'pi pi-sitemap',
      route: '/menu/menu-programador',
       code:['M_0001','M_0002']

    }
    ,
    {
      title: 'Modo Programador',
      description: 'Aqui el Ingeniero puede ver las herramientas de consulta por query',
      icon: 'pi pi-sitemap',
      route: '/menu/menu-programador',
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
