import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, input, OnInit, ViewChild } from '@angular/core';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { TbEducacionCivilComponent } from '../tb-educacion-civil/tb-educacion-civil.component';
import { TbEducacionMilitarComponent } from '../tb-educacion-militar/tb-educacion-militar.component';
import { TbFamiliaresComponent } from '../tb-familiares/tb-familiares.component';
import { TbCorreosTelefonoIdiomasComponent } from '../tb-correos-telefono-idiomas/tb-correos-telefono-idiomas.component';
import { TbAscensosComponent } from '../tb-ascensos/tb-ascensos.component';
import { TbControlDisciplinarioComponent } from '../tb-control-disciplinario/tb-control-disciplinario.component';
import { TbAsignacionesComponent } from '../tb-asignaciones/tb-asignaciones.component';
import { TbLogisticaComponent } from '../tb-logistica/tb-logistica.component';
import { TarjetaCarpetasComponent } from '../control-archivos/tarjeta-carpetas/tarjeta-carpetas.component';
import { DialogModule } from 'primeng/dialog';
import { jsPDF } from "jspdf";

interface Persona {
  nombreCompleto: string;
  identidad: string;
  grado: string;
  arma: string;
  unidad: string;
  estado: 'ACTIVO' | 'INACTIVO';
  fotoUrl: string;
  correo: string;
  telefono: string;
  fechaIngreso: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  observaciones: string;
}

interface FolderTab {
  id: 'generales' | 'educacion' | 'familiares' | 'telefonoCorreo' | 'ascensos'| 'controlDisciplinario'| 'asignaciones'| 'archivos'| 'logistica';
  titulo: string;
  icon: string;   // clase de Bootstrap Icons
}
@Component({
  selector: 'app-visualizar-perfil',
  standalone:true,
 imports: [CommonModule,
  TbEducacionCivilComponent,
  TbEducacionMilitarComponent,
  TbFamiliaresComponent,
  TbCorreosTelefonoIdiomasComponent,
TbAscensosComponent,
TbControlDisciplinarioComponent,
TbAsignacionesComponent,
TbLogisticaComponent,
DialogModule,
TarjetaCarpetasComponent],
  templateUrl: './visualizar-perfil.component.html',
  styleUrl: './visualizar-perfil.component.css',
})
export class VisualizarPerfilComponent implements AfterViewInit,OnInit {
  @Input("identidad") identidad_
persona: Persona = {
    nombreCompleto: 'Capitán Juan Pérez Martínez',
    identidad: '0801-1990-12345',
    grado: 'CAPITÁN DE INFANTERÍA',
    arma: 'INFANTERÍA',
    unidad: '3a Brigada de Infantería',
    estado: 'ACTIVO',
    fotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKdIWiwl6K_fO55rYW5HJJmhe2ziJM6p4nQ&s', // ruta de ejemplo
    correo: 'juan.perez@ffaa.mil.hn',
    telefono: '+504 9999-9999',
    fechaIngreso: '2010-02-15',
    fechaNacimiento: '1990-06-10',
    lugarNacimiento: 'Tegucigalpa, M.D.C.',
    observaciones:
      'Oficial con curso de Estado Mayor, experiencia en operaciones especiales y planificación táctica. Desempeña funciones operativas y administrativas en la unidad actual.'
  };

  // Tabs tipo carpeta
  tabs: FolderTab[] = [
    { id: 'generales',    titulo: 'Datos Generales',         icon: 'bi-person-badge-fill' },
    { id: 'educacion', titulo: 'Educación', icon: 'bi-shield-fill-check' },
    { id: 'familiares', titulo: 'Familiares',              icon: 'bi-telephone-fill' },
    { id: 'telefonoCorreo',     titulo: 'Correo,Paises y otros',            icon: 'bi-journal-text' },
    { id: 'ascensos',     titulo: 'Ascensos',            icon: 'bi-journal-text' },
    { id: 'controlDisciplinario',     titulo: 'Control Disciplinario',            icon: 'bi-journal-text' },
      { id: 'asignaciones',     titulo: 'Asignaciones',     icon: 'bi-journal-text' },
    { id: 'archivos',     titulo: 'Archivos',            icon: 'bi-journal-text' },
    { id: 'logistica',     titulo: 'Logística',            icon: 'bi-journal-text' },

  


  ];

