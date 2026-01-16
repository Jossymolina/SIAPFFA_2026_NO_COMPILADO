import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterOutlet } from '@angular/router';
// PrimeNG
// PrimeNG
import { Avatar, AvatarModule } from 'primeng/avatar';
 
import { DrawerModule } from 'primeng/drawer';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { VisualizarPerfilComponent } from '../../../Componentes/visualizar-perfil/visualizar-perfil.component';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ButtonModule } from 'primeng/button';
 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
}

interface MenuItem {
  label: string;
  icon: string;      // clase de PrimeIcons
  route?: string;
  image?: string;    // si luego quieres usar imagen en vez de icono
}
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-principal',
  standalone:true,
   imports: [
    CommonModule,
    RouterOutlet,
    Avatar,
    AvatarModule,
  ButtonModule,
    DrawerModule ,
    VisualizarPerfilComponent
     
 
  ],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css',
})
export class MenuPrincipalComponent implements OnInit {
  // Módulos centrales
 permisoPersonal=false

  // Opciones del menú hamburguesa
  menuVisible = false;

  menuItems: MenuItem[] = [
    {
      label: 'Mi perfil',
      icon: 'pi pi-user',
      route: '/perfil'
    },
    {
      label: 'Menu principal',
      icon: 'pi pi-bars',
      route: '/menu/menu-principal'
    },
    {
      label: 'Ayuda / Soporte',
      icon: 'pi pi-question-circle',
      route: '/ayuda'
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
       route: '/autenticarse'
    }
  ];

  constructor(private router: Router,
private _ServiciosMensajeService:ServiciosMensajeService,
public _ServicioBackendService:ServicioBackendService,
private location: Location

  ) {

  }
  usuariologuiado
  ngOnInit(): void {
        this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
     this.sacarPermisoPersonal()
  }
  volverAtras() {
    this.location.back();
  }
  openModule(m) {
    if (m.route) {
      if(m.route==='/autenticarse') return this.cerrarSesion(m.route)
      this.router.navigate([m.route]);
    }
  }
  sacarPermisoPersonal(){
   this.permisoPersonal =   this._ServicioBackendService.verificarPermisos(['User_admin','User_admin02','User_admin01'])
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
cerrarSesion(route){
  this._ServiciosMensajeService.show("Cerrando sesion 🕓🥴")
   localStorage.clear();
  setTimeout(( )=>{
    
     this._ServiciosMensajeService.hide()
     this.router.navigate([route]);
  },2000)

 
}
  openMenu() {
    this.menuVisible = true;
  }

  onSelectMenuItem(item: MenuItem) {
    this.menuVisible = false;
    if (item.route) {
      this.router.navigate([item.route]);
    }
    if (item.label === 'Cerrar sesión') {
     
    }
  }
}
