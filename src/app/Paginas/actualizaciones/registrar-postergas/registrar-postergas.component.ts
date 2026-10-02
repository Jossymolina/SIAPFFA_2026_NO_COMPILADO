import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Card } from 'primeng/card';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { FormsModule } from '@angular/forms';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-postergas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-postergas.component.html',
  styleUrl: './registrar-postergas.component.css',
})
export class RegistrarPostergasComponent implements OnDestroy,OnInit {
  textobusqueda: string = '';
  buscando: boolean = false;
  personaBuscada
  louding = false
  postergaSelect: any = {
    nombre: '',
    detalle: []
};
  tipos_postergas = [
    {
        nombre: 'PERDIDA_CURSO',
        detalle: [
            { nombre: 'REGLAMENTARIO' },
            { nombre: 'EXTRANJERO' }
        ]
    },
    {
        nombre: 'PERDIDA_ARMA',
        detalle: [
            { nombre: 'PERDIDA_ARMA' }
        ]
    },
    {
        nombre: 'TRIBUNAL_HONOR',
        detalle: [
          { nombre: 'ACUMULACION_FALTAS_GRAVES' },
        { nombre: 'CONTRAVENCIONES_A_LA_MORAL' },
        { nombre: 'COSTUMBRE_CONTRAER_DEUDAS' },
        { nombre: 'DISOLUCION_ESCANDALOSA' },
        { nombre: 'EMBRIAGUEZ_FRECUENTE' },
        { nombre: 'EMPEÑO_ARTICULOS_MILITARES' },
        { nombre: 'ENCUBRIR_PROMOVER_ACTOS_INDECOROSOS' },
        { nombre: 'ESCANDALOS_FUERO_COMUN' },
        { nombre: 'FACILITAR_INFORMACION_CLASIFICADA' },
        { nombre: 'FRECUENTRAR_LUGARES_MALA_FAMA' },
        { nombre: 'INCORRECTA_ADMON_RECURSOS_MATERIALES' },
        { nombre: 'JUEGOS_AZAR' },
        { nombre: 'MURMURACION_ACTUACIONES_TRIBUNAL_HONOR' },
        { nombre: 'NO_AGOTAR_INSTANCIAS_ADMINISTRATVAS_POR_RECLAMOS' },
        { nombre: 'NOTA_INFERIOR_70_REPORTES_EFICIENCIA' },
        { nombre: 'PRESTAR_DINERO' },
        { nombre: 'RELACION_BANDAS_DELICTIVAS' },
        { nombre: 'RELACIONES_INDECOROSAS' },
        { nombre: 'RELACIONES_INTIMAS_MIEMBROS_FFAA' },
        { nombre: 'REINCIDECIA_FALTAS_DESPUES_TRIBUNAL_HONOR' },
        { nombre: 'REINCIDENCIA_FALTAS_EN_SERVICIO' },
        { nombre: 'REINCIDENCIA_MALTRATO_PERSONAL_SUBALTERNO' },
        { nombre: 'REINCIDENCIA_OBLIGAR_SUBALTERNO_ACTOS_AJENOS_SERVICIO' },
        { nombre: 'REINCIDENCIA_USO_INDEBIDO_UNIFORME' },
        { nombre: 'REYERTAS_ESCANDALOS' }
        ]
    },
    {
        nombre: 'EMBARGO_ALIMENTOS',
        detalle: [
            { nombre: 'EMBARGO_ALIMENTOS' }
        ]
    },
    {
        nombre: 'LIC_EXTRAORDINARIA',
        detalle: [
            { nombre: 'LIC_EXTRAORDINARIA' }
        ]
    }
];
  ngOnDestroy(): void {
    this.pesonasEncontradas = []
    this.personaBuscada = null
  }
  usuariologuiado
  ngOnInit(): void {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
    
  }
  constructor(

    public _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService
  ) {

  }

 
 
  
 
  personal
  pesonasEncontradas = []
  
 onTipoPostergaChange(tipoSeleccionado: any): void {
    // Actualizar los detalles disponibles
    this.postergaSelect = tipoSeleccionado
        ? tipoSeleccionado
        : { nombre: '', detalle: [] };
    // Limpiar el detalle anterior
    this.postergacion.detalla_posterga = null;
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
  cambioVentana(data) {
    if (this.controlVentana === 0 && data==="atras") {
      this.controlVentana = 0
    } else {
      if (data === "atras") {
        this.controlVentana--
      } else {
        this.controlVentana++
      }
    }
  }
  controlVentana  = 0
  buscarPerosnas() {
    let parametro = {
      cadena: this.crearCadenaLike(this.textobusqueda, 'nombre_id'),
      identidad_nombre: this.textobusqueda
    }
    this.pesonasEncontradas = []
    this._ServiciosMensajeService.show()

    this._ServicioBackendService.buscarPersonasporNombreID(parametro).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error)
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje)
        this.pesonasEncontradas = response.resultado
        this.cambioVentana("siguiente")


      }, error: () => {
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }

    )

  }
  seleccionarPersona(item){
    this.personal = item
        this.cambioVentana("siguiente")

  }

