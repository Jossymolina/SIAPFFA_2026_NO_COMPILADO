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
      route: '/menu/lista-personal-pagos-cargo'
    },
    {
      title: 'Acuerdo de pago por cargo',
      description: 'Aqui puedes ver los cargos que tienen pagos asignados',
      icon: 'pi pi-box',
      route: '/menu/lista-cargos-con-pago'
    },
    {
      title: 'Solicitud constancia',
      description: 'Aqui puedes solicitar constancias',
      icon: 'pi pi-tablet',
      route: '/menu/solicitud-constancias-planffaa'
    },
    {
      title: 'Detalle del Pago',
      description: 'Aqui puedes ver el detalle de los pagos del personal',
      icon: 'pi pi-dollar',
      route: '/menu/solicitud-constancias-planffaa'
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
