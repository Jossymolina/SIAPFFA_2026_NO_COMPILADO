import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 
import { Card } from 'primeng/card';
 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
}
@Component({
  selector: 'app-menu-confi-sistema',
  standalone:true,
  imports: [CommonModule, Card],
  templateUrl: './menu-confi-sistema.component.html',
  styleUrl: './menu-confi-sistema.component.css',
})
export class MenuConfiSistemaComponent {

  // Módulos centrales
  modules: ModuleCard[] = [
    {
      title: 'Craer Cupos de Ingreso',
      description: 'Modulo para crear cupos de ingreso al sistema',
      icon: 'pi pi-plus-circle',
      route: '/menu/crear-cupos-ingreso'
    },
    {
      title: 'Crear cupo de Ascenso',
      description: 'Aqui puedes crear cupos de ascenso para el personal',
      icon: 'pi pi-briefcase',
      route: '/menu/crear-cupos-ascensos'
    }
    ,
     {
      title: 'Crear Puestos',
      description: 'Aqui puedes crear puestos para el personal',
      icon: 'pi pi-building-columns',
      route: '/menu/crear-puestos'
    }  
    ,
     {
      title: 'Control usuario',
      description: 'Aqui puedes controlar los usuarios del sistema',
      icon: 'pi pi-reddit',
      route: '/menu/control-usuario'
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