  activeTab: FolderTab['id'] = 'generales';

  photoMenuOpen = false;
  constructor(
    public _DatospersonalesService:ServicioBackendService,
    private _ServiciosMensajesService:ServiciosMensajeService

  ){

  }
  usuariologuiado
  ngOnInit(): void {
    this.buscarporIdentidad()
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
  }
ngAfterViewInit(): void {
  
    
}
  dia_vacacion_ley=0
   calcularano(fecha) {
    // Convertir la fecha de nacimiento a un objeto Date
    var fechaNac = new Date(fecha);
    
    // Obtener la fecha actual
    var fechaActual = new Date();
    
    // Calcular la diferencia de años
    var edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    
    // Ajustar la edad si no ha pasado el cumpleaños este año
    var mesActual = fechaActual.getMonth();
    var diaActual = fechaActual.getDate();
    
    var mesNacimiento = fechaNac.getMonth();
    var diaNacimiento = fechaNac.getDate();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }
   
    return edad;
}
sacarVacacionSegunTabla(antigedad){

  if(antigedad>=1  &&  antigedad<=5) return 15;
  if(antigedad>=6  &&  antigedad<=10) return 20;
  if(antigedad>=11  &&  antigedad<=15) return 25;
  if(antigedad>=16  ) return 30;
   return 0;
}
objetoConsultado
armaobjetoConsultado
 buscarporIdentidad() {
    let parametro = {
      identidad: this.identidad_
    }
    this._ServiciosMensajesService.show()
    this._DatospersonalesService.consultaPorIdentidad(parametro).subscribe(
      {
        next: (Response) => {
   this._ServiciosMensajesService.hide()
          if (Response.error) {
            this._DatospersonalesService.mensajeError(Response.error.sqlMessage + "BUSC")
          } else {
            if (Response.mensaje) {
             // this._DatospersonalesService.mensajeError(Response.mensaje)
            } else {
            
              this.objetoConsultado = Response.resultado[0];
              let anio_anti = this.calcularano(this.objetoConsultado.fecha.split("T")[0]) 

            let r = this.sacarVacacionSegunTabla(anio_anti) /*(anio_anti)<=5 ? 15 : (((anio_anti)>=6 && anio_anti<=10?20:
              ((anio_anti)>=12 && (anio_anti)<=15?25:30) ))*/
             
              
             this.dia_vacacion_ley =r
              this.armaobjetoConsultado = Response.arma[0]
            }
          }
        },error:() => {
  this._ServiciosMensajesService.hide()

          this._ServiciosMensajesService.mensajeerrorServer();
        }
      }
    )
  }
  @HostListener('document:click')
  onDocumentClick() {
    this.photoMenuOpen = false;
  }

  onPhotoWrapperClick(event: MouseEvent) {
    event.stopPropagation();
  }

  togglePhotoMenu(event: MouseEvent) {
    event.stopPropagation();
    this.photoMenuOpen = !this.photoMenuOpen;
  }

  cambiarFoto() {
    this.photoMenuOpen = false;
     this.mostrarModalFoto = true;
  }

  verFotoGrande() {
    this.photoMenuOpen = false;
  }

  otrasOpciones() {
    this.photoMenuOpen = false;
  }

  setActiveTab(id: FolderTab['id'], event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.activeTab = id;
  }

  volver() {
    history.back();
  }

  editar() {
  }
  mostrarModalFoto = false;

// Opcional: si querés limpiar cuando cierre
onCerrarModalFoto() {
  // ejemplo:
  // this.imgURL = null;
  // this.banderadeCarga = 0;
  this.mostrarModalFoto = false;
}
  public FilesToUploads: Array<File> = [];

