import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
  import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import Swal from 'sweetalert2';
// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';        // antes era DropdownModule
import { DatePickerModule } from 'primeng/datepicker'; // reemplaza CalendarModule
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

 
@Component({
  selector: 'app-crear-cupos-ingreso',
  standalone:true,
  imports: [CommonModule,
  FormsModule,ReactiveFormsModule,
  DialogModule,
    SelectModule,       
    DatePickerModule,
    InputTextModule,
    ButtonModule
],
  templateUrl: './crear-cupos-ingreso.component.html',
  styleUrl: './crear-cupos-ingreso.component.css',
})
export class CrearCuposIngresoComponent {
esperar= false;
ueSeleccionada
  agregarNuevoCupo = {
    cantidadAutorizada: 0,
    combatiente: "",
    idcategoria: "",
    fechaIngreso: ""
  }

  desplegar = 1;
  objetoSelecionado;
  ordencategoriaSelected;
  arregloCupos = new Array()
  arregloPuestos;
  seccionselected;
  puestoSelected;
  numeroAcuerdo;
  banderapariente = 0;
  usuarioLoguiado
  noesvalido = false;
  personaQueAreasta: any;
  fechaSelected: any;//Fecha fechaSelected
  nombreDocumento: any;
  arreglosDeMisAsignacionesDirecciones = new Array();
  verCarpeta = 0
  idarrestoSelected;
  departamentoselected: any
  banderacambiocategoria;
  arregloDepartamento = new Array();
  municipioSelected: any
  actualizarfechaIngreso;
  arreglocarpetasegunda = new Array()
  banderaEspiner = 0;
  imgURL: any = "";
  paisSelected: any;
  gradoActualdelConsultado: any;
  arreglocarpetaprincipal = new Array()
  arreglosSeccion = new Array();
  arreglodeDocumentos = new Array()
  idcarpetaPrincipal: any;
  idcarpetaSegundaria: any;
  armaselected: any;
  parienteConsultado: any;
  arreglosRam = new Array()
  arregloFuerzas = new Array();
  ArregloUnidades = new Array()
  ArregloNombramiento = new Array()
  ArregloPuestos = new Array()
  public FilesToUploads: Array<File> = new Array();
  arregloEducacionCivil = new Array();
  arregloarmas = new Array();
  arregloPaises = new Array();
  arregloConyugue = new Array()
  arregloMisPaises = new Array();
  arregloMisIdiomas = new Array()
  arregloIdiomas = new Array();
  arregloTelefono = new Array();
  arregloPadres = new Array();
  arregloHijos = new Array();
  arregloGrados = new Array();
  arregloAscensos = new Array();
  arreglomunicipio = new Array();
  arregloAsignaciones = new Array()
  arregloArestos = new Array();
  arregloCategorias = new Array();
  fuerzaSelected;
  unidadSelected
  nombramientoSelected;
  data = {
    nombramiento: "",
    orden: ""
  }
  dataPuesto = {
    Nombre_Puesto: "",
    orden: ""
  }
  idiomaSelected = {
    idmisidiomas: "",
    nivel: 0,
    idpersonal: ""
  }
  objetoConsultado;
  armaobjetoConsultado
  SegundaVentana;
  consulta = {
    identidad: ""
  }
  banderadeCarga = 0;
  fechanuevadeNacimiento: any;
  numerocuentaAcambiar = "";
  lineaAsecenso = {
    personal_idpersonal: "",
    banderaPrimerIgreso: "",
    categoria_idcategoria: "",
    ejecutado_por: "",
    fecha: "",
    FechaPrimerIngreso: "",
    grado: "",
    numeroAcuerdo: "",
    activo: "",
    idunidad: "",
    idfuerza: ""


  }
  direccionSelected;
  gradoaeliminar;
  gradoqueVaQuedar;


  private identidadregex: any = /^[0-9]*$/;
  private nmumeroregex: any = /[9|8|3|2]{1}\d{3}[-]\d{4}/;
  private solo_numero: any = /\d+$/;

  private patronCorreo: any = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  public formularioAresto = new UntypedFormGroup({

    identidad: new UntypedFormControl(''),
    identidadAcusador: new UntypedFormControl('', [Validators.required, Validators.pattern(this.identidadregex)]),
    fecha: new UntypedFormControl('', [Validators.required]),
    motivo: new UntypedFormControl('', [Validators.required]),
    hora: new UntypedFormControl('', [Validators.required]),


  });
  get identidad() { return this.formularioAresto.get('identidad'); }
  get identidadAcusador() { return this.formularioAresto.get('identidadAcusador'); }
  get fecha() { return this.formularioAresto.get('fecha'); }
  get motivo() { return this.formularioAresto.get('motivo'); }
  get hora() { return this.formularioAresto.get('hora'); }
  //para agregar telefono
  public telefono = new UntypedFormGroup({
    numeroTelefono: new UntypedFormControl('', [Validators.required, Validators.pattern(this.nmumeroregex)])
  });
  get numeroTelefono() { return this.telefono.get('numeroTelefono'); }
  public formIdentidad = new UntypedFormGroup({
    identidad: new UntypedFormControl('', [Validators.required, Validators.pattern(this.identidadregex)]),
  });
  get identidad2() { return this.formIdentidad.get('identidad'); }


  public cambionumeroCuenta = new UntypedFormGroup({
    cuenta: new UntypedFormControl('', [Validators.required, Validators.pattern(this.solo_numero)]),
  });
  get cuenta() { return this.cambionumeroCuenta.get('cuenta'); }

