import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
 
@Component({
  selector: 'app-tb-logistica',
  standalone:true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './tb-logistica.component.html',
  styleUrl: './tb-logistica.component.css',
})
export class TbLogisticaComponent {
 @Input("identidad") identidad
  
   
  arregloArmas=[]
  arregloAccesorio = []
  constructor(
        private _DatospersonalesService:ServicioBackendService,
        private _ServiciosMensajesService:ServiciosMensajeService

  ){

  }
ngOnInit(): void {
  this.sacarArmas()
  
}
sacarArmas(){
  this._ServiciosMensajesService.show("Cargando datos de logistica...")
  this._DatospersonalesService.sacaArmaYAccesoriosPersona({identidad:this.identidad}).subscribe({
    next:(response)=>{
this._ServiciosMensajesService.hide()
       if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
       if (response.mensaje) {
       //  this._ServiciosMensajesService.mensajeMalo(response.mensaje)
       }else{
        this.arregloArmas = response.arregloArma;
        this.arregloAccesorio = response.accesorioArma
       }
    },error:()=>{
  this._ServiciosMensajesService.hide()

      this._ServiciosMensajesService.mensajeerrorServer()
    }
  })
}
}
