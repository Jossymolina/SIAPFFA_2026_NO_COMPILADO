import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicioBackendService } from '../../../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../../../servicios/serviMensaje/servicios-mensaje.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  ventana: number;
}
@Component({
  selector: 'app-configurar-usuarios',
  standalone: true,
  imports: [CommonModule, CardModule, InputTextModule, InputGroupModule,
    ButtonModule, ProgressSpinnerModule, ReactiveFormsModule, FormsModule,
    TagModule, PasswordModule, DividerModule, TableModule, CheckboxModule, DialogModule,
    SelectModule
    , ToggleSwitchModule
  ],
  templateUrl: './configurar-usuarios.component.html',
  styleUrl: './configurar-usuarios.component.css',
})
export class ConfigurarUsuariosComponent {
  ventanaPrincipal = 1;
  tipoConsulta = '0';
  banderadeCarga = 0;
  ventanasegundaria = 0;
  personaseleccionada: any;
  usuarioLoguiado: any;
  usuarioBuscado;
  permisosdelUser;
  arregloFuerzas = new Array();
  arregloUnidad = new Array();
  visualizarContrasena = "password";
  fuerzaSelected;
  unidadSelected;
  permisoSelected = {
    admnistrador: ""
  }

  modules: ModuleCard[] = [
    {
      title: 'Crear Usuario',
      description: 'Crear nuevos usuarios para el sistema',
      icon: 'pi pi-user',
      ventana: 2
    },
    {
      title: 'Consultar Usuario',
      description: 'Aqui puedes consultar usuarios del sistema',
      icon: 'pi pi-briefcase',
      ventana: 2.5
    }


  ];
  @ViewChild('formIdentidad') formIdentidad: NgForm;
  @ViewChild('formCrearUser') formCrearUser: NgForm;
  private identidadregex: any = /^[0-9]*$/;

  constructor(
    private _Router: Router,
    private _Activatedroute: ActivatedRoute,
    public _DatospersonalesService: ServicioBackendService,
    private _ServiciosMensajesService: ServiciosMensajeService
  ) {
    this._Activatedroute.params.subscribe(prm => {
      this.tipoConsulta = prm['id'];



    })
  }

