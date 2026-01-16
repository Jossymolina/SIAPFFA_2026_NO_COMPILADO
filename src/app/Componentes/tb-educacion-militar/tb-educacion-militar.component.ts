import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tb-educacion-militar',
  standalone:true,
  imports: [CommonModule,FormsModule,DialogModule,ButtonModule],
  templateUrl: './tb-educacion-militar.component.html',
  styleUrl: './tb-educacion-militar.component.css',
})
export class TbEducacionMilitarComponent {
@ViewChild("FormularioCursoMilitar") FormularioCursoMilitar:NgForm
  @Input("Identidad") Identidad;
 
  arregloPaises = [];
  arregloFuerza = [];
  arregloCentro = [];
  arregloCursos = [];
arregloCursosPersonal= [];
  usuariologuiado;
fuerzaSelected;
  paisSelected;
  centroSelected;
  cursoSelected;
  constructor(
    private _DatospersonalesService: ServicioBackendService,
    private _ServiciosMensajesService:ServiciosMensajeService
  ) { }
guardarDesdeModal(){}
  ngOnInit(): void {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;

    this.sacarPais();
  
    this.sacarCursosmilitares();

  }
  sacarPais() {
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.sacarpaises().subscribe(
            Response => {
       this._ServiciosMensajesService.hide()
        if (Response.error) {
          return this._ServiciosMensajesService.mensajeMalo(Response.error)
        } 
          if (Response.mensaje) {
           return this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
          } 
            this.arregloPaises = Response.resultado;
       }, error => {
               this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer();

      }
    )
  }
  sacarFuezasCursos() {
       this._ServiciosMensajesService.show()

    var parametro = {
      idpais: this.paisSelected.idpaises
    }
    this.arregloFuerza= [];
    this._DatospersonalesService.sacarFuerzaCursos(parametro).subscribe(
      Response => {
        this._ServiciosMensajesService.hide()
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloFuerza = Response.resultado
          }
        }
      }, erorr => {
        this._ServiciosMensajesService.hide()
        this._DatospersonalesService.mensajeError("Error de Coneccion")
      }
    )
  }
  sacarCentroMilitares(){
    this._ServiciosMensajesService.show()

    this.arregloCentro=[];
    var parametro={
      idfuerzapais:this.fuerzaSelected.idfuerzapais
    }
    this._DatospersonalesService.sacaurUnidadesCurso(parametro).subscribe(
      Response=>{
    this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this.arregloCentro= Response.resultado
            }
          }
      },error=>{
        this._ServiciosMensajesService.hide()
this._DatospersonalesService.mensajeError("Error de Coneccion")
      }
    )
  }
  sacarCursosdeCentros(){
    this._ServiciosMensajesService.show()

    this.arregloCursos= [];
    var parametro={
      idunidades_to_curso:this.centroSelected.idunidades_to_curso
    }
    this._DatospersonalesService.sacarCursosMilitares(parametro).subscribe(
      Response=>{
        this._ServiciosMensajesService.hide()
            if (Response.error) {
             this._DatospersonalesService.mensajeError(Response.erorr)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)
              } else {
                this.arregloCursos = Response.resultado
              }
            }
      },error=>{
        this._ServiciosMensajesService.hide()
        this._DatospersonalesService.mensajeError("Error de Coneccion")
      }
      )
  }
  guardar(){
   if (this.FormularioCursoMilitar.value.FechaFin <= this.FormularioCursoMilitar.value.fechaInicio) {
     this._DatospersonalesService.mensajeError("LA FECHA FIN DEBE DE SER MAYOR A LA FECHA INICIO")
   } else {
      this._ServiciosMensajesService.show()

  var paraetro={
    identidad:this.Identidad,
    cuerpo:this.FormularioCursoMilitar.value,
    usuario:this.usuariologuiado
  }
     this._DatospersonalesService.GuardarCursosmilitar(paraetro).subscribe(
       Response=>{
        this._ServiciosMensajesService.hide()
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.sacarCursosmilitares();
              this.limpiar();
              
       
            }
          }
       },error=>{
        this._ServiciosMensajesService.hide()
        this._DatospersonalesService.mensajeError("Erro de Coneccion")
       }

     )
   }
  }
  sacarCursosmilitares(){
     this._ServiciosMensajesService.show()


    var paraetro={
      identidad:this.Identidad
    }
    this.arregloCursosPersonal= []
    this._DatospersonalesService.SacarCursosMilitaresDeUnaPersona(paraetro).subscribe(
      Response=>{
    this._ServiciosMensajesService.hide()

     if (Response.error) {
      return this._ServiciosMensajesService.mensajeMalo(Response.error)
     }
      if (Response.mensaje) {
      return 0
     } 
        this.arregloCursosPersonal= Response.resultado
       },error=>{
    this._ServiciosMensajesService.hide()

         this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  async eliminar(data){
    var respuesta= await this._DatospersonalesService.mensajePregunta("Eliminar","Esta seguro de eliminar este elemento");
  if (respuesta) {
    var parametro={
      cuerpo:data,
      usuario:this.usuariologuiado,
      afactado:this.Identidad

    }
      this._ServiciosMensajesService.show()

    this._DatospersonalesService.eliminarCursodelaPersona(parametro).subscribe(
      Response=>{
        this._ServiciosMensajesService.hide()

            if (Response.error) {
               this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)
              } else {
             //   this._DatospersonalesService.mensajeError(Response.resultado)
                this.sacarCursosmilitares();
              }
            }
      },error=>{
        this._ServiciosMensajesService.hide()
        this._DatospersonalesService.mensajeError("Error de Coneccion")
      }
    )
  }
  }
  limpiar() {
    this.arregloPaises = [];
    this.arregloFuerza = [];
    this.arregloCentro = [];
    this.arregloCursos = [];
    this.FormularioCursoMilitar.reset();
    this.sacarPais();
  }
mostrarModalCurso = false;

abrirModalCurso() {
  this.limpiar();              // lo que ya hacías antes al abrir
  this.mostrarModalCurso = true;
}

cerrarModalCurso() {
  this.mostrarModalCurso = false;
}

}
