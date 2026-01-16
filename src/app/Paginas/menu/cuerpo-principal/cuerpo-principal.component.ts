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
}
import { ButtonModule } from 'primeng/button';

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
      route: '/menu/menu-busqueda'
    },
   {
      title: 'Reportes',
      description: 'Reportes diarios.',
      icon: 'pi pi-flag-fill',
      route: '/menu/menu-reportes'
    },
    {
      title: 'Registro',
      description: 'Registro de personal al sistema.',
      icon: 'pi pi-receipt',
      route: '/menu/menu-registro'
    },
    {
      title: 'Actualizaciones',
      description: 'Actualizacion, cambio de categoria y ascensos',
      icon: 'pi pi-chart-bar',
      route: '/menu/menu-actualizaciones'
    },
    {
      title: 'Configuración',
      description: 'Parámetros del sistema, roles y catálogos.',
      icon: 'pi pi-cog',
      route: '/menu/menu-confi-sistema'
    }
    ,
    {
      title: 'Conexion PLANFFAA',
      description: 'Aqui se muestran algunos servicios de PLANFFAA',
      icon: 'pi pi-link',
      route: '/menu/menu-conexion-planffaa'
    }
    ,
    {
      title: 'Movimientos',
      description: 'Aqui se registran los movimientos del personal',
      icon: 'pi pi-sitemap',
      route: '/menu/menu-programador'
    }
    ,
    {
      title: 'Modo Programador',
      description: 'Aqui el Ingeniero puede ver las herramientas de consulta por query',
      icon: 'pi pi-sitemap',
      route: '/menu/menu-programador'
    }
  ];
    constructor(private router: Router) {

  }
   openModule(m: ModuleCard) {
    if (m.route) {
      this.router.navigate([m.route]);
    }
  }


}
