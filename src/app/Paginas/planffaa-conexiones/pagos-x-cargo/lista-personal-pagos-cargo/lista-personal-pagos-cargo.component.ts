import { Component } from '@angular/core';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-lista-personal-pagos-cargo',
  standalone:true,
  imports: [CommonModule,
FormsModule],
  templateUrl: './lista-personal-pagos-cargo.component.html',
  styleUrl: './lista-personal-pagos-cargo.component.css',
})
export class ListaPersonalPagosCargoComponent {
 arregloLista = []
constructor(
  private _ServiciosMensajesService:ServiciosMensajeService,
  private _DatospersonalesService:ServicioBackendService
){}
 
ngOnInit(): void {
  this.sacarlistado()
  this.sacarPermisoPersonal()
  
}
sacarlistado(){
 
  this.arregloLista = []
  this._ServiciosMensajesService.show()
  this._DatospersonalesService.sacarPersonas_pagos_gargo().subscribe({
    next:(response)=>{
      this._ServiciosMensajesService.hide()
 

          if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error);
          if(response.mensaje) return this._ServiciosMensajesService.mensajeAdvertencia(response.mensaje);
          this.arregloLista = response.resultado;
    },error:()=>{
      this._ServiciosMensajesService.hide()


      this._ServiciosMensajesService.mensajeerrorServer()
    }
  })
}

 
  exportar(tabla){
  this._DatospersonalesService.exportexcel2(tabla,"Exportado_siapffa_Pagos_cargo")
}
verificarPermiso(data){
  return  this._DatospersonalesService.verificarPermisos(data)
 
 }
 

  // 👉 Modelo del filtro
  filtroPxc: string = '';

 

  // 👉 Filtro global por campos de la tabla
  listaFiltradaPxc() {
    if (!this.arregloLista) {
      return [];
    }

    const termino = (this.filtroPxc || '').toLowerCase().trim();
    if (!termino) {
      return this.arregloLista;
    }

    return this.arregloLista.filter((item: any) => {
      const texto = `
        ${item.fuerza || ''}
        ${item.unidad || ''}
        ${item.descripcion || ''}
        ${item.Nombre_Puesto || ''}
        ${item.identidad || ''}
        ${item.nombre || ''}
        ${item.grado || ''}
        ${item.monto || ''}
      `.toLowerCase();

      return texto.includes(termino);
    });
  }
 
permisoPersonal:boolean=false
   sacarPermisoPersonal(){
   this.permisoPersonal =   this._DatospersonalesService.verificarPermisos(['P_0001'])
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}

