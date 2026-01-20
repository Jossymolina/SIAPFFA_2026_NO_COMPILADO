import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import * as XLSX from 'xlsx';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VisualizarPerfilComponent } from '../../../Componentes/visualizar-perfil/visualizar-perfil.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-busqueda-personalizada',
  standalone: true,
  imports: [
    FormsModule,
    MultiSelectModule,
    CommonModule,
    VisualizarPerfilComponent,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './busqueda-personalizada.component.html',
  styleUrl: './busqueda-personalizada.component.css',
})
export class BusquedaPersonalizadaComponent implements OnInit {

  // ============================
  // PROPIEDADES PRINCIPALES
  // ============================
  arregloResultado: any[] = [];
  arregloResultadoFiltrado: any[] = [];

  formularioBuscar: number = 0;
  personaSelecionada: any;

  ArregloUnidades: any[] = [];
  arregloFuerzas: any[] = [];
  usuariologuiado: any;
  permisoFuerza: boolean;
  permisoUnidad: boolean;
  fuerzaselected: any;

  arregloNiveles: any[] = [];
  arregloCarreras: any[] = [];

  arregloCategorias = [
    { categoria: 'Oficiales de las Armas', nivel: 6 },
    { categoria: 'Oficiales Auxiliar', nivel: 5 },
    { categoria: 'Sub Oficiales', nivel: 4 },
    { categoria: 'Cadetes', nivel: 3 },
    { categoria: 'Estudiantes', nivel: 2 },
    { categoria: 'Tropa', nivel: 1 },
    { categoria: 'Auxiliares', nivel: 0 },
  ];

  arregloReligion = [
    { religion: 'Catolico' },
    { religion: 'Evangelico' },
    { religion: 'Mormon' },
    { religion: 'Testigo de Jehova' },
  ];

  arregloSexo = [
    { sexo: 'M', nombreSexo: 'Masculino' },
    { sexo: 'F', nombreSexo: 'Femenino' },
  ];

  arregloCombatiente = [
    { combatiente: 'Si', code: 1 },
    { combatiente: 'No', code: 0 },
  ];

  arregloSangre = [
    { sangre: 'A-' },
    { sangre: 'A+' },
    { sangre: 'B-' },
    { sangre: 'B+' },
    { sangre: 'O-' },
    { sangre: 'O+' },
    { sangre: 'AB-' },
    { sangre: 'AB+' },
  ];

  arregloIdiomas: any[] = [];
  arregloarmas: any[] = [];
  arregloCursos: any[] = [];
  arregloResultado_: any[] = [];
  arregloGrados: any[] = [];

  estado = {
    activos: true,
    bajas: false,
  };

  filtroTexto: string = '';

  index_tab = 0;

  constructor(
    public _ServiciosMensajesService: ServiciosMensajeService,
    public _ServiciosSiapffaaService: ServicioBackendService,
    private _Router: Router,
    private http: HttpClient
  ) {}

  // ============================
  // CICLO DE VIDA
  // ============================
  ngOnInit(): void {
    this.sacarFuerza();
    this.sacarGrados();
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;

 /*   this.permisoFuerza = this._ServiciosSiapffaaService.verificarPermisos(3);
    this.permisoUnidad = this._ServiciosSiapffaaService.verificarPermisos(4);*/
  }

  // ============================
  // ESTADO (Activos/Bajas)
  // ============================
  resetEstados() {
    this.estado = {
      activos: true,
      bajas: false,
    };
  }

  activofn() {
    this.estado.activos = !this.estado.activos;
  }

  bajafn() {
    this.estado.bajas = !this.estado.bajas;
  }

  crearCadenaestado() {
    if (this.estado.activos === true && this.estado.bajas === true) {
      return 'and (activo= 1 or activo=2) ';
    } else if (this.estado.activos === true) {
      return 'and (activo= 1)';
    } else if (this.estado.bajas === true) {
      return 'and (activo= 2)';
    } else {
      return 'and (activo= 1) ';
    }
  }

  // ============================
  // 65 AÑOS
  // ============================
  sacarPersonal_65_anos(date?: any) {
    let d = new Date().toISOString().split('T')[0];
    let parametro = {
      cadena:
        'and (activo= 1)' +
        " and month(fecha_nacimiento) = month('" +
        d +
        "')  and edad_proxima=65",
    };
    this._ServiciosMensajesService.show();
    this._ServiciosSiapffaaService.vistaSiapffaa(parametro).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide();

        if (response.error)
          return this._ServiciosMensajesService.mensajeMalo(response.error);
        if (response.mensaje)
          return this._ServiciosMensajesService.mensajeMalo(response.mensaje);

        this.resetEstados();
        this.arregloResultado = response.resultado || [];
        this.aplicarFiltro(); // si quieres reutilizar el mismo listado
        this.formularioBuscar = 5; // o 1 si usas otra vista
      },
      error: () => {
        this._ServiciosMensajesService.hide();
        this._ServiciosMensajesService.mensajeerrorServer();
      },
    });
  }

  // ============================
  // BÚSQUEDA PRINCIPAL
  // ============================
  buscar(formulario: NgForm) {
    let parametro = {
      cadena:
        this.crearCadenaestado() +
        this.crearCadenaLike(formulario.value.nombre_id, 'nombre_id') +
        this.crearCadena(formulario.value.serie, 'serie') +
        this.crearCadena(formulario.value.cuenta, 'cuenta') +
        this.crearCadena(formulario.value.usuario, 'usuario') +
        this.crearCadena(formulario.value.pasaporte, 'pasaporte') +
        this.devolverOR(formulario.value.fuerza_, 'idfuerza', 'idfuerza_pertenece') +
        this.devolverOR(formulario.value.categoria_, 'nivel', 'nivel') +
        this.devolverOR(formulario.value.nombre_grado_, 'idgrados', 'idgrados') +
        this.devolverOR(formulario.value.religion_, 'religion', 'religion') +
        this.devolverOR(formulario.value.sexo_, 'sexo', 'sexo') +
        this.devolverOR(formulario.value.sangre_, 'sangre', 'sangre') +
        this.devolverOR(formulario.value.combatiente_, 'code', 'combatiente') +
        this.devolverOR(formulario.value.unidad_, 'idunidad', 'idunidad_asignado') +
        this.devolverOR_like(formulario.value.idiomas_, 'ididioma', 'idiomas') +
        this.devolverOR_like(
          formulario.value.nivel_profesion,
          'idnivel_educativo',
          'nivel_profesion'
        ) +
        this.devolverOR_like(
          formulario.value.profesion_,
          'idprofeciones',
          'profesion'
        ) +
        this.devolverOR(formulario.value.armas_, 'idarmas', 'idarmas') +
        this.devolverOR_like(
          formulario.value.cursos_,
          'idcursos_militares',
          'cursos_militares'
        ) +
        (formulario.value.fecha
          ? `and ( month(fecha_nacimiento) = month('${formulario.value.fecha}-1'))`
          : '') +
        `${
          this.permisoUnidad
            ? 'and (idunidad_asignado = ' + this.usuariologuiado.idunidad + ')'
            : this.permisoFuerza
            ? this.usuariologuiado.idfuerza <= 4
              ? 'and (idfuerza_pertenece = ' + this.usuariologuiado.idfuerza + ')'
              : 'and (idfuerza_asignada = ' + this.usuariologuiado.idfuerza + ')'
            : ''
        }`,
    };

    if (parametro.cadena.length === 0)
      return this._ServiciosMensajesService.mensajeAdvertencia(
        'Porfavor selecione por lo menos un criterio de busqueda'
      );

    this.arregloResultado = [];
    this.arregloResultadoFiltrado = [];

    this._ServiciosMensajesService.show();
    this._ServiciosSiapffaaService.vistaSiapffaa(parametro).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide();
        if (response.error)
          return this._ServiciosMensajesService.mensajeMalo(response.error);
        if (response.mensaje)
          return this._ServiciosMensajesService.mensajeMalo(response.mensaje);

        this.formularioBuscar = 5;
        this.resetEstados();
        this.arregloResultado = response.resultado || [];
        this.aplicarFiltro(); // 🔥 llena arregloResultadoFiltrado
      },
      error: () => {
        this._ServiciosMensajesService.hide();
        this._ServiciosMensajesService.mensajeerrorServer();
      },
    });
  }

  // ============================
  // FILTRO EN MEMORIA
  // ============================
  aplicarFiltro() {
    const term = (this.filtroTexto || '').trim().toLowerCase();

    if (!term) {
      this.arregloResultadoFiltrado = [...this.arregloResultado];
      return;
    }

    this.arregloResultadoFiltrado = this.arregloResultado.filter((i: any) => {
      const texto = (
        (i.nombre || '') +
        ' ' +
        (i.apellido || '') +
        ' ' +
        (i.identidad || '') +
        ' ' +
        (i.unidad_asignado || '') +
        ' ' +
        (i.categoria || '') +
        ' ' +
        (i.grado || '')
      ).toLowerCase();

      return texto.includes(term);
    });
  }

  // ============================
  // UTILIDADES CADENAS
  // ============================
  crearcadenaFecha(data: any) {
    return data ? `and ('${data}')''` : '';
  }

  crearCadena(propiedad_dato: any, nombre_propiedad: string) {
    let cadena = '';
    cadena += propiedad_dato ? nombre_propiedad + " = '" + propiedad_dato + "'" : '';
    let cadenaTermindad = ' and (' + cadena + ') ';
    if (cadenaTermindad.includes('and ()')) {
      return '';
    } else {
      return cadenaTermindad;
    }
  }

  crearCadenaLike(propiedad_dato: any, nombre_propiedad: string) {
    let cadena = '';
    cadena += propiedad_dato
      ? nombre_propiedad + " like '%" + propiedad_dato + "%'"
      : '';
    let cadenaTermindad = ' and (' + cadena + ') ';
    if (cadenaTermindad.includes('and ()')) {
      return '';
    } else {
      return cadenaTermindad;
    }
  }

  // ============================
  // PERFIL
  // ============================
  verPerfil(persona: any) {
    this.personaSelecionada = persona;
    this.formularioBuscar = 3;
    this.guardarVisualizacion();
  }

  guardarVisualizacion() {
    let parametro = {
      usuario: this.usuariologuiado,
      persona: this.personaSelecionada,
    };

    this._ServiciosSiapffaaService
      .guardarHistorialVisualizarPerfil(parametro)
      .subscribe(
        (Response) => {},
        (error) => {}
      );
  }

  atras(ventana_numero: number) {
    this.formularioBuscar = ventana_numero;
  }

  ventana_tab(e: any) {
    this.index_tab = e.index;
    this.formularioBuscar = 0;
  }

  // ============================
  // CARGA DE CATÁLOGOS
  // ============================
  sacarFuerza() {
    this.arregloFuerzas = [];

    this._ServiciosSiapffaaService.sacarFuerza().subscribe((Response) => {
      this.arregloFuerzas = Response.resultado;
      this.sacarIdiomas();
    });
  }

  sacarunidades(fuerza: any[]) {
    if (fuerza && fuerza.length !== 0) {
      let parametro = {
        cadena: this.devolverOR(fuerza, 'idfuerza', 'idfuerza'),
      };
      this.ArregloUnidades = [];
      this._ServiciosMensajesService.show();
      this._ServiciosSiapffaaService.sacarUnidadesArreglo(parametro).subscribe(
        (Response) => {
          this._ServiciosMensajesService.hide();
          this.ArregloUnidades = Response.resultado;
        },
        (error) => {
          this._ServiciosMensajesService.hide();
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      );
      this.sacarArmas(fuerza);
    }
  }

  devolverOR(objeto: any[], propiedadBuscada: string, nomprePropiedad: string) {
    if (objeto) {
      if (objeto.length !== 0) {
        let cadena = '';
        objeto.forEach((element2) => {
          let llave = Object.keys(element2).find(
            (element) => element === propiedadBuscada
          );
          cadena += llave
            ? ' or ' + nomprePropiedad + " = '" + element2[llave] + "'"
            : '';
        });
        return " and ( '' " + cadena + ') ';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  devolverOR_like(
    objeto: any[],
    propiedadBuscada: string,
    nomprePropiedad: string
  ) {
    if (objeto) {
      if (objeto.length !== 0) {
        let cadena = '';
        objeto.forEach((element2) => {
          let llave = Object.keys(element2).find(
            (element) => element === propiedadBuscada
          );
          cadena += llave ? '-' + element2[llave] + '-|' : '';
        });
        return (
          ' and ( ' +
          nomprePropiedad +
          " REGEXP ('" +
          cadena.substring(0, cadena.length - 1) +
          "')) "
        );
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  sacarIdiomas() {
    this.arregloIdiomas = [];
    this._ServiciosSiapffaaService.sacaridiomas().subscribe((Response) => {
      if (Response.error) {
        this._ServiciosMensajesService.mensajeMalo(Response.error);
      } else {
        this.arregloIdiomas = Response.resultado;
      }
      this.sacarNivelEducativo();
    });
  }

  sacarNivelEducativo() {
    this.arregloNiveles = [];

    this._ServiciosSiapffaaService.sacarnivelesEducativos().subscribe(
      (Response) => {
        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error);
        } else {
          if (Response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(Response.mensaje);
          } else {
            this.arregloNiveles = Response.resultado;
          }
        }
        this.cursus_militares();
      },
      (error) => {
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    );
  }

  sacarCarreras(data: any[]) {
    if (data && data.length !== 0) {
      var paraetro = {
        cadena: this.devolverOR(data, 'idnivel_educativo', 'idnivelEducativo'),
      };
      this.arregloCarreras = [];

      this._ServiciosSiapffaaService
        .sacarProfecionArreglo(paraetro)
        .subscribe(
          (Response) => {
            if (Response.error) {
              this._ServiciosMensajesService.mensajeMalo(Response.error);
            } else {
              if (Response.mensaje) {
                this._ServiciosMensajesService.mensajeMalo(Response.mensaje);
              } else {
                this.arregloCarreras = Response.resultado;
              }
            }
          },
          (error) => {
            this._ServiciosMensajesService.mensajeerrorServer();
          }
        );
    }
  }

  sacarArmas(data: any[]) {
    if (data && data.length !== 0) {
      let parametro = {
        cadena: this.devolverOR(data, 'idfuerza', 'fuerza_idfuerza'),
      };
      this._ServiciosSiapffaaService.sacararmasArreglo(parametro).subscribe(
        (Response) => {
          this.arregloarmas = Response.resultado;
        }
      );
    }
  }

  cursus_militares() {
    this._ServiciosSiapffaaService.sacarTotoCursosMilitares().subscribe(
      (Response) => {
        this.arregloCursos = Response.resultado;
      }
    );
  }

  limpiar(form: NgForm) {
    form.reset();
    this.filtroTexto = '';
    this.arregloResultado = [];
    this.arregloResultadoFiltrado = [];
  }

  // ============================
  // BÚSQUEDA SIMPLE
  // ============================
  busquedaSimple(data: NgForm) {
    this._ServiciosMensajesService.show();
    let cadena =
      this.crearCadenaestado() +
      this.crearCadenaLike(data.value.nombre_id, 'nombre_id') +
      `${
        this.permisoUnidad
          ? 'and (idunidad_asignado = ' + this.usuariologuiado.idunidad + ')'
          : this.permisoFuerza
          ? this.usuariologuiado.idfuerza <= 4
            ? 'and (idfuerza_pertenece = ' + this.usuariologuiado.idfuerza + ')'
            : 'and (idfuerza_asignada = ' + this.usuariologuiado.idfuerza + ')'
          : ''
      }`;

    let parametro = {
      cadena: cadena,
    };

    this._ServiciosSiapffaaService
      .buscarPersonasporNombreID(parametro)
      .subscribe(
        (Response) => {
          this._ServiciosMensajesService.hide();

          if (Response.error) {
            this._ServiciosMensajesService.mensajeMalo(Response.error);
          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mensaje);
            } else {
              this.resetEstados();
              this.arregloResultado_ = Response.resultado;
              this.formularioBuscar = 1;
            }
          }
        },
        (error) => {
          this._ServiciosMensajesService.hide();
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      );
  }

  reset() {
    this.formularioBuscar = 0;
  }

  sacarGrados = () => {
    this._ServiciosSiapffaaService.sacarTodo_losGrados().subscribe({
      next: (response) => {
        if (response.error)
          return this._ServiciosMensajesService.mensajeMalo(response.error);
        if (response.mensaje)
          return this._ServiciosMensajesService.mensajeMalo(response.mensaje);

        this.arregloGrados = response.resultado;
      },
      error: () => {
        this._ServiciosMensajesService.mensajeerrorServer();
      },
    });
  };

  // ============================
  // EXCEL (versión base64 con imagen)
  // ============================
  async exportarExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    worksheet.columns = [
      { header: 'Opt', key: 'opt', width: 6 },
      { header: 'Foto', key: 'foto', width: 15 },
      { header: 'Identidad', key: 'identidad', width: 18 },
      { header: 'Grado', key: 'grado', width: 18 },
      { header: 'Categoría', key: 'categoria', width: 18 },
      { header: 'Nombres', key: 'nombre', width: 20 },
      { header: 'Apellidos', key: 'apellido', width: 20 },
      { header: 'Serie', key: 'serie', width: 10 },
      { header: 'Estado', key: 'estado', width: 12 },
      { header: 'Combatiente', key: 'combatiente', width: 12 },
      { header: 'Tiempo Asignación', key: 'unidad_asignado', width: 25 },
      { header: 'Pasaporte', key: 'pasaporte', width: 15 },
      { header: 'Religión', key: 'religion', width: 15 },
      { header: 'Sangre', key: 'sangre', width: 10 },
      { header: 'Género', key: 'sexo', width: 10 },
      { header: 'Fecha Nacimiento', key: 'fecha_nacimiento', width: 18 },
      { header: 'Edad', key: 'edad', width: 8 },
    ];

    worksheet.getRow(1).font = { bold: true };

    const datos =
      this.arregloResultadoFiltrado && this.arregloResultadoFiltrado.length > 0
        ? this.arregloResultadoFiltrado
        : this.arregloResultado_;

    for (const i of datos) {
      const row = worksheet.addRow({
        opt: '',
        foto: '',
        identidad: i.identidad,
        grado: i.grado,
        categoria: i.categoria,
        nombre: i.nombre,
        apellido: i.apellido,
        serie: i.serie,
        estado: i.activo === 1 ? 'Activo' : 'Baja',
        combatiente: i.combatiente === 1 ? 'Si' : 'No',
        unidad_asignado: i.unidad_asignado,
        pasaporte: i.pasaporte,
        religion: i.religion,
        sangre: i.sangre,
        sexo: i.sexo,
        fecha_nacimiento: i.fecha_nacimiento
          ? new Date(i.fecha_nacimiento).toISOString().substring(0, 10)
          : '',
        edad: i.edad,
      });

      const rowIndex = row.number;

      const urlFoto =
        this._ServiciosSiapffaaService.url2 + 'sacarfoto/' + i?.foto;
      const dataUrl = await this.cargarImagenBase64(urlFoto);

      if (dataUrl) {
        const imageId = workbook.addImage({
          base64: dataUrl,
          extension: 'jpeg', // o 'png'
        });

        const cellRange = `B${rowIndex}:B${rowIndex}`;
        worksheet.addImage(imageId, cellRange);
        worksheet.getRow(rowIndex).height = 60;
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(
      blob,
      `resultados_personal_${new Date().toISOString().substring(0, 10)}.xlsx`
    );
  }

  private async cargarImagenBase64(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.onerror = () => reject(null);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error('Error cargando imagen', e);
      return null;
    }
  }

  atrasLink(ruta: string) {
    this._Router.navigate([ruta]);
  }

  // ============================
  // EXCEL 2 (buffer + imagen) ligado al botón Exportar
  // ============================
  private async descargarImagenComoArrayBuffer(
    url: string
  ): Promise<ArrayBuffer | null> {
    try {
      return (await this.http.get(url, {
        responseType: 'arraybuffer',
      }).toPromise()) as ArrayBuffer;
    } catch (e) {
      console.error('Error descargando imagen', e);
      return null;
    }
  }

  async exportexcel2(_idTabla?: string) {
    this._ServiciosMensajesService.show()
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Resultados');

    sheet.columns = [
      { header: 'Cuenta', key: 'cuenta', width: 18 },
      { header: 'Identidad', key: 'identidad', width: 20 },
      { header: 'Grado', key: 'grado', width: 15 },
      { header: 'Arma', key: 'arma', width: 18 },
      { header: 'Categoría', key: 'categoria', width: 18 },
      { header: 'Nombres', key: 'nombres', width: 22 },
      { header: 'Apellidos', key: 'apellidos', width: 22 },
      { header: 'Cargo', key: 'cargo', width: 25 },
      { header: 'Serie', key: 'serie', width: 14 },
      { header: 'Estado', key: 'estado', width: 12 },
      { header: 'Combatiente', key: 'combatiente', width: 14 },
      { header: 'Asignación', key: 'asignacion', width: 22 },
      { header: 'Fecha Asignación', key: 'fecha_asignacion', width: 18 },
      { header: 'Tiempo Asignación', key: 'tiempo_asignacion', width: 18 },
      { header: 'Pasaporte', key: 'pasaporte', width: 18 },
      { header: 'Religión', key: 'religion', width: 18 },
      { header: 'Sangre', key: 'sangre', width: 12 },
      { header: 'Género', key: 'genero', width: 12 },
      { header: 'Fecha Nac.', key: 'fecha_nacimiento', width: 18 },
      { header: 'Edad', key: 'edad', width: 8 },
      { header: 'Idioma', key: 'idioma', width: 22 },
    ];

    // Insertamos columna Foto como primera
    sheet.spliceColumns(1, 0, { header: 'Foto', key: 'foto' } as any);
    sheet.getColumn(1).width = 14;

    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    sheet.getRow(1).height = 22;

    const datos = this.arregloResultadoFiltrado || [];

    let excelRowIndex = 2;

    for (const i of datos) {
      const row = sheet.getRow(excelRowIndex);

      row.getCell('B').value = i.cuenta;
      row.getCell('C').value = i.identidad;
      row.getCell('D').value = i.grado;
      row.getCell('E').value = i.nombre_arma;
      row.getCell('F').value = i.categoria;
      row.getCell('G').value = i.nombre;
      row.getCell('H').value = i.apellido;
      row.getCell('I').value = i.Nombre_Puesto;
      row.getCell('J').value = i.serie;
      row.getCell('K').value = i.activo === 1 ? 'Activo' : 'Baja';
      row.getCell('L').value = i.combatiente === 1 ? 'Sí' : 'No';
      row.getCell('M').value = i.unidad_asignado;
      row.getCell('N').value = i.fecha_asignacion;
      row.getCell('O').value = i.tiempo_asignacion;
      row.getCell('P').value = i.pasaporte;
      row.getCell('Q').value = i.religion;
      row.getCell('R').value = i.sangre;
      row.getCell('S').value = i.sexo;
      row.getCell('T').value = i.fecha_nacimiento;
      row.getCell('U').value = i.edad;
      row.getCell('V').value = i.idiomas;

      row.height = 52;

      if (i.foto) {
        const urlFoto =
          this._ServiciosSiapffaaService.url2 + 'sacarfoto/' + i.foto;
        const buffer = await this.descargarImagenComoArrayBuffer(urlFoto);
        if (buffer) {
          const imageId = workbook.addImage({
            buffer: buffer,
            extension: 'jpeg', // o 'png'
          });

          sheet.addImage(imageId, {
            tl: { col: 0.2, row: excelRowIndex - 0.8 },
            ext: { width: 48, height: 48 },
            editAs: 'oneCell',
          });
        }
      }

      excelRowIndex++;
    }

    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        };
      });
    });

    const bufferExcel = await workbook.xlsx.writeBuffer();
    const blob = new Blob([bufferExcel], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    this._ServiciosMensajesService.hide()
    saveAs(blob, 'resultados_consulta_combinada.xlsx');

  }
}
