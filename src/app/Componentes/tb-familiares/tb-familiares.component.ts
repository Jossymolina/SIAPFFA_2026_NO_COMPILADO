import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { DomSanitizer } from '@angular/platform-browser';
 import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,
 
  FormGroup,
  FormBuilder,
 
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-tb-familiares',
  standalone:true,
  imports: [   CommonModule,
    FormsModule,           
    ReactiveFormsModule,   
    DialogModule,
    ButtonModule,],
  templateUrl: './tb-familiares.component.html',
  styleUrl: './tb-familiares.component.css',
})
export class TbFamiliaresComponent {
@Output("responder") reponder_padre =new EventEmitter<string>() //new EventEmitter<string>()
  @Input("identidad") identidad_entrante
  @ViewChild("cerrarModal") cerrarModal:ElementRef
  
  banderadeCarga
  arregloPadres = []
  arreglomunicipio = [];
  arregloDepartamento = []
  arregloConyugue = []
  arregloHijos = []
  objetoConsultado: any;
  banderapariente = 0;
 
  parienteConsultado: any;
  departamentoselected: any = []

  private identidadregex: any = /^[0-9]*$/;

  private patronCorreo: any = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  public formulariopariente = new UntypedFormGroup({
    nombre: new UntypedFormControl('', [Validators.required]),
    apellidos: new UntypedFormControl('', [Validators.required]),
    correo: new UntypedFormControl('', [Validators.required, Validators.pattern(this.patronCorreo)]),
    tipo_sangre: new UntypedFormControl('', [Validators.required]),
    fecha_nacimiento: new UntypedFormControl('', [Validators.required]),
    lugar_nacimiento: new UntypedFormControl('', [Validators.required]),
    estado_civil: new UntypedFormControl('', [Validators.required]),
    combatiente: new UntypedFormControl(''),
    identidad: new UntypedFormControl(''),
    nivel_educativo: new UntypedFormControl('', [Validators.required]),
    religion: new UntypedFormControl('', [Validators.required]),
    direccion_exacta: new UntypedFormControl('', [Validators.required]),
    genero: new UntypedFormControl('', [Validators.required]),

  });
  get nombre1() { return this.formulariopariente.get('nombre'); }
  get apellidos1() { return this.formulariopariente.get('apellidos'); }
  get correo1() { return this.formulariopariente.get('correo'); }

  get tipo_sangre1() { return this.formulariopariente.get('tipo_sangre'); }
  get fecha_nacimiento1() { return this.formulariopariente.get('fecha_nacimiento'); }
  get lugar_nacimiento1() { return this.formulariopariente.get('lugar_nacimiento'); }
  get estado_civil1() { return this.formulariopariente.get('estado_civil'); }

  get combatiente1() { return this.formulariopariente.get('combatiente'); }
  get identidad1() { return this.formulariopariente.get('identidad'); }
  get nivel_educativo1() { return this.formulariopariente.get('nivel_educativo'); }

  get religion1() { return this.formulariopariente.get('religion'); }
  get direccion_exacta1() { return this.formulariopariente.get('direccion_exacta'); }
  get genero() { return this.formulariopariente.get('genero'); }



