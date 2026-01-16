import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import Swal from 'sweetalert2';
import { TarjetaArchivosComponent } from '../tarjeta-archivos/tarjeta-archivos.component';

 import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-tarjeta-carpetas',
  standalone:true,
  imports: [
    CommonModule,
FormsModule,
TarjetaArchivosComponent,
DialogModule,
ButtonModule
  ],
  templateUrl: './tarjeta-carpetas.component.html',
  styleUrl: './tarjeta-carpetas.component.css',
})
export class TarjetaCarpetasComponent {
 arreglocarpetaprincipal = []
  verCarpeta = 0
  usuariologuiado;
  @Input("identidad") identidad_
   dropdownPrincipalId: number | null = null;
dropdownSecundariaId: number | null = null;
  arreglocarpetasegunda = []
  idcarpetaPrincipal;
  
  idcarpetaSegundaria
  arreglodeDocumentos = []
  imgURL: any = "";
  nombreDocumento: any;
  objetoConsultado
  @ViewChild("subirArchivo")subirArchivo:ElementRef
  @ViewChild("Cerrar_doc_control")Cerrar_doc_control:ElementRef
 
  public FilesToUploads: Array<File> = [];

  constructor(
    public _DatospersonalesService: ServicioBackendService,
    public _ServiciosMensajesService: ServiciosMensajeService
  ) {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
  }
  ngOnInit(): void {
    this.archivoPrincipal()
  }
toggleDropdownPrincipal(id: number, event: MouseEvent) {
  event.stopPropagation(); // para que no dispare el click de la tarjeta
  // Si ya está abierto, lo cierro; si no, lo abro
  this.dropdownPrincipalId = this.dropdownPrincipalId === id ? null : id;
  // cierro los otros por si acaso
  this.dropdownSecundariaId = null;
}

toggleDropdownSecundaria(id: number, event: MouseEvent) {
  event.stopPropagation();
  this.dropdownSecundariaId = this.dropdownSecundariaId === id ? null : id;
  this.dropdownPrincipalId = null;
}

cerrarDropdowns() {
  this.dropdownPrincipalId = null;
  this.dropdownSecundariaId = null;
}
  async crearCarpetaPrincipal() {
    let respuesta = await this._ServiciosMensajesService.mensajeConimput("Crear Carpeta", "Ingrese el nombre de la Carpeta")
    if (respuesta !== "error") {
      var params = {
        identidad: this.identidad_,
        nombre: respuesta
      }
     this._ServiciosMensajesService.show()
      this._DatospersonalesService.crearcarpetaPrincipal(params).subscribe(
        Response => {
               this._ServiciosMensajesService.hide();
          if (Response.error) {
            this._ServiciosMensajesService.mensajeMalo(Response.error)
          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            } else {
              this.archivoPrincipal();
            }
          }
        }, error => {
               this._ServiciosMensajesService.hide();
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }


  }


  archivoPrincipal() {
    this.verCarpeta = 0;

    this.arreglocarpetaprincipal = []
    var params = {
      identidad: this.identidad_
    }
       this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarcarpetaPrimaria(params).subscribe(
      Response => {
         this._ServiciosMensajesService.hide()
        if (Response.error) {
         this._ServiciosMensajesService.mensajeMalo(Response.error)
        } else {
          if (Response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
        } else {
            this.arreglocarpetaprincipal = Response.resultado
          }
        }
      },error=>{
         this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  async cambiarnombreCarpetaPrincipal(data) {
let nuevo_nombre = await this._ServiciosMensajesService.mensajeConimput("Modificar","Ingrese el nuevo nombre")
if(nuevo_nombre!=="error"){
  var parametro = {
    idcarpetaPrincipal: data.idcarpetaPrincipal,
    nombrecarpeta: nuevo_nombre
  }
     this._ServiciosMensajesService.show()

  this._DatospersonalesService.cambiarnombreCarpetaPrincipal(parametro).subscribe(
    Response => {
      if (Response.error) {
        this._ServiciosMensajesService.mensajeMalo(Response.error)
      } else {
        if (Response.mensaje) {
          this._ServiciosMensajesService.mensajeMalo(Response.mensaje)

        } else {
          this.archivoPrincipal()
        }
      }
           this._ServiciosMensajesService.hide()
    }, error => {
      this._ServiciosMensajesService.mensajeMalo("Error de Conexion")
           this._ServiciosMensajesService.hide()
    }
  )
}

  }
  async eliminarcarpetaprimaria(data: any) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminar esta carpeta");
    if (respuesta) {
      var params = {
        idcarpeta: data
      }
           this._ServiciosMensajesService.show()

      this._DatospersonalesService.deletecarpetaPrimaria(params).subscribe(
        Response => {
               this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._ServiciosMensajesService.mensajeMalo("La carpeta contiene archivos")

          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mensaje)

            } else {
              this.archivoPrincipal()
            }
          }
        }, error => {
               this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }


  }

  buscarSegundacarpeta(data: any) {
    this.idcarpetaPrincipal = data
    var params = {
      idcarpetaprincipal: data
    }
    this.arreglocarpetasegunda = []
       this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarcarpetaSegundaria(params).subscribe(
      Response => {
             this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error)

        } else {
          if (Response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            this.verCarpeta = 1

          } else {
            this.arreglocarpetasegunda = Response.resultado
            this.verCarpeta = 1
          }
        }
      }, error => {
             this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  async crearCarpetaSegundaria() {
    let nombreCarpeta = await this._ServiciosMensajesService.mensajeConimput("Crear carpeta", "Ingrese el nombre de la carpeta")
    if (nombreCarpeta !== "error") {
      var params = {
        idcarpeta: this.idcarpetaPrincipal,
        nombre: nombreCarpeta
      }
        this._ServiciosMensajesService.show()

      this._DatospersonalesService.crearcarpetaSegundaria(params).subscribe(
        Response => {
               this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._ServiciosMensajesService.mensajeMalo(Response.error)

          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            } else {
              this.buscarSegundacarpeta(this.idcarpetaPrincipal);
            }
          }
        }, erro => {
               this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }

  }

  async eliminarcarpetasegundaria(data: any) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminar esta carpeta")
    if (respuesta) {
      var params = {
        idcarpeta: data
      }
     this._ServiciosMensajesService.show()

      this._DatospersonalesService.deletecarpetaSegundaria(params).subscribe(
        Response => {
               this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._ServiciosMensajesService.mensajeMalo("La Carpeta Contien Documentos")
          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            } else {
              this.buscarSegundacarpeta(this.idcarpetaPrincipal);
            }
          }
        }, erro => {
               this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }

  }
  async cambiarnombreCarpetaSegundaria(data) {
    let nuevo_nombre = await this._ServiciosMensajesService.mensajeConimput("Modificar", "Ingrese el nuevo nombre")
    if (nuevo_nombre !== "error") {
      var parametro = {
        idcarpetasegundaria: data.idcarpetasegundaria,
        Nombre: nuevo_nombre
      }
     this._ServiciosMensajesService.show()

      this._DatospersonalesService.cambiarnombreCarpetaSegundaria(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._ServiciosMensajesService.mensajeMalo(Response.error)
          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mensaje)

            } else {
              this.buscarSegundacarpeta(this.idcarpetaPrincipal);
            }
          }
               this._ServiciosMensajesService.hide()

        }, error => {
          this._ServiciosMensajesService.mensajeMalo("Error de Conexion")
               this._ServiciosMensajesService.hide()

        }
      )
    }

  }
  AtrasDocumentos(data: any) {
    this.verCarpeta = data
  }

  buscardocumentos(data: any) {
    this.idcarpetaSegundaria = data
    this.arreglodeDocumentos = []
    var parametro = {
      idcarpetaSegundaria: data
    }
     this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarDocumento(parametro).subscribe(
      Response => {
         this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error)
        } else {
          if (Response.mensaje) {
           this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            

            this.verCarpeta = 2
          } else {
            this.verCarpeta = 2
            this.arreglodeDocumentos = Response.resultado


          }
        }
      },error=>{
         this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer()
      }
    )
  }

  eliminar(iddocumento: any, dir: any, i?) {
    
    var params = {
      iddocumento: iddocumento,
      dir: dir,
      identidad: this.identidad_,
      identidadEjecutora: this.usuariologuiado.identidad,
      nombreDocumento: i.nombreDocumento
    }

    this._DatospersonalesService.deleteDocumento(params).subscribe(
      Response => {
        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error)
          
          
        } else {
          if (Response.mensaje) {
           this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            
          } else {
                     
            this.buscardocumentos(this.idcarpetaSegundaria)
          }
        }
      }
    )
  }

  guardardocumento(id: any) {


    var link = this._DatospersonalesService.url2 + "subirdocumentos/" + id

     this._ServiciosMensajesService.show()

    this.makeFileReques(link, [], this.FilesToUploads).then(
      (result: any) => {
             this._ServiciosMensajesService.hide()


        this.imgURL = "";
        if (result.error) {
          this._DatospersonalesService.mensajeError(result.error)
          
        } else {
          if (result.mesaje) {
            this._DatospersonalesService.mensajeError(result.mensaje)
            
          } else {
         //   this._DatospersonalesService.mensajeBueno(result.resultado);
            
            this.buscardocumentos(this.idcarpetaSegundaria)



          }

        }
      }, error => {
     this._ServiciosMensajesService.hide()

        alert("OCURRIO UN ERROR AL TRATAR DE SUBIR EL ARCHIVO CON IDENTIFICADOR: " + id)
        this.eliminar(id, "ninguno.PNG")
        

      }
    )

  }
  makeFileReques(url: string, params: Array<String>, file: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();


      if (file === undefined) {
        this._DatospersonalesService.mensajeError("SELECCIONE EL ARCHIVO")
      } else {
        for (let i = 0; i < file.length; i++) {
          formData.append("files", file[i], file[i].name);

        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(xhr.response);
            }

          } else {

          }
        }

        xhr.open("POST", url, true);
        xhr.send(formData)
      }


    })



  }
  guardarDocumentoTexto() {
    
    if (this.nombreDocumento === undefined || this.FilesToUploads === undefined) {
      Swal.fire("Rellene los campos")
      
    } else {
      if (this.activarBotonSubir) {
        var params = {
          nombre: this.nombreDocumento,
          dir: "ninguno.PNG",
          idcarpeta: this.idcarpetaSegundaria,
        }
            this._ServiciosMensajesService.show()

        this._DatospersonalesService.guardarDocumento(params).subscribe(
          Response => {
             this._ServiciosMensajesService.hide()

            if (Response.error) {
              this._ServiciosMensajesService.mensajeMalo(Response.error)
              
            } else {
              if (Response.mensaje) {
               this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
                
              } else {
                if (Response.resultado) {
                  this.guardardocumento(Response.resultado.insertId);
  
  
                }
  
              }
            }
          },error=>{
             this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer();
          }
        )
        this.activarBotonSubir=false;
      }else{
        this._ServiciosMensajesService.mensajeAdvertencia("El documento no cumple con el formato PDF")
      }

    }

  }
  activarBotonSubir=false;
  preview(files: any, fileInput: any) {
  this.activarBotonSubir=false;

    if (fileInput.target.files[0].name.split(".").pop()!=="pdf" && fileInput.target.files[0].name.split(".").pop()!=="doc" && fileInput.target.files[0].name.split(".").pop()!=="docx")  return this._ServiciosMensajesService.mensajeAdvertencia("Solo documentos pdf se puede subir al sistema")
    this.activarBotonSubir=true;
 
 
    this.fileChangeEvenet(fileInput)
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {

      return;
    }

    var reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;


    }

    
  

  }
  fileChangeEvenet(fileInput: any) {

    this.FilesToUploads = <Array<File>>fileInput.target.files;


  }
  arreglosArchivos = []
  AgregarArchivos(data) {
    let error=false;
    let extensiones = ['pdf','doc','docx']
    this.arreglosArchivos = [];
    for (let index = 0; index < data.target.files.length; index++) {

      let ext = data.target.files[index].name.split(".").pop()
      if(extensiones.includes(ext)){
      const file = data.target.files[index];
      file.identidad =  this.usuariologuiado.identidad
      var parametros = {
        archivo: file,
        nombre: file.name,
        idUsuario:this.usuariologuiado.identidad
      };
      this.arreglosArchivos.push(parametros);
    }else{
      error=true
    }
    }
    if(error) return this._ServiciosMensajesService.mensajeAdvertencia("Algunos documentos no son compatibles, \n por lo tanto no se subiran, \n Las extenciones compatibles son: (pdf,doc,docx)")
    //this.subirArchivo.nativeElement.value = ""
  }
  async  guardarArchivos(){
    /**
     * Nueva funcion para guardar archivos
     */
    let respuesta =  await this._ServiciosMensajesService.mensajePregunta("Esta Seguro de guardar estos archivos?")
    if(respuesta){
      if(this.arreglosArchivos.length ===0) return this._ServiciosMensajesService.mensajeMalo("No hay documentos para subir..") 
      const body = new FormData();
      this.arreglosArchivos.forEach((element) => {
        body.append('myfile', element.archivo, element.nombre);
      });
  let parametro={
    
       idcarpeta: this.idcarpetaSegundaria,
   
  }
  
      body.append('parametros', JSON.stringify(parametro));
          this._ServiciosMensajesService.show()

      this._DatospersonalesService.agregarArchivos_nuevo(body).subscribe({
          next:(response)=>{
     this._ServiciosMensajesService.hide()

              if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
              if(response.mensaje) return this._ServiciosMensajesService.mensajeAdvertencia(response.mensaje)
              this.buscardocumentos(this.idcarpetaSegundaria)
              this.limpiarArreglo()
              this.Cerrar_doc_control.nativeElement.click()
             return this._ServiciosMensajesService.mensajeBueno(response.resultado)
  
            },error:()=>{
           this._ServiciosMensajesService.hide()

            this._ServiciosMensajesService.mensajeerrorServer()
          }
      })
    } 

  }
  @ViewChild("formArchivos")formArchivos:NgForm
  limpiarArreglo(){
    this.formArchivos.reset()
    this.subirArchivo.nativeElement.value = ""
    this.arreglosArchivos = []
    this.cerrarModal()
  }
visible = false;
    abrirModal() {
    this.visible = true;
  }

  cerrarModal() {
    this.visible = false;
  }
}
