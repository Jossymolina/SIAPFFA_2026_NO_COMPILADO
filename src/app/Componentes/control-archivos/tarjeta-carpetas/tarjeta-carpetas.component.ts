import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import Swal from 'sweetalert2';
import { TarjetaArchivosComponent } from '../tarjeta-archivos/tarjeta-archivos.component';
 import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-tarjeta-carpetas',
  standalone:true,
  imports: [
    CommonModule,
FormsModule,
TarjetaArchivosComponent,
DialogModule,
ButtonModule,
FormsModule,
CommonModule,
InputTextModule



  ],
  templateUrl: './tarjeta-carpetas.component.html',
  styleUrl: './tarjeta-carpetas.component.css',
})
export class TarjetaCarpetasComponent {
 arreglocarpetaprincipal = []
 mostrarDialogo
  verCarpeta = 0
  usuariologuiado;
  @Input("identidad") identidad_
  @Input("persona_seleccionada") persona_seleccionada;
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
return this._ServiciosMensajesService.mensajeAdvertencia(
    "No es posible cambiar el nombre de la carpeta porque está definido por la institución."
);
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
    return this._ServiciosMensajesService.mensajeAdvertencia(
    "No es posible cambiar el nombre de la carpeta porque está definido por la institución."
);
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

  crearEstructura(){
let p = {
  nombre_carpeta_principal: `${this.persona_seleccionada.idfuerza===2? this.persona_seleccionada.equivalente : this.persona_seleccionada.nombre_grado } `,
  identidadpropietario:this.identidad_,
  idgrado:this.persona_seleccionada.grado,
  idcategoria:this.persona_seleccionada.idcategoria,
  sub_carpetas: [
    { sub: "1. Hoja de Servicios, Currículum Vitae y Biografía", codigo: "carp_1",
      archivo_obligatorio:[
         {nombre:'Hoja de Servicios'},
         {nombre:'Currículum'},
         {nombre:'Biografía'},
      ]
    },
    { sub: "2. Documentos Personales",
       codigo: "carp_2",
       archivo_obligatorio: [
        {nombre:'Partida de Nacimiento'},
        {nombre:'Formulario Beneficiario SEDENA '},
        {nombre:'Libreta de Cuenta de Banco '},
        {nombre:'DNI Frontal'},
        {nombre:'DNI Reverso'},
        {nombre:'licencia de Conducir Frontal'},
        {nombre:'licencia de Conducir Reverso'},
        {nombre:'Identificación Militar Frontal'},
        {nombre:'Identificación Militar Reverso'},
        {nombre:'Pasaporte'},
        {nombre:'RTN Frontal'},
        {nombre:'RTN Reverso'},
        {nombre:'Antecedentes Penales'},
        {nombre:'Antecedentes Policiales'},
        {nombre:'Antecedentes Militares'},
        {nombre:'Croquis'},
        {nombre:'Finiquito IPM'},
        {nombre:'Carnet Seguro Atlantida Frontal'},
        {nombre:'Carnet Seguro Atlantida Reverso'},
        {nombre:'Cretificado de Fhema'},
        {nombre:'Declaración Jurada'},
        {nombre:'Acta Matrimonio o Divorcio'},
        {nombre:'Permiso de Portacion de Armas'},
      ]
    },
    { sub: "3. Acuerdos", codigo: "",archivo_obligatorio:[] },
    { sub: "4. Reportes de Eficiencia", codigo: "",archivo_obligatorio:[] },
    { sub: "5. Exámenes Médicos", codigo: "" ,archivo_obligatorio:[]},
    { sub: "6. Cursos y Seminarios Militares", codigo: "",archivo_obligatorio:[] },
    { sub: "7. Cursos y Seminarios Civiles", codigo: "",archivo_obligatorio:[] },
    { sub: "8. Condecoraciones y Distinciones", codigo: "",archivo_obligatorio:[] },
    { sub: "9. Despachos y Títulos", codigo: "",archivo_obligatorio:[] },
    { sub: "10. Evaluaciones Físicas", codigo: "",archivo_obligatorio:[] },
    { sub: "11. Evaluaciones de Disparo", codigo: "" ,archivo_obligatorio:[]},
    { sub: "12. Calificaciones de Cursos", codigo: "",archivo_obligatorio:[] },
    { sub: "13. Constancias de Misiones", codigo: "",archivo_obligatorio:[] },
    { sub: "14. Fotografías", codigo: "" ,archivo_obligatorio:[]},
    { sub: "15. Control Disciplinario", codigo: "",archivo_obligatorio:[] },
    { sub: "16. Otros Documentos", codigo: "" ,archivo_obligatorio:[]}
  ]
};
//crearCarpetaEstructura
this._ServiciosMensajesService.show()
this._DatospersonalesService.crearCarpetaEstructura(p).subscribe({
  next:(response)=>{
    this._ServiciosMensajesService.hide()
    if(!response.ok) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
      this._ServiciosMensajesService.mensajeBueno(response.mensaje)
      this.mostrarDialogo = false
      this.archivoPrincipal();
  },error:()=>{
    this._ServiciosMensajesService.hide()
    this._ServiciosMensajesService.mensajeerrorServer()
  }
})
   

  }
}
