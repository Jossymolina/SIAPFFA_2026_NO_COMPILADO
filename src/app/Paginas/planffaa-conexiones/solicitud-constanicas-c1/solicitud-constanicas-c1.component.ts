import { Component, ViewChild, viewChild } from '@angular/core';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


(pdfMake as any).vfs = (pdfFonts as any).vfs;
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-solicitud-constanicas-c1',
  standalone: true,
  imports: [CommonModule,
    FormsModule, Button, CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    SelectModule,
    TableModule,
    TagModule,
    DividerModule,
    ChipModule],
  templateUrl: './solicitud-constanicas-c1.component.html',
  styleUrl: './solicitud-constanicas-c1.component.css',
})
export class SolicitudConstanicasC1Component {

  usuarioLogin: any;
  constructor(
    private _DatospersonalesService: ServicioBackendService,
    private _ServiciosMensajesService: ServiciosMensajeService
  ) { }


  ngOnInit(): void {
    this.usuarioLogin = JSON.parse(localStorage.getItem('user_login')!).user;

  }
  enter(key, data) {

    if (key.keyCode === 13) {
      if (data.nombre.length === 0) return this._ServiciosMensajesService.mensajeMalo("Rellene el campo")
      this.buscarPorNombre(data)
    }
  }
  pantalla = 1
  atras(pantalla) {
    this.pantalla = pantalla
  }
  arregloPersonaNombre = []
  buscarPorNombre(data) {

    if (data.nombre.trim().length <= 3) return this._ServiciosMensajesService.mensajeMalo("Rellene el campo, o escriba mas de 3 letras")

    let parametro = {
      cadena: ` and  nombre_id like "%${data.nombre}%"`
    }
    this._ServiciosMensajesService.show()
    this.arregloPersonaNombre = []
    this._DatospersonalesService.buscarPersonal_en_siapffa(parametro).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide()
        if (response.error) {
          this._ServiciosMensajesService.mensajeMalo(response.error)
        } else {
          if (response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(response.mensaje)
          } else {

            this.arregloPersonaNombre = response.resultado
            this.pantalla = 2
          }
        }
      }, error: () => {
        this._ServiciosMensajesService.hide()


        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }
  personaSeleccionada
  correos = []
  telefonos = []

