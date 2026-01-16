import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { SafePipe } from '../../../Pipes/pipe-imagen/safe.pipe';

@Component({
  selector: 'app-tarjeta-archivos',
  standalone:true,
  imports: [
    CommonModule,
FormsModule,
SafePipe
  ],
  templateUrl: './tarjeta-archivos.component.html',
  styleUrl: './tarjeta-archivos.component.css',
})
export class TarjetaArchivosComponent {
 @Input() arreglodeDocumentos:Array<any>;
  @Input("identidad") identidad_;
  @Input() idcarpetaSegundaria;
  
  verCarpeta = 0
  banderaEspiner = 0;
  usuariologuiado;
   
  constructor(
    public _DatospersonalesService:ServicioBackendService,
    private _ServiciosMensajesService:ServiciosMensajeService
  ) {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
   }

  ngOnInit(): void {
  }

  async eliminar(iddocumento: any, dir: any, i?) {
let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminar el documento.")
if (respuesta) {
  var params = {
    iddocumento: iddocumento,
    dir: dir,
    identidad:this.identidad_ ,
    identidadEjecutora: this.usuariologuiado.identidad,
    nombreDocumento: i.nombreDocumento
  }
  this._ServiciosMensajesService.show("Eliminando documento...")
  this._DatospersonalesService.deleteDocumento(params).subscribe(
    Response => {
      this._ServiciosMensajesService.hide()
      if (Response.error) {
        this._DatospersonalesService.mensajeError(Response.error)
     
      } else {
        if (Response.mensaje) {
           this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
       
        } else {
              this.buscardocumentos(this.idcarpetaSegundaria)
        }
      }
    },error=>{
      this._ServiciosMensajesService.hide()
      this._ServiciosMensajesService.mensajeerrorServer();
    }
  )
}
  

  }
  buscardocumentos(data: any) {
    this.idcarpetaSegundaria = data
    this.arreglodeDocumentos = new Array()
    var parametro = {
      idcarpetaSegundaria: data
    }
    this._DatospersonalesService.sacarDocumento(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
             this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            this.verCarpeta = 2
          } else {
            this.verCarpeta = 2
            this.arreglodeDocumentos = Response.resultado


          }
        }
      }
    )
  }
  urls="https://siapfa.ffaa.mil.hn:4443/sacarfoto/";
 probarimagenes(dir):any{

   
 }
 refrescar(){
  
  console.log(document.getElementById('myhtml'));

 }
 versiesimagen(data){
   if (data==='jpg' || data==='png'|| data==='jpeg' || data==='jfif' || data==='tif' || data==='JPE' || data==='gif' || data==='PNG') {
     return true;
   }else{
     return false;
   }

 }
 versiesDocumento(data){
  if (data==='doc' || data==='docx' || data==='dotx' ) {
    return true;
  }else{
    return false;
  }
 }
 versiesPresentacion(data){
  if ( data==='ppt') {
    return true;
  }else{
    return false;
  }
 }
 async cambiarnombreDocumento(data){
let nuevo_nombre = await this._ServiciosMensajesService.mensajeConimput("Modificacion","Ingrese el nuevo nombre")
if (nuevo_nombre!=="error") {

    var parametro={
      iddocumento: data.iddocumento,
      nombreDocumento:nuevo_nombre
    }
    this._ServiciosMensajesService.show("Cambiando nombre del documento...")

this._DatospersonalesService.cambiarnombreDocumento(parametro).subscribe(
  Response=>{
    this._ServiciosMensajesService.hide()

    if (Response.error) {
      this._ServiciosMensajesService.mensajeMalo(Response.error)
      
    } else {
      if (Response.mensaje) {
       this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
       
      } else {
       this._DatospersonalesService.mensajeBueno(Response.resultado) 
       this.buscardocumentos(this.idcarpetaSegundaria)
      }
    }

  
  },error=>{
    this._ServiciosMensajesService.mensajeerrorServer();
       this._ServiciosMensajesService.hide()

 
  }
)
}
 
 }
 dropdownDocId: number | null = null;

toggleDropdownDoc(id: number, event: MouseEvent) {
  event.stopPropagation();
  this.dropdownDocId = this.dropdownDocId === id ? null : id;
}

cerrarDropdownDocs() {
  this.dropdownDocId = null;
}
}