  public formIdentidad = new UntypedFormGroup({
    identidad: new UntypedFormControl('', [Validators.required, Validators.pattern(this.identidadregex)]),
  });
  get identidad2() { return this.formIdentidad.get('identidad'); }
  constructor(
    private _Router: Router,
    private _Activatedroute: ActivatedRoute,
    public _DatospersonalesService: ServicioBackendService,
   
    public _DomSanitizer: DomSanitizer,
    private _ServiciosMensajesService: ServiciosMensajeService

  ) {
    /*
    this._Activatedroute.params.subscribe(prm => {
      this.tipoConsulta = prm['id'];

    })*/
  }
  ngOnInit(): void {
    this.consultaPadresoDelPersonal()
   this.sacarDepartamentos()
  }
  sacarDepartamentos(){
    this._DatospersonalesService.sacardepartamentoTodos().subscribe(
      Response => {
        this.arregloDepartamento = Response.resultado;;
      })
  }
  sacarconyugue() {
    this.arregloConyugue = []
    var parametro = {
      identidad: this.identidad_entrante
    }

    this._DatospersonalesService.consultaConyuguePersonal(parametro).subscribe(
      Response => {
        
        if( Response.resultado) this.arregloConyugue = Response.resultado;
      }
    )
  }
  sacarpadres() {
    this.arregloPadres = [];
    this.arregloHijos = [];
    this.arregloConyugue = [];

    var params = {
      identidad: this.identidad_entrante
    }

    this._DatospersonalesService.consultaPadresPersonal(params).subscribe(
      Response => {
         
        if ( Response.resultado)  this.arregloPadres = Response.resultado

        this._DatospersonalesService.consultaHijosPersonal(params).subscribe(
          Response => {
          if (Response.resultado)   this.arregloHijos = Response.resultado
              this.sacarconyugue()

          }
        )
      }
    )
 

  }
  async eliminarHijos(data: any) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminarlo de la lista");
    if (respuesta) {
      var params = {
        identidad: data.identidad
      }
this._ServiciosMensajesService.show()
      this._DatospersonalesService.deleteHijo(params).subscribe(
        Response => {
this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this._DatospersonalesService.mensajeBueno("Eliminado con Exito")
              this.sacarpadres();
            }
          }
        },error=>{
  this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }
 
  }
  async eliminaconyugue(data: any) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminarlo de la lista");
    if (respuesta) {
      var parametro = {
        identidad: data.identidad
      }
 this._ServiciosMensajesService.show()

      this._DatospersonalesService.deleteConyugue(parametro).subscribe(
        Response => {
  this._ServiciosMensajesService.hide()

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
  
            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.sacarpadres()
            }
          }
        },error=>{
  this._ServiciosMensajesService.hide()
this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }
 
  }
  limpiarBandera() {
    this.banderapariente = 0;
    this.formulariopariente.reset();
    this.formIdentidad.reset();
  }
  async eliminarPadre(data: any) {
let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminarlo de la lista")
if (respuesta) {
  var params = {
    identidad: data.identidad
  }
this._ServiciosMensajesService.show()

  this._DatospersonalesService.deletePadres(params).subscribe(
    Response => {
      this._ServiciosMensajesService.hide()

      if (Response.error) {

        this._DatospersonalesService.mensajeError(Response.error)
      } else {
        if (Response.mensaje) {
          this._DatospersonalesService.mensajeError(Response.mensaje)
        } else {
          this._DatospersonalesService.mensajeBueno("Eliminado con Exito")
          this.sacarpadres();
        }
      }
    }, error => {
      this._ServiciosMensajesService.hide()
      this._ServiciosMensajesService.mensajeerrorServer();
    }
  )
}
    
  }
  consultaPadresoDelPersonal() {
    var params = {
      identidad: this.identidad_entrante
    }
    this._ServiciosMensajesService.show()
        this.arregloPadres =[]

    this._DatospersonalesService.consultaPadresPersonal(params).subscribe({
        next:(Response)=> {
        this._ServiciosMensajesService.hide()
      
        if (Response.mensaje) {
        
        this.arregloPadres =[]
        } else {
         if(Response.resultado)  this.arregloPadres = Response.resultado;

        }
       this.consultaHijosDelPersonal()
      },error:()=>{
        this._ServiciosMensajesService.hide()

      }
    }
    
    )
    this.sacarconyugue()
  }
  consultaHijosDelPersonal() {
    var params = {
      identidad: this.identidad_entrante
    }
    this.arregloHijos = []
    this._DatospersonalesService.consultaHijosPersonal(params).subscribe(
      Response => {

        if (Response.mensaje) {
          //this._DatospersonalesService.mensajeError(Response.mensaje)
          this.arregloHijos = []
        } else {
        if(Response.resultado)   this.arregloHijos = Response.resultado;

        }

      }
    )
  }
  guardarHijo() {
    this.formulariopariente.value.combatiente = 0

    this.formulariopariente.value.identidad = this.formIdentidad.value.identidad;

    if (this.formulariopariente.valid) {
      this._DatospersonalesService.guardarPerientes(this.formulariopariente.value).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
           
             var datos2 = {
                idpadre: this.identidad_entrante,
                idhijo: this.formulariopariente.value.identidad
              }
              this._DatospersonalesService.guardarhijo(datos2).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)

                  } else {
                    if (Response.mensaje) {
                      this._DatospersonalesService.mensajeError(Response.mensaje)

                    } else {
                      this._DatospersonalesService.mensajeBueno("Guardado con exito")
                      this.sacarpadres();
                     
                      this.formulariopariente.reset();
                      this.cerrarVEntanas()
                    }
                  }
                }

              )
            }
          }

        }
      )
    } else {
      this._DatospersonalesService.mensajeError("Formulario Incompleto")


    }
  }
  
  buscarParientes() {
    if (!this.formIdentidad.valid) return this._ServiciosMensajesService.mensajeMalo("Formulario no valido")
    if (this.formIdentidad.value.identidad === this.identidad_entrante) return this._ServiciosMensajesService.mensajeMalo("Identidad igual al propietario de la cuenta")
     if (this.arregloPadres) {
       if ( this.arregloPadres.length <2) {
        this.almacenarPadres()
      } else {
        this._ServiciosMensajesService.mensajeMalo("Ya cuenta con sus dos padres")
      }
    } else {
      if(!this.arregloPadres) return this.almacenarPadres();
   
    }
  }