postergacion: any = {
    tipo_posterga: null,
    fecha_inicio: null,
    fecha_fin: null,
    observacion: ''
};

archivoDocumento: File | null = null;
guardando: boolean = false;


seleccionarDocumento(event: any) {

    const archivo = event.target.files?.[0];

    if (!archivo) {
        this.archivoDocumento = null;
        return;
    }

    this.archivoDocumento = archivo;
}


obtenerTamanoArchivo(bytes: number): string {

    if (bytes < 1024) {
        return bytes + ' B';
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + ' KB';
    }

    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}


async  registrarPostergacion() {

    if (!this.archivoDocumento) {
        Swal.fire({
            icon: 'warning',
            title: 'Documento requerido',
            text: 'Debe adjuntar el documento de respaldo.'
        });

        return;
    }

    if (!this.postergacion.tipo_posterga) {
        return;
    }

 // ==========================================
// VALIDAR FECHA DE INICIO
// ==========================================
const fechaInicio = this.postergacion.fecha_inicio;
const fechaFin = this.postergacion.fecha_fin;;

// La fecha de inicio SIEMPRE debe ser día 1
 
 
const diaInicio = Number(fechaInicio.split('-')[2]);

 
if (diaInicio !== 1) {
    Swal.fire({
        icon: 'warning',
        title: 'Fecha de inicio incorrecta',
        text: 'La fecha de inicio debe ser el primer día del mes.'
    });

    return;
}

// ==========================================
// VALIDAR QUE FECHA FIN NO SEA MENOR
// ==========================================

if (fechaFin < fechaInicio) {

    Swal.fire({
        icon: 'warning',
        title: 'Fechas incorrectas',
        text: 'La fecha de finalización no puede ser menor que la fecha de inicio.'
    });

    return;
}


 
 

// ==========================================
// CALCULAR AÑOS, MESES Y DÍAS
// ==========================================

const [anioInicio, mesInicio, diaInicioFecha] =
    fechaInicio.split('-').map(Number);

const [anioFin, mesFin, diaFin] =
    fechaFin.split('-').map(Number);

const fechaInicioDate = new Date(
    anioInicio,
    mesInicio - 1,
    diaInicioFecha
);

const fechaFinDate = new Date(
    anioFin,
    mesFin - 1,
    diaFin
);


// ==========================================
// TOTAL DE DÍAS
// ==========================================

const diferenciaMilisegundos =
    fechaFinDate.getTime() - fechaInicioDate.getTime();

const cantidadDias =
    Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    ) + 1;


// ==========================================
// CALCULAR AÑOS Y MESES
// ==========================================

var cantidadAnios = anioFin - anioInicio;
var cantidadMeses = mesFin - mesInicio;

// Ajustar meses
if (cantidadMeses < 0) {
    cantidadAnios--;
    cantidadMeses += 12;
}


// ==========================================
// CALCULAR DÍAS RESTANTES
// ==========================================

let cantidadDiasRestantes = 0;

// Fecha después de sumar los años y meses
const fechaTemporal = new Date(
    anioInicio + cantidadAnios,
    (mesInicio - 1) + cantidadMeses,
    1
);

// Último día del período
const ultimoDiaPeriodo = new Date(
    anioFin,
    mesFin - 1,
    diaFin
);

// Si la fecha final es posterior al primer día
// del mes calculado, obtenemos los días restantes
if (ultimoDiaPeriodo.getDate() >= 1) {

    cantidadDiasRestantes =
        Math.floor(
            (
                ultimoDiaPeriodo.getTime() -
                fechaTemporal.getTime()
            ) / (1000 * 60 * 60 * 24)
        );
}

 
 
 

    // ==========================================
    // ACTIVAR LOADING
    // ==========================================

    this.guardando = true;


    // ==========================================
    // CREAR FORMDATA
    // ==========================================

    const formData = new FormData();


    // ==========================================
    // DATOS DE LA PERSONA
    // ==========================================

    formData.append(
        'identidad',
        this.personal.identidad
    );

    formData.append(
        'idgrados',
        this.personal.idgrado
    );

    formData.append(
        'idcategoria',
        this.personal.idcategoria
    );

    formData.append(
        'ano',
         cantidadAnios+''
    );
      formData.append(
        'mes',
       cantidadMeses+''
    );

