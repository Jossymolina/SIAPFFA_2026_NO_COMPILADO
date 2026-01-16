import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroupDirective, FormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import Swal from 'sweetalert2';
import moment from 'moment';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar-bajas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    MultiSelectModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule
  

  ],
  templateUrl: './registrar-bajas.component.html',
  styleUrl: './registrar-bajas.component.css',
})
export class RegistrarBajasComponent {

  personaseleccionada: any;
  cambiodeVEntanas = 0;
  banderaspiner = 0;
  usuarioLogin: any;
  arregloTiposBaja = new Array();
  private identidadregex: any = /^[0-9]*$/;
  fechaActual: any;
  formbaja = {
    idtipoBaja: "",
    observacion: "",
    fecha: ""

  };
  fechabajaseleccionada: any;
  public formIdentidad = new UntypedFormGroup({
    identidad: new UntypedFormControl('', [Validators.required, Validators.pattern(this.identidadregex)]),
  });
  get identidad() { return this.formIdentidad.get('identidad'); }
  public formBAJA = new UntypedFormGroup({
    tipoBaja: new UntypedFormControl('', [Validators.required]),
    observacion: new UntypedFormControl('', [Validators.required]),
  });
  get tipoBaja() { return this.formBAJA.get('tipoBaja'); }

  get observacion() { return this.formBAJA.get('observacion'); }
  constructor(private _DatospersonalesService: ServicioBackendService, private _ServiciosMensajeService: ServiciosMensajeService, private router: Router) { }