almacenarPadres(){
  var parametro = {
    identidad_pariente: this.formIdentidad.value.identidad
  }
  this._ServiciosMensajesService.show()

  this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
    Response => {
      this._ServiciosMensajesService.hide()

      if (Response.error) {
        this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
      } else {
        if (Response.mensaje) {
         // this._DatospersonalesService.mensajeError(Response.mensaje)
          this.banderapariente = 1;
        
        } else {
          this.parienteConsultado = Response.resultado[0]
          var datos2 = {
            idpadres: this.formIdentidad.value.identidad,
            idhijo: this.identidad_entrante
          }
    this._ServiciosMensajesService.show()


          this._DatospersonalesService.guardarpadres(datos2).subscribe(
            Response => {
      this._ServiciosMensajesService.hide()

              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error)

              } else {
                if (Response.mensaje) {
                 // this._DatospersonalesService.mensajeError(Response.mensaje)

                } else {
                  this._DatospersonalesService.mensajeBueno("Guardado con exito")
                  this.cerrarModalPadre()

                  this.formulariopariente.reset();
                  this.sacarpadres();
                }
              }
            }, error => {
      this._ServiciosMensajesService.hide()

              this._ServiciosMensajesService.mensajeerrorServer();
            }

          )
        }
      }
    }, error => {
      this._ServiciosMensajesService.hide()

      this._ServiciosMensajesService.mensajeerrorServer();
    }
  )
}


  buscarHijo() {
    if(!this.formIdentidad.valid) return this._ServiciosMensajesService.mensajeMalo("Formulario Invalido")
    if(this.formIdentidad.value.identidad === this.identidad_entrante) return this._ServiciosMensajesService.mensajeMalo("Identidad Consultada igual a la identidad del Hijo")

    if (this.arregloHijos) {
       this.alamcenarHijos()
     } else {
     if(!this.arregloHijos) return this.alamcenarHijos();
  
   }

 

  }

alamcenarHijos(){
  var parametro = {
    identidad_pariente: this.formIdentidad.value.identidad
  }
this._ServiciosMensajesService.show()

  this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
    Response => {
  this._ServiciosMensajesService.hide();

      if (Response.error) {
        this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
      } else {
        if (Response.mensaje) {
          //this._DatospersonalesService.mensajeError(Response.mensaje)
          this.banderapariente = 1;
            this.formulariopariente.controls['identidad'].setValue(this.formIdentidad.value.identidad);
        } else {
          this.parienteConsultado = Response.resultado[0]
          var datos2 = {
            idpadre: this.identidad_entrante,
            idhijo: this.formIdentidad.value.identidad
          }
         
         this._DatospersonalesService.guardarhijo(datos2).subscribe(
            Response => {
              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error)
              } else {
                if (Response.mensaje) {
                //  this._DatospersonalesService.mensajeError(Response.mensaje)
                } else {
                  this._DatospersonalesService.mensajeBueno("Guardado con exito")
                  this.formulariopariente.reset();
                 
                    this.cerrarModalHijo()
                  this.sacarpadres();
                }
              }
            }

          )
        }
      }
    },error=>{
  this._ServiciosMensajesService.hide();

      this._ServiciosMensajesService.mensajeerrorServer();
    }
  )


}

