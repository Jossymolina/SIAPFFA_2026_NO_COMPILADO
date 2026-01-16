import { Component } from '@angular/core';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-lista-cargos-con-pago',
  standalone:true,
  imports: [CommonModule,
FormsModule],
  templateUrl: './lista-cargos-con-pago.component.html',
  styleUrl: './lista-cargos-con-pago.component.css',
})
export class ListaCargosConPagoComponent {
  arregloLista = []
constructor(
  private _ServiciosMensajesService:ServiciosMensajeService,
  private _DatospersonalesService:ServicioBackendService
){}
 
ngOnInit(): void {
  this.sacarlistado();
this.sacarPermisoPersonal()
}


sacarlistado(){
  
  this.arregloLista = []
  this._ServiciosMensajesService.show()
  this._DatospersonalesService.sacarListaCargosPorPago().subscribe({
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
 
 filtroCargos: string = '';

listaFiltradaCargos() {
  if (!this.arregloLista) {
    return [];
  }

  const termino = (this.filtroCargos || '').toLowerCase().trim();
  if (!termino) {
    return this.arregloLista;
  }

  return this.arregloLista.filter((item: any) => {
    const texto = `
      ${item.nombre || ''}           /* Fuerza / Dependencia */
      ${item.unidad || ''}           /* Dirección / Unidad   */
      ${item.descripcion || ''}      /* Dirección / Sección  */
      ${item.Nombre_Puesto || ''}    /* Cargo                */
      ${item.grados || ''}           /* Grados               */
      ${item.monto || ''}            /* Monto                */
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