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
      route: '/menu/registras-personal'
    },
    {
      title: 'Registar Bajas',
      description: 'Aqui se aplican las bajas del personal de FFAA',
      icon: 'pi pi-chart-bar',
      route: '/menu/registras-bajas'
    } 
 
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