  ngOnInit(): void {

    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;

  }
  sacarUnidad() {
    var param = {
      idfuerza: this.fuerzaSelected.idfuerza
    }
    this.arregloUnidad = []
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.sacarunidad(param).subscribe(
      {
        next: (Response) => {
          this._ServiciosMensajesService.hide()
          if (Response.error) return this._DatospersonalesService.mensajeError(Response.error)
          if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)
          this.arregloUnidad = Response.resultado


        }, error: (error) => {
          this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeMalo("ERROR DE CONEXION")
        }
      }

    )
  }
  sacarFuerzas() {
    this.arregloFuerzas = new Array(9);
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
  sacarPermisosdeUsuario(data) {
    var param = {
      identidad: data
    }
    this.permisosdelUser = []
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.sacarPermisosDisponibles(param).subscribe(
      {
        next: (Response) => {
          this._ServiciosMensajesService.hide()

          if (Response.error) return this._DatospersonalesService.mensajeError(Response.error)
          if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)
          this.permisosdelUser = Response.resultado


        }, error: (error) => {
          this._ServiciosMensajesService.hide()

          this._DatospersonalesService.mensajeError("ERROR DSE CONEXION")

        }
      }
    )
  }


  buscarporidentidadDeUnidad() {

    this.banderadeCarga = 1;

    if (this.formIdentidad.invalid && this.formIdentidad.value === "") {
      this.banderadeCarga = 0;
      this._DatospersonalesService.mensajeError("IDENTIDAD NO VALIDA")
    } else {

      var params = {
        identidad: this.formIdentidad.value.identidad,
        idfuerza: this.usuarioLoguiado.idfuerza,
        idunidad: this.usuarioLoguiado.idunidad
      }

      this._DatospersonalesService.consultaPorIdentidadPrfuerzaYunidad(params).subscribe(
        Response => {

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
            this.banderadeCarga = 0;
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
              this.banderadeCarga = 0;
            } else {
              this.personaseleccionada = Response.resultado[0];
              this.banderadeCarga = 0;
              this.tipoConsulta = '0'
              this.ventanasegundaria = 1;
              this.banderadeCarga = 0;


            }
          }
        }
      )
    }

  }


  //busqueda globar para super y administradores de fuerzas
  buscarporidentidad(numero) {

    if (numero === 2) {
      let parametro = {
        identidad_pariente: this.formIdentidad.value.identidad
      }
      this._ServiciosMensajesService.show()
      this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
        {
          next: (Response) => {
            this._ServiciosMensajesService.hide()
            if (Response.error) return this._DatospersonalesService.mensajeError(Response.error)
            if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)
            this.personaseleccionada = Response.resultado[0];
            this.ventanaPrincipal = 3;
          }, error: (err) => {
            this._ServiciosMensajesService.hide()
            this._ServiciosMensajesService.mensajeMalo("ERROR DE CONEXION")
          },

        }
      )

    } else if (numero === 2.5) {
      let parametro = {
        identidad: this.formIdentidad.value.identidad
      }
      this._ServiciosMensajesService.show()

      this._DatospersonalesService.buscarusuario(parametro).subscribe(
        {
          next: (Response) => {
            this._ServiciosMensajesService.hide()
            if (Response.error) return this._DatospersonalesService.mensajeError(Response.error)

            if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)


            this.ventanaPrincipal = 4;
            this.usuarioBuscado = Response.resultado[0];
            this.sacarPermisosdeUsuario(this.usuarioBuscado.identidad)



          }, error: (err) => {
            this._ServiciosMensajesService.hide()
            this._ServiciosMensajesService.mensajeMalo("ERROR DE CONEXION")
          }
        }

      )

    }




  }

  crearusuario() {
    this.banderadeCarga = 1;
    if (this.formCrearUser.valid) {
      var parametro = {
        identidad: this.personaseleccionada.identidad,
        usuario: this.formCrearUser.value.usuario,
        contrasena: this.formCrearUser.value.contrasena,
        idunidad: this.usuarioLoguiado.idunidad,
        idfuerza: this.usuarioLoguiado.idfuerza
      }
      this._DatospersonalesService.crearusuario(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
            this.banderadeCarga = 0;
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
              this.banderadeCarga = 0;
            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.tipoConsulta = '1'
              this.formCrearUser.reset();
              this.ventanasegundaria = 0;
              this.banderadeCarga = 0;
            }
          }
        }
      )
    } else {
      this.banderadeCarga = 0;
      this._DatospersonalesService.mensajeError("Formulario Invalido")

    }
  }
  atras() {

    this.formCrearUser.reset();
    this.ventanaPrincipal = 2
  }
  //esto busca global
  buscarusuario() {

    Swal.fire({
      title: 'Ingrese la identidad con Guiones',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Buscar',

      preConfirm: (data) => {
        if (data) {
          var params = {
            identidad: data
          }
          this._DatospersonalesService.buscarusuario(params).subscribe(
            Response => {
              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error)
              } else {
                if (Response.mensaje) {
                  this._DatospersonalesService.mensajeError(Response.mensaje)

                } else {
                  this.tipoConsulta = "2"
                  this.usuarioBuscado = Response.resultado[0];
                  this.sacarPermisosdeUsuario(this.usuarioBuscado.identidad)

                }
              }
            }
          )
        } else {
          this._DatospersonalesService.mensajeError("RELLENE LOS CAMPOS")
        }


      },

    })

  }

  buscarusuarioLimitadoporunidad() {

    Swal.fire({
      title: 'Ingrese la identidad con Guiones',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Buscar',

      preConfirm: (data) => {
        if (data) {

          var params = {
            identidad: data,
            idfuerza: this.usuarioLoguiado.idfuerza,
            idunidad: this.usuarioLoguiado.idunidad
          }

          this._DatospersonalesService.consultaPorIdentidadPrfuerzaYunidad(params).subscribe(
            Response => {

              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
                this.banderadeCarga = 0;
              } else {
                if (Response.mensaje) {
                  this._DatospersonalesService.mensajeError(Response.mensaje)
                  this.banderadeCarga = 0;
                } else {

                  var params2 = {
                    identidad: data
                  }
                  this._DatospersonalesService.buscarusuario(params2).subscribe(
                    Response => {
                      if (Response.error) {
                        this._DatospersonalesService.mensajeError(Response.error)
                      } else {
                        if (Response.mensaje) {
                          this._DatospersonalesService.mensajeError(Response.mensaje)

                        } else {
                          this.tipoConsulta = "2"
                          this.usuarioBuscado = Response.resultado[0];
                          this.sacarPermisosdeUsuario(this.usuarioBuscado.identidad)

                        }
                      }
                    }
                  )
                }
              }
            }
          )

        } else {
          this._DatospersonalesService.mensajeError("RELLENE LOS CAMPOS")
        }


      },

    })

  }
  verContrasenas() {
    this.visualizarContrasena = this.visualizarContrasena === "text" ? "password" : "text"
  }
  atras2(data) {
    this.tipoConsulta = data + ""
  }
  resetContrasena(data: NgForm) {
    if (data.valid) {
      if (data.value.contrasena === data.value.contrasena2) {
        var parametro = {
          identidad: this.usuarioBuscado.identidad,
          contrasena: data.value.contrasena,
          Cambiocontrasena: data.value.cambio,
          usuario: this.usuarioLoguiado,
          usaurioAfectado: this.usuarioBuscado
        }
        this._DatospersonalesService.CambiarContrasena(parametro).subscribe(
          Response => {
            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)

            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)

              } else {
                this._DatospersonalesService.mensajeBueno(Response.resultado)
                data.resetForm();
              }
            }
          }, error => {
            this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
          }
        )

      } else {
        this._DatospersonalesService.mensajeError("CONTRASEÑAS NO COINCIDEN")
      }
    } else {
      this._DatospersonalesService.mensajeError("FORMULARIO INVALIDO")
    }
  }

  cambiarPermiso(data) {
    var parametro = {
      identidad: this.usuarioBuscado.identidad,
      idpermisos: data.idPermisosDisponibles,
      cambio: data.permitido === 0 ? 1 : 0
    }
    this._DatospersonalesService.cambiarPermisoUsuario(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.sacarPermisosdeUsuario(this.usuarioBuscado.identidad)
          }
        }
      }
    )
  }
  verificarPermiso(data: string[]) {
    return this._DatospersonalesService.verificarPermisos(data)

  }
  @ViewChild('formularioAdministrador') formularioAdministrador: NgForm;
  guardarCambio() {



    if (this.formularioAdministrador.valid) {

      var parametro = {
        idfuerza: this.formularioAdministrador.value.fuerzaSelected.idfuerza,
        idunidad: this.formularioAdministrador.value.unidadSelected.idunidad,
        identidad: this.usuarioBuscado.identidad,
        identidadEjecutora: this.usuarioLoguiado.identidad,
        nombreFuerza: this.formularioAdministrador.value.fuerzaSelected.nombre,
        nombreunidad: this.formularioAdministrador.value.unidadSelected.unidad,
        nombreUsuario: this.usuarioBuscado.nombres + " " + this.usuarioBuscado.apellidos
      }
      this._DatospersonalesService.modificarUsuarioAdministrarUnidad(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.formularioAdministrador.reset()

            }
          }
        }, error => {
          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
        }
      )


    } else {
      this._DatospersonalesService.mensajeError("FORMULARIO INVALIDO")
    }

  }
  async eliminarUsuario() {
    var respuesta = await this._DatospersonalesService.mensajePregunta("Eliminar", "Esta seguro de Eliminar este usuario de los Accesos!!!");

    if (respuesta) {
      if (this.usuarioLoguiado.identidad === this.usuarioBuscado.identidad) {
        this._DatospersonalesService.mensajeError("Usted no es Auto destructible!! Solo Mis Creadores lo son")
      } else {
        var parametro = {
          userafectado: this.usuarioBuscado,
          usarioejecutor: this.usuarioLoguiado

        }
        this._DatospersonalesService.eliminarUsuario(parametro).subscribe(
          Response => {
            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)
              } else {
                this._DatospersonalesService.mensajeBueno(Response.resultado)
                this.usuarioBuscado = "";
                this.atras2('1')
              }
            }
          }, error => {
            this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
          }
        )
      }

    }

  }
  cambiaVentana(numero) {
    this.ventanaPrincipal = numero;
  }
  displayFuerzaDialog = false;
  displayResetDialog = false;

  // modelo simple para el reset
  modeloResetContrasena = {
    contrasena: '',
    contrasena2: '',
    debeCambiar: false
  };

  // método para abrir el diálogo de fuerza/unidad (puedes hacer más lógica si quieres)

  get fuerzasFiltradas() {
    if (!this.usuarioLoguiado) return [];
    return this.arregloFuerzas.filter(f => f.idfuerza === this.usuarioLoguiado.idfuerza);
  }

  // dialogs


  // modelo reset contraseña


  // para fuerza filtrada cuando permiso 3
  arregloFuerzasFiltradas: any[] = [];

  // llamada al abrir el diálogo de fuerza
  abrirDialogFuerza() {
    this.sacarFuerzas(); // ya la tienes
    // si usas permiso(3), filtra aquí:
    if (this.usuarioLoguiado) {
      this.arregloFuerzasFiltradas = this.arregloFuerzas.filter(
        (f: any) => f.idfuerza === this.usuarioLoguiado.idfuerza
      );
    } else {
      this.arregloFuerzasFiltradas = this.arregloFuerzas;
    }
    this.displayFuerzaDialog = true;
  }
  async resetearQR() {
    let espera = await this._ServiciosMensajesService.mensajePregunta("Esta segur@ de resetear el QR de este usuario")
    if (!espera) return

    var parametro = {
      persona: this.usuarioBuscado,
      usuario: this.usuarioLoguiado
    }

    this._DatospersonalesService.resetearQR(parametro).subscribe(
      {
        next: (Response) => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
            }
          }
        }, error: () => {
          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
        }
      }
    )
  }
   sacarPermisoPersonalVista(permiso:string[]){
   return this._DatospersonalesService.verificarPermisos(permiso)
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
}