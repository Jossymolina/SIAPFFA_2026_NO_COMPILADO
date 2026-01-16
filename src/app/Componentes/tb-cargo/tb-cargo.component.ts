import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
 

@Component({
  selector: 'app-tb-cargo',
  standalone:true,
  imports: [
    CommonModule,
FormsModule
  ],
  templateUrl: './tb-cargo.component.html',
  styleUrl: './tb-cargo.component.css',
})
export class TbCargoComponent {
 arreglosRam = []
  @Input("persona") objetoConsultado
  @Input("direccion") seccionselected
 
  arreglosSeccion = []

  arregloPuestos = [];
  arregloAsignaciones = [];
  puestoSelected;
  numeroAcuerdo;
  fechaSelected
  desplegarFormulario = false;
  usuariologuiado;
  activar = false;
  constructor(
 
    public _DatospersonalesService: ServicioBackendService,
 

    private _ServiciosMensajesService: ServiciosMensajeService

  ) {
    /*
    this._Activatedroute.params.subscribe(prm => {
      this.tipoConsulta = prm['id'];

    })*/
  }
  ngOnInit(): void {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacsarcargodelapersona()
    this.sacarpuestos();
    this.sacarPermisoPersonal();
  }
  desplegar(data: boolean) {
    this.desplegarFormulario = data;
  }
  async desactivrPuesto() {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de desactivar el puesto de esta persona")
    if (respuesta) {
      var parametro = {
        identidad: this.objetoConsultado.identidad
      }
      if (respuesta) {
        this.activar = !this.activar
        this._DatospersonalesService.desactivarPuesto(parametro).subscribe(
          Response => {
            this.activar = !this.activar

            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)

              } else {
                this.sacsarcargodelapersona();
                this.sacarpuestos();
              }
            }
          }, error => {
            this.activar = !this.activar
            this._ServiciosMensajesService.mensajeerrorServer()
          }
        )
      }
    }



  }
  sacsarcargodelapersona() {
    this.arreglosRam = [];

    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    this.activar = !this.activar
    this._DatospersonalesService.sacarCargoDeUnapersona(parametro).subscribe(
      Response => {
        this.activar = !this.activar

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arreglosRam = Response.resultado;

          }
        }

      }, error => {
        this.activar = !this.activar

        this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL RELIZAR LA CONSULTA POR CARGO")
      }
    )
  }
  sacarDirecionesNombramiento() {
    this.sacarasignaciondireccionActual();

    this.asyncCall();


  }
  sacarpuestos() {
    this.arregloPuestos = [];
    var data = {
      idnombramiento: this.seccionselected.idNombramiento
    }
    this.activar = !this.activar

    this._DatospersonalesService.MostrarPuesto(data).subscribe(
      Response => {
        this.activar = !this.activar

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloPuestos = Response.resultado;
          }
        }
      }, error => {
        this.activar = !this.activar
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  sacarasignaciondireccionActual(identidad?) {
    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    this._DatospersonalesService.sacarDireccionAsignadoActual(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this.seccionselected = Response
          } else {
            this.seccionselected = Response.resultado[0]
            this.sacarpuestos();
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL SACAR ASIGNACION DE DIRECCION")
      }
    )

  }
  async asyncCall() {
    this.arreglosSeccion = [];
    const result = await this.resolveAfter2Seconds();

    if (result === "error") {
      this._DatospersonalesService.mensajeError("Esta persona no cuenta con asignaciones")
    } else {
      var parametro = {
        idunidad: result
      }
      this._DatospersonalesService.mostrarNombramiento(parametro).subscribe(
        Response => {

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {

              this.arreglosSeccion = Response.resultado;

            }
          }
        }
      )
    }

  }
  resolveAfter2Seconds() {
    return new Promise(resolve => {
      this.arregloAsignaciones = [];
      var params = {
        identidad: this.objetoConsultado.identidad
      }
      var idunidad;
      this._DatospersonalesService.sacarLasAsignacionesDeunaPersona(params).subscribe(
        Response => {

          if (Response.error) {

            resolve("error");
          } else {
            if (Response.mensaje) {

              resolve("error");
            } else {


              Response.resultado.forEach(element => {

                if (parseInt(element.actual) === 1) {
                  idunidad = element.idunidad
                  resolve(idunidad);
                }
              });
            }

          }

        }
      )


    });
  }
  async guardarCargo() {
    let respuest = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de agregar este puesto a esta persona?");
    if (respuest) {
      if (this.puestoSelected === undefined || this.fechaSelected === undefined || this.objetoConsultado.identidad === undefined ||
        this.numeroAcuerdo === undefined || this.usuariologuiado.identidad === undefined || this.objetoConsultado === undefined) {
        this._DatospersonalesService.mensajeError("HAY CAMPOS NO SELECCIONADOS")
      } else {
        var parametros = {
          idPuesto: this.puestoSelected.idPuesto,
          fechaInicio: this.fechaSelected,
          identidad: this.objetoConsultado.identidad,
          fechaFin: "null",
          acuerdo: this.numeroAcuerdo,
          elaborado_por: this.usuariologuiado.identidad,
          idgrado: this.objetoConsultado.grado
        }
        this.activar = !this.activar
        this._DatospersonalesService.agregarPersonaenOrganizacion(parametros).subscribe(
          Response => {
            this.activar = !this.activar

            if (Response.error) {
              if (Response.error.sqlMessage.includes("Duplicate")) return this._DatospersonalesService.mensajeError("Esta persona ya tiene o tuvo una asignación en esta fecha")
              return this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)

              } else {
                this.desplegarFormulario = false;
                //this._DatospersonalesService.mensajeBueno(Response.resultado)
                this.sacsarcargodelapersona();
              }
            }
          }, error => {
            this.activar = !this.activar
            this._ServiciosMensajesService.mensajeerrorServer();
          }
        )

      }
    }


  }
  permisoPagoCargo = false;
  sacarPermisoPersonal( ){
   this.permisoPagoCargo =   this._DatospersonalesService.verificarPermisos(['P_0004'])
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}
