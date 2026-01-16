import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
   import { DialogModule } from 'primeng/dialog';
 import { ButtonModule } from 'primeng/button';
import { TbCargoComponent } from '../tb-cargo/tb-cargo.component';
 import { TabsModule } from 'primeng/tabs';
@Component({
  selector: 'app-tb-asignaciones',
  standalone:true,
  imports: [CommonModule,FormsModule,DialogModule,ButtonModule,TbCargoComponent,TabsModule],
  templateUrl: './tb-asignaciones.component.html',
  styleUrl: './tb-asignaciones.component.css',
})
export class TbAsignacionesComponent {
  arregloAsignaciones = []
   
  @Input("persona") objetoConsultado
  @Input("dias_vaca_disponible")dias_vaca_disponible
  @Output("Responder")respuestapadre = new EventEmitter() //new EventEmitter()
 
  ArregloNombramiento = []
  unidadSelected
  arreglosDeMisAsignacionesDirecciones = []
  arregloFuerzas = [];
  ArregloUnidades = [];
  usuariologuiado;
 
  direccionSelected
  fechaSelected
  fuerzaSelected;
  arrgloSituacioPersonal=[]
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
    this.sacarDireccionDeAsignado()
    this.sacarAsignacionActual()
    this.sacarSituacion();
    this.situacion_personal()
    this.sacarPermisoTransferencia()
  }
  selecionardireccion(data){
 this.direccionSelected = data;
  }
  sacarDireccionDeAsignado() {
    this.arreglosDeMisAsignacionesDirecciones = [];
    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.sacarDireccionDeAsignado(parametro).subscribe(
      Response => {
    this._ServiciosMensajesService.hide()

        this.arreglosDeMisAsignacionesDirecciones = Response.resultado;
      }, error => {
    this._ServiciosMensajesService.hide()

        this._DatospersonalesService.mensajeError("ERROR CONEXION AL INGRESAR ASIGNACION (DIRECCION | ASIGNACION)")
      }
    )
  }
  Sacar_Direcciones(data) {
    this.ArregloNombramiento = [];
    this.unidadSelected = data.unidad;
    var parametros = {
      idunidad: data.idunidad
    }
this._ServiciosMensajesService.show()
    this._DatospersonalesService.mostrarNombramiento(parametros).subscribe(
      Response => {
        this._ServiciosMensajesService.hide()
        this.ArregloNombramiento = Response.resultado
        this.sacarDireccionDeAsignado();
      }, error => {
         this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  sacarAsignacionActual() {
    this.arregloAsignaciones = [];
    var params = {
      identidad: this.objetoConsultado.identidad
    }
    var idunidad;
this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarLasAsignacionesDeunaPersona(params).subscribe(
      Response => {
        this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
        } else {
          if (Response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(Response.mesaje)
          } else {
            this.arregloAsignaciones = Response.resultado;
            this.arregloAsignaciones.forEach(element => {

              if (parseInt(element.actual) === 1) {
                idunidad = element.idunidad


              }
            });
          }

        }
        return idunidad;
      },error=>{
    this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer()
      }
    )
  }
   
  sacarFuerza() {
    this.arregloFuerzas = [];

    this._DatospersonalesService.sacarFuerza().subscribe(
      Response => {

        this.arregloFuerzas = Response.resultado;
      }
    )
  }
  async desactivarAsignacionDireccion(data) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de desactivar la asignacion")
    if (respuesta) {
      var parametro = {
        identidad: this.objetoConsultado.identidad,
        identidadEjecutora: this.usuariologuiado.identidad,
        direccion: data.descripcion,
        unidad: data.unidad
      }
   this._ServiciosMensajesService.show()
      this._DatospersonalesService.desactivarAsignacionDireccion(parametro).subscribe(
        Response => {
      this._ServiciosMensajesService.hide()

          if (Response.error) {
                       this._ServiciosMensajesService.mensajeMalo(Response.error)
          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mesaje)
              

            } else {
              this.sacarDireccionDeAsignado();
              }
          }
        }, error => {
      this._ServiciosMensajesService.hide()

          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }
    

  }
  async guardarAsignacionDireccion() {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de guardar los cambios")
if (respuesta) {
  if (this.fechaSelected === "" || this.fechaSelected === undefined || this.direccionSelected === undefined) {
    this._DatospersonalesService.mensajeError("RELLENE LOS CAMPOS")
  } else {
    var parametro = {
      identidad: this.objetoConsultado.identidad,
      identidadEjecutora: this.usuariologuiado.identidad,
      idNombramiento: this.direccionSelected.idNombramiento,
      direccion: this.direccionSelected.descripcion,
      fechaAsignacion: this.fechaSelected,
      idgrado: this.objetoConsultado.grado,
      fechaSalida: this.fechaSelected,
      unidad: this.unidadSelected
    }
   this._ServiciosMensajesService.show()
    this._DatospersonalesService.agregarAsignacionDireccion(parametro).subscribe(
      Response => {
        this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje);
          } else {

            this.sacarDireccionDeAsignado();
            this.fechaSelected = ""
            this._DatospersonalesService.mensajeBueno(Response.resultado);
          }
        }
      }, error => {
    this._ServiciosMensajesService.hide()

        this._DatospersonalesService.mensajeError("ERROR CONEXION AL INGRESAR ASIGNACION (DIRECCION | ASIGNACION)")
      }
    )
  }
}

  }
  sacarunidades() {

    this.ArregloUnidades = [];
    this._DatospersonalesService.sacarunidad(this.fuerzaSelected).subscribe(
      Response => {
        this.ArregloUnidades = Response.resultado;
      }
    )
  }
 async reasignar() {
let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de reasignar esta persona")
   if (respuesta) {
    if (this.unidadSelected === undefined || this.fechaSelected === undefined || this.fuerzaSelected === undefined) return  this._DatospersonalesService.mensajeError("RELLENE TODO LOS CAMPOS")

    if (this.objetoConsultado.codigo !== "TRO") {
       var fechaIgual = false;
        this.arregloAsignaciones.forEach(element => {
          if (element.fecha_asignacion.split("T")[0] === this.fechaSelected) {
            fechaIgual = true;
          }
        });
        if (fechaIgual) return   this._ServiciosMensajesService.mensajeAdvertencia( 'No puede haber Dos Asignaciones en la misma fecha')
        var datos = {
          identidad: this.objetoConsultado.identidad,
          idunidad: this.unidadSelected.idunidad,
          fecha_asignacion: this.fechaSelected,
          idfuerzaActual: this.objetoConsultado.idfuerza,
          idfueraAmover: this.fuerzaSelected.idfuerza,
          nivel: this.objetoConsultado.nivel,
          idelaborado: this.usuariologuiado.identidad
        }
        this._ServiciosMensajesService.show()
        this._DatospersonalesService.reasignarOficialesAuxSub(datos).subscribe(
          Response => {
            this._ServiciosMensajesService.hide()
            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)
            } else {
              this._DatospersonalesService.mensajeBueno(Response.mensaje)
              this.sacarAsignacionesPersonal();
            }
          }, error => {
            this._ServiciosMensajesService.hide()
            this._DatospersonalesService.mensajeError("Error de Coneccion 2")
          }
        )
      } else {
    /*
    personal de tropa
     */
      var fechaIgual = false;
        this.arregloAsignaciones.forEach(element => {

          if (element.fecha_asignacion.split("T")[0] === this.fechaSelected) {
            fechaIgual = true;
          }
        });
        if (fechaIgual) return this._ServiciosMensajesService.mensajeAdvertencia("No puede haber dos Asignaciones en la misma fecha")
      
        
          var asignacionActual: any;
          this.arregloAsignaciones.forEach(element => {
            if (element.actual === 1) {
              asignacionActual = element;
            }
          });
          var reasignarDatos = {
            identidad: this.objetoConsultado.identidad,
            idunidad: this.unidadSelected.idunidad,
            fecha_asignacion: this.fechaSelected,
            idfuerzaActual:  asignacionActual === undefined ? this.objetoConsultado.idfuerza : asignacionActual.idfuerza,
            idfueraAmover: this.fuerzaSelected.idfuerza,
            nivel: this.objetoConsultado.nivel,
            idelaborado: this.usuariologuiado.identidad,
            idunidad_anterior: this.objetoConsultado.idunidad
          }
          console.log(reasignarDatos)

        
         this._ServiciosMensajesService.show()
          this._DatospersonalesService.asignarpersonalaUnidad(reasignarDatos).subscribe(
            Response => {
              this._ServiciosMensajesService.hide()
              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
              } else {
                this._DatospersonalesService.mensajeBueno("Usuario Asignado Con exito")
                this.sacarAsignacionesPersonal();
              }

            }, error => {
              this._ServiciosMensajesService.hide()
              this._DatospersonalesService.mensajeError("Error de Conección")
            }
          )
     
    }

   }

  }
  sacarAsignacionesPersonal() {
    this.arregloAsignaciones = [];
    var params = {
      identidad: this.objetoConsultado.identidad
    }
    this._DatospersonalesService.sacarLasAsignacionesDeunaPersona(params).subscribe(
      Response => {

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloAsignaciones = Response.resultado;

          }

        }

      }
    )
  }
  arregloSituacion = []
  arregloSituacionDetalle = []

  sacarSituacion(){
  this.arregloSituacion = []
  
    this._DatospersonalesService.sacarSituacion().subscribe({
      next:(response)=>{
          if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
          if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
          this.arregloSituacion= response.resultado

      },error:()=>{
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }
  sacarDetalleSicuacion(data){
    this.arregloSituacionDetalle =[]
    
    this._DatospersonalesService.sacarDetalleSituacion(data.value.situacion).subscribe({
      next:(response)=>{
          if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
          if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
          this.arregloSituacionDetalle= response.resultado

      },error:()=>{
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }
   async  guardarSituacion(data:NgForm){
    
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de realizar este cambio")
    if (respuesta) {
      var parametro = {
        persona:this.objetoConsultado,
        unidad:data.value.unidadSelected,
        detalleSituacion:data.value.detalleSituacion,
        fecha_inicio:data.value.fechaInicio,
        fecha_fin:data.value.fechaFin,
        observacion:data.value.observacion,
        usaurio:this.usuariologuiado
     }
     this._ServiciosMensajesService.show()
       
     this._DatospersonalesService.guardarSituacionPersonal(parametro).subscribe({
       next:(response)=>{
     this._ServiciosMensajesService.hide()
        
           if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
           if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
            data.reset()
          this.situacion_personal()
          return this._DatospersonalesService.mensajeBueno(response.resultado)
 
       },error:()=>{
     this._ServiciosMensajesService.hide()

         this._ServiciosMensajesService.mensajeerrorServer();
       }
     })
    }
   
  }

   contarDiasLaborales(fechaInicio, fechaFin) {
    // Asegúrate de que las fechas sean objetos Date
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Asegúrate de que fechaInicio sea menor que fechaFin
    if (inicio > fin) {
        return 0;
    }

    let diasLaborales = 0;

    // Recorre los días desde fechaInicio hasta fechaFin
    for (let dia = inicio; dia <= fin; dia.setDate(dia.getDate() + 1)) {
        const diaSemana = dia.getDay();
        // Contar días de lunes (1) a viernes (5)
        if (diaSemana >= 1 && diaSemana <= 5) {
            diasLaborales++;
        }
    }

    return diasLaborales;
}

  async  guardarSituacion_vacaciones(data:NgForm){
    if (data.value.fechaFin < data.value.fechaInicio) return this._ServiciosMensajesService.mensajeMalo("Fecha incorrecta")
    //Exclusivo para guardar Vacaciones
let dia_selecionados = this.contarDiasLaborales(data.value.fechaInicio,data.value.fechaFin)
if (this.dias_vaca_disponible<dia_selecionados) return this._ServiciosMensajesService.mensajeMalo("La cantidad de dias disponibles es menor a lo solicitado")
 
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de realizar este cambio")
    if (respuesta) {
      var parametro = {
        persona:this.objetoConsultado,
        unidad:data.value.unidadSelected,
        detalleSituacion:data.value.detalleSituacion,
        fecha_inicio:data.value.fechaInicio,
        fecha_fin:data.value.fechaFin,
        observacion:data.value.observacion,
        usaurio:this.usuariologuiado
     }
        this._ServiciosMensajesService.show()
       
     this._DatospersonalesService.guardarSituacionPersonal(parametro).subscribe({
       next:(response)=>{
     this._ServiciosMensajesService.hide()
        
           if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
           if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
            data.reset()
          this.situacion_personal()
          this.responderPadre()
          return this._DatospersonalesService.mensajeBueno(response.resultado)
 
       },error:()=>{
     this._ServiciosMensajesService.hide()

         this._ServiciosMensajesService.mensajeerrorServer();
       }
     })
    }
   
  }

responderPadre(){
  this.respuestapadre.emit("Responder")
}


  situacion_personal(){
    
    let parametro = {
      identidad:this.objetoConsultado.identidad
    }
    this._ServiciosMensajesService.show()
       
    this._DatospersonalesService.sacarSituacionPersonal(parametro).subscribe({
      next:(response)=>{
    this._ServiciosMensajesService.hide()
    
          if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
          if(response.mensaje) return ''
           this.arrgloSituacioPersonal = response.resultado
      },error:()=>{
    this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }
  async  desactivarSituacion(data){
  let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de desactivar la situacion");
  if (respuesta) {
    let parametro = {
      persona:this.objetoConsultado,
      usuario:this.usuariologuiado,
      situacion:data
    }
     this._ServiciosMensajesService.show()
 this._DatospersonalesService.desactivarSituacion(parametro).subscribe({
   next:(response)=>{
 this._ServiciosMensajesService.hide()
    
       if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
       if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
        this._ServiciosMensajesService.mensajeBueno(response.resultado)
        this.situacion_personal()
   },error:()=>{
 this._ServiciosMensajesService.hide()

     this._ServiciosMensajesService.mensajeerrorServer();
   }
 })
  }
   
  }
  mostrarModalDirecciones = false;
mostrarModalCargo = false;
mostrarModalAsignaciones = false;
activeTab: string = 'asignar';
 

  permisoTrnsferencia = false
  sacarPermisoTransferencia(){
   this.permisoTrnsferencia=  this._DatospersonalesService.verificarPermisos(['A_0004'])
     //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
   }
  
}
