import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [DialogModule,CommonModule,FormsModule],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css',
})
export class PromocionesComponent implements OnInit,OnDestroy {
@Input("persona") objetoConsultado:any
  constructor(private _DatospersonalesService:ServicioBackendService,private _ServiciosMensajesService:ServiciosMensajeService) {
  
  }
ngOnInit(): void {
   this.obtenerAscensosPorPersona()
}

ngOnDestroy(): void {
  this.PromosionesActual=null
}
porposionventana = false
arregloPromosiones = []
sacarpromocionnes(){
  this._ServiciosMensajesService.show("Cargando promociones")
 let p ={
    idcategoria:this.objetoConsultado.idcategoria,
     idfuerza:this.objetoConsultado.idfuerza
  }
this.arregloPromosiones = []
   
  this._DatospersonalesService.obtenerPromociones(p).subscribe({
  next:(response)=>{
    this._ServiciosMensajesService.hide()
    if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error) 
if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
this.arregloPromosiones = response.data
this.modificarPromosion()
  },error:()=>{
    this._ServiciosMensajesService.hide()
    this._ServiciosMensajesService.mensajeerrorServer()
  }
  })  
}

PromosionesActual   
obtenerAscensosPorPersona(){
    this.PromosionesActual  =null
  this._ServiciosMensajesService.show("Cargando promocion de la persona")
 let p ={
    identidad:this.objetoConsultado.identidad
  }
   
  this._DatospersonalesService.obtenerAscensosPorPersona(p).subscribe({
  next:(response)=>{

    this._ServiciosMensajesService.hide()
    if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error) 
   if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
    this.PromosionesActual  = response.data[0]
 
  },error:()=>{
    this._ServiciosMensajesService.hide()
    this._ServiciosMensajesService.mensajeerrorServer()
  }
  })  
}
@ViewChild("formPromocionAscenso") formPromocionAscenso:NgForm
modificarPromosion(){
 
let p = this.arregloPromosiones.find((x:any)=>x.idpromociones == this.PromosionesActual.idpromociones)
let ppsterga = this.arregloPromosiones.find((x:any)=>x.idpromociones == this.PromosionesActual.idpromocion_posterga)


 
this.formPromocionAscenso.controls["promociones"].setValue(p)
this.formPromocionAscenso.controls["promocionPosterga"].setValue(ppsterga)

this.formPromocionAscenso.controls["nota_final_ascenso"].setValue(this.PromosionesActual.nota_final_ascenso_primer_ascenso)

}

  async actualizarIngresoAscenso(form){
  
let r = await this._ServiciosMensajesService.mensajePregunta("¿Desea actualizar el ingreso de ascenso?")
if(!r) return
this.porposionventana = false

  let meritoNumber = Number(form.value.nota_final_ascenso);

  if (isNaN(meritoNumber)) {
      this._ServiciosMensajesService.mensajeMalo("El mérito debe ser un número válido.");
    return;
  }

  // 🔥 Forzar exactamente 4 decimales
  meritoNumber = Number(meritoNumber.toFixed(4));

  let p = {
    personal_idpersonal: this.PromosionesActual.personal_idpersonal,
    categoria_idcategoria: this.PromosionesActual.categoria_idcategoria,
    grado: this.objetoConsultado.grado,
    idpromocion_ascenso: form.value.promociones?.idpromociones || null,
    idpromocion_posterga: form.value.promocionPosterga?.idpromociones || null,
    nota_final_ascenso: meritoNumber
  };

  this._ServiciosMensajesService.show()
  this._DatospersonalesService.actualizarIngresoAscenso(p).subscribe({
    next: (response) => {
      this._ServiciosMensajesService.hide()
      if (response.error) return this._ServiciosMensajesService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje);
      this._ServiciosMensajesService.mensajeBueno("Ingreso de ascenso actualizado correctamente");
    this.obtenerAscensosPorPersona()
    },
    error: () => {
      this._ServiciosMensajesService.hide();
      this._ServiciosMensajesService.mensajeerrorServer();
    }
  });
}

  sacarPermisoPersonalVista(permiso:string[]){
   return this._DatospersonalesService.verificarPermisos(permiso)
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}
