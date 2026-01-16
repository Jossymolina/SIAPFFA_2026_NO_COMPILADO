import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
  import { DialogModule } from 'primeng/dialog';
 import { ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,
 
  
} from '@angular/forms';
@Component({
  selector: 'app-tb-correos-telefono-idiomas',
  standalone:true,
  imports: [CommonModule,FormsModule,DialogModule,ButtonModule, ReactiveFormsModule ],
  templateUrl: './tb-correos-telefono-idiomas.component.html',
  styleUrl: './tb-correos-telefono-idiomas.component.css',
})
export class TbCorreosTelefonoIdiomasComponent {
arregloCorreos = [];
  
  @Input("identidad") identidad:String;
 mostrarModalCorreo = false;
  usuariologuiado;
  private patronCorreo: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  public formularioCorreo = new UntypedFormGroup({
    correo: new UntypedFormControl('', [Validators.required, Validators.pattern(this.patronCorreo)])
  });
  get getCorreos() { return this.formularioCorreo.get('correo'); }
  constructor(
    private _DatospersonalesService:ServicioBackendService,
    private _ServiciosMensajesService:ServiciosMensajeService
  ) { }

  ngOnInit(): void {
    this.sacarCorreo();
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
  }


 async eliminarCorreo(data:any) {
   var t = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminar el correo")
  if (t) {
    var parametro = {
      correo: data.correo,
      identidad:this.identidad,
      identidadEjecutora:this.usuariologuiado.identidad
    }
  this._ServiciosMensajesService.show()
    this._DatospersonalesService.eliminarCorreo(parametro).subscribe(
      Response => {
            this._ServiciosMensajesService.hide()
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.sacarCorreo();
          }
        }
      },error=>{
                this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
   }
   
  }
 async guardarCorreo(){
    let respuesta = await  this._ServiciosMensajesService.mensajePregunta("Esta seguro de guardar el correo")
    if(respuesta){
    if (this.formularioCorreo.valid) {
      var param={
        idpersonal:this.identidad,
        correo:this.formularioCorreo.value.correo,
        identidadEjecutora:this.usuariologuiado.identidad
      }
       this._ServiciosMensajesService.show()
      this._DatospersonalesService.agregarCorreo(param).subscribe(
        Response=>{
              this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this.formularioCorreo.reset();
              this.sacarCorreo();
            }
          }
        },error=>{
              this._ServiciosMensajesService.hide()


          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }else{
      this._DatospersonalesService.mensajeError("NO CUMPLE CON EL FORMATO DE UN CORREO | RELLEN  EL CAMPO CORRECTAMENTE")
    }
  }
  }
  sacarCorreo() {
    this.arregloCorreos = [];
    var params = {

      identidad: this.identidad
    }
     this._ServiciosMensajesService.show()
    this._DatospersonalesService.consultacorreoPersonal(params).subscribe(
    {
        next:(Response) => {
        this._ServiciosMensajesService.hide()
        if (Response.error) {

        } else {
          if (Response.mensaje) {

          } else {
            this.arregloCorreos = Response.resultado
          }
        }
           this.sacarMisPaises();

      },error:()=>{
        this._ServiciosMensajesService.hide()

      }
    }
    )
  }

 
  arregloPaises = []
  arregloMisPaises = []
  objetoConsultado
  paisSelected;
  arregloMisIdiomas = []
  idiomaSelected = {
    idmisidiomas: "",
    nivel: 0,
    idpersonal: ""
  }
  arregloIdiomas = []
  
 
  async EliminarPais(data: any) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminar Este idioma");
    if (respuesta) {
      var params = {
        identidad: this.identidad,
        idpais: data.idpais
      }
    this._ServiciosMensajesService.show()

      this._DatospersonalesService.deletepais(params).subscribe(
        Response => {
          this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)

          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)

            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.sacarMisPaises();
            }
          }
        }, error => {
          this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }

  }

  sacarMisPaises() {
    this.arregloMisPaises = []
    var parametro = {
      identidad: this.identidad
    }
       this._ServiciosMensajesService.show()


    this._DatospersonalesService.consultaPaisesDelPersonal(parametro).subscribe(
      Response => {
        this._ServiciosMensajesService.hide()

        if (Response.error) {
        //  this._DatospersonalesService.mensajeError(Response.error)

        } else {
          if (Response.mensaje) {
            // this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.arregloMisPaises = Response.resultado
          }
        }
            this.sacarIdiomas();
      }, error => {
        this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
    this.sacarmisidiomas();
  }
  sacarpaises() {
    this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarpaises().subscribe(
      Response => {
this._ServiciosMensajesService.hide()
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloPaises = Response.resultado
          }
        }
      },error=>{
        this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }

  agregarPaises() {

    if (this.paisSelected === undefined) {
      this._DatospersonalesService.mensajeError("Seleccione el Idioma")
    } else {
      var parametro = {
        idpersonal: this.identidad,
        idpais: this.paisSelected.idpaises
      }
        this._ServiciosMensajesService.show()

      this._DatospersonalesService.guardarpaisdelpersonal(parametro).subscribe(
        Response => {
          this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              //this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this.arregloMisPaises = Response.resultado
              this.sacarMisPaises()
            }
          }
        }, error => {
          this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }

  }

  sacarmisidiomas() {
    this.arregloMisIdiomas = []
    var parametro = {
      identidad: this.identidad
    }
      this._ServiciosMensajesService.show()

    this._DatospersonalesService.consultaIdiomasPersonal(parametro).subscribe(
      Response => {
        this._ServiciosMensajesService.hide();
        if (Response.error) {
         // this._DatospersonalesService.mensajeError(Response.error)

        } else {
          if (Response.mensaje) {
           // this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.arregloMisIdiomas = Response.resultado;
          }
        }
      }, error => {
        this._ServiciosMensajesService.hide();

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  async eliminarIdioma(data: any) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminar el idioma")
    if(respuesta){
      var parametro = {
        identidad: this.identidad,
        idioma: data.idmisidiomas,
        nivel: data.nivel
      }
         this._ServiciosMensajesService.show()

      this._DatospersonalesService.deleteidomas(parametro).subscribe(
        Response => {
          this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
  
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
  
            } else {
              this._DatospersonalesService.mensajeBueno("Eliminado con Exito")
              this.sacarmisidiomas();
            }
          }
        },error=>{
          this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeerrorServer()
        }
      )
    }
   
  }
  agrgarIdioma() {
    this.idiomaSelected.idpersonal = this.identidad+""
    if (this.idiomaSelected.nivel < 1 || this.idiomaSelected.nivel > 100 || this.idiomaSelected.idmisidiomas === "" || this.idiomaSelected.idpersonal === "") {
      this._DatospersonalesService.mensajeError("No cumple con el formato | selecione el idioma | nivel > 0 y <=100")
    } else {
    this._ServiciosMensajesService.show()
    
      this._DatospersonalesService.guardaridiomadelpersonal(this.idiomaSelected).subscribe(
        Response => {
          this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this._DatospersonalesService.mensajeBueno("Agregado con exito")
              this.sacarmisidiomas()
            }
          }
        },error=>{
      this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer()
        }
      )
    }
  }
  sacarIdiomas() {
    this.arregloIdiomas = [];
    this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacaridiomas().subscribe(
      Response => {
    this._ServiciosMensajesService.hide()

        if (Response.error) {
       //   this._DatospersonalesService.mensajeError(Response.error);
        } else {
          this.arregloIdiomas = Response.resultado;
        }
           
this.consultaTelefonoDelPersonal()
      }, error => {
    this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }

  mostrarModalPaises = false;
mostrarModalIdiomas = false;
arregloTelefono = []
consultaTelefonoDelPersonal() {
    var params = {
      identidad: this.identidad
    }
    this.arregloTelefono = []
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.consultaTelefonoPersonal(params).subscribe(
      Response => {
   this._ServiciosMensajesService.hide()

        if (Response.mensaje) {
         // this._DatospersonalesService.mensajeError(Response.mensaje)
        } else {
          this.arregloTelefono = Response.resultado;

        }

      },error=>{
   this._ServiciosMensajesService.hide()
 
this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }

   async eliminarnumero(data: any) {
let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminarlo")
if (respuesta) {
  var parametro = {
    numero: data
  }
this._ServiciosMensajesService.show()
  this._DatospersonalesService.eleminarnumeroTelefono(parametro).subscribe(
    Response => {
this._ServiciosMensajesService.hide()

      if (Response.error) {
        this._DatospersonalesService.mensajeError(Response.error)
      } else {
        if (Response.mensaje) {
          this._DatospersonalesService.mensajeError(Response.mensaje)
        } else {
          this._DatospersonalesService.mensajeBueno(Response.resultado)
          this.consultaTelefonoDelPersonal();
        }
      }
    },error=>{
this._ServiciosMensajesService.hide()

this._ServiciosMensajesService.mensajeerrorServer();
    }
  )
}
 
  }

  mostrarModalTelefono = false
  async guardarTelefono(form:NgForm) {
let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta segur@ de guardar este numero de telefono?")
if (respuesta) {
  var params = {
    numero: form.value.numeroTelefono,
    idpersonal: this.identidad
  }
  this._ServiciosMensajesService.show()
      this._DatospersonalesService.agregarTelefono(params).subscribe(
      Response => {
  this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage.includes('Duplicate') ? "Este numero ya lo tiene asignado otra persona" : Response.error.sqlMessage )

        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            form.reset()
            this.consultaTelefonoDelPersonal();

          }

        }

      },error=>{
  this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
}
  }
}
