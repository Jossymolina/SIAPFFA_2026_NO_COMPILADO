import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { SafePipe } from '../../../Pipes/pipe-imagen/safe.pipe';
 import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-tarjeta-archivos',
  standalone:true,
  imports: [
    CommonModule,
FormsModule,
SafePipe,
FileUploadModule,
 DialogModule,
ButtonModule


  ],
  templateUrl: './tarjeta-archivos.component.html',
  styleUrl: './tarjeta-archivos.component.css',
})
export class TarjetaArchivosComponent {
 @Input() arreglodeDocumentos:Array<any>;
  @Input("identidad") identidad_;
  @Input() idcarpetaSegundaria;
  @Output("repsonderPadre") repsonderPadre= new EventEmitter()
  actualizarDocumento = false
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
      if(i.documeto_obligatorio===1) return this._ServiciosMensajesService.mensajeMalo("Documento de caracter Obligatorio, No se puede Eliminar")
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
  urls= this._DatospersonalesService.url+"sacarfoto/"//  "https://siapfa.ffaa.mil.hn:4443/sacarfoto/";
 probarimagenes(dir):any{

   
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
  if(data.documeto_obligatorio===1) return this._ServiciosMensajesService.mensajeMalo("Documento de caracter Obligatorio, No se puede modificar el nombre")
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


 
 
archivoSeleccionado: File | null = null;

seleccionarArchivo(event: any) {
    this.archivoSeleccionado = event.files[0];
}

documentoSeleccionado
 seleccionarDocumetoDeterminado(data){
this.documentoSeleccionado = data
 }
 
  async guardarDocumento() {

  if (!this.archivoSeleccionado) {
    return this._ServiciosMensajesService.mensajeMalo("Seleccione un Archivo") ;
  }

  let r = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de remplazar el archivo")
  if(!r) return;

  const formData = new FormData();
  // Debe coincidir con upload.array("myfile")
  formData.append("myfile", this.archivoSeleccionado);
  formData.append(
    "iddocumento",
    this.documentoSeleccionado.iddocumento.toString()
  );
    formData.append(
    "usuario",
    JSON.stringify(this.usuariologuiado)
  );
 formData.append(
    "persona_afectada",
    this.identidad_.toString()
  );
  this._ServiciosMensajesService.show()
  
  this._DatospersonalesService.subirDocumentoPredeterminados(formData)
    .subscribe({
      next: (resp: any) => {
  this._ServiciosMensajesService.hide()
       if(!resp.ok) return this._ServiciosMensajesService.mensajeMalo(resp.mensaje)
        this._ServiciosMensajesService.mensajeMalo("Documento cargado correctamente.")
        this.repsonderPadre.emit()
      },
      error: (err) => {
  this._ServiciosMensajesService.hide()

         this._ServiciosMensajesService.mensajeerrorServer()
      }

    });

}
 
}
