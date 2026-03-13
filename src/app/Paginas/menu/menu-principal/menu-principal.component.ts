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

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
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
import { FormsModule, NgForm } from '@angular/forms';

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
    VisualizarPerfilComponent,
    DialogModule,
    TableModule,FormsModule
     
 
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
      label: 'Agenda Administrativa',
      icon: 'pi pi-address-book',
      route: '/agenda'
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
      if(m.route==='/agenda') return this.abrirAgenda()

      this.router.navigate([m.route]);
    }
  }
  sacarPermisoPersonal(){
   this.permisoPersonal =   this._ServicioBackendService.verificarPermisos(['User_admin','User_admin02','User_admin01','User_admin03'])
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
   visible: boolean = false;

  contactos = [
    { nombre: 'Juan Pérez', telefono: '9999-9999', empresa: 'Empresa A' },
    { nombre: 'María López', telefono: '8888-8888', empresa: 'Empresa B' },
    { nombre: 'Carlos Gómez', telefono: '7777-7777', empresa: 'Empresa C' }
  ];

  abrirAgenda() {
    this.visible = true;
    this.sacarFuerzas()
  }
  arreegloUnidad = []
sacarUnidad(fuerza){
  this.arreegloUnidad = []
this._ServiciosMensajeService.show("Cargando unidades 🕓")
 var parametro={
     idfuerza:fuerza.value.fuerza.idfuerza
   }
  this._ServicioBackendService.sacarunidad(parametro).subscribe(
  {
    next: (data) => {
           this._ServiciosMensajeService.hide()
          if(data.error) return this._ServiciosMensajeService.mensajeMalo(data.error)
            if(data.mensaje) return  this._ServiciosMensajeService.mensajeMalo(data.mensaje)
              this.arreegloUnidad= data.resultado
    },error: (err) => {
          this._ServiciosMensajeService.hide()
this._ServiciosMensajeService.mensajeerrorServer()
    }
  }
  );
}
arregloFuerzas = []
sacarFuerzas(){
  this.arregloFuerzas = []
this._ServiciosMensajeService.show("Cargando fuerzas 🕓")
  this._ServicioBackendService.sacarFuerza().subscribe(
  {
    next: (data) => {
      this._ServiciosMensajeService.hide()
          if(data.error) return this._ServiciosMensajeService.mensajeMalo(data.error)
            if(data.mensaje) return  this._ServiciosMensajeService.mensajeMalo(data.mensaje)
              this.arregloFuerzas= data.resultado
    },error: (err) => {
          this._ServiciosMensajeService.hide()
this._ServiciosMensajeService.mensajeerrorServer()
    }
  }
  );
}

arregloAgenda = []
buscarNumero(data:NgForm){

  this._ServiciosMensajeService.show("Buscando numero 🕓")
  this.arregloAgenda= new Array();
 this._ServicioBackendService.sacarTelefonodeAdministradoresdeFuuerza(data.value.unidad).subscribe(
{
      next: (response) => {
      this._ServiciosMensajeService.hide()

   if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error)
   if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje)
   this.arregloAgenda= response.resultado
      },error: (err) => {

      }
}
 )
}
}

