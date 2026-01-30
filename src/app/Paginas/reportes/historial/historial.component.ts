import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
 import { RadioButtonModule } from 'primeng/radiobutton';
 import { CardModule } from 'primeng/card';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
ServiciosMensajeService
@Component({
  selector: 'app-historial',
  standalone:true,
  imports: [RadioButtonModule,FormsModule,CommonModule,CardModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
})
export class HistorialComponent  implements OnInit,OnDestroy {
opcionSeleccionada: 'SI' | 'NO' | null = null;
constructor(private _ServicioBackendService:ServicioBackendService,private _ServiciosMensajeService:ServiciosMensajeService){

}
ngOnInit(): void {
  this.opcionSeleccionada="SI"
}
ngOnDestroy(): void {
  this.arregloResultado = []
}
cambiar(valor: 'SI' | 'NO') {
  this.opcionSeleccionada = valor;
}
arregloResultado = []
buscar(form){
  let p ={
    tipo_busqueda:0,
    identidad:form.value.identidad
  }
  if(this.opcionSeleccionada==='SI') p.tipo_busqueda=1
  else p.tipo_busqueda=0

  this.arregloResultado = []
this._ServiciosMensajeService.show('Buscando información...')
      this._ServicioBackendService.sacarHistorialPorPersona(p).subscribe({
    next: (response) => {
      console.log(response)
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloResultado = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
}

limpiar(){
  this.arregloResultado = []
}
}