cerrarVEntanas(){
                      this.mostrarModalPadre = false;
                      this.mostrarModalHijo = false;
                      this.mostrarModalConyugue = false;
                      }

  guardarPariente() {
    this.formulariopariente.value.combatiente = 0

    this.formulariopariente.value.identidad = this.formIdentidad.value.identidad;

    if (this.formulariopariente.valid) {
     this._ServiciosMensajesService.show()

      this._DatospersonalesService.guardarPerientes(this.formulariopariente.value).subscribe(
        Response => {
          this._ServiciosMensajesService.hide();

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
           //   this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              var datos2 = {
                idpadres: this.formulariopariente.value.identidad,
                idhijo: this.identidad_entrante
              }
              this._DatospersonalesService.guardarpadres(datos2).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)

                  } else {
                    if (Response.mensaje) {
                    //  this._DatospersonalesService.mensajeError(Response.mensaje)

                    } else {
                      this._DatospersonalesService.mensajeBueno("Guardado con exito")
                      this.sacarpadres();
                   
                      this.formulariopariente.reset();
                      this.formIdentidad.reset()
                      this.cerrarVEntanas()

                    }
                  }
                }

              )
            }
          }

        }, error => {
          this._ServiciosMensajesService.hide();

          this._ServiciosMensajesService.mensajeerrorServer()
        }
      )
    } else {
      this._DatospersonalesService.mensajeError("Formulario Incompleto")


    }
  }

  guardarconyugue() {
    this.formulariopariente.value.combatiente = "0"

    this.formulariopariente.value.identidad = this.formIdentidad.value.identidad;
    
   
      if (this.formulariopariente.valid) {
this._ServiciosMensajesService.show()


        this._DatospersonalesService.guardarPerientes(this.formulariopariente.value).subscribe(
          Response => {
            this._ServiciosMensajesService.hide()

            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
             //   this._DatospersonalesService.mensajeError(Response.mensaje)
              } else {
                var datos2 = {
                  identidad1: this.identidad_entrante,
                  identidad2: this.formulariopariente.value.identidad
                }
                
                this._DatospersonalesService.agregarconyugue(datos2).subscribe(
                  Response => {
                    if (Response.error) {
                      this._DatospersonalesService.mensajeError(Response.error)

                    } else {
                      if (Response.mensaje) {
                     //   this._DatospersonalesService.mensajeError(Response.mensaje)

                      } else {
                        this._DatospersonalesService.mensajeBueno("Guardado con exito")
                        this.sacarpadres();
                     
                        this.formulariopariente.reset();
                        this.cerrarVEntanas()
                      }
                    }
                  }

                )
              }
            }

          },error=>{
this._ServiciosMensajesService.hide()
     this._ServiciosMensajesService.mensajeerrorServer()
          }
        )
      } else {
        this._DatospersonalesService.mensajeError("Formulario Incompleto")
        this.sacarpadres()

      }



  }

  buscarconyugue() {

    if(!this.formIdentidad.valid) return this._ServiciosMensajesService.mensajeMalo("Formulario no valido");
if(this.formIdentidad.value.identidad === this.identidad_entrante) return this._ServiciosMensajesService.mensajeMalo("Identidad Consultada igual a la identidad del titular");
if (this.arregloConyugue) {
  if ( this.arregloConyugue.length <1) {
    this.alamacenarConyuge()
 } else {
   this._ServiciosMensajesService.mensajeMalo("Ya cuanta con su conyugue")
 }
} else {
 if(!this.arregloConyugue) return this.alamacenarConyuge();

}




  }

  alamacenarConyuge(){
    var conyugueConsultado;
    var parametro = {
      identidad_pariente: this.formIdentidad.value.identidad
    }
    console.log(parametro)
this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
      Response => {
        this._ServiciosMensajesService.hide();

        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error.sqlMessage)

        } else {
          if (Response.mensaje) {
          //  this._ServiciosMensajesService.mensajeMalo(Response.mensaje)
            this.banderapariente = 1;
            this.formulariopariente.controls['identidad'].setValue(this.formIdentidad.value.identidad);
   
          } else {

            conyugueConsultado = Response.resultado[0]
            var datos2 = {
              identidad1: this.identidad_entrante,
              identidad2: Response.resultado[0].identidad
            }
this._ServiciosMensajesService.show()


            this._DatospersonalesService.agregarconyugue(datos2).subscribe(
                Response => {
this._ServiciosMensajesService.hide();

                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)

                  } else {
                    if (Response.mensaje) {
                    //  this._DatospersonalesService.mensajeError(Response.mensaje)

                    } else {
                      this._DatospersonalesService.mensajeBueno("Guardado con exito")
                      this.sacarpadres();
                     this.cerrarModalConyugue()
                      this.formulariopariente.reset();
                    }
                  }
                },error=>{
this._ServiciosMensajesService.hide();
this._ServiciosMensajesService.mensajeerrorServer();

                }
              )
   


          }
        }
      },error=>{
this._ServiciosMensajesService.hide();

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }


  sacarmunicipio() {
    var params = {
      iddepartamento: this.departamentoselected.iddepartamento,
      prueba: "pruena"
    }


    this._DatospersonalesService.sacarmunicipio(params).subscribe(
      Response => {

       this.arreglomunicipio = Response.resultado;

      }
    )
  }
  responderPadres_(){
    
  }
  mostrarModalPadre = false;
mostrarModalConyugue = false;
mostrarModalHijo = false;

abrirModalPadre() {
  this.limpiarBandera();
  this.banderapariente = 0;
  this.mostrarModalPadre = true;
}

cerrarModalPadre() {
  this.mostrarModalPadre = false;
}

abrirModalConyugue() {
  this.limpiarBandera();
  this.banderapariente = 0;
  this.mostrarModalConyugue = true;
}

cerrarModalConyugue() {
  this.mostrarModalConyugue = false;
}

abrirModalHijo() {
  this.limpiarBandera();
  this.banderapariente = 0;
  this.mostrarModalHijo = true;
}

cerrarModalHijo() {
  this.mostrarModalHijo = false;
}

}