formData.append(
        'dia',
       cantidadDiasRestantes+''
    );
    

    // ==========================================
    // DATOS DE LA POSTERGACIÓN
    // ==========================================
console.log("this.postergacion",this.postergacion)
    formData.append(
        'tipo_posterga',
        this.postergacion.tipo_posterga.nombre
    );

 formData.append(
        'detalla_posterga',
        this.postergacion.detalla_posterga
    );

    

    formData.append(
        'fecha_inicio',
        this.postergacion.fecha_inicio
    );

    formData.append(
        'fecha_fin',
        this.postergacion.fecha_fin
    );

    formData.append(
        'observacion',
        this.postergacion.observacion || ''
    );


    // ==========================================
    // ARCHIVO
    // ==========================================

    formData.append(
        'documento',
        this.archivoDocumento,
        this.archivoDocumento.name
    );

     formData.append(
        'usuario_dni',
        this.usuariologuiado.identidad
    );

    
    



let r = await Swal.fire({
    icon: 'warning',
    title: 'Confirmar posterga',
    html: `
        <div style="font-size: 16px;">

            <p style="margin-bottom: 10px;">
                Está a punto de registrar una <strong>posterga</strong> 
                por el siguiente período:
            </p>

            <div style="
                display: flex;
                justify-content: center;
                gap: 10px;
                margin: 20px 0;
                flex-wrap: wrap;
            ">

                <span style="
                    background: #e3f2fd;
                    padding: 12px 18px;
                    border-radius: 10px;
                    font-weight: bold;
                    color: #1565c0;
                    border: 1px solid #90caf9;
                ">
                    ${cantidadAnios} AÑOS
                </span>

                <span style="
                    background: #fff3e0;
                    padding: 12px 18px;
                    border-radius: 10px;
                    font-weight: bold;
                    color: #ef6c00;
                    border: 1px solid #ffcc80;
                ">
                    ${cantidadMeses} MESES
                </span>

                <span style="
                    background: #e8f5e9;
                    padding: 12px 18px;
                    border-radius: 10px;
                    font-weight: bold;
                    color: #2e7d32;
                    border: 1px solid #a5d6a7;
                ">
                    ${cantidadDiasRestantes} DÍAS
                </span>

            </div>

            <div style="
                background: #fff8e1;
                border: 1px solid #ffe082;
                border-radius: 8px;
                padding: 12px;
                margin-top: 15px;
                color: #795548;
            ">
                <i class="pi pi-exclamation-triangle"></i>
                <strong> Atención:</strong>
                Esta acción registrará la posterga con el período indicado.
            </div>

            <p style="
                margin-top: 20px;
                margin-bottom: 0;
                font-weight: bold;
            ">
                ¿Desea continuar?
            </p>

        </div>
    `,
    showCancelButton: true,
    confirmButtonText: '<i class="pi pi-check"></i> Sí, realizar la posterga',
    cancelButtonText: '<i class="pi pi-times"></i> Cancelar',
    confirmButtonColor: '#198754',
    cancelButtonColor: '#dc3545',
    reverseButtons: true,
    allowOutsideClick: false
});



if (!r.isConfirmed) {
                this.guardando = false;

    return this._ServiciosMensajeService.mensajeMalo("Cancelado")
}   

if(cantidadDiasRestantes!==0){
                this.guardando = false;

 return this._ServiciosMensajeService.mensajeMalo("No existen las postergas en dias")
}

 this._ServiciosMensajeService.show()
    this._ServicioBackendService.registrarMisPostergas(formData)
        .subscribe({

            next: (respuesta: any) => {
this._ServiciosMensajeService.hide()
                this.guardando = false;


                if (respuesta.error) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta.mensaje
                    });

                    return;
                }


                Swal.fire({
                    icon: 'success',
                    title: 'Registro realizado',
                    text: 'La postergación fue registrada correctamente.',
                    confirmButtonText: 'Aceptar'
                });


                // Limpiar formulario
                this.postergacion = {
                    tipo_posterga: null,
                    fecha_inicio: null,
                    fecha_fin: null,
                    observacion: ''
                };

                this.archivoDocumento = null;
                this.controlVentana =0
                this.pesonasEncontradas = []

            },

            error: (error) => {

                this.guardando = false;
this._ServiciosMensajeService.hide()
 

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No fue posible registrar la postergación.'
                });

            }

        }); 
}
cancelarPostergacion(){
  this.cambioVentana("atras")
}
}
