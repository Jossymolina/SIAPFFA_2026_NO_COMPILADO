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
      route: '/menu/actualizar-ascensos'
    },
    {
      title: 'Cambio categoria',
      description: 'Aqui puedes cambiar la categoria de un perfil',
      icon: 'pi pi-briefcase',
      route: '/menu/cambio-categoria'
    },
     {
      title: 'Modificar Perfil',
      description: 'Aqui puedes modificar un perfil completo sin restricciones',
      icon: 'pi pi-reddit',
      route: '/menu/modificar-perfil'
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