  ngOnInit(): void {

    this.sacarFechaActual()
    this.sacarTipsoBajas();

    this.usuarioLogin = JSON.parse(localStorage.getItem('user_login')!).user;
  }
  sacarFechaActual() {
    this._DatospersonalesService.sacarFecha().subscribe(
      Response => {
        let a = Response.fecha.split("/")
        this.fechaActual = a[2] + "-" + a[1] + "-" + a[0]
      }
    )
  }
  sacarTipsoBajas() {
    this._DatospersonalesService.sacartiposDebajas().subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error)
        } else {
          this.arregloTiposBaja = Response.resultado;

        }
      }
    )
  }
  buscarporidentidad() {
    this.banderaspiner = 1;
    if (this.formIdentidad.invalid) {
      this._DatospersonalesService.mensajeError("IDENTIDAD NO VALIDA")
      this.banderaspiner = 0;
    } else {
      var params = {
        identidad_pariente: this.formIdentidad.value.identidad,
        idunidad: this.usuarioLogin.idunidad
      }

      this._DatospersonalesService.sacarpersonalParaDarDebaja(params).subscribe(
        Response => {

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this.personaseleccionada = Response.resultado[0];
              this.cambiodeVEntanas = 1;

            }
          }
          this.banderaspiner = 0;
        }
      )
    }


  }
  buscarporidentidadParaEMc() {
    this.banderaspiner = 1;
    if (this.formIdentidad.invalid) {
      this._DatospersonalesService.mensajeError("IDENTIDAD NO VALIDA")
      this.banderaspiner = 0;
    } else {

      var params = {
        identidad: this.formIdentidad.value.identidad,

      }
      this._ServiciosMensajeService.show("Cargando informacion...")
      this._DatospersonalesService.sacarpersonalDarbajaEMC(params).subscribe(
        {
          next: (Response) => {
            this._ServiciosMensajeService.hide()
            if (Response.error) return this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
            if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)
            this.personaseleccionada = Response.resultado[0];
            this.cambiodeVEntanas = 3;

          }, error: () => {
            this._ServiciosMensajeService.hide()

            this._DatospersonalesService.mensajeError("Error de conexion")
            this.banderaspiner = 0;
          }
        }
      )
    }


  }
  /**agregarBaja(){
  if (this.fechabajaseleccionada===undefined) {
    this._DatospersonalesService.mensajeError("SELECCIONE LA FECHA DE BAJA")
  } else {
    if (this.formBAJA.invalid) {
      this._DatospersonalesService.mensajeError("RELLENE TODO LOS DATOS")
  } else {
    var fechabaja = this.fechabajaseleccionada.split("-")
      let parsed = moment( this.fechaActual, "DD/MM/YYYY");
      let bajafecha = moment( fechabaja[2]+"/"+fechabaja[1]+"/"+fechabaja[0], "DD/MM/YYYY");
  
      if (parsed<bajafecha) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'FECHA DE BAJA INCORRECTA. (LA FECHA DE BAJA DEBE SER MENOR A LA DE REGISTRO)',
          footer: 'Control del Sistema'
        })
      }else{
        var parametrodeBaja={
          fecha:this.fechaActual,
          identidad:this.formIdentidad.value.identidad,
          observacion:this.formBAJA.value.observacion,
          idtiposBaja:this.formBAJA.value.tipoBaja,
          idunidad:this.personaseleccionada.idunidad,
          fecha_de_baja:this.fechabajaseleccionada,
          usuario: JSON.parse(localStorage.getItem('user_login')!).user,
          personaBaja: this.personaseleccionada
        }
      
        this._DatospersonalesService.agregarBaja(parametrodeBaja).subscribe(
          Response=>{
              if (Response.mensaje) {
              
                   this._DatospersonalesService.mensajeError(Response.mensaje)
              } else {
                if (Response.resultado) {
                  this.tipoConsulta = "4";
                  this.ventanasegundaria=0;
                  this._DatospersonalesService.mensajeBueno("BAJA AGREGADO CON EXITO")
                } 
              }
          }
        )
      } 
  
  }
  }

} */
  async agregarBaja() {
    let respuesta = await this._DatospersonalesService.mensajePregunta("Agregar baja", "Esta seguro de ejecutar la baja")
    if (respuesta) {
      if (this.fechabajaseleccionada === undefined) {
        this._DatospersonalesService.mensajeError("SELECCIONE LA FECHA DE BAJA")
      } else {
        if (this.formBAJA.invalid) {
          this._DatospersonalesService.mensajeError("RELLENE TODO LOS DATOS")
        } else {
          let parsed = moment(this.fechaActual);
          let bajafecha = moment(this.fechabajaseleccionada);
          if (parsed < bajafecha) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'FECHA DE BAJA INCORRECTA. (LA FECHA DE BAJA DEBE SER MENOR A LA DE REGISTRO)',
              footer: 'Control del Sistema'
            })
          } else {
            if (this.arreglosArchivos.length === 0) return this._DatospersonalesService.mensajeError("Incluya archivos de respaldo de la baja")

            var parametrodeBaja = {
              fecha: this.fechaActual,
              identidad: this.formIdentidad.value.identidad,
              observacion: this.formBAJA.value.observacion,
              idtiposBaja: this.formBAJA.value.tipoBaja,
              idunidad: this.personaseleccionada.idunidad,
              fecha_de_baja: this.fechabajaseleccionada,
              usuario: this.usuarioLogin,
              personaBaja: this.personaseleccionada

            }
            const body = new FormData();
            this.arreglosArchivos.forEach((element) => {
              body.append('myfile', element.archivo, element.nombre);
            });

            body.append('parametros', JSON.stringify(parametrodeBaja));
            this._ServiciosMensajeService.show()

            this._DatospersonalesService.agregarBaja(body).subscribe(
              {
                next: (Response) => {
                  this._ServiciosMensajeService.hide()

                  if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)
                  if (Response.error) return this._DatospersonalesService.mensajeError(Response.error)
               
                    if (Response.resultado) {
                      this.subirArchivo.nativeElement.value = "";
                      this.arreglosArchivos = [];
                      this.formBAJA.reset()
                      this._DatospersonalesService.mensajeBueno("Baja ejecutada con exito")
                      this.cambiodeVEntanas = 0;
                     
                  }
                }, error: () => {
                  this._DatospersonalesService.mensajeError("Error de conexion")

                  this._ServiciosMensajeService.hide()

                }
              }
            )
          }

        }
      }
    }

  }
  


  atras() {
    this.cambiodeVEntanas = 0;
  }
  atras2() {
    this.cambiodeVEntanas = 0;
  }
  verificarfecha() {
    // var fechabaja = this.fechabajaseleccionada.split("-")
    let parsed = moment(this.fechaActual);
    let bajafecha = moment(this.fechabajaseleccionada);
 
    
    if (parsed < bajafecha) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'LA FECHA DE BAJA NO ES LA CORRECTA. (LA FECHA DE BAJA DEBE SER MENOR A LA DE REGISTRO)',
        footer: 'Control del Sistema'
      })
    }
  }
  verificarPermiso(data) {
    return this._DatospersonalesService.verificarPermisos(data)

  }
  @ViewChild("subirArchivo") subirArchivo: ElementRef
  arreglosArchivos = [];
  limpiarBandejaArregloArchivos() {
    this.arreglosArchivos = [];
    this.subirArchivo.nativeElement.value = ""
  }
  AgregarArchivos(data) {

    this.arreglosArchivos = [];
    for (let index = 0; index < data.target.files.length; index++) {
      const file = data.target.files[index];
      var parametros = {
        archivo: file,
        nombre: file.name,
      };
      this.arreglosArchivos.push(parametros);
    }
    //this.subirArchivo.nativeElement.value = ""
  }

  async nuevaFuncionRegistrarBajaEMC() {

    
    let respuesta = await this._DatospersonalesService.mensajePregunta("Agregar baja", "Esta seguro de ejecutar la baja")
    if (respuesta) {
      if (this.formBAJA.invalid) return this._DatospersonalesService.mensajeError("RELLENE TODO LOS DATOS")
      if (this.arreglosArchivos.length === 0) return this._DatospersonalesService.mensajeError("Incluya archivos de respaldo de la baja")

      var parametrodeBaja = {
        fecha: this.fechaActual,
        identidad: this.formIdentidad.value.identidad,
        observacion: this.formBAJA.value.observacion,
        idtiposBaja: this.formBAJA.value.tipoBaja,
        idunidad: this.personaseleccionada.idunidad,
        fecha_de_baja: this.fechabajaseleccionada,
        usuario: this.usuarioLogin,
        personaBaja: this.personaseleccionada

      }
    
      
      const body = new FormData();
      this.arreglosArchivos.forEach((element) => {
        body.append('myfile', element.archivo, element.nombre);
      });

      body.append('parametros', JSON.stringify(parametrodeBaja));
      this._ServiciosMensajeService.show()

      this._DatospersonalesService.agregarBajaEMC(body).subscribe({
        next: (response) => {
          this._ServiciosMensajeService.hide()

          if (response.error) return this._DatospersonalesService.mensajeError(response.error)
          if (response.mensaje) return this._DatospersonalesService.mensajeError(response.mensaje)

          if (response.resultado) {
            this.subirArchivo.nativeElement.value = "";
            this.arreglosArchivos = [];
            this.formBAJA.reset()
            this._DatospersonalesService.mensajeBueno("Baja ejecutada con exito")
            this.cambiodeVEntanas = 0;

          }



        }, error: () => {
          this._ServiciosMensajeService.hide()
          this._DatospersonalesService.mensajeError("Error de conexion a la base de datos")
        }
      })
    }

  }

    atrasMenu(item) {
        this.router.navigate([item]);
   
  }

 
   sacarPermisoPersonal(permisos : string[]){
  
    return this._DatospersonalesService.verificarPermisos(permisos)
    
  }
}
