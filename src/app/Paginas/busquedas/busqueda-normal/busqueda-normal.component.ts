
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import * as XLSX from 'xlsx';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VisualizarPerfilComponent } from '../../../Componentes/visualizar-perfil/visualizar-perfil.component';

@Component({
  selector: 'app-busqueda-normal',
  standalone: true,

  imports: [FormsModule, CommonModule,VisualizarPerfilComponent],
  templateUrl: './busqueda-normal.component.html',
  styleUrl: './busqueda-normal.component.css',
})
export class BusquedaNormalComponent {

 
  arregloResultado = []
  formularioBuscar = 0;
  personaSelecionada
  ArregloUnidades = []
  arregloFuerzas = [];
  usuariologuiado
  permisoFuerza;
  permisoUnidad;
  fuerzaselected
  arregloNiveles = []
  arregloCarreras = []
  arregloCategorias = [
    {
      categoria: "Oficiales de las Armas",
      nivel: 6
    },
    {
      categoria: "Oficiales Auxiliar",
      nivel: 5
    },
    {
      categoria: "Sub Oficiales",
      nivel: 4
    },
    {
      categoria: "Cadetes",
      nivel: 3
    },
    {
      categoria: "Estudiantes",
      nivel: 2
    },
    {
      categoria: "Tropa",
      nivel: 1
    },
    {
      categoria: "Auxiliares",
      nivel: 0
    },
  ]
  arregloReligion = [
    { religion: "Catolico" },
    { religion: "Evangelico" },
    { religion: "Mormon" },
    { religion: "Testigo de Jehova" },

  ]
  arregloSexo = [
    { sexo: 'M', nombreSexo: "Masculino" },
    { sexo: 'F', nombreSexo: "Femenino" },

  ]
  arregloCombatiente = [
    { combatiente: "Si", code: 1 }, { combatiente: "No", code: 0 }

  ]

  arregloSangre = [
    { sangre: "A-" }, { sangre: "A+" }, { sangre: "B-" }, { sangre: "B+" }, { sangre: "O-" }, { sangre: "O+" }, { sangre: "AB-" }, { sangre: "AB+" },

  ]
  arregloIdiomas = []
  arregloarmas = []
  constructor(
    public _ServiciosMensajesService: ServiciosMensajeService,
    public _ServiciosSiapffaaService: ServicioBackendService,
    private _Router: Router

  ) { }
  estado = {
    activos: true,
    bajas: false
  }
  filtroTexto = '';
  arregloResultadoFiltrado: any[] | null = null;
  ngOnInit(): void {
    this.sacarFuerza()
    //this.sacarGrados()
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;

   /* this.permisoFuerza = this._ServiciosSiapffaaService.verificarPermisos(3);
    this.permisoUnidad = this._ServiciosSiapffaaService.verificarPermisos(4);;*/

  }
  resetEstados() {
    this.estado = {
      activos: true,
      bajas: false
    }
  }
  activofn() {
    this.estado.activos = !this.estado.activos
  }
  bajafn() {
    this.estado.bajas = !this.estado.bajas
  }
  crearCadenaestado() {
    if (this.estado.activos === true && this.estado.bajas === true) {
      return "and (activo= 1 or activo=2) "
    } else if (this.estado.activos === true) {
      return "and (activo= 1)"
    } else if (this.estado.bajas === true) {
      return "and (activo= 2)"
    } else {
      return "and (activo= 1) "
    }
  }