  seleccionarPersona(data) {
    this.personaSeleccionada = data
    this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarCorreoYtelefono({ identidad: this.personaSeleccionada.identidad }).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide()
        this.correos = response.correo
        this.telefonos = response.numero
        this.pantalla = 3
      }, error: () => {
        this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer()
      }
    })

  }

  arregloObjeto = []

  arregloEmpresa = []




  tipoPersona: number = 1;
  objetoSeleccionado
  empresaSeleccionada
  tipoConstancia: number | null = null;
  async getBase64ImageFromURL(url: string): Promise<string> {

    const data = await fetch(url);

    const blob = await data.blob();

    return new Promise((resolve) => {

      const reader = new FileReader();

      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

    });

  }

  @ViewChild("formRegistrar") formRegistrar: NgForm


  obtenerFechaActualEnLetras(): string {

    const fecha = new Date();

    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ];

    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];

    const diaSemana = dias[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} del ${anio}`;

  }

  generarConstanciaBaja() {
    return this._ServiciosMensajesService.mensajeMalo("En desarrollo ")
  }

  async generarPDF() {

    if (this.formRegistrar.value.empresa.length === 0) return this._ServiciosMensajesService.mensajeMalo("Rellene el campo empresa")

    this._ServiciosMensajesService.show()

    const logoIzquierda = await this.getBase64ImageFromURL('fuerzasArmadas2.jpg');
    const LogoDerecho = await this.getBase64ImageFromURL('Presentación1.jpg');
    const firmaDirector = await this.getBase64ImageFromURL('Captura de pantalla 2026-06-04 094429.png');

    const fechaImpresion = new Date().toLocaleString('es-HN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });


    const usuarioImprime = this.usuarioLogin.nombres + ' ' + this.usuarioLogin.apellidos;




    const texto1 = [
      {
        text: 'El suscrito Director de Recursos Humanos (C-1) del Estado Mayor Conjunto, por este medio hace constar que: '
      },

      {
        text: this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellido,
        bold: true
      },

      {
        text: ' con Documento Nacional de Identificación '
      },

      {
        text: this.personaSeleccionada.identidad,
        bold: true
      },

      {
        text: ', es miembro activo de las Fuerzas Armadas de Honduras, desde el: '
      },

      {
        text: this.personaSeleccionada.fecha_ingreso.split("T")[0],
        bold: true
      },

      {
        text: ', hasta la actualidad.'
      }
    ];

    const texto2 = [
      {
        text: 'Desempeña funciones bajo el cargo de: '
      },

      {
        text: this.personaSeleccionada.cargo,
        bold: true
      },

      {
        text: ', en el/la: '
      },

      {
        text: this.personaSeleccionada.unidad_asignado +
          ' / ' +
          this.personaSeleccionada.direccion_asignacion,
        bold: true
      },

      {
        text: '.'
      }
    ];

    const texto3 = [
      {
        text: 'Y para los fines que se estime conveniente, se le extiende la presente en la ciudad de Comayagüela M.D.C., el '
      },

      {
        text: this.obtenerFechaActualEnLetras(),
        bold: true
      },

      {
        text: '.'
      }
    ];

    const documentDefinition: any = {

      pageSize: 'A4',

      pageMargins: [20, 20, 20, 30],

      content: [

        // LOGO
        {
          image: logoIzquierda,
          width: 90,
          absolutePosition: {
            x: 30,
            y: 10
          }
        },

        // TITULOS
        {
          text: 'FUERZAS ARMADAS DE HONDURAS',
          bold: true,
          fontSize: 14,
          alignment: 'center',
          margin: [0, 0, 0, 2]
        },

        {
          text: 'ESTADO MAYOR CONJUNTO',
          bold: true,
          fontSize: 11,
          alignment: 'center',
          margin: [0, 0, 0, 2]
        },

        {
          text: 'DIRECCIÓN DE RECURSOS HUMANOS (C-1)',
          bold: true,
          fontSize: 11,
          alignment: 'center',
          margin: [0, 0, 0, 2]
        },

        {
          text: '"200 AÑOS AL SERVICIO DE LA PATRIA"',
          color: 'green',
          bold: true,
          fontSize: 11,
          alignment: 'center',
          margin: [0, 0, 0, 2]
        },

        {
          text: 'TELÉFONO: 2276-3400 EXT-2250',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },

        {
          image: LogoDerecho,
          width: 170,
          absolutePosition: {
            x: 440,
            y: 10
          }
        },

        // LINEA
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 521,
              y2: 0,
              lineWidth: 1
            }
          ],
          margin: [30, 0, 0, 10]
        },

        // BARRA AZUL
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'CONSTANCIA DE MIEMBRO ACTIVO',
                  alignment: 'center',
                  bold: true,
                  fillColor: '#7ED0FF',
                  margin: [30, 5, 0, 5]
                }
              ]
            ]
          },
          layout: 'noBorders',
          margin: [30, 0, 0, 15]
        },

        // CMA
        /*
        {
          text: 'CMA No.260',
          fontSize: 11,
          margin: [30, 0, 0, 15]
        },*/

        // TEXTO 1
        {
          text: texto1,
          fontSize: 12,
          alignment: 'justify',
          margin: [30, 0, 0, 15]
        },

        // TEXTO 2
        {
          text: texto2,
          fontSize: 12,
          alignment: 'justify',
          margin: [30, 0, 0, 15]
        },

        // EMPRESA
        {
          text: [
            {
              text: 'Constancia válida para realizar trámites con: '
            },

            {
              text: this.formRegistrar.value.empresa,
              bold: true
            },

            {
              text: '.'
            }
          ],
          fontSize: 12,
          margin: [30, 0, 0, 8]
        },

        // VIGENCIA
        {
          text: 'Este documento tiene una vigencia de: 30 días desde su fecha de emisión.',
          fontSize: 12,
          margin: [30, 0, 0, 18]
        },

        // TEXTO 3
        {
          text: texto3,
          fontSize: 12,
          alignment: 'justify',
          margin: [30, 0, 0, 40]
        },

        // VALORES
        {
          columns: [
            {
              text: 'HONOR',
              bold: true,
              alignment: 'left'
            },

            {
              text: 'LEALTAD',
              bold: true,
              alignment: 'center'
            },

            {
              text: 'SACRIFICIO',
              bold: true,
              alignment: 'right'
            }
          ],
          fontSize: 12,
          margin: [30, 0, 0, 20]
        },

        {
          stack: [
            {
              stack: [

                {
                  image: firmaDirector,
                  width: 300,
                  alignment: 'center',
                  margin: [0, 0, 0, -120]
                },





              ],
              margin: [0, 0, 0, 0]
            }

          ],

          margin: [0, 40, 0, 0]
        },
        {
          text: `Fecha de impresión: ${fechaImpresion} | Usuario: ${usuarioImprime}`,
          fontSize: 7,
          color: '#0834f8',
          italics: true,
          alignment: 'left',
          margin: [30, 210, 0, 0]
        },

        {

          margin: [30, 10, 0, 0],

          stack: [

            {
              text: '"LA JERARQUÍA, DISCIPLINA Y UNIDAD DE MANDO, SON LOS PRINCIPIOS FUNDAMENTALES EN NUESTRO ÉXITO"',
              alignment: 'center',
              fontSize: 8,
              margin: [30, 0, 0, 5]
            },

            {
              text: 'Barrio El Obelisco, Tegucigalpa, Francisco Morazán, Honduras',
              alignment: 'center',
              fontSize: 8
            }

          ]
        }


      ],


    };

    pdfMake.createPdf(documentDefinition).open();

    this._ServiciosMensajesService.hide()
  }






}