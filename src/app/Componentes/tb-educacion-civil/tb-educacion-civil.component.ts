import { Component, Input, ViewChild } from '@angular/core';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
 import { DialogModule } from 'primeng/dialog';
 import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-tb-educacion-civil',
  standalone:true,
  imports: [CommonModule,FormsModule,DialogModule,ButtonModule],
  templateUrl: './tb-educacion-civil.component.html',
  styleUrl: './tb-educacion-civil.component.css',
})
export class TbEducacionCivilComponent {
 arregloNivelEducativo = new Array()
  arregloProfesiones = new Array();
  arregloPais = new Array()
  arregloUniversidades = new Array()
  arregloProfesionPersona = new Array();
  usuariologuiado;
 
  @ViewChild("formularioEducacion") formularioEducacion: NgForm
  @Input("identidad") identidad;
 
  nivelSelected;
  esperar = false;
  constructor(
    private _DatospersonalesService: ServicioBackendService,
    private _ServiciosMensajeService:ServiciosMensajeService
  ) { }

  ngOnInit(): void {
       this.usuariologuiado= JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarProfeciondeUnaPersona();

  }
  ngAfterContentInit() {

    this.sacarProfeciondeUnaPersona();

  }
  cargarNiveles() {
    this.sacarEducacionCivil();
  }
  sacarEducacionCivil() {
    this.arregloNivelEducativo = new Array()
  this._ServiciosMensajeService.show()
    this._DatospersonalesService.sacarnivelesEducativos().subscribe(
      Response => {
this._ServiciosMensajeService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.arregloNivelEducativo = Response.resultado
          }

        }
      }, error => {
this._ServiciosMensajeService.hide()


        this._DatospersonalesService.mensajeError("Error de conexion")
      }
    )
  }
  sacarProfesiones() {
    this.arregloProfesiones = new Array();
    var paraetro = {
      idnivelEducativo: this.nivelSelected.idnivel_educativo
    }
    this._ServiciosMensajeService.show()

    this._DatospersonalesService.sacarprofesiondeuniversidades(paraetro).subscribe(
      Response => {
        this._ServiciosMensajeService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
          this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloProfesiones = Response.resultado

          }
        }
      }, error => {
      this._ServiciosMensajeService.hide()

        this._DatospersonalesService.mensajeError("Error de Coneccion")
      }
    )
    this.sacarCentroEducativo()
  }
  sacarPais() {
    this.arregloPais = new Array()

    this._DatospersonalesService.sacarpaises().subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.arregloPais = Response.resultado;
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("Error de conexion")
      }
    )
  }
  sacarCentroEducativo() {
    this.arregloUniversidades = new Array()

    var parametro = {
      idnivelEducativo: this.nivelSelected.idnivel_educativo
    }
    this._DatospersonalesService.sacaruniversidad(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloUniversidades = Response.resultado;
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("Error de Conexion")
      }
    )
  }
  guardarProfesion() {
    this._ServiciosMensajeService.show()

    var paraetro = {
      identidad: this.identidad,
      cuerpo: this.formularioEducacion.value
    }
    this._DatospersonalesService.guardarprofesiondeunpersonal(paraetro).subscribe(
      Response => {
       this._ServiciosMensajeService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensje) {
            this._DatospersonalesService.mensajeError(Response.mensje)

          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado);
            this.limpiar()
            this.sacarEducacionCivil();
            this.sacarProfeciondeUnaPersona();
          }
        }
      }, error => {
      this._ServiciosMensajeService.hide()


        this._DatospersonalesService.mensajeError("Error de Conexion")
      }
    )

  }
  limpiar() {
    this.formularioEducacion.reset();
    this.arregloNivelEducativo = new Array()
    this.arregloProfesiones = new Array();
    this.arregloPais = new Array()
    this.arregloUniversidades = new Array()
  }
  sacarProfeciondeUnaPersona() {
    this.arregloProfesionPersona = new Array();
    this._ServiciosMensajeService.show()

    var parametro = {
      identidad: this.identidad
    }
    this._DatospersonalesService.consultaprofecionDelPersonal(parametro).subscribe(
      Response => {
      this._ServiciosMensajeService.hide()


        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
           // this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloProfesionPersona = Response.resultado;
          }
        }
      }, error => {
    this._ServiciosMensajeService.hide()


        this._DatospersonalesService.mensajeError("Error de Conexion")

      }
    )
  }
  async eliminarprofesion(data) {
    
    var parametro = {
      idpersonal: this.identidad,
      idprofesion: data.idprofeciones,
      profesion:data.Profesion,
      idpersonaEjecutora:this.usuariologuiado.identidad
    }
    var Respuesta= await this._DatospersonalesService.mensajePregunta("Eliminar","Esta usted Seguro de eliminar este elemento")
    if (Respuesta) {
      var parametro = {
        idpersonal: this.identidad,
        idprofesion: data.idprofeciones,
        profesion:data.Profesion,
        idpersonaEjecutora:this.usuariologuiado.identidad
      }
      this._ServiciosMensajeService.show()

      this._DatospersonalesService.eliminarProfesionDelaPersona(parametro).subscribe(
        Response => {
         this._ServiciosMensajeService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
  
          } else {
            if (Response.mensje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
  
            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.sacarProfeciondeUnaPersona();
            }
          }
        }, error => {
        this._ServiciosMensajeService.hide()

          this._DatospersonalesService.mensajeError("Error de Conexion")
        }
      )
    }
  
  }
  mostrarModalEducacion = false;
  abrirModalEducacionCivil() {
  this.cargarNiveles();           // lo que ya hacías antes
  this.mostrarModalEducacion = true;
}

cerrarModalEducacionCivil() {
  this.mostrarModalEducacion = false;
}
}