  exportexcel2(name): void {

    let objeto = document.getElementById(name);

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(objeto,
      { dateNF: 'dd/mm/yyyy;@', cellDates: true, raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    XLSX.writeFile(wb, "Exportado desde seiapffaa.xlsx");
    // this.exportTableToExcel();
    this._ServiciosMensajesService.mensajeBueno("Exportado con exito")

  }
  sacarPersonal_65_anos(date?) {
    let d = new Date().toISOString().split('T')[0]
    let parametro = {
      cadena: "and (activo= 1)" + " and month(fecha_nacimiento) = month('" + d + "')  and edad_proxima=65"

    }
   this._ServiciosMensajesService.show()
    this._ServiciosSiapffaaService.vistaSiapffaa(parametro).subscribe({
      next: (response) => {
         this._ServiciosMensajesService.hide()

        if (response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
        if (response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
        this.resetEstados()
        this.arregloResultado = response.resultado
        this.formularioBuscar = 1;
      }, error: () => {
         this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }
  buscar(formulario) {
    let parametro = {
      cadena:
        this.crearCadenaestado() +
        this.crearCadenaLike(formulario.value.nombre_id, 'nombre_id') +
        this.crearCadena(formulario.value.serie, 'serie') +
        this.crearCadena(formulario.value.cuenta, 'cuenta') +
        this.crearCadena(formulario.value.usuario, 'usuario') +
        this.crearCadena(formulario.value.pasaporte, 'pasaporte') +
        this.devolverOR(formulario.value.fuerza_, "idfuerza", "idfuerza_pertenece") +
        this.devolverOR(formulario.value.categoria_, "nivel", "nivel") +
        this.devolverOR(formulario.value.nombre_grado_, "idgrados", "idgrados") +
        this.devolverOR(formulario.value.religion_, "religion", "religion") +
        this.devolverOR(formulario.value.sexo_, "sexo", "sexo") +
        this.devolverOR(formulario.value.sangre_, "sangre", "sangre") +
        this.devolverOR(formulario.value.combatiente_, "code", "combatiente") +
        this.devolverOR(formulario.value.unidad_, "idunidad", "idunidad_asignado") +
        this.devolverOR_like(formulario.value.idiomas_, "ididioma", "idiomas") +
        this.devolverOR_like(formulario.value.nivel_profesion, "idnivel_educativo", "nivel_profesion") +
        this.devolverOR_like(formulario.value.profesion_, "idprofeciones", "profesion") +
        this.devolverOR(formulario.value.armas_, "idarmas", "idarmas") +
        this.devolverOR_like(formulario.value.cursos_, "idcursos_militares", "cursos_militares") +
        (formulario.value.fecha ? `and ( month(fecha_nacimiento) = month('${formulario.value.fecha}-1'))` : '') +
        `${this.permisoUnidad ? 'and (idunidad_asignado = ' + this.usuariologuiado.idunidad + ')' : this.permisoFuerza ? this.usuariologuiado.idfuerza <= 4 ? 'and (idfuerza_pertenece = ' + this.usuariologuiado.idfuerza + ')' : 'and (idfuerza_asignada = ' + this.usuariologuiado.idfuerza + ')' : ''}`




    }

    if (parametro.cadena.length === 0) return this._ServiciosMensajesService.mensajeAdvertencia("Porfavor selecione por lo menos un criterio de busqueda")
    this.arregloResultado = []

    this._ServiciosMensajesService.show()
    this._ServiciosSiapffaaService.vistaSiapffaa(parametro).subscribe({
      next: (response) => {
         this._ServiciosMensajesService.hide()
        if (response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
        if (response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
        this.formularioBuscar = 5;
        this.resetEstados()
        this.arregloResultado = response.resultado

      }, error: () => {
         this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }
  crearcadenaFecha(data) {
    return data ? `and ('${data}')''` : ''
  }
  crearCadena(propiedad_dato, nombre_propiedad) {
    let cadena = '';
    cadena += propiedad_dato ? nombre_propiedad + " = '" + propiedad_dato + "'" : ""
    let cadenaTermindad = " and (" + cadena + ") "
    if (cadenaTermindad.includes("and ()")) {
      return "";
    } else {
      return cadenaTermindad;
    }
  }
  crearCadenaLike1(propiedad_dato, nombre_propiedad,) {
    let cadena = '';
    cadena += propiedad_dato ? nombre_propiedad + " like '%" + propiedad_dato + "%'" : ""
    let cadenaTermindad = " and (" + cadena + ") "
    if (cadenaTermindad.includes("and ()")) {
      return "";
    } else {
      return cadenaTermindad;
    }
  }
  crearCadenaLike(propiedad_dato, nombre_propiedad) {
    let cadena = '';
    cadena += propiedad_dato ? nombre_propiedad + " like '%" + propiedad_dato + "%'" : ""
    let cadenaTermindad = " and (" + cadena + ") "
    if (cadenaTermindad.includes("and ()")) {
      return "";
    } else {
      return cadenaTermindad;
    }
  }
  verPerfil(persona) {

    this.personaSelecionada = persona
    this.formularioBuscar = 3;
    this.guardarVisualizacion()
  }
  guardarVisualizacion() {
    let parametro = {
      usuario: this.usuariologuiado,
      persona: this.personaSelecionada
    }


    this._ServiciosSiapffaaService.guardarHistorialVisualizarPerfil(parametro).subscribe(
      Response => {

      }, error => {

      }
    )
  }
  atras(ventana_numero) {

    this.formularioBuscar = ventana_numero;
    // this.personaSelecionada = null;


  }
  index_tab = 0;
  ventana_tab(e) {
    this.index_tab = e.index
    this.formularioBuscar = 0

  }
  sacarFuerza() {
    this.arregloFuerzas = [];

    this._ServiciosSiapffaaService.sacarFuerza().subscribe(
      Response => {
        this.arregloFuerzas = Response.resultado;
        this.sacarIdiomas();
      }
    )
  }
  sacarunidades(fuerza) {

    if (fuerza.length !== 0) {
      let parametro = {
        cadena: this.devolverOR(fuerza, "idfuerza", "idfuerza")
      }
      this.ArregloUnidades = [];
       this._ServiciosMensajesService.show()
      this._ServiciosSiapffaaService.sacarUnidadesArreglo(parametro).subscribe(
        Response => {
           this._ServiciosMensajesService.hide()

          this.ArregloUnidades = Response.resultado;
        }, error => {
           this._ServiciosMensajesService.hide()
          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
      this.sacarArmas(fuerza)
    }




  }

  devolverOR(objeto, propiedadBuscada, nomprePropiedad) {
    if (objeto) {
      if (objeto.length !== 0) {
        let cadena = ""
        objeto.forEach(element2 => {
          let llave = Object.keys(element2).find(element => element === propiedadBuscada);
          cadena += llave ? " or " + nomprePropiedad + " = '" + element2[llave] + "'" : ""
        });
        return " and ( '' " + cadena + ") "
      } else {
        return ""
      }
    } else {
      return ""

    }

  }
  //REGEXP  ("49|37") 
  devolverOR_like(objeto, propiedadBuscada, nomprePropiedad) {
    if (objeto) {
      if (objeto.length !== 0) {
        let cadena = ""
        objeto.forEach(element2 => {
          let llave = Object.keys(element2).find(element => element === propiedadBuscada);
          cadena += llave ? "-" + element2[llave] + "-|" : ""
        });
        return " and ( " + nomprePropiedad + " REGEXP ('" + cadena.substring(0, cadena.length - 1) + "')) "
      } else {
        return ""
      }
    } else {
      return ""

    }

  }
  sacarIdiomas() {
    this.arregloIdiomas = new Array();
    this._ServiciosSiapffaaService.sacaridiomas().subscribe(
      Response => {
        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error)
        } else {
          this.arregloIdiomas = Response.resultado;
        }
        this.sacarNivelEducativo()

      }
    )
  }
  sacarNivelEducativo() {
    this.arregloNiveles = []

    this._ServiciosSiapffaaService.sacarnivelesEducativos().subscribe(
      Response => {

        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error)
        } else {
          if (Response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(Response.mensaje)

          } else {
            this.arregloNiveles = Response.resultado;
          }
        }
        this.cursus_militares()
      }, error => {

        this._ServiciosMensajesService.mensajeerrorServer()
      }
    )
  }
  sacarCarreras(data) {
    if (data.length !== 0) {
      var paraetro = {
        cadena: this.devolverOR(data, "idnivel_educativo", "idnivelEducativo")
      }
      this.arregloCarreras = new Array();

      this._ServiciosSiapffaaService.sacarProfecionArreglo(paraetro).subscribe(
        Response => {

          if (Response.error) {
            this._ServiciosMensajesService.mensajeMalo(Response.error)

          } else {
            if (Response.mensaje) {
              this._ServiciosMensajesService.mensajeMalo(Response.mensaje)

            } else {
              this.arregloCarreras = Response.resultado;
            }
          }
        }, error => {

          this._ServiciosMensajesService.mensajeerrorServer();
        }
      )
    }

  }
  sacarArmas(data) {

    if (data.length !== 0) {
      let parametro = {
        cadena: this.devolverOR(data, "idfuerza", "fuerza_idfuerza")
      }
      this._ServiciosSiapffaaService.sacararmasArreglo(parametro).subscribe(
        Response => {
          this.arregloarmas = Response.resultado
        }
      )
    }
  }
  arregloCursos = []
  cursus_militares() {
    this._ServiciosSiapffaaService.sacarTotoCursosMilitares().subscribe(
      Response => {
        this.arregloCursos = Response.resultado
      }
    )

  }
  limpiar(form: NgForm) {
    form.reset()
  }
  arregloResultado_ = []
  busquedaSimple(data) {
     this._ServiciosMensajesService.show()
    let cadena =
      this.crearCadenaestado() +
      this.crearCadenaLike(data.value.nombre_id, 'nombre_id') +
      (`${this.permisoUnidad ? 'and (idunidad_asignado = ' + this.usuariologuiado.idunidad + ')' :
        this.permisoFuerza ?
          this.usuariologuiado.idfuerza <= 4 ? 'and (idfuerza_pertenece = ' + this.usuariologuiado.idfuerza + ')' :
            'and (idfuerza_asignada = ' + this.usuariologuiado.idfuerza + ')' : ''}`);


    let parametro = {
      cadena: cadena
    }

    this._ServiciosSiapffaaService.buscarPersonasporNombreID(parametro).subscribe(
      Response => {
         this._ServiciosMensajesService.hide()

        if (Response.error) {
          this._ServiciosMensajesService.mensajeMalo(Response.error)

        } else {
          if (Response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(Response.mensaje)

          } else {
            this.resetEstados()
            this.arregloResultado_ = Response.resultado
            this.formularioBuscar = 1;
          }
        }
      }, error => {
      this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  reset() {
    this.formularioBuscar = 0;
  }
  arregloGrados = []
  sacarGrados = () => {
    this._ServiciosSiapffaaService.sacarTodo_losGrados().subscribe({
      next: (response) => {
        if (response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
        if (response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)

        this.arregloGrados = response.resultado;
      }, error: () => {
        this._ServiciosMensajesService.mensajeerrorServer()
      }
    })
  }
  aplicarFiltro() {
    const texto = this.filtroTexto?.toLowerCase().trim();
    if (!texto) {
      this.arregloResultadoFiltrado = null;
      return;
    }

    this.arregloResultadoFiltrado = this.arregloResultado_.filter((i: any) => {
      return (
        i.identidad?.toLowerCase().includes(texto) ||
        i.nombre?.toLowerCase().includes(texto) ||
        i.apellido?.toLowerCase().includes(texto) ||
        i.grado?.toLowerCase().includes(texto) ||
        i.categoria?.toLowerCase().includes(texto)
      );
    });
  }
  async exportarExcel(name) {
let espera = await this._ServiciosMensajesService.mensajePregunta("¿Desea exportar con las fotos?")
if (!espera) return this.exportexcel2(name);
  

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

    const datos = (this.arregloResultadoFiltrado && this.arregloResultadoFiltrado.length > 0)
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

      // === FOTO ===
      const urlFoto = this._ServiciosSiapffaaService.url2 + 'sacarfoto/' + i?.foto;
      const dataUrl = await this.cargarImagenBase64(urlFoto);

      if (dataUrl) {
        const imageId = workbook.addImage({
          base64: dataUrl,       // ahora es el dataURL completo
          extension: 'jpeg',     // o 'png' según lo que uses
        });

        // 💥 Aquí el cambio: usamos rango string "B{rowIndex}:B{rowIndex}"
        const cellRange = `B${rowIndex}:B${rowIndex}`;
        worksheet.addImage(imageId, cellRange);

        // Dar altura a la fila para que no se aplaste la imagen
        worksheet.getRow(rowIndex).height = 60;
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, `resultados_personal_${new Date().toISOString().substring(0, 10)}.xlsx`);
  }


  private async cargarImagenBase64(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string; // data:image/jpeg;base64,....
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
  atrasLink(ruta) {
    this._Router.navigate([ruta])
  }
}

