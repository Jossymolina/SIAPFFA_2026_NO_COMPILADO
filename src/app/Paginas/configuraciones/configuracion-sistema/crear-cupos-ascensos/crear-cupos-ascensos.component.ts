import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
 
@Component({
  selector: 'app-crear-cupos-ascensos',
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectModule, DatePickerModule, DialogModule, ButtonModule, InputText],
  templateUrl: './crear-cupos-ascensos.component.html',
  styleUrl: './crear-cupos-ascensos.component.css',
})
export class CrearCuposAscensosComponent {
fuerzaSelected
  idgradoControlSelected;
  arregloFuerzas = new Array();
  unidadSelected;
  ArregloUnidades = new Array();
  banderaEspiner = 0;
  ventana = 0;
  arregloControlGrados = new Array();
  arregloGrados = new Array();
  arregloCupos = new Array();
  tarjetaSelected;
  constructor(
    private _DatospersonalesService: ServicioBackendService,
    private _ServicioMensajeService: ServiciosMensajeService
  ) { }

  ngOnInit(): void {
    this.sacarFuerzas();
    this.sacarcontrolGrados();
  }
  sacarcontrolGrados() {
    var param;
    this.arregloControlGrados = new Array();

    this._DatospersonalesService.sacarControlGrados(param).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {

            this.arregloControlGrados = Response.resultado;

          }

        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      }
    )
  }
  sacarFuerzas() {
    this.ArregloUnidades = new Array();
    this._DatospersonalesService.sacarFuerza().subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {

          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloFuerzas = Response.resultado
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      }
    )
  }
  refrescarCupos(){
    this.arregloCupos = new Array();
    var parametro = {
      idunidad: this.unidadSelected.idunidad
    }
    this._DatospersonalesService.sacarcuposAscenso(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          this.ventana = 1
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloCupos = Response.resultado
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      }
    )
  }
  buscarCupos(data: NgForm) {
    if (data.valid) {
      this.arregloCupos = new Array();
  
      var parametro = {
        idunidad: this.unidadSelected.idunidad
      }
      this._ServicioMensajeService.show()
      this._DatospersonalesService.sacarcuposAscenso(parametro).subscribe(
     {
      next:(Response)=>{
          this._ServicioMensajeService.hide()
         if (Response.error) return  this._DatospersonalesService.mensajeError(Response.error)
          if (Response.mensaje)  return  this.ventana = 1
              this.ventana = 1
              this.arregloCupos = Response.resultado
        },error(err) {

          this._ServicioMensajeService.hide()
          
          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
        },
     }
      )
    } else {
      this._DatospersonalesService.mensajeError("FORMULARIO INVALIDO")
    }



  }
  sacarGrados() {
    var fuerza;
    if (this.fuerzaSelected.idfuerza===2 || this.fuerzaSelected.idfuerza===3 || this.fuerzaSelected.idfuerza===4) {
      fuerza =  this.fuerzaSelected.idfuerza;
    }else{
      fuerza=3
    }
    var param = {
      idfuerza:fuerza,
      idgradoControl: this.idgradoControlSelected.idControl_Grado
    }

    this.arregloGrados = new Array();
    this._DatospersonalesService.sacarGradosSoloAscenso(param).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloGrados = Response.resultado
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      }
    )
  }
  limpiar(){
    this.arregloControlGrados= new Array();
    this.arregloGrados = new Array();

    this.sacarcontrolGrados();
  }
  async guardarCupos(data: NgForm) {
  let r = await this._ServicioMensajeService.mensajePregunta("Esta seguro de guardar los cupos de ascenso" )
  if (!r) return;

    if (data.valid) {
      var parametro = {
        idunidad: this.unidadSelected.idunidad,
        cupos: data.value.cupos,
        idgrado: data.value.gradoSelected.idgrado,
        idcategoria: data.value.gradoSelected.idcategoria,
        fecha_ascenso:(new Date(this.fechaAscenso)).toISOString().split('T')[0]
      }
      this._ServicioMensajeService.show()
      this._DatospersonalesService.AgregarCupoAscenso(parametro).subscribe(
        {
        next:(Response)=> {
             this._ServicioMensajeService.hide()
 
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              
              data.reset();
              this.refrescarCupos();

            }
          }
        },error:()=> {
          this._ServicioMensajeService.hide()
          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")

        }
        }
       
      )
      data.reset();
    } else {
      this._DatospersonalesService.mensajeError("FORMULARIO INVALIDO")
    }

  }
  sacarunidades() {
    var parametro = {
      idfuerza: this.fuerzaSelected.idfuerza
    }
    this._ServicioMensajeService.show()
    this._DatospersonalesService.sacarunidad(parametro).subscribe(
      {
      next:(Response)=> {
                this._ServicioMensajeService.hide()
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.ArregloUnidades = Response.resultado
          }
        }
      }, error:(err)=> {
        this._ServicioMensajeService.hide()

        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      } 
    
    }
     
    )
  }
  atras(data) {
    this.ventana = data
  }
  async eliminarAscenso(data) {
    var respuesta = await this._DatospersonalesService.mensajePregunta("Eliminar", "Esta seguro de eliminar esta Tarjete de Ascenso")
    if (respuesta) {
      var parametro = {
        idunidad: data.Idunidad,
        idgrado: data.IdGrado,
        idcategoria: data.idcategoria
      }
      this._ServicioMensajeService.show()
      this._DatospersonalesService.eliminarCuposAcensos(parametro).subscribe(
        {
        next:(Response)=> {
    this._ServicioMensajeService.hide()
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)

            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
           this.refrescarCupos();

            }
          }
        },error:()=>{
   this._ServicioMensajeService.hide()

          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
        }
        }
      
      )

    }
  }
  seleccionarTarjeta(data) {
    this.tarjetaSelected = data
  }
  modificarCantidadCupos(data:NgForm){
    if (data.valid) {
      var parametro={
        cupos:data.value.cupos,
        idunidad: this.tarjetaSelected.Idunidad,
        idgrado: this.tarjetaSelected.IdGrado,
        idcategoria: this.tarjetaSelected.idcategoria
      }
      this._ServicioMensajeService.show()
  this._DatospersonalesService.actualizarcuposAcensos(parametro).subscribe(
    {
    next:(Response)=>{
     this._ServicioMensajeService.hide()
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
             this._DatospersonalesService.mensajeBueno(Response.resultado)
           this.refrescarCupos();
             data.reset();
          }
        }
    },error:()=>{
   this._ServicioMensajeService.hide()

      this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
  
    }
    }
  
  )
    } else {
      this._DatospersonalesService.mensajeError("FORMULARIO INVALIDO")
    }

  }
mostrarAgregarAscenso = false;
mostrarCambiarCupos = false;

 
 
gradoSelected: any = null;

fechaAscenso: any = null;
cupos: number | null = null;
cuposEdit: number | null = null;
 
}
