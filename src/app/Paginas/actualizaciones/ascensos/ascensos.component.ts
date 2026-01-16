import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
 
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
ReactiveFormsModule
@Component({
  selector: 'app-ascensos',
  standalone:true,
  imports: [
    CommonModule,
FormsModule,

  ReactiveFormsModule,

    // PrimeNG
    CardModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessageModule,
    TagModule
  ],
  templateUrl: './ascensos.component.html',
  styleUrl: './ascensos.component.css',
})
export class AscensosComponent {

  constructor(private _Activatedroute: ActivatedRoute, private _DatospersonalesService: ServicioBackendService, private _ServiciosMensajeService: ServiciosMensajeService) { }
  tarjetaSelected;
  tipoConsulta="1";
  
  objetoConsultado:any 
  ventanasegundaria:any;
  fechaActual:any;
  gradoSelected:any
  banderaEspiner=0;
  usuarioLogin:any;
  arregloCupos= new Array();
  private identidadregex: any = /^[0-9]*$/;
  
  gradosAutorizadoAscenso = new Array()
  public formIdentidad = new UntypedFormGroup({
    identidad: new UntypedFormControl('', [Validators.required, Validators.pattern(this.identidadregex)]),
  });
  get identidad() { return this.formIdentidad.get('identidad'); }
  sacarFechaActual(){
    
    this._DatospersonalesService.sacarFecha().subscribe(
      Response=>{
        this.fechaActual = Response.fecha
      }
    )
  }
  ngOnInit(): void {
   this.sacarFechaActual();
    this.usuarioLogin = JSON.parse(localStorage.getItem('user_login')!).user;
    this.buscarCuposAscenso();
  }
  buscarporidentidad() {
   

    if (this.formIdentidad.invalid) {
     
      this._DatospersonalesService.mensajeError("IDENTIDAD NO VALIDA")
    } else {

      var params = {
        identidad: this.formIdentidad.value.identidad,
        idfuerza: this.usuarioLogin.idfuerza
      }
this._ServiciosMensajeService.show()
      this._DatospersonalesService.consultaPorIdentidad(params).subscribe(
        {
          next: (Response) => {
this._ServiciosMensajeService.hide()
          if (Response.error) return  this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
           if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)
              this.tipoConsulta = "0";
              this.ventanasegundaria = 2;
              this.objetoConsultado = Response.resultado[0]
             var parametro={
                autorizado:1
              }
               
              this.sacarGradosAutorizados(parametro)

             
          },error:()=>{
this._ServiciosMensajeService.hide()
this._ServiciosMensajeService.mensajeMalo("Error en el servidor")
          }
        }
      )
    }

  }
  sacarGradosAutorizados(parametro){
       this._DatospersonalesService.sacarGrados(parametro).subscribe(
                    Response=>{
                      if (Response.error) {
                        
                      } else {
                        if (Response.mensaje) {
                          
                        } else {
                         this.gradosAutorizadoAscenso= Response.resultado
                        }
                      }
                    }
              
                  )
  }
  async  ascender(){
    let r = await  this._ServiciosMensajeService.mensajePregunta("¿Desea guardar el ascenso?")
    if(!r) return;

      var parametro={
        idpersonal:this.objetoConsultado.identidad,
        idgradonuevo:this.tarjetaSelected.IdGrado,
        idcategoria:this.objetoConsultado.idcategoria,
        idcategoria_cupo:this.tarjetaSelected.idcategoria,
        fechaAscenso:this.tarjetaSelected.FechaAutorizada,
        ejecutado_por:this.usuarioLogin.identidad,
        idunidad:this.usuarioLogin.idunidad,
        nombrePersonaEjecuto:this.usuarioLogin.nombres+" "+this.usuarioLogin.apellidos,
        nombresPersonaAfectada:this.objetoConsultado.nombres+" "+this.objetoConsultado.apellidos
      }
      console.log(this.objetoConsultado)
     // if(parametro.idgradonuevo)
     if(this.objetoConsultado.idcategoria!==this.tarjetaSelected.idcategoria) return this._ServiciosMensajeService.mensajeMalo("La categoria del nuevo grado no coincide con la categoria actual de la persona")
      if(parametro.idgradonuevo <= this.objetoConsultado.idgrados) return this._DatospersonalesService.mensajeError("El grado nuevo debe ser mayor al grado actual")
      
 
 this._ServiciosMensajeService.show()
      this._DatospersonalesService.guardarascenso(parametro).subscribe(
        Response=>{
          this._ServiciosMensajeService.hide()
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
            this.banderaEspiner=0;
          } else {
            if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
            this.banderaEspiner=0;
              
            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.banderaEspiner=0;
               this.atras();
              this.buscarCuposAscenso();
              
             // this.buscarporidentidad()
            }
          }
         
        }
      )
    
 
    this.gradoSelected=null; 
  }
  atras(){
    this.tipoConsulta='1'
    this.ventanasegundaria=0;
  }
  verificarPermiso(data){
    return  this._DatospersonalesService.verificarPermisos(data)
   
   }


   //Nuevo ascenso metodos
   buscarCuposAscenso() {

      this.arregloCupos = [];
  
      var parametro = {
        idunidad: this.usuarioLogin.idunidad
      }
   this._ServiciosMensajeService.show();
      this._DatospersonalesService.sacarcuposAscenso(parametro).subscribe(
     {
      next :(Response)=>{
 this._ServiciosMensajeService.hide()
            if (Response.error) return  this._DatospersonalesService.mensajeError(Response.error)
             if (Response.mensaje)  return
            this.arregloCupos = Response.resultado
           
         
           
        
      },error:()=>{
         this._ServiciosMensajeService.hide()
         this._ServiciosMensajeService.mensajeMalo("Error en el servidor")
      }
      
     }
      )
     }
     siguiente(data){
       if (data.Cupos<=0) {
         this._DatospersonalesService.mensajeError("No cuenta con cupos");
       } else {
         this.tarjetaSelected=data
         this.ventanasegundaria=1
         this.tipoConsulta='0';
       }
     
     }
    
}