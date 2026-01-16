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
      route: '/menu/consultas-sql'
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
