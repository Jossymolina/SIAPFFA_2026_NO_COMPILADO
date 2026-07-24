import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
   import { DialogModule } from 'primeng/dialog';
 import { ButtonModule } from 'primeng/button';
import { TbCargoComponent } from '../tb-cargo/tb-cargo.component';
 import { TabsModule } from 'primeng/tabs';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
  selector: 'app-tb-asignaciones',
  standalone:true,
  imports: [CommonModule,FormsModule,DialogModule,ButtonModule,TbCargoComponent,TabsModule,
    TreeSelectModule
  ],
  templateUrl: './tb-asignaciones.component.html',
  styleUrl: './tb-asignaciones.component.css',
})
export class TbAsignacionesComponent {
  arregloAsignaciones = []
    treeUnidades: any[] = [];
unidadesSeleccionadas: any[] = [];

  @Input("persona") objetoConsultado
  @Input("dias_vaca_disponible")dias_vaca_disponible
  @Output("Responder")respuestapadre = new EventEmitter() //new EventEmitter()
 
  ArregloNombramiento = []
  unidadSelected
  arreglosDeMisAsignacionesDirecciones = []
  arregloFuerzas = [];
  ArregloUnidades = [];
  usuariologuiado;
 
  _direccionSeleccionada
  fechaSelected
  fuerzaSelected;
  arrgloSituacioPersonal=[]
  buscarCargos=false
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
    this.sacarBajoControl()
    this.sacarTodalasUnidades()
  }
  selecionardireccion(data){
      this.buscarCargos=true
     this._direccionSeleccionada = data
     
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
  arbolDireccionSeccion = [];

  Sacar_Direcciones(data) {
    //8,1,3

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
  @ViewChild("formDireccion") formDireccion:NgForm
  async guardarAsignacionDireccion() {
        var parametro = {
      identidad: this.objetoConsultado.identidad,
      identidadEjecutora: this.usuariologuiado.identidad,
      idunidad: this.unidadesSeleccionadas["idunidad"],
      direccion: this.unidadesSeleccionadas["label"],
      fechaAsignacion:  this.formDireccion.value.fechaSelected,
      idgrado: this.objetoConsultado.grado,
      fechaSalida:  this.formDireccion.value.fechaSelected,
      unidad: this.unidadSelected
    }
 
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de guardar los cambios")
if (respuesta) {
   
    var parametro = {
      identidad: this.objetoConsultado.identidad,
      identidadEjecutora: this.usuariologuiado.identidad,
      idunidad: this.unidadesSeleccionadas["idunidad"],
      direccion: this.unidadesSeleccionadas["label"],
      fechaAsignacion:  this.formDireccion.value.fechaSelected,
      idgrado: this.objetoConsultado.grado,
      fechaSalida:  this.formDireccion.value.fechaSelected,
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
  /*sacarunidades() {

  

      this.ArregloUnidades = [];
    this._ServiciosMensajesService.show()
    console.log(this.fuerzaSelected)
    this._DatospersonalesService.sacarunidad(this.fuerzaSelected).subscribe(
   {
       next: (Response) => {
        console.log(Response)
        this._ServiciosMensajesService.hide()
        this.ArregloUnidades = Response.resultado;
      },error:(error) => {
        this._ServiciosMensajesService.hide()
      }
   }
    )


  }*/

  sacarUnidadBajoControl(form) {

    this.ArregloUnidades = [];
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.sacarunidad(form.value.fuerzaSelected).subscribe(
   {
       next: (Response) => {
        this._ServiciosMensajesService.hide()
        this.ArregloUnidades = Response.resultado;
      },error:(error) => {
        this._ServiciosMensajesService.hide()
      }
   }
    )
  }
  @ViewChild("formAsignar") formAsignar:NgForm
  async reasignar() {
   
   let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de reasignar esta persona")
   if (!this.unidadesSeleccionadas?.['data'])   return this._DatospersonalesService.mensajeError("Seleccione una unidad.");
 
    if (respuesta) {
        if (this.objetoConsultado.codigo !== "TRO") {
         var fechaIgual = false;
        //VErifico que no este una asignacion anterior en al misma fecha
        this.arregloAsignaciones.forEach(element => {
          if (element.fecha_asignacion.split("T")[0] === this.formAsignar.value.fechaSelected) {
            fechaIgual = true;
          }
        });

        if (fechaIgual) return this._ServiciosMensajesService.mensajeAdvertencia('No puede haber dos Asignaciones en la misma fecha')

        var datos = {
          identidad: this.objetoConsultado.identidad,
          idunidad:this.unidadesSeleccionadas['data'].idunidad, //this.formAsignar.value.unidadSelected.idunidad,
          fecha_asignacion: this.formAsignar.value.fechaSelected,
          idfuerzaActual: this.objetoConsultado.idfuerza,
          idfueraAmover:this.unidadesSeleccionadas['data'].idfuerza, //this.formAsignar.value.fuerzaSelected.idfuerza,
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
                  this.formAsignar.reset()
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

          if (element.fecha_asignacion.split("T")[0] ===this.formAsignar.value.fechaSelected) {
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
          idunidad: this.unidadesSeleccionadas['data'].idunidad,//this.formAsignar.value.unidadSelected.idunidad,
          fecha_asignacion: this.formAsignar.value.fechaSelected,
          idfuerzaActual: asignacionActual === undefined ? this.objetoConsultado.idfuerza : asignacionActual.idfuerza,
          idfueraAmover: this.unidadesSeleccionadas['data'].idfuerza,//this.formAsignar.value.fuerzaSelected.idfuerza,
          nivel: this.objetoConsultado.nivel,
          idelaborado: this.usuariologuiado.identidad,
          idunidad_anterior: this.objetoConsultado.idunidad
        }

        this._ServiciosMensajesService.show()
        this._DatospersonalesService.asignarpersonalaUnidad(reasignarDatos).subscribe(
          Response => {
            this._ServiciosMensajesService.hide()
            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
            } else {
              this._DatospersonalesService.mensajeBueno("Usuario Asignado Con exito")
              this.sacarAsignacionesPersonal();
                  this.formAsignar.reset()

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
  arregloBajoControl = []
  sacarBajoControl(){
    this.arregloBajoControl = []
    let p = {identidad:this.objetoConsultado.identidad}
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.sacarBajoControl(p).subscribe({
      next:(response)=>{
        this._ServiciosMensajesService.hide()
          if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
          if(response.mensaje) return  
          this.arregloBajoControl= response.data
              

      },error:()=>{
        this._ServiciosMensajesService.hide()

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
        unidad: this.unidadesSeleccionadas['data'], //data.value.unidadSelected,
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
        unidad:  this.unidadesSeleccionadas['data'], //data.value.unidadSelected,
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

   insertarBajoControl(form){
  var data = {
      unidad: this.unidadesSeleccionadas?.['data'],//form.value.unidadSelected,
      fecha_asignacion:form.value.fechaSelected,
      activo:1,
      usuario:this.usuariologuiado,
      persona:this.objetoConsultado
  }
 
  let  t = this.arregloAsignaciones.find(Element=>Element.actual === 1)
 
  if(  t && t.idunidad === data.unidad.idunidad) return this._ServiciosMensajesService.mensajeMalo("No puede asignar bajo control en la misma unidad")
  
      this._ServiciosMensajesService.show()
 this._DatospersonalesService.insertarBajoControl(data).subscribe({
   next:(response)=>{
 this._ServiciosMensajesService.hide()
    
       if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
       if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
        this._ServiciosMensajesService.mensajeBueno(response.resultado)
      form.reset()
      this.sacarBajoControl()
   },error:()=>{
 this._ServiciosMensajesService.hide()

     this._ServiciosMensajesService.mensajeerrorServer();
   }
 }) 
 
   }
  
async   desactivarBajoControlPorUnidad(data){
let r = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de desactivar el bajo control de esta unidad");
if(!r) return
      this._ServiciosMensajesService.show()
      let p = {
        identidad:this.objetoConsultado.identidad,
        persona:this.objetoConsultado,
        usuario:this.usuariologuiado
        
      }
 this._DatospersonalesService.desactivarBajoControlPorUnidad(p).subscribe({
   next:(response)=>{
 this._ServiciosMensajesService.hide()
    
       if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
       if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
        this._ServiciosMensajesService.mensajeBueno(response.resultado)
      this.sacarBajoControl()
   },error:()=>{
 this._ServiciosMensajesService.hide()

     this._ServiciosMensajesService.mensajeerrorServer();
   }
 }) 

   }
buscarSubArbol(
  arbol: any[],
  idunidad: number,
  filtroHijos?: (nodo: any) => boolean,
  puedeSeleccionar?: (nodo: any) => boolean
): any[] {

  for (const nodo of arbol) {

    if (nodo.idunidad === idunidad || nodo.data?.idunidad === idunidad) {

      const raiz = structuredClone(nodo);

      if (filtroHijos) {
        raiz.children = (raiz.children || []).filter(filtroHijos);
      }

      // La raíz nunca se puede seleccionar
      raiz.selectable = false;
      raiz.expanded = true;

      this.hacerSeleccionables(raiz.children, puedeSeleccionar);

      return [raiz];
    }

    if (nodo.children?.length) {
      const encontrado = this.buscarSubArbol(
        nodo.children,
        idunidad,
        filtroHijos,
        puedeSeleccionar
      );

      if (encontrado.length) {
        return encontrado;
      }
    }
  }

  return [];
}

hacerSeleccionables(
  nodos: any[] = [],
  puedeSeleccionar?: (nodo: any) => boolean
) {

  for (const nodo of nodos) {

    nodo.selectable = puedeSeleccionar
      ? puedeSeleccionar(nodo)
      : true;

    nodo.icon = nodo.selectable
      ? "pi pi-lock-open"
      : "pi pi-lock";

    this.hacerSeleccionables(nodo.children, puedeSeleccionar);
  }
}

obtenerSubArbol(arbol: any[], idUnidad: number): any | null {

  
    for (const nodo of arbol) {

        if (nodo.data.idunidad === idUnidad) {
            return nodo;
        }

        if (nodo.children?.length) {

            const encontrado = this.obtenerSubArbol(
                nodo.children,
                idUnidad
            );

            if (encontrado) {
              
                return encontrado;
            }
        }
    }

    return null;
}
obtenerHijosPorTipo(
    arbol: any[],
    idUnidad: number,
    unidadTipo: number
): any[] {
  //Obtener arboles

    const nodo = this.obtenerSubArbol(arbol, idUnidad);
 
    if (!nodo) {
        return [];
    }

    const resultado: any[] = [];

    const recorrer = (nodoActual: any) => {

        if (!nodoActual.children) {
            return;
        }

        for (const hijo of nodoActual.children) {

            if (hijo.data.unidad_tipo === unidadTipo) {
                resultado.push(hijo);
            }

            recorrer(hijo);
        }
    };

    recorrer(nodo);

    return resultado;
}

 
treeUnidadesSeccion: any[] = [];

  sacarTodalasUnidades() {
    this._ServiciosMensajesService.show();

    this._DatospersonalesService.sacarTodalasUnidades().subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide();
        const unidades = response.resultado || [];
        const seccionesDirecciones =   response.resultado || [];
        let nodo = unidades.filter((x: any) => x.id_unidad_padre == null)
          .map((x: any) =>
            this.construirJerarquiaUnidades(
              x,
              unidades
            )
          );

          let nodo_direcciones = seccionesDirecciones.filter((x: any) => x.id_unidad_padre == null)
          .map((x: any) =>
            this.construirJerarquiaUnidades(
              x,
              unidades
            )
          );

         this.treeUnidades = nodo.map((x: any) => this.convertirTreeNodeUnidad(x));

         this.treeUnidadesSeccion = nodo_direcciones.map((x: any) => this.convertirTreeNodeUnidadDirecciones(x));
       
       
        let verAsignacionActual = this.arregloAsignaciones.find(elemet => {return elemet.actual===1})
 
    
        if(verAsignacionActual.idunidad===94){
          //Estado Mayor Conjunto
        this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3071,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===108){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3064,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===109){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3079,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===119){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3068,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===48){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3095,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===49){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3090,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===50){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3091,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===51){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3092,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===52){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3093,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===53){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3094,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else if(verAsignacionActual.idunidad===141){
             this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            nodo => nodo.data.idunidad===3096,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }else{
           this.arbolDireccionSeccion = this.buscarSubArbol(
                                            this.treeUnidades,
                                            verAsignacionActual.idunidad,  
                                            undefined,
                                            nodo => nodo.data.unidad_tipo !== 10
                                          ) 
        }
         
         

     
      },
      error: () => {

        this._ServiciosMensajesService.hide();
        this._ServiciosMensajesService.mensajeerrorServer();

      }
    });
}

  private construirJerarquiaUnidades(
    item: any,
    unidad: any[],
    rutaPadre: string = ''
  ): any {

    const rutaActual = rutaPadre
      ? `${rutaPadre} > ${item.unidad_nombre}`
      : item.unidad_nombre;

    const hijos = unidad
      .filter(x => x.id_unidad_padre == item.idunidad)
      .map(x =>
        this.construirJerarquiaUnidades(
          x,
          unidad,
          rutaActual
        )
      );

    return {
      ...item,
      ruta: rutaActual,
      hijos
    };

  }

    private convertirTreeNodeUnidad(
  nodo: any
): any {

  const esHoja = (nodo.unidad_tipo===5 || nodo.unidad_tipo ===4 || nodo.unidad_tipo ===6 || nodo.unidad_tipo ===7 || nodo.unidad_tipo ===11) ? true : false // nodo.hijos.length === 0;

  return {

    key: String(nodo.idunidad),

    label: nodo.unidad_nombre,

    data: nodo,
    unidad_tipo:nodo.unidad_tipo,
    idunidad:nodo.idunidad,


    selectable: esHoja,

    icon: esHoja
      ? 'pi pi-lock-open'
      : 'pi pi-lock',

    children: nodo.hijos.map((h: any) =>
      this.convertirTreeNodeUnidad(h)
    )

  };

}


    private convertirTreeNodeUnidadDirecciones(
  nodo: any
): any {

  const esHoja = (nodo.unidad_tipo===1 || nodo.unidad_tipo ===8 || nodo.unidad_tipo ===12 || nodo.unidad_tipo ===13
    || nodo.unidad_tipo ===14 || nodo.unidad_tipo ===3 || nodo.unidad_tipo ===9 || nodo.unidad_tipo ===3 || nodo.unidad_tipo ===9
     
  ) ? true : false // nodo.hijos.length === 0;

  return {

    key: String(nodo.idunidad),

    label: nodo.unidad_nombre,

    data: nodo,
    unidad_tipo:nodo.unidad_tipo,
    idunidad:nodo.idunidad,
    selectable: esHoja,

    icon: esHoja
      ? 'pi pi-lock-open'
      : 'pi pi-lock',

    children: nodo.hijos.map((h: any) =>
      this.convertirTreeNodeUnidadDirecciones(h)
    )

  };

}
establecerSelectablePorTipo(arbol: any[], unidadTipo: number): void {
    for (const nodo of arbol) {
        const esHoja = !nodo.children || nodo.children.length === 0;
        nodo.selectable = esHoja;
        nodo.icon = esHoja
            ? 'pi pi-lock-open'
            : 'pi pi-lock';

        if (nodo.children?.length) {
            this.establecerSelectablePorTipo(nodo.children, unidadTipo);
        }
    }
}
/*

establecerSelectablePorTipo(arbol: any[], unidadTipo: number): void {

    for (const nodo of arbol) {
        
    if([1,3,8,5,9].includes(nodo.unidad_tipo)){
        nodo.selectable = true;
        
        nodo.icon = 'pi pi-lock-open'   ;
    }
        
        
 

        if (nodo.children?.length) {
            this.establecerSelectablePorTipo(nodo.children, unidadTipo);
        }
    }
}
*/

@ViewChild("formBajoControl")formBajoControl:NgForm
@ViewChild("ngFromsituacion") ngFromsituacion:NgForm
limpiar(){
  this.formBajoControl.reset()
  this.formAsignar.reset()
  this.ngFromsituacion.reset()
}

}
