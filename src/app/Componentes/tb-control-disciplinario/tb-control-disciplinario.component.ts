import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,


} from '@angular/forms';
@Component({
  selector: 'app-tb-control-disciplinario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tb-control-disciplinario.component.html',
  styleUrl: './tb-control-disciplinario.component.css',
})
export class TbControlDisciplinarioComponent {
  arregloArestos = []
  @Input("identidad") identidad_
  idarrestoSelected;
  imgURL: any = "";
  public FilesToUploads: Array<File> = [];
  private identidadregex: any = /^[0-9]*$/;
  personaQueAreasta: any;

  constructor(
    private _Router: Router,
    private _Activatedroute: ActivatedRoute,
    public _DatospersonalesService: ServicioBackendService,


    private _ServiciosMensajesService: ServiciosMensajeService

  ) {
    /*
    this._Activatedroute.params.subscribe(prm => {
      this.tipoConsulta = prm['id'];

    })*/
  }
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
  usuariologuiado;
  ngOnInit(): void {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarArestosdelPersonal();
    this.sacarPermisoPersonal()
  }
  sacarArestosdelPersonal() {
    var params = {
      identidad: this.identidad_
    }

    this.arregloArestos = []
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.sacarAresto(params).subscribe(
      Response => {
        this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
        } else {
          if (Response.mensaje) {
            // this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.arregloArestos = Response.resultado;

          }
        }
      }, error => {
        this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  async deleteDocumentoArresto(iddocumento: any, dir: any) {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de eliminar el documento...")
    if (respuesta) {
      var params = {
        idarrestos: iddocumento,
        dir: dir
      }
      this._ServiciosMensajesService.show()

      this._DatospersonalesService.deleteDocumentoArrestos(params).subscribe(
        Response => {
          this._ServiciosMensajesService.hide();

          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error)
          } else {
            if (Response.mensaje) {
              this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
              this.sacarArestosdelPersonal();
            }
          }
        }, error => {
          this._ServiciosMensajesService.hide();
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }

  }
  ver(f: any) {
    this.idarrestoSelected = f.idarrestos

  }

  @ViewChild('file') file;
  arreglosArchivos = []
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
  guardardocumentoDElArresto() {
  
   const body = new FormData();
      this.arreglosArchivos.forEach((element) => {
        body.append('myfile', element.archivo, element.nombre);
      });
      let parametros = {
        idAresto: this.idarrestoSelected,
        usuariologuiado: this.usuariologuiado
      }
      this._ServiciosMensajesService.show()
       body.append('parametros', JSON.stringify(parametros));
        this._DatospersonalesService.subirdocumentosArresto(body).subscribe({
        next: (response) => {
          this._ServiciosMensajesService.hide();
        this.sacarArestosdelPersonal();
          if (response.error) return this._ServiciosMensajesService.mensajeMalo(response.error);
          if (response.mensaje) return this._ServiciosMensajesService.mensajeAdvertencia(response.mensaje);
          if (response.resultado) {
           this.file.nativeElement.value = "";
            this.arreglosArchivos = [];
         
          
            return this._ServiciosMensajesService.mensajeBueno(response.resultado);
          }



        }, error: () => {
                   this._ServiciosMensajesService.hide();


          this._ServiciosMensajesService.mensajeerrorServer();
        }
      })
       /*
    this._ServiciosMensajesService.show()
    this.makeFileReques(this._DatospersonalesService.url2 + "subirdocumentosArresto/" + this.idarrestoSelected, [], this.FilesToUploads).then(
      (result: any) => {
        this._ServiciosMensajesService.hide()

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
      }, error => {
        this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )*/

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
  fileChangeEvenet(fileInput: any) {

    this.FilesToUploads = <Array<File>>fileInput.target.files;


  }
  async guardarAresto() {
    let respuesta = await this._ServiciosMensajesService.mensajePregunta("Esta seguro de agregar este arresto");
    if (respuesta) {
      this.formularioAresto.value.identidad = this.identidad_;
      if (this.formularioAresto.valid) {
        this._ServiciosMensajesService.show()

        this._DatospersonalesService.guardarAresto(this.formularioAresto.value).subscribe(
          Response => {
            this._ServiciosMensajesService.hide()
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
          }, error => {
            this._ServiciosMensajesService.hide()
            this._ServiciosMensajesService.mensajeerrorServer();
          }
        )

      } else {

        this._DatospersonalesService.mensajeError("Rellene los Campos")


      }
    }


  }
  buscarPersonaParaOrdenarAresto() {

    var params = {
      identidad_pariente: this.formularioAresto.value.identidadAcusador
    }
    this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarPersonalIdentidad(params).subscribe(
      Response => {
        this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)
        } else {
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
          } else {
            this.personaQueAreasta = Response.resultado[0];

          }
        }
      }, error => {
        this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  mostrarModalAresto = false;
  mostrarModalDocumentoArresto = false;
  mostrarModalBuscarPersona = false;
  agregarArestoT = false
  sacarPermisoPersonal() {

    this.agregarArestoT = this._DatospersonalesService.verificarPermisos(['User_admin', 'User_admin01', 'User_admin02'])
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }

}
