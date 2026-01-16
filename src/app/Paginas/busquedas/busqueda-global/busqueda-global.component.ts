import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

 
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
 
 


@Component({
  selector: 'app-busqueda-global',
  standalone:true,
   imports: [
    CommonModule,
    FormsModule,
       Card,
    InputText 
  ],
  templateUrl: './busqueda-global.component.html',
  styleUrl: './busqueda-global.component.css',
})
export class BusquedaGlobalComponent {

   
  usuarioLogin:any;
 
  objetoConsultado: any;
  armaobjetoConsultado: any;
  tipoConsulta;
  banderadeCarga = 0;
 segundaVentana=0;
 arregloResultados = [];
    constructor(
    public _DatospersonalesService: ServicioBackendService,
    public _Activatedroute: ActivatedRoute,
    private _ServiciosMensajesService:ServiciosMensajeService,
    private _Router:Router
  ) {
    this._Activatedroute.params.subscribe(prm => {
      this.tipoConsulta = parseInt(prm['id']);

    })
   }
 ngOnInit(): void {
    this.usuarioLogin = JSON.parse(localStorage.getItem('user_login')!).user;
  }

   buscar_persona(data){
    console.log(data)
     this._ServiciosMensajesService.show()

    this._DatospersonalesService.busquedaglobal(data).subscribe({
      next:(Response)=>{
        console.log(Response)
          this._ServiciosMensajesService.hide()
          if(Response.error) return this._ServiciosMensajesService.mensajeMalo(Response.error)
          if(Response.mensaje) return this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
          this.atras(0,1)
         this.arregloResultados= Response.resultado;
  },error:()=>{
              this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer()
      }
    })
  }
   atras(tipoConsulta,segundaVentana){
    
    this.tipoConsulta=tipoConsulta;
    this.segundaVentana=segundaVentana;
  }

   verificarPermiso(data){
    return  this._DatospersonalesService.verificarPermisos(data)
   
   }
     verPerfil(perfil){
    this.objetoConsultado = perfil;
    this.atras(0,2)

   }
 
  onAtras(ruta) {
    if (ruta) {
      this._Router.navigate([ruta]);
    }
  }
}