  public cupos = new UntypedFormGroup({
    numero: new UntypedFormControl('', [Validators.required, Validators.pattern(this.solo_numero)]),
  });
  get numero() { return this.cupos.get('numero'); }
  //Formulario de pariente
  public formulariopariente = new UntypedFormGroup({
    nombre: new UntypedFormControl('', [Validators.required]),
    apellidos: new UntypedFormControl('', [Validators.required]),
    correo: new UntypedFormControl('', [Validators.required, Validators.pattern(this.patronCorreo)]),
    tipo_sangre: new UntypedFormControl('', [Validators.required]),
    fecha_nacimiento: new UntypedFormControl('', [Validators.required]),
    lugar_nacimiento: new UntypedFormControl('', [Validators.required]),
    estado_civil: new UntypedFormControl('', [Validators.required]),
    combatiente: new UntypedFormControl(''),
    identidad1: new UntypedFormControl(''),
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
  get identidad1() { return this.formulariopariente.get('identidad1'); }
  get nivel_educativo1() { return this.formulariopariente.get('nivel_educativo'); }

  get religion1() { return this.formulariopariente.get('religion'); }
  get direccion_exacta1() { return this.formulariopariente.get('direccion_exacta'); }
  get genero() { return this.formulariopariente.get('genero'); }

  arregloControlGrados = new Array();
arreglounidadEjecutora = []
  constructor(private _Activatedroute: ActivatedRoute, public _DatospersonalesService: ServicioBackendService,
    private _Router: Router, private _ServiciosMensajeService: ServiciosMensajeService
  ) {
     
  }

  ngOnInit(): void {
    this.sacarFuerza();
    this.sacarcontrolGrados();
    this.sacarIdiomas();
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user
    this._DatospersonalesService.sacardepartamentoTodos().subscribe(
      Response => {
        this.arregloDepartamento = Response.resultado;;
      })
      this.sacarUnidadEjecutora()
  }
  sacarUnidadEjecutora(){
    this._DatospersonalesService.sacarUnidadEjecutora().subscribe({
      next:(response)=>{
          this.arreglounidadEjecutora = response.resultado
      },error:()=>{

      }
    })
  }
  limpiarArreglos(){
    this.agregarNuevoCupo = {
      cantidadAutorizada: 0,
      combatiente: "",
      idcategoria: "",
      fechaIngreso: ""
    }
    this.sacarcontrolGrados();
  
  }
  sacarcontrolGrados() {
    var param;
    this.arregloControlGrados = new Array();
    this.arreglosRam = new Array();
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
  actualizarCuenta() {
   
    if (!this.cambionumeroCuenta.valid) {
      this._DatospersonalesService.mensajeError("ERROR | SOLO NUMEROS SON ACEPTADOS EN EL NUMERO DE CUENTA")
    } else {
      var params = {
        updtate: this.cambionumeroCuenta.value.cuenta,
        identidad: this.objetoConsultado.identidad,
        cuentaVieja:this.objetoConsultado?.cuenta_banco,
        usuario: this.usuarioLoguiado
      }

      this._DatospersonalesService.actualizarCuentaBanco(params).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.cambionumeroCuenta.reset();
            this.buscarporIdentidad();
          }
        }
      )

    } 
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
  makeFileReques(url: string, params: Array<String>, file: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();


      if (file === undefined) {
        this._DatospersonalesService.mensajeError("SELECCIONE EL ARCHIVO")
      } else {
        for (let i = 0; i < file.length; i++) {
          formData.append("files", file[i], file[i].name);

        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(xhr.response);
            }

          } else {

          }
        }

        xhr.open("POST", url, true);
        xhr.send(formData)
      }


    })



  }
  guardarImagen() {

    this.makeFileReques(this._DatospersonalesService.url2 + "subirArchivo/" + this.objetoConsultado.identidad, [], this.FilesToUploads).then(
      (result: any) => {


        this.imgURL = "";
        if (result.error) {
          this._DatospersonalesService.mensajeError(result.error)

        } else {
          if (result.mesaje) {
            this._DatospersonalesService.mensajeError(result.mensaje)
          } else {
            this._DatospersonalesService.mensajeBueno(result.resultado);
            this.buscarporIdentidad()

          }

        }
      }
    )

  }
  // guardo la foto del primer ingreeso

  verificarImagen() {
    this.banderadeCarga = 1;
    if (this.objetoConsultado.foto === "null" || this.objetoConsultado.foto === null || this.objetoConsultado.foto === "Ninguna") {
      this.guardarImagen();
      this.banderadeCarga = 0;

    } else {


      var params = {
        archivo: this.objetoConsultado.foto
      }
      this._DatospersonalesService.eliminararchivo(params).subscribe(
        Response => {

          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
            //Por si no encuentra la imagen lo crea
            this.guardarImagen();
            this.banderadeCarga = 0;
          } else {
            this.banderadeCarga = 0;
            this.guardarImagen();
          }
        }
      )

    }


  }
  fileChangeEvenet(fileInput: any) {

    this.FilesToUploads = <Array<File>>fileInput.target.files;


  }
  preview(files: any, fileInput: any) {

    this.fileChangeEvenet(fileInput)
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {

      return;
    }

    var reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;


    }


  }
  guardarmunicipio() {

    if (this.municipioSelected === undefined) {
      this._DatospersonalesService.mensajeError("SELECCIONE EL MUNICIPIO")
    } else {
      var parametro = {
        identidad: this.objetoConsultado.identidad,
        idmunicipio: this.municipioSelected.idmunicipio
      }
      this._DatospersonalesService.ActualizarlugarNacimiento(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.buscarporIdentidad();
          }
        }
      )
    }
  }
  sacarFuerza() {


    this.arregloFuerzas = [];
    this._ServiciosMensajeService.show();

    this._DatospersonalesService.sacarFuerza().subscribe(
      Response => {
        this._ServiciosMensajeService.hide();

        this.arregloFuerzas = Response.resultado;

      },error=>{
        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeMalo("Error de conexion, consulte con soporte tecnico")
      }
    )
  }
  sacarunidades() {

    this.ArregloUnidades = [];
    this._ServiciosMensajeService.show();
    this._DatospersonalesService.sacarunidad(this.fuerzaSelected).subscribe(
      Response => {
        this._ServiciosMensajeService.hide();
        this.ArregloUnidades = Response.resultado;
      },error=>{
        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeMalo("Error de conexion, consulte con soporte tecnico")
      }
    )
  }

  sacarNombranmiento() {
    this.ArregloNombramiento = new Array();
    var parametros = {
      idunidad: this.unidadSelected.idunidad
    }

    this._DatospersonalesService.mostrarNombramiento(parametros).subscribe(
      Response => {

        this.ArregloNombramiento = Response.resultado
      }, error => {
        this._DatospersonalesService.mensajeError("Ocurrio un error en la peticion")
      }
    )
  }

  Sacar_Direcciones(data) {
    this.ArregloNombramiento = new Array();
    this.unidadSelected = data.unidad;
    var parametros = {
      idunidad: data.idunidad
    }

    this._DatospersonalesService.mostrarNombramiento(parametros).subscribe(
      Response => {

        this.ArregloNombramiento = Response.resultado
        this.sacarDireccionDeAsignado();
      }, error => {
        this._DatospersonalesService.mensajeError("Ocurrio un error en la peticion")
      }
    )
  }


  sacarPuestos_delNombramiento(data) {

    this.ArregloPuestos = new Array();
    var parametros = {
      idnombramiento: data
    }
    this.nombramientoSelected = data;
    this._DatospersonalesService.MostrarPuesto(parametros).subscribe(
      Response => {

        this.ArregloPuestos = Response.resultado

      },
      error => {
        this._DatospersonalesService.mensajeError("Error de Coneccion llame a Soporte Tecnico")
      }
    )
  }
  guardar_Nombramiento() {
    if (this.data.orden === "" || this.data.nombramiento === "") {
      this._DatospersonalesService.mensajeError("RELLENE LOS CAMPOS")
    } else {

      var parametro = {
        idunidad: this.unidadSelected.idunidad,
        descripcion: this.data.nombramiento,
        orden: this.data.orden


      }
      this._DatospersonalesService.agregarNombramiento(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.data = {
              nombramiento: "",
              orden: ""
            }
            this.sacarNombranmiento()
          }
        }, error => {
          this._DatospersonalesService.mensajeError("ERROR DE CONEXION | GUARDAR NOMBRAMIENTO")
        }
      )
    }



  }
  guardarPuesto() {
    var parametro = {
      Nombre_Puesto: this.dataPuesto.Nombre_Puesto,
      dependenciaArbol: this.dataPuesto.orden,
      idnombramiento: this.nombramientoSelected
    }
    this._DatospersonalesService.agregarPuesto(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          this._DatospersonalesService.mensajeBueno(Response.resultado);
          this.dataPuesto = {
            Nombre_Puesto: "",
            orden: ""
          }
          this.sacarPuestos_delNombramiento(this.nombramientoSelected);

        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONECCION | GUARDAR PUESTO")
      }
    )
  }

  crearCarpetaSegundaria() {
    Swal.fire({
      title: "Control de Carpetas",
      text: "Ingrese el nombre de la Carpeta",
      input: 'text',
      showCancelButton: false,
      allowOutsideClick: false,
    }).then((inputValue) => {
      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue.value === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {
            var params = {
              idcarpeta: this.idcarpetaPrincipal,
              nombre: inputValue.value
            }
            this._DatospersonalesService.crearcarpetaSegundaria(params).subscribe(
              Response => {
                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error)

                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)
                  } else {
                    this.buscarSegundacarpeta(this.idcarpetaPrincipal);
                  }
                }
              }
            )
          }
        }
      }




    });
  }
  eliminarcarpetasegundaria(data: any) {
    var params = {
      idcarpeta: data
    }
    this._DatospersonalesService.deletecarpetaSegundaria(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError("La Carpeta Contien Documentos")
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.buscarSegundacarpeta(this.idcarpetaPrincipal);
          }
        }
      }
    )
  }
  AtrasDocumentos(data: any) {
    this.verCarpeta = data
  }
  eliminarcarpetaprimaria(data: any) {
    var params = {
      idcarpeta: data
    }
    this._DatospersonalesService.deletecarpetaPrimaria(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError("La Carpeta Contien Archivos")

        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.archivoPrincipal()
          }
        }
      }
    )

  }
  ver(f: any) {
    this.idarrestoSelected = f.idarrestos

  }
  resolveAfter2Seconds() {
    return new Promise(resolve => {
      this.arregloAsignaciones = new Array();
      var params = {
        identidad: this.consulta.identidad
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
  buscarSegundacarpeta(data: any) {
    this.idcarpetaPrincipal = data
    var params = {
      idcarpetaprincipal: data
    }
    this.arreglocarpetasegunda = new Array()

    this._DatospersonalesService.sacarcarpetaSegundaria(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)

        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
            this.verCarpeta = 1

          } else {


            this.arreglocarpetasegunda = Response.resultado
            this.verCarpeta = 1
          }
        }
      }
    )
  }
  crearCarpetaPrincipal() {
    Swal.fire({
      title: "Control de Carpetas",
      text: "Ingrese el nombre de la Carpeta",
      input: 'text',
      showCancelButton: false,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue.value === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")
          } else {
            var params = {
              identidad: this.objetoConsultado.identidad,
              nombre: inputValue.value
            }
            this._DatospersonalesService.crearcarpetaPrincipal(params).subscribe(
              Response => {
                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error)
                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)
                  } else {
                    this.archivoPrincipal();
                  }
                }
              }
            )
          }
        }
      }




    })



  }

  deleteDocumentoArresto(iddocumento: any, dir: any) {
    this.banderaEspiner = 1
    var params = {
      idarrestos: iddocumento,
      dir: dir
    }


    this._DatospersonalesService.deleteDocumentoArrestos(params).subscribe(
      Response => {

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
          this.banderaEspiner = 0
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
            this.banderaEspiner = 0
          } else {
            Swal.fire("Eliminado con exito")

            this.banderaEspiner = 0
            this.sacarArestosdelPersonal();

          }
        }
      }
    )
  }
  sacarDirecionesNombramiento() {
    this.sacarasignaciondireccionActual();
    this.asyncCall();


  }
  async asyncCall() {
    this.arreglosSeccion = new Array();
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
  sacarpuestos(datos?) {
    this.arregloPuestos = new Array();
    var data = {
      idnombramiento: this.seccionselected.idNombramiento
    }

    this._DatospersonalesService.MostrarPuesto(data).subscribe(
      Response => {

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloPuestos = Response.resultado;
          }
        }
      }
    )
  }
  desactivrPuesto() {
    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    Swal.fire({
      title: '¿Alto?',
      text: "Esta seguro de desactivar el puesto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f0afa6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._DatospersonalesService.desactivarPuesto(parametro).subscribe(
          Response => {
            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)

              } else {
                this._DatospersonalesService.mensajeBueno(Response.resultado)
                this.sacsarcargodelapersona();
              }
            }
          }
        )
      }
    })

  }
  eliminarPuesto(data) {
    var parametro = {
      idPuesto: data
    }
    this._DatospersonalesService.eliminarPuesto(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.sacarPuestos_delNombramiento(this.nombramientoSelected)
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONECCION | ELIMIAR PUESTO")
      }
    )
  }
  eliminarHijos(data: any) {
    var params = {
      identidad: data.identidad
    }

    this._DatospersonalesService.deleteHijo(params).subscribe(
      Response => {
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
      }
    )
  }
  eliminar(iddocumento: any, dir: any, i?) {
    this.banderaEspiner = 1

    var params = {
      iddocumento: iddocumento,
      dir: dir,
      identidad: this.objetoConsultado.identidad,
      identidadEjecutora: this.usuarioLoguiado.identidad,
      nombreDocumento: i.nombreDocumento
    }


    this._DatospersonalesService.deleteDocumento(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
          this.banderaEspiner = 0
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
            this.banderaEspiner = 0
          } else {
            Swal.fire("Eliminado con exito")
            this.banderaEspiner = 0
            this.buscardocumentos(this.idcarpetaSegundaria)
          }
        }
      }
    )
  }
  buscardocumentos(data: any) {
    this.idcarpetaSegundaria = data
    this.arreglodeDocumentos = new Array()
    var parametro = {
      idcarpetaSegundaria: data
    }
    this._DatospersonalesService.sacarDocumento(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
            this.verCarpeta = 2
          } else {
            this.verCarpeta = 2
            this.arreglodeDocumentos = Response.resultado


          }
        }
      }
    )
  }
  eliminarPadre(data: any) {

    var params = {
      identidad: data.identidad
    }
    this._DatospersonalesService.deletePadres(params).subscribe(
      Response => {
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
      }
    )
  }
  limpiarBandera() {
    this.banderapariente = 0;
    this.formulariopariente.reset();
    this.formIdentidad.reset();
  }
  eliminarNombramiento(data) {
    var parametro = {
      idNombramiento: data
    }
    this._DatospersonalesService.eliminarNombramiento(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.sacarNombranmiento()
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONECCION | ELIMIAR PUESTO")
      }
    )
  }
  buscarporIdentidad() {

    this._DatospersonalesService.consultaPorIdentidad(this.consulta).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage + "BUSC")
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.objetoConsultado = Response.resultado[0];
            this.armaobjetoConsultado = Response.arma[0]
            this.desplegar = 0
            this.SegundaVentana = 1;

          }
        }

      }
    )
  }
  atras(data) {
   
    this.desplegar = data
  }
  archivoPrincipal() {
    this.verCarpeta = 0;

    this.arreglocarpetaprincipal = new Array()
    var params = {
      identidad: this.objetoConsultado.identidad
    }
    this._DatospersonalesService.sacarcarpetaPrimaria(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)

        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)


          } else {


            this.arreglocarpetaprincipal = Response.resultado
          }
        }
      }
    )
  }
  ActualizaGenero() {
    Swal.fire({
      title: "Control Genero",
      text: "Seleccione el Genero",
      input: 'select',
      inputOptions: {
        'M': 'Masculino',
        'F': 'Femenino'
      },

      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            var parametro = {
              identidad: this.objetoConsultado.identidad,
              sexo: inputValue.value
            }
            this._DatospersonalesService.actualizarGenero(parametro).subscribe(
              Response => {
                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error)
                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)

                  } else {
                    this._DatospersonalesService.mensajeError(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              }
            )
          }
        }

      }




    });
  }
  sacarArestosdelPersonal() {
    var params = {
      identidad: this.consulta.identidad
    }
    this.arregloArestos = new Array()
    this._DatospersonalesService.sacarAresto(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloArestos = Response.resultado;

          }
        }
      }
    )
  }
  sacsarcargodelapersona() {
    this.arreglosRam = new Array();

    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    this._DatospersonalesService.sacarCargoDeUnapersona(parametro).subscribe(
      Response => {

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
        this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL RELIZAR LA CONSULTA POR CARGO")
      }
    )
  }
  sacarAsignacionesPersonal() {
    this.arregloAsignaciones = new Array();
    var params = {
      identidad: this.consulta.identidad
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
  sacarAscensosdelPersonal() {
    var params = {
      identidad: this.consulta.identidad
    }
    this._DatospersonalesService.sacarAscensosporPersona(params).subscribe(
      Response => {
        this.arregloAscensos = Response.resultado
        this.arregloAscensos.forEach(element => {
          if (element.activo == 1) {
            this.gradoActualdelConsultado = element;

          }
        });
      }
    )
  }
  sacarmisidiomas() {
    this.arregloMisIdiomas = new Array()
    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    this._DatospersonalesService.consultaIdiomasPersonal(parametro).subscribe(
      Response => {

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)

        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.arregloMisIdiomas = Response.resultado;
          }
        }
      }
    )
  }
  sacarMisPaises() {
    this.arregloMisPaises = new Array()
    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    this._DatospersonalesService.consultaPaisesDelPersonal(parametro).subscribe(
      Response => {

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)

        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.arregloMisPaises = Response.resultado
          }
        }
      }
    )
    this.sacarmisidiomas();
  }
  consultaTelefonoDelPersonal() {
    var params = {
      identidad: this.consulta.identidad
    }
    this.arregloTelefono = new Array();
    this._DatospersonalesService.consultaTelefonoPersonal(params).subscribe(
      Response => {
        if (Response.mensaje) {
          this._DatospersonalesService.mensajeError(Response.mensaje)
        } else {
          this.arregloTelefono = Response.resultado;

        }

      }
    )
  }
  consultaHijosDelPersonal() {
    var params = {
      identidad: this.consulta.identidad
    }
    this._DatospersonalesService.consultaHijosPersonal(params).subscribe(
      Response => {

        if (Response.mensaje) {
          this._DatospersonalesService.mensajeError(Response.mensaje)
        } else {
          this.arregloHijos = Response.resultado;

        }

      }
    )
  }
  consultaPadresoDelPersonal() {
    var params = {
      identidad: this.consulta.identidad
    }
    this._DatospersonalesService.consultaPadresPersonal(params).subscribe(
      Response => {
        if (Response.mensaje) {
          this._DatospersonalesService.mensajeError(Response.mensaje)
        } else {
          this.arregloPadres = Response.resultado;

        }
        this.consultaHijosDelPersonal()
      }
    )
    this.sacarconyugue()
  }
 
  eliminarnumero(data: any) {
    var parametro = {
      numero: data
    }

    this._DatospersonalesService.eleminarnumeroTelefono(parametro).subscribe(
      Response => {
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
      }
    )
  }
  ascender() {
    var parametro = {
      autorizado: 1
    }

    var parametroParaSacarCategoria = {
      servicio: "",
      general: ""
    }
    if (this.gradoActualdelConsultado.nivel === 1) {
      alert("Es Un soldado o un auxiliar")
      this.banderacambiocategoria = 2;
    } else if (this.gradoActualdelConsultado.nivel === 2) {
      alert("Es Un Estudiante")
      this.banderacambiocategoria = 1;
    } else if (this.gradoActualdelConsultado.nivel === 3) {
      this.banderacambiocategoria = 1;
      if (this.objetoConsultado.idfuerza === 3) {
        alert("Es Un cadete del ejercito")
        parametroParaSacarCategoria.servicio = "EHOS";
        parametroParaSacarCategoria.general = "EHO";
      } else if (this.objetoConsultado.idfuerza === 4) {
        alert("Es Un cadete de la aerea ")
        parametroParaSacarCategoria.servicio = "FAHOS";
        parametroParaSacarCategoria.general = "FAHO";
      } else {
        alert("Es Un cadete de la Naval ")
        parametroParaSacarCategoria.servicio = "FNHOS";
        parametroParaSacarCategoria.general = "FNHO";

      }

    } else {
      this.banderacambiocategoria = 2;
    }
    this._DatospersonalesService.sacarCategoria(parametroParaSacarCategoria).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          this.arregloCategorias = Response.resultado;

        }
      }
    )
    this._DatospersonalesService.sacarGrados(parametro).subscribe(
      Response => {
        this.arregloGrados = Response.resultado


      }
    )

  }
  eliminarIdioma(data: any) {
    var parametro = {
      identidad: this.objetoConsultado.identidad,
      idioma: data.idmisidiomas,
      nivel: data.nivel
    }

    this._DatospersonalesService.deleteidomas(parametro).subscribe(
      Response => {
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
      }
    )
  }
  sacarIdiomas() {
    this.arregloIdiomas = new Array();
    this._DatospersonalesService.sacaridiomas().subscribe(
      Response => {

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error);
        } else {
          this.arregloIdiomas = Response.resultado;
        }
      }
    )
  }
  EliminarPais(data: any) {

    var params = {
      identidad: this.objetoConsultado.identidad,
      idpais: data.idpais
    }
    this._DatospersonalesService.deletepais(params).subscribe(
      Response => {
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
      }
    )
  }
  sacarpaises() {
    this._DatospersonalesService.sacarpaises().subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this.arregloPaises = Response.resultado
          }
        }
      }
    )
  }
  Actualizaserie() {
    Swal.fire({
      title: "Control del Sistema",
      text: "Numero de Serie",
      input: 'text',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var valoresAceptados = /^[0-9]+$/;
              if (inputValue.value.match(valoresAceptados)) {

                var params = {
                  identidad: this.objetoConsultado.identidad,
                  serie: inputValue.value
                }
                this._DatospersonalesService.actualizarSerie(params).subscribe(
                  Response => {
                    if (Response.error) {
                      this._DatospersonalesService.mensajeError(Response.error)
                    } else {
                      if (Response.resultado) {
                        this._DatospersonalesService.mensajeBueno(Response.resultado)
                        this.buscarporIdentidad();
                      }
                    }
                  }
                )
              } else {
                this._DatospersonalesService.mensajeError("Ingrese solo Números")
              }
            }

          }
        }

      }




    });
  }
  ActualizarEstadoCivil() {
    Swal.fire({
      title: "Control del Sistema",
      text: "Seleccione su estado Civil",
      input: 'select',
      inputOptions: {
        'Soltero(a)': 'Soltero(a)',
        'Casado(a)': 'Casado(a)',
        'Viudo(a)': 'Viudo(a)',
        'Divorciado(a)': 'Divorciado(a)',
        'Union libre': ' Union libre'
      },

      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var params = {
                updtate: inputValue.value,
                identidad: this.objetoConsultado.identidad
              }
              this._DatospersonalesService.actualizarestadoCivil(params).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )
            }

          }
        }

      }




    });
  }
  ActualizarReligion() {
    Swal.fire({
      title: "Control del Sistema",
      text: "Seleccione Su Religion",
      input: 'select',
      inputOptions: {
        'Catolica': 'Catolica',
        'Evangelico': 'Evangelico',
        'Mormon': 'Mormon',
        'Sin Religion': 'Sin Religion'
      },

      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var params = {
                updtate: inputValue.value,
                identidad: this.objetoConsultado.identidad
              }
              this._DatospersonalesService.actualizarReligion(params).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )
            }

          }
        }
      }





    });
  }
  ActualizartipoSangre() {
    Swal.fire({
      title: "Control del Sistema",
      text: "Seleccione el Tipo de Sangre",
      input: 'select',
      inputOptions: {
        'A+': 'A+',
        'A-': 'A-',
        'O+': 'O+',
        'O-': 'O-',
        'B+': 'B+',
        'B-': 'B-',
        'AB+': 'AB+',
        'AB-': 'AB-'
      },

      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var params = {
                updtate: inputValue.value,
                identidad: this.objetoConsultado.identidad
              }
              this._DatospersonalesService.actualizartipoSangre(params).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )
            }

          }
        }
      }





    });
  }
  ActualizaNumeropasaporte() {
    Swal.fire({
      title: "Control del Sistema",
      text: "Numero de Pasaporte",
      input: 'text',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var params = {
                updtate: inputValue.value,
                identidad: this.objetoConsultado.identidad
              }

              this._DatospersonalesService.actualizarPasaporte(params).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )

            }

          }
        }
      }





    });
  }

  actualizarCombatiente() {
    Swal.fire({
      title: "Control del sistema",
      text: "Seleccione si es combatiente ",
      input: 'select',
      inputOptions: {
        '0': 'No',
        '1': 'Si'
      },

      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            var parametro = {
              identidad: this.objetoConsultado.identidad,
              updtate: inputValue.value
            }

            this.formIdentidad.value.identidad = parametro.identidad
            this._DatospersonalesService.actualizarCombatiente(parametro).subscribe(
              Response => {
                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error)
                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)

                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              }
            )
          }
        }

      }




    });
  }
  ActualizaCuentaBanco() {
    Swal.fire({
      title: "Control del Sistema",
      text: "Cuenta de Banco",
      input: 'text',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var params = {
                updtate: inputValue.value,
                identidad: this.objetoConsultado.identidad
              }
              this._DatospersonalesService.actualizarCuentaBanco(params).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )
            }

          }
        }
      }





    });
  }

  actualizarfechaNacimiento() {

    if (this.fechanuevadeNacimiento === undefined) {
      this._DatospersonalesService.mensajeError("Seleccione la Fecha")
    } else {
      var parametro = {
        identidad: this.objetoConsultado.identidad,
        updtate: this.fechanuevadeNacimiento
      }

      this._DatospersonalesService.actualizarFechaNacimiento(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)

            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.buscarporIdentidad();
            }
          }
        }
      )
    }

  }
  guardarconyugue() {
    this.formulariopariente.value.combatiente = "0"

    this.formulariopariente.value.identidad = this.formIdentidad.value.identidad;
    if (this.arregloConyugue === undefined) {
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
                  identidad1: this.objetoConsultado.identidad,
                  identidad2: this.formulariopariente.value.identidad
                }

                this._DatospersonalesService.agregarconyugue(datos2).subscribe(
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
        this.sacarpadres()

      }
    } else {
      if (this.arregloConyugue.length === 1) {
        this._DatospersonalesService.mensajeError("Titular Ya Cuanta con un conyugue")
      } else {
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
                    identidad1: this.objetoConsultado.identidad,
                    identidad2: this.formulariopariente.value.identidad
                  }

                  this._DatospersonalesService.agregarconyugue(datos2).subscribe(
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
          this.sacarpadres()

        }
      }
    }


  }
  sacarconyugue() {
    this.arregloConyugue = new Array()
    var parametro = {
      identidad: this.objetoConsultado.identidad
    }

    this._DatospersonalesService.consultaConyuguePersonal(parametro).subscribe(
      Response => {

        this.arregloConyugue = Response.resultado;
      }
    )
  }
  eliminaconyugue(data: any) {
    var parametro = {
      identidad: data.identidad
    }

    this._DatospersonalesService.deleteConyugue(parametro).subscribe(
      Response => {
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
      }
    )
  }
  buscarconyugue() {

    var conyugueConsultado;
    if (this.formIdentidad.valid) {
      if (this.formIdentidad.value.identidad === this.objetoConsultado.identidad) {
        this._DatospersonalesService.mensajeError("Identidad Consultada igual a la identidad del titular")

      } else {
        var parametro = {
          identidad_pariente: this.formIdentidad.value.identidad
        }

        this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
          Response => {

            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)
                this.banderapariente = 1;


              } else {

                conyugueConsultado = Response.resultado[0]
                var datos2 = {
                  identidad1: this.objetoConsultado.identidad,
                  identidad2: Response.resultado[0].identidad
                }
                if (this.arregloConyugue === undefined) {
                  this._DatospersonalesService.agregarconyugue(datos2).subscribe(
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
                        }
                      }
                    }

                  )
                } else {
                  if (this.arregloConyugue.length === 1) {
                    this._DatospersonalesService.mensajeError("El titular ya cuenta con su conyugue")
                  } else {
                    this._DatospersonalesService.agregarconyugue(datos2).subscribe(
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
                          }
                        }
                      }

                    )

                  }
                }


              }
            }
          }
        )

      }
    } else {
      this._DatospersonalesService.mensajeError("Formato Invalido en la identidad")
    }

  }
  sacarArmas() {
    var parametros = {
      idfuerza: this.objetoConsultado.idfuerza
    }

    this._DatospersonalesService.sacarArmas(parametros).subscribe(
      Response => {
        this.arregloarmas = Response.resultado
      }
    )
  }
  sacarArmasPersona() {
    var parametros = {
      idfuerza: this.fuerzaSelected.idfuerza
    }

    this._DatospersonalesService.sacarArmas(parametros).subscribe(
      Response => {
        this.arregloarmas = Response.resultado
      }
    )
  }
  actualizarArma() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Esta Seguro?',
      text: "De agregar el arma",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.armaselected === undefined) {
          this._DatospersonalesService.mensajeError("Seleccione el Arma")
        } else {

          var parametro = {
            idarma: this.armaselected.idarmas,
            identidad: this.objetoConsultado.identidad
          }

          this._DatospersonalesService.ActualizarArma(parametro).subscribe(
            Response => {

              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error)
              } else {
                this.buscarporIdentidad();
              }
            }
          )

        }

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Ejecucion Cancelada',
          'error'
        )
      }
    })


  }
  sacarpadres() {
    this.arregloPadres = new Array();
    this.arregloHijos = new Array();
    var params = {
      identidad: this.objetoConsultado.identidad
    }

    this._DatospersonalesService.consultaPadresPersonal(params).subscribe(
      Response => {

        this.arregloPadres = Response.resultado
      }
    )
    this._DatospersonalesService.consultaHijosPersonal(params).subscribe(
      Response => {

        this.arregloHijos = Response.resultado
      }
    )
    this.sacarconyugue()
  }
  cambiarnombres() {
    Swal.fire({
      title: "Cambio de Nombre",
      text: "1° Nombre y 2° Nombre",
      input: 'text',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var params = {
                nombres: inputValue.value,
                apellidos: this.objetoConsultado.apellidos,
                identidad: this.objetoConsultado.identidad
              }
              this._DatospersonalesService.actualizarNombresYapellidos(params).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )
            }

          }
        }
      }





    });
  }
  cambiarapellidos() {
    Swal.fire({
      title: "Cambio de Apellido",
      text: "1° Apellidos y 2° Apellidos",
      input: 'text',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var params = {
                nombres: this.objetoConsultado.nombres,
                apellidos: inputValue.value,
                identidad: this.objetoConsultado.identidad
              }
              this._DatospersonalesService.actualizarNombresYapellidos(params).subscribe(
                Response => {
                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )
            }

          }
        }
      }





    });
  }
  cambiarnumeroAcuerdo() {

    Swal.fire({
      title: "Numero de Acuerdo",
      text: "#Acuerdo",
      input: 'text',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((inputValue) => {

      if (inputValue === null) {
        this._DatospersonalesService.mensajeError("Rellene los Campos")
      } else {
        if (inputValue.value === "") {
          this._DatospersonalesService.mensajeError("Rellene los Campos")

        } else {
          if (inputValue === undefined) {
            this._DatospersonalesService.mensajeError("Rellene los Campos")

          } else {

            if (inputValue.isDismissed) {
              this._DatospersonalesService.mensajeError("Cancelado")
            } else {
              var fechasplite = this.objetoConsultado.fecha.split("T")[0]

              var params = {
                fecha: fechasplite,
                numeroAcuerdo: inputValue.value,
                identidad: this.objetoConsultado.identidad
              }


              this._DatospersonalesService.actualizarAcuerdoyfechaIngreso(params).subscribe(
                Response => {

                  if (Response.error) {
                    this._DatospersonalesService.mensajeError(Response.error)
                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                  }
                }
              )
            }

          }
        }
      }





    });
  }
  actualizarFechaIngreso() {
    if (this.actualizarfechaIngreso === undefined) {
      this._DatospersonalesService.mensajeError("SELECCIONE LA FECHA.")
    } else {
      var params = {
        fecha: this.actualizarfechaIngreso,
        numeroAcuerdo: this.objetoConsultado.numeroAcuerdo,
        identidad: this.objetoConsultado.identidad
      }

      this._DatospersonalesService.actualizarAcuerdoyfechaIngreso(params).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.buscarporIdentidad();
          }
        }
      )
    }



  }
  ascesoseleccionado(data) {

    this.lineaAsecenso = {
      personal_idpersonal: this.objetoConsultado.personal_idpersonal,
      banderaPrimerIgreso: data.banderaPrimerIngreso,
      categoria_idcategoria: data.categoria_idcategoria,
      ejecutado_por: this.usuarioLoguiado.identidad,
      fecha: data.fecha.split("T")[0],
      FechaPrimerIngreso: data.fechaPrimerIngreso.split("T")[0],
      grado: data.grado,
      numeroAcuerdo: data.numeroAcuerdo,
      activo: data.activo,
      idunidad: data.idunidad,
      idfuerza: data.idfuerza
    }

  }
  actualizarTabladeAscenso() {
    this._DatospersonalesService.actualizarTablaascenso(this.lineaAsecenso).subscribe(
      Response => {

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado)
            this.buscarporIdentidad();
            this.sacarAscensosdelPersonal();
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONECCION | ACTUALIZAR TABLA DE ASCENSO")
      }
    )
  }
  eliminargradoTablaAscenso() {

    Swal.fire({
      title: '¿Esta seguro de eliminarlo?',
      text: "Esta usted apunto de eliminar el grado | rango de esta persona.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "NO",
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.gradoqueVaQuedar === undefined || this.gradoaeliminar === undefined) {
          this._DatospersonalesService.mensajeError("SELECCION LOS CAMPOS")
        } else {
          if (this.gradoqueVaQuedar.grado === this.gradoaeliminar.grado) {
            this._DatospersonalesService.mensajeError("NO PUEDE SELECCIONAR EL MISMO GRADO QUE VA ELIMINAR")
          } else {
            var parametros = {
              gradoEliminar: this.gradoaeliminar.grado,
              gradoQuevaQuedar: this.gradoqueVaQuedar.grado,
              personal_idpersonal: this.objetoConsultado.personal_idpersonal
            }

            this._DatospersonalesService.eliminarGradoTablaAscenso(parametros).subscribe(
              Response => {

                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error)
                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)

                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.buscarporIdentidad();
                    this.sacarAscensosdelPersonal();
                  }
                }
              }, error => {
                this._DatospersonalesService.mensajeError("ERROR DE CONECCION | BORRAR GRADO")
              }
            )
          }
        }
      }
    })





  }
  guardarTelefono() {
    var params = {
      numero: this.telefono.value.numeroTelefono,
      idpersonal: this.objetoConsultado.identidad
    }
    if (this.telefono.valid) {
      this._DatospersonalesService.agregarTelefono(params).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)

            } else {

              this.consultaTelefonoDelPersonal();

            }

          }

        }
      )
    } else {
      this._DatospersonalesService.mensajeError("No Cumple con el formato")
    }


  }
  buscarParientes() {
    if (this.formIdentidad.valid) {
      if (this.formIdentidad.value.identidad === this.objetoConsultado.identidad) {
        this._DatospersonalesService.mensajeError("Identidad Consultada igual a la identidad del Hijo")

      } else {
        if (this.arregloPadres === undefined) {
          var parametro = {
            identidad_pariente: this.formIdentidad.value.identidad
          }

          this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
            Response => {

              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

              } else {
                if (Response.mensaje) {
                  this._DatospersonalesService.mensajeError(Response.mensaje)
                  this.banderapariente = 1;


                } else {
                  this.parienteConsultado = Response.resultado[0]


                  var datos2 = {
                    idpadres: this.formIdentidad.value.identidad,
                    idhijo: this.objetoConsultado.identidad
                  }

                  this._DatospersonalesService.guardarpadres(datos2).subscribe(
                    Response => {
                      if (Response.error) {
                        this._DatospersonalesService.mensajeError(Response.error)

                      } else {
                        if (Response.mensaje) {
                          this._DatospersonalesService.mensajeError(Response.mensaje)

                        } else {
                          this._DatospersonalesService.mensajeBueno("Guardado con exito")
                          this.formulariopariente.reset();
                          this.sacarpadres();
                        }
                      }
                    }

                  )
                }
              }
            }
          )

        } else {
          if (this.arregloPadres.length >= 2) {
            this._DatospersonalesService.mensajeError("Ya Cuenta con sus dos padres")

          } else {
            var parametro = {
              identidad_pariente: this.formIdentidad.value.identidad
            }

            this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
              Response => {

                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)
                    this.banderapariente = 1;


                  } else {
                    this.parienteConsultado = Response.resultado[0]


                    var datos2 = {
                      idpadres: this.formIdentidad.value.identidad,
                      idhijo: this.objetoConsultado.identidad
                    }

                    this._DatospersonalesService.guardarpadres(datos2).subscribe(
                      Response => {
                        if (Response.error) {
                          this._DatospersonalesService.mensajeError(Response.error)

                        } else {
                          if (Response.mensaje) {
                            this._DatospersonalesService.mensajeError(Response.mensaje)

                          } else {
                            this._DatospersonalesService.mensajeBueno("Guardado con exito")
                            this.formulariopariente.reset();
                            this.sacarpadres();
                          }
                        }
                      }

                    )
                  }
                }
              }
            )
          }


        }

      }
    } else {
      this._DatospersonalesService.mensajeError("Formato Invalido en la identidad")
    }

  }
  guardarPariente() {
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
                idpadres: this.formulariopariente.value.identidad,
                idhijo: this.objetoConsultado.identidad
              }
              this._DatospersonalesService.guardarpadres(datos2).subscribe(
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
  buscarHijo() {
    if (this.formIdentidad.valid) {
      if (this.formIdentidad.value.identidad === this.objetoConsultado.identidad) {
        this._DatospersonalesService.mensajeError("Identidad Consultada igual a la identidad del Hijo")

      } else {
        if (this.arregloHijos === undefined) {
          var parametro = {
            identidad_pariente: this.formIdentidad.value.identidad
          }

          this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
            Response => {

              if (Response.error) {
                this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

              } else {
                if (Response.mensaje) {
                  this._DatospersonalesService.mensajeError(Response.mensaje)
                  this.banderapariente = 1;


                } else {
                  this.parienteConsultado = Response.resultado[0]


                  var datos2 = {
                    idpadre: this.objetoConsultado.identidad,
                    idhijo: this.formIdentidad.value.identidad
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
                          this.formulariopariente.reset();
                          this.sacarpadres();
                        }
                      }
                    }

                  )
                }
              }
            }
          )

        } else {
          if (this.arregloHijos.length >= 30) {
            this._DatospersonalesService.mensajeError("Ya Cuenta con sus dos padres")

          } else {
            var parametro = {
              identidad_pariente: this.formIdentidad.value.identidad
            }

            this._DatospersonalesService.sacarPersonalIdentidad(parametro).subscribe(
              Response => {

                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)
                    this.banderapariente = 1;


                  } else {
                    this.parienteConsultado = Response.resultado[0]


                    var datos2 = {
                      idpadre: this.objetoConsultado.identidad,
                      idhijo: this.formIdentidad.value.identidad
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
                            this.formulariopariente.reset();
                            this.sacarpadres();
                          }
                        }
                      }

                    )
                  }
                }
              }
            )
          }


        }

      }
    } else {
      this._DatospersonalesService.mensajeError("Formato Invalido en la identidad")
    }

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
                idpadre: this.objetoConsultado.identidad,
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
  agregarPaises() {

    if (this.paisSelected === undefined) {
      this._DatospersonalesService.mensajeError("Seleccione el Idioma")
    } else {
      var parametro = {
        idpersonal: this.objetoConsultado.identidad,
        idpais: this.paisSelected.idpaises
      }
      this._DatospersonalesService.guardarpaisdelpersonal(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)

            } else {
              this.arregloMisPaises = Response.resultado
              this.sacarMisPaises()
            }
          }
        }
      )
    }

  }
  agrgarIdioma() {
    this.idiomaSelected.idpersonal = this.objetoConsultado.identidad
    if (this.idiomaSelected.nivel < 1 || this.idiomaSelected.nivel > 100 || this.idiomaSelected.idmisidiomas === "" || this.idiomaSelected.idpersonal === "") {
      this._DatospersonalesService.mensajeError("No cumple con el formato | selecione el idioma | nivel > 0 y <=100")
    } else {
      this._DatospersonalesService.guardaridiomadelpersonal(this.idiomaSelected).subscribe(
        Response => {

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
        }
      )
    }
  }
  guardarAresto() {

    this.formularioAresto.value.identidad = this.consulta.identidad;
    if (this.formularioAresto.valid) {
      this._DatospersonalesService.guardarAresto(this.formularioAresto.value).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this._DatospersonalesService.mensajeBueno("Excelente")
              this.sacarArestosdelPersonal();

            }
          }
        }
      )

    } else {
      this.noesvalido = true
      this._DatospersonalesService.mensajeError("Rellene los Campos")


    }

  }

  buscarPersonaParaOrdenarAresto() {
    var params = {
      identidad_pariente: this.formularioAresto.value.identidadAcusador
    }
    this._DatospersonalesService.sacarPersonalIdentidad(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.personaQueAreasta = Response.resultado[0];

          }
        }
      }
    )
  }
  guardardocumentoDElArresto() {


    this.makeFileReques(this._DatospersonalesService.url2 + "subirdocumentosArresto/" + this.idarrestoSelected, [], this.FilesToUploads).then(
      (result: any) => {


        this.imgURL = "";
        if (result.error) {
          this._DatospersonalesService.mensajeError(result.error)

        } else {
          if (result.mesaje) {
            this._DatospersonalesService.mensajeError(result.mensaje)
          } else {
            this._DatospersonalesService.mensajeBueno(result.resultado);
            this.sacarArestosdelPersonal();

          }

        }
      }
    )

  }
  EliminarArresto(data) {


    Swal.fire({
      title: '<strong>ELIMINAR</strong>',
      html:
        'Esta Apunto de Eliminar el Arresto de esta Persona.<b>¿Esta usted seguro de ejecutar esta función?</b>, ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        var parametro = {
          identidadElaboradopor: data.identidad,
          identidad: this.objetoConsultado.identidad,
          fechaArresto: data.fecha,
          hora: data.horas,
          identidadEjecutora: this.usuarioLoguiado.identidad,
          concepto: "Se elimino el arresto de :" + this.objetoConsultado.identidad + ", Nombre: " + this.objetoConsultado.nombres + " " + this.objetoConsultado.apellidos + ","
            + " Concepto: " + data.motivo + "; Fecha Arresto; " + data.fecha + "; Horas:" + data.horas + "; orden de: ID " + data.identidad + " " + data.nombres + " " + data.apellidos + ""
        }
        this.deleteDocumentoArresto(data.idarrestos, data.archivo);
        this._DatospersonalesService.eliminarArresto(parametro).subscribe(
          Response => {
            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeBueno(Response.mensaje)
              } else {
                this._DatospersonalesService.mensajeBueno(Response.resultado)
                this.sacarArestosdelPersonal();
              }
            }
          }, error => {
            this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL SERVIDOR AL TRATAR DE ELIMINAR")

          }
        )
      } else {
        Swal.fire(
          'CANCELADO',
          'ACCION CANCELADA',
          'error'
        )
      }
    })

  }
  reasignar() {

    if (this.objetoConsultado.codigo !== "TRO") {
      if (this.unidadSelected === undefined || this.fechaSelected === undefined || this.fuerzaSelected === undefined) {
        this._DatospersonalesService.mensajeError("RELLENE TODO LOS CAMPOS")
      
      } else {
        var fechaIgual = false;
        this.arregloAsignaciones.forEach((element: any) => {

          if (element.fecha_asignacion.split("T")[0] === this.fechaSelected) {
            fechaIgual = true;
          }
        });
        if (fechaIgual) {
          Swal.fire(
            'Control del Sistema',
            'No puede haber Dos Asignaciones en la misma fecha',
            'question'
          )
       
        } else {
          var datos = {
            identidad: this.objetoConsultado.identidad,
            idunidad: this.unidadSelected.idunidad,
            fecha_asignacion: this.fechaSelected,
            idfuerzaActual: this.objetoConsultado.idfuerza,
            idfueraAmover: this.fuerzaSelected.idfuerza,
            nivel: this.objetoConsultado.nivel,
            idelaborado: this.usuarioLoguiado.identidad
          }
          this.esperar=!this.esperar
          this._DatospersonalesService.reasignarOficialesAuxSub(datos).subscribe(
            Response => {
              this.esperar=!this.esperar
              if (Response.error) {
                   this._DatospersonalesService.mensajeError(Response.error)
              } else {
                this._DatospersonalesService.mensajeBueno(Response.mensaje)
              
                this.sacarAsignacionesPersonal();
              }
            },error=>{
              this.esperar=!this.esperar
              this._DatospersonalesService.mensajeError("Error de Conección")
            }
          )
        }

      }

    } else {
      if (this.unidadSelected === undefined || this.fechaSelected === undefined || this.fuerzaSelected === undefined) {
        this._DatospersonalesService.mensajeError("RELLENE TODO LOS CAMPOS")
        
      } else {
        var fechaIgual = false;
        this.arregloAsignaciones.forEach((element: any) => {

          if (element.fecha_asignacion.split("T")[0] === this.fechaSelected) {
            fechaIgual = true;
          }
        });
        if (fechaIgual) {
          Swal.fire(
            'Control del Sistema',
            'No puede haber Dos Asignaciones en la misma fecha',
            'question'
          )
        
        } else {
          var asignacionActual: any;
          this.arregloAsignaciones.forEach((element: any) => {
            if (element.actual === 1) {
              asignacionActual = element;
            }
          });

          if (asignacionActual === undefined) {
            var reasignarDatos = {
              identidad: this.objetoConsultado.identidad,
              idunidad: this.unidadSelected.idunidad,
              fecha_asignacion: this.fechaSelected,
              idfuerzaActual: this.objetoConsultado.idfuerza,
              idfueraAmover: this.fuerzaSelected.idfuerza,
              nivel: this.objetoConsultado.nivel,
              idelaborado: this.usuarioLoguiado.identidad
            }
          } else {
            var reasignarDatos = {
              identidad: this.objetoConsultado.identidad,
              idunidad: this.unidadSelected.idunidad,
              fecha_asignacion: this.fechaSelected,
              idfuerzaActual: asignacionActual.idfuerza,
              idfueraAmover: this.fuerzaSelected.idfuerza,
              nivel: this.objetoConsultado.nivel,
              idelaborado: this.usuarioLoguiado.identidad
            }
          }

          this.esperar=!this.esperar
          this._DatospersonalesService.asignarpersonalaUnidad(reasignarDatos).subscribe(
            Response => {
              this.esperar=!this.esperar
              if (Response.error) {
               
                this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
              } else {
                this._DatospersonalesService.mensajeBueno("Usuario Asignado Con exito")
              
                this.sacarAsignacionesPersonal();
              }

            },error=>{
              this.esperar=!this.esperar
              this._DatospersonalesService.mensajeError("Error de Conección")
            }
          )
        }


      }
    }

  }
  guardarDocumentoTexto() {
    this.banderaEspiner = 1
    if (this.nombreDocumento === undefined || this.FilesToUploads === undefined) {
      Swal.fire("Rellene los campos")
      this.banderaEspiner = 0;
    } else {
      var params = {
        nombre: this.nombreDocumento,
        dir: "ninguno.PNG",
        idcarpeta: this.idcarpetaSegundaria,
      }
      this._DatospersonalesService.guardarDocumento(params).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
            this.banderaEspiner = 0;
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
              this.banderaEspiner = 0;
            } else {
              if (Response.resultado) {
                this.guardardocumento(Response.resultado.insertId);


              }

            }
          }
        }
      )
    }

  }
  guardardocumento(id: any) {


    var link = this._DatospersonalesService.url2 + "subirdocumentos/" + id


    this.makeFileReques(link, [], this.FilesToUploads).then(
      (result: any) => {


        this.imgURL = "";
        if (result.error) {
          this._DatospersonalesService.mensajeError(result.error)
          this.banderaEspiner = 0;
        } else {
          if (result.mesaje) {
            this._DatospersonalesService.mensajeError(result.mensaje)
            this.banderaEspiner = 0;
          } else {
            this._DatospersonalesService.mensajeBueno(result.resultado);
            this.banderaEspiner = 0;
            this.buscardocumentos(this.idcarpetaSegundaria)



          }

        }
      }, error => {
        alert("OCURRIO UN ERROR AL TRATAR DE SUBIR EL ARCHIVO CON IDENTIFICADOR: " + id)
        this.eliminar(id, "ninguno.PNG")
        this.banderaEspiner = 0;

      }
    )

  }
  guardarAsignacionDireccion() {
    if (this.fechaSelected === "" || this.fechaSelected === undefined || this.direccionSelected === undefined) {
      this._DatospersonalesService.mensajeError("RELLENE LOS CAMPOS")
    } else {
      var parametro = {
        identidad: this.objetoConsultado.identidad,
        identidadEjecutora: this.usuarioLoguiado.identidad,
        idNombramiento: this.direccionSelected.idNombramiento,
        idgrado: this.objetoConsultado.grado,
        direccion: this.direccionSelected.descripcion,
        fechaAsignacion: this.fechaSelected,
        fechaSalida: this.fechaSelected,
        unidad: this.unidadSelected
      }

      this._DatospersonalesService.agregarAsignacionDireccion(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
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
          this._DatospersonalesService.mensajeError("ERROR CONEXION AL INGRESAR ASIGNACION (DIRECCION | ASIGNACION)")
        }
      )
    }

  }
  sacarDireccionDeAsignado() {
    this.arreglosDeMisAsignacionesDirecciones = new Array();
    var parametro = {
      identidad: this.objetoConsultado.identidad
    }
    this._DatospersonalesService.sacarDireccionDeAsignado(parametro).subscribe(
      Response => {
        this.arreglosDeMisAsignacionesDirecciones = Response.resultado;
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR CONEXION AL INGRESAR ASIGNACION (DIRECCION | ASIGNACION)")
      }
    )
  }
  guardarCargo() {

    if (this.puestoSelected === undefined || this.fechaSelected === undefined || this.objetoConsultado.identidad === undefined ||
      this.numeroAcuerdo === undefined || this.usuarioLoguiado.identidad === undefined || this.objetoConsultado === undefined) {
      this._DatospersonalesService.mensajeError("HAY CAMPOS NO SELECCIONADOS")
    } else {
      var parametros = {
        idPuesto: this.puestoSelected.idPuesto,
        fechaInicio: this.fechaSelected,
        identidad: this.objetoConsultado.identidad,
        fechaFin: "null",
        acuerdo: this.numeroAcuerdo,
        elaborado_por: this.usuarioLoguiado.identidad,
        idgrado: this.objetoConsultado.grado
      }

      this._DatospersonalesService.agregarPersonaenOrganizacion(parametros).subscribe(
        Response => {

          if (Response.error) {

            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)

            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.sacsarcargodelapersona();
            }
          }
        }
      )

    }

  }
  desactivarAsignacionDireccion(data) {
    Swal.fire({
      title: 'Esta Seguro',
      text: "Esta apunto de desactivar la asignacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        var parametro = {
          identidad: this.objetoConsultado.identidad,
          identidadEjecutora: this.usuarioLoguiado.identidad,
          direccion: data.descripcion,
          unidad: data.unidad
        }
        this._DatospersonalesService.desactivarAsignacionDireccion(parametro).subscribe(
          Response => {
            if (Response.error) {
              this._DatospersonalesService.mensajeError(Response.error)
            } else {
              if (Response.mensaje) {
                this._DatospersonalesService.mensajeError(Response.mensaje)

              } else {
                this.sacarDireccionDeAsignado();
                this._DatospersonalesService.mensajeBueno(Response.resultado)

              }
            }
          }, error => {
            this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL DESACTIVAR LA DIRECCION")
          }
        )
      } else {
        Swal.fire(
          'Cancelado!',
          '',
          'success'
        )
      }
    })

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

  async CambioIdentidadPErsonalAdmin() {
    var respuesta = await this._DatospersonalesService.mensajePregunta("Cambio de Identidad", "Esta seguro de Remplazar la Identidad")
    if (respuesta) {
      if (this.formIdentidad.valid) {
        if (this.objetoConsultado.identidad === this.usuarioLoguiado.identidad) {
          this._DatospersonalesService.mensajeError("USTED MISMO NO SE PUEDE CAMBIAR LA IDENTIDAD");
        } else {
          if (this.objetoConsultado.identidad === undefined || this.usuarioLoguiado.identidad === undefined) {
            this._DatospersonalesService.mensajeError("ERROR EN IDENTIDAD VIEJA O IDENTIDAD DE USUARIO LOGIADO")
          } else {
            var parametro = {
              identidadNueva: this.formIdentidad.value.identidad,
              identidadVieja: this.objetoConsultado.identidad,
              identidadEjecutora: this.usuarioLoguiado.identidad
            }
            this._DatospersonalesService.cambioIdentidad(parametro).subscribe(
              Response => {
                if (Response.error) {
                  this._DatospersonalesService.mensajeError(Response.error)
                } else {
                  if (Response.mensaje) {
                    this._DatospersonalesService.mensajeError(Response.mensaje)

                  } else {
                    this._DatospersonalesService.mensajeBueno(Response.resultado)
                    this.consulta.identidad = ""
                    this.formIdentidad.reset();
                    this.desplegar = 2
                    this.SegundaVentana = 0;

                  }
                }
              }, error => {
                this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL MOMENTO DE CAMBIAR LA IDENTIDAD")
                this._Router.navigate(['bienvenida'])
              }
            )
          }

        }
      } else {
        this._DatospersonalesService.mensajeError("LA IDENTIDAD NUEVA NO CUENTA CON EL FORMATO")
      }
    }
    this.formIdentidad.reset();
  }
  buscarCupos() {

    
    this.sacarcuposdeUnidad();
  }
  sacarcuposdeUnidad() {
    var parametro = {
      idunidad: this.unidadSelected.idunidad,
      activo: 1
    }
    this.arregloCupos = [];
    this._ServiciosMensajeService.show()
    this._DatospersonalesService.sacarcoposhabilitados(
      parametro
    ).subscribe(
   {
       next:(Response) => {
        this._ServiciosMensajeService.hide()
        console.log(Response);
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this.desplegar = 2
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.desplegar = 2
            this.arregloCupos = Response.resultado;

          }
        }
      }, error:(error) => {
        this._ServiciosMensajeService.hide()

        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      }
   }
    )
  }
  desactivarCupos(data) {

    var parametro = {
      idgrado: data.idgrado,
      idunidad: data.idunidad,
      activo: data.activo === 0 ? 1 : 0,
      usuario: this.usuarioLoguiado
    }
    this._DatospersonalesService.desactivarCupos(parametro).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {

            this.sacarcuposdeUnidad();
          }
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERRRO DE CONEXION")
      }
    )
  }

  selecionarTarjeta(data) {
    this.cupos.reset();
    this.objetoSelecionado = data;
  }
  guardarCuponuevo() {

    if (this.cupos.valid) {
      var parametro = {
        idunidad: this.objetoSelecionado.idunidad,
        idgrado: this.objetoSelecionado.idgrado,
        autorizado: this.cupos.value.numero,
        usuario: this.usuarioLoguiado,
        copoAnterior: this.objetoSelecionado.autorizado,
        nombreUnidad: this.objetoSelecionado.unidad,
        gradoNombre: this.objetoSelecionado.nombre_grado
      }

      this._DatospersonalesService.modificarcupo(parametro).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this.cupos.reset();
              this.sacarcuposdeUnidad();

            }
          }
        }, error => {
          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
        }
      )
    } else {
      this._DatospersonalesService.mensajeError("Solo numero  debe de ingresar.")
    }

  }
 async guardarCambioCombatiente(data) {
  let r = await this._ServiciosMensajeService.mensajePregunta("Esta seguro de cambiar el estado de combatiente")
  if(!r) return
    var parametro = {
      idunidad: data.idunidad,
      idgrado: data.idgrado,
      combatiente: data.combatiente === 0 ? 1 : 0,
      usuario: this.usuarioLoguiado,
      unidadnombre: data.unidad,
      gradoNombre: data.nombre_grado
    }
this._ServiciosMensajeService.show()
    this._DatospersonalesService.modificarSiesCombatiente(parametro).subscribe(
      Response => {
        this._ServiciosMensajeService.hide()
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            parametro = {
              idunidad: "",
              idgrado: "",
              combatiente: 0,
              usuario: "",
              unidadnombre: "",
              gradoNombre: data.nombre_grado
            }
            this.sacarcuposdeUnidad();
          }
        }
      }, error => {
        this._ServiciosMensajeService.hide()
        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      }
    )


  }
  buscarGRados() {
    var parametro = {
      idfuerza: this.fuerzaSelected.idfuerza,
      idgradoOrden: this.ordencategoriaSelected.idControl_Grado
    }
    this._ServiciosMensajeService.show()
    this._DatospersonalesService.sacarGradosSegunOrden(parametro).subscribe(
      Response => {
        this._ServiciosMensajeService.hide()
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)

        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)

          } else {
            
            this.arreglosRam = Response.resultado
          }
        }
      }, error => {
        this._ServiciosMensajeService.hide()

        this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
      }
    )
  }
  @ViewChild('formularioIngresoCupos') formularioIngresoCupos: NgForm;
  async GuardarCupos(formulario) {
let r = await this._ServiciosMensajeService.mensajePregunta(  "¿Esta seguro de guardar los cupos?")
if(!r) return
    if (formulario.valid) {
      var Fuerza;
      if (this.fuerzaSelected.idfuerza === 2) {
        Fuerza = 2;
      } else if (this.fuerzaSelected.idfuerza === 3) {
        Fuerza = 3;
      } else if (this.fuerzaSelected.idfuerza === 4) {
        Fuerza = 4;
      } else {
        Fuerza = 3;
      }
      if(this.agregarNuevoCupo.cantidadAutorizada<=0) return  this._ServiciosMensajeService.mensajeMalo("LA CANTIDAD AUTORIZADA DEBE SER MAYOR A CERO")
      var parametro = {
        idfuerza: Fuerza,
        idunidad: this.unidadSelected.idunidad,
        autorizado: this.agregarNuevoCupo.cantidadAutorizada,
        ocupados: 0,
        combatiente: this.agregarNuevoCupo.combatiente,
        activo: 1,
        idgrado: this.objetoSelecionado.idgrado,
        toe_autorizada: 0,
        idcategoria: this.objetoSelecionado.idcategoria,
        fechaIngreso: (new Date(this.agregarNuevoCupo.fechaIngreso)).toISOString().split('T')[0],
        usuario: this.usuarioLoguiado,
        nombreunidad: this.unidadSelected.unidad,
        nombreGrado: this.objetoSelecionado.nombre_grado,
        ue: (formulario.value.ordencategoriaSelected.idControl_Grado ===7 || formulario.value.ordencategoriaSelected.idControl_Grado ===8) ? formulario.value.ue : {idunidad_ejecutora:0}

      } 
     
      this._ServiciosMensajeService.show()
      this._DatospersonalesService.agregarnuevoscupos(parametro).subscribe(
        Response => {
          this._ServiciosMensajeService.hide()
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensjae)

            } else {
              this.formularioIngresoCupos.reset();
              this.mostrarModalGrado=false
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.sacarcuposdeUnidad();
            }
          }
        }, error => {
          this._ServiciosMensajeService.hide()

          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
        }
      )
    } else {
      this._DatospersonalesService.mensajeError("FORMULARIO INVALIDO")
    }
  }
  async eliminarTarjetaIngreso(data) {
    var respuesta = await this._DatospersonalesService.mensajePregunta("Eliminar", "Esta seguro de eliminar esta tarjeta")

    if (respuesta) {
      var params = {
        idunidad: data.idunidad,
        idgrado: data.idgrado,
        nombreunidad: data.unidad,
        nombreGrado: data.nombre_grado + " | " + data.equivalente,
        usuario: this.usuarioLoguiado
      }
      this._DatospersonalesService.EliminarTarjetadeIngreso(params).subscribe(
        Response => {
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)

            } else {
              this._DatospersonalesService.mensajeBueno(Response.resultado)
              this.sacarcuposdeUnidad();
            }
          }
        }, error => {
          this._DatospersonalesService.mensajeError("ERROR DE CONEXION")
        }
      )
    }
  }
  verificarPermiso(data){
    return  this._DatospersonalesService.verificarPermisos(data)
   
   }
   cambiarnombreCarpetaPrincipal(data){
   Swal.fire({
     title: 'Nuevo Nombre',
     input: 'text',
     inputAttributes: {
       autocapitalize: 'off'
     },
     showCancelButton: true,
     confirmButtonText: 'Cambiar',
     cancelButtonText:"Cancelar",
     showLoaderOnConfirm: true,
     preConfirm: (nombre) => {
       if(nombre!==""){
         var parametro={
           idcarpetaPrincipal: data.idcarpetaPrincipal,
           nombrecarpeta:nombre
         }
   this.esperar=!this.esperar
     this._DatospersonalesService.cambiarnombreCarpetaPrincipal(parametro).subscribe(
       Response=>{
         if (Response.error) {
           this._DatospersonalesService.mensajeError(Response.error)
         } else {
           if (Response.mensaje) {
           this._DatospersonalesService.mensajeError(Response.mensaje)
             
           } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado) 
            this.archivoPrincipal()
           }
         }
         this.esperar=!this.esperar
         return nombre
       },error=>{
         this._DatospersonalesService.mensajeError("Error de Conexion")
         this.esperar=!this.esperar
         return nombre
       }
     )
       }
      
     },
     allowOutsideClick: () => !Swal.isLoading()
   }).then((result) => {
     if (result.isConfirmed) {

      //  console.log(result.value)
     }
   })
  }
  cambiarnombreCarpetaSegundaria(data){
   Swal.fire({
     title: 'Nuevo Nombre',
     input: 'text',
     inputAttributes: {
       autocapitalize: 'off'
     },
     showCancelButton: true,
     confirmButtonText: 'Cambiar',
     cancelButtonText:"Cancelar",
     showLoaderOnConfirm: true,
     preConfirm: (nombre) => {
       if(nombre!==""){
         var parametro={
           idcarpetasegundaria: data.idcarpetasegundaria,
           Nombre:nombre
         }
   this.esperar=!this.esperar
     this._DatospersonalesService.cambiarnombreCarpetaSegundaria(parametro).subscribe(
       Response=>{
         if (Response.error) {
           this._DatospersonalesService.mensajeError(Response.error)
         } else {
           if (Response.mensaje) {
           this._DatospersonalesService.mensajeError(Response.mensaje)
             
           } else {
            this._DatospersonalesService.mensajeBueno(Response.resultado) 
            this.buscarSegundacarpeta(this.idcarpetaPrincipal);
           }
         }
         this.esperar=!this.esperar
         return nombre
       },error=>{
         this._DatospersonalesService.mensajeError("Error de Conexion")
         this.esperar=!this.esperar
         return nombre
       }
     )
       }
      
     },
     allowOutsideClick: () => !Swal.isLoading()
   }).then((result) => {
     if (result.isConfirmed) {
      //  console.log(result.value)
     }
   })
  }
  puestoSeleccionado
  puestoseleccionado(data){
this.puestoSeleccionado = data
  }
  async   cambiarNombrePuesto(data,form:NgForm){
    let respuesta = await this._DatospersonalesService.mensajePregunta("Alto","Esta seguro de cambiar el nombre")
    if (respuesta) {
     
      let parametro = {
           nombre:   data.nombre ,
           idPuesto:  this.puestoSeleccionado.idPuesto
      }
      //actualizarNombrePuesto
      this.esperar=!this.esperar
      this._DatospersonalesService.actualizarNombrePuesto(parametro).subscribe(
        Response=>{
          this.esperar=!this.esperar
          if (Response.error) return  this._DatospersonalesService.mensajeError(Response.error)
          if (Response.mensaje)return  this._DatospersonalesService.mensajeError(Response.mensaje)
            this._DatospersonalesService.mensajeBueno(Response.resultado)
          this.sacarPuestos_delNombramiento(this.nombramientoSelected)
             this.formIdentidad.reset()
          
     
        },error=>{
          this._DatospersonalesService.mensajeError("Error de Conexion")
          this.esperar=!this.esperar
         
        }
      )
    }
  
  }

  displayNuevoGrado = false;
displayCupos = false;

abrirDialogNuevoGrado() {
  this.displayNuevoGrado = true;
}

abrirDialogCupos() {
  this.displayCupos = true;
}

mostrarModalGrado=false
mostrarDialogNuevoCupo() {
  this.mostrarModalGrado = true;
}

 
}