imgURL
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
    verificarImagen() {
 
    if (this.objetoConsultado.foto === "null" || this.objetoConsultado.foto === null || this.objetoConsultado.foto === "Ninguna") {
      this.guardarImagen();
  

    } else {


      var params = {
        archivo: this.objetoConsultado.foto
      }
      this._ServiciosMensajesService.show()
      this._DatospersonalesService.eliminararchivo(params).subscribe(
        Response => {
this._ServiciosMensajesService.hide()
          if (Response.mensaje) {
            this._DatospersonalesService.mensajeError(Response.mensaje)
            //Por si no encuentra la imagen lo crea
            this.guardarImagen();
       
          } else {
           
            this.guardarImagen();
          }
        }
      )

    }


  }
  @ViewChild('file') file:ElementRef
    guardarImagen() {
this._ServiciosMensajesService.show("Cambiando la foto")
    this.makeFileReques(this._DatospersonalesService.url2 + "subirArchivo/" + this.objetoConsultado.identidad, [], this.FilesToUploads).then(
      (result: any) => {

this._ServiciosMensajesService.hide()
this.onCerrarModalFoto()
        this.imgURL = "";
        this.file.nativeElement.value = ""
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
   arregloDocumentosBajas = []
    sacarDocumentosBajas(){
      let p={
        identidad:this.objetoConsultado.identidad
      }
    this.arregloDocumentosBajas = []
  this._ServiciosMensajesService.show("Cargando Documentos de Baja")
      this._DatospersonalesService.sacarDocumentosBajas(p).subscribe({
        next:(response)=>{
this._ServiciosMensajesService.hide()

              if(response.error) return this._DatospersonalesService.mensajeError(response.error)
              if(response.mensaje) return this._DatospersonalesService.mensajeError(response.mensaje)
                  this.arregloDocumentosBajas = response.resultado
                this.abrirModal()
        },error:()=>{
    this._ServiciosMensajesService.hide()


          this._DatospersonalesService.mensajeError("Error de conexion")
        }
      })
    }

    
  verDocumentoBaja: boolean = false;

  abrirModal() {
    this.verDocumentoBaja = true;
  }

  cerrarModal() {
    this.verDocumentoBaja = false;
  }
  @ViewChild("paginaPdf") paginaPdf:ElementRef
verconstanciaVacaciones=false
  async constanciaVacaciones() {
 

  var doc = new jsPDF();
  
      var parametros
    var f = await doc.html(this.paginaPdf.nativeElement, {
        callback: function(doc) {
            // Save the PDF
        
             let  blob = doc.output("blob");
            window.open(doc.output('bloburl'),"_blank","top=100,left=200,width=1000,height=500");
             parametros = {
              archivo: blob
             
            };

           return true;
 
        },
        x: 5,
        y: 5,
        width: 201,  
        windowWidth: 650,
        
    });
  
 

  

 
}
abrirConstanciaVacaciones(){
  this.verconstanciaVacaciones=true
  this.sacarVacaciones() 
}

 cargoParaConstanciaVacaciones =""
      ArregloVacacionesTomadas = []
     firmante;
      @ViewChild("abrirmodalVacaciones")abrirmodalVacaciones:ElementRef
      sacarVacaciones(){
          let parametro ={
          
              identidad:this.objetoConsultado.identidad,
             
          }
      this.ArregloVacacionesTomadas = []
        console.log(parametro)
          this._ServiciosMensajesService.show("Cargando constancia de vacaciones")
  
          this._DatospersonalesService.sacarDatosDeReporteVacaciones(parametro).subscribe({
            next:(response)=>{
             this._ServiciosMensajesService.hide()
                if(response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
                if(response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
                   
                  this.firmante = this._DatospersonalesService.sacarfirmanteRRHH(this.usuariologuiado.idunidad)
                  if(!this.firmante) this._ServiciosMensajesService.mensajeMalo("No hay quien firme el documento")
                  this.cargoParaConstanciaVacaciones = response.Cargo.Nombre_Puesto
                  this.ArregloVacacionesTomadas = response.vacaciones
  
        
               
            },error:()=>{
                           this._ServiciosMensajesService.hide()

              this._ServiciosMensajesService.mensajeerrorServer()
            }
          })
      }
      getFechaFormateada(): string {
  const fecha = new Date();

  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('es-ES', { month: 'long' });
  const año = fecha.getFullYear();

  return `A los ${dia} días del mes de ${mes} del año ${año}.`;
}
  getDiasLaboralesEntreFechas(fechaInicio: string | Date, fechaFin: string | Date) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
    throw new Error("Fechas inválidas");
  }
  }
}