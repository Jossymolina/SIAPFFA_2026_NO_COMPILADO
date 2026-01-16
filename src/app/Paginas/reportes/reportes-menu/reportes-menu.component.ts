import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// PrimeNG
// PrimeNG
 
import { Card } from 'primeng/card';
 
 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
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
      title: 'Reporte  del EMc',
      description: 'Repsorte diario del EMC',
      icon: 'pi pi-search',
      route: '/menu/menu-repo-emc'
    } ,
    {
      title: 'Reporte  de Fuerzas',
      description: 'Repsorte diario de una Fuerza',
      icon: 'pi pi-search',
      route: '/menu/menu-repo-fuerza'
    } ,
    {
      title: 'Reporte de Unidad',
      description: 'Reposte personalizado por unidad.',
      icon: 'pi pi-search-plus',
      route: '/menu/menu-repo-unidad'
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
