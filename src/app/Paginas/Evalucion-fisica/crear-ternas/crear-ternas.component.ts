import { Component, OnInit, ViewChild } from '@angular/core';


import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';

import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';

import { TagModule } from 'primeng/tag';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';


import { TextareaModule } from 'primeng/textarea';

import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { TablasEvaluacionService } from '../../../servicios/tablas/tablas-evaluacion.service';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

export interface Criterio {

  id_tipo_criterios: number;
  id_tipo_evaluacion: number;

  descripcion: string;

  porcentaje: number;

  tipo_respuesta: 'NUMERICA' | 'TEXTO' | 'SI_NO' | 'OPCION_UNICA' | 'MULTIPLE' | 'TEXTO_REGEX' | 'NUMERICA_REGEX';

  orden_visual: number;

  observacion: string | null;

  codigo: string | null;

  origen_respuesta: 'MANUAL' | 'CALCULADO';

  respuesta: any;

  readonly: boolean;

  visible: boolean;

  opciones?: OpcionCriterio[];
  formula: string | null;
  regex: string | null;
  mensaje_regex: string | null;
}

export interface OpcionCriterio {
  label: string;
  value: any;
}
@Component({
  selector: 'app-crear-ternas',
  standalone: true,
  imports: [CardModule, TableModule, DatePickerModule, ButtonModule, TagModule, FormsModule, DialogModule, InputTextModule,
    ProgressSpinnerModule,
    FormsModule,
    CommonModule,
    AccordionModule,
    TextareaModule,
    SelectButtonModule,
    InputNumberModule,
    SelectModule,
    MultiSelectModule,
    DividerModule,
    TabsModule,
    AvatarModule,
    PopoverModule,
    TreeSelectModule

  ],
  templateUrl: './crear-ternas.component.html',
  styleUrl: './crear-ternas.component.css',
})
export class CrearTernasComponent implements OnInit {
  mostrarModal = false
  funciones: any = {};
  constructor(
    public _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService,
    private _TablasEvaluacionService: TablasEvaluacionService,

  ) { }

tiposPrueba_terna_arreglo = [
  { id: 'DIAGNOSTICA', nombre: 'Diagnóstica' },
  { id: 'ASCENSO', nombre: 'Ascenso' },
  { id: 'ANUAL', nombre: 'Anual' }
];
 

  treeUnidades: any[] = [];
unidadesSeleccionadas: any[] = [];

  sacarTodalasUnidades(){
  
    this._ServiciosMensajeService.show();

    this._ServicioBackendService.sacarTodalasUnidades().subscribe({
      next: (response) => {

        this._ServiciosMensajeService.hide();
       
       const unidades = response.resultado || [];
        let nodo = unidades.filter((x: any) => x.id_unidad_padre == null)
          .map((x: any) =>
            this.construirJerarquiaUnidades(
              x,
              unidades
            )
          );
       
           this.treeUnidades = nodo.map((x: any) =>  this.convertirTreeNodeUnidad(x)   );
      },
      error: () => {

        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();

      }
    });
}

 private construirJerarquiaUnidades(
    item: any,
    unidad: any[],
    rutaPadre: string = ''
  ): any {

    const rutaActual = rutaPadre
      ? `${rutaPadre} > ${item.unidad_nombre}`
      : item.unidad_nombre;

    const hijos = unidad
      .filter(x => x.id_unidad_padre == item.idunidad)
      .map(x =>
        this.construirJerarquiaUnidades(
          x,
          unidad,
          rutaActual
        )
      );

    return {
      ...item,
      ruta: rutaActual,
      hijos
    };

  }
    private convertirTreeNodeUnidad(
  nodo: any
): any {

  const esHoja = nodo.seleccionable ? true : false // nodo.hijos.length === 0;

  return {

    key: String(nodo.idunidad),

    label: nodo.unidad_nombre,

    data: nodo,

    selectable: esHoja,

    icon: esHoja
      ? 'pi pi-lock-open'
      : 'pi pi-lock',

    children: nodo.hijos.map((h: any) =>
      this.convertirTreeNodeUnidad(h)
    )

  };

}


  atras_criterios() {
    this.tipoPrueba = null
    this.limpiarCriterios()
  }


  personaBuscada = null
  activeSpiner = false
  verExpedienteTernaIndividual = false
  verNuevoFormulario = false
  esNumero(valor: any): boolean {
    return !isNaN(Number(valor));
  }
  limpiarCriterios() {
    this.criterios = []
    this.tipoPrueba = null

  }
  tipoPrueba = null
  ngOnInit(): void {
    this.obtenerTiposEvaluador()
this.sacarTodalasUnidades()
    this.funciones = {
      factor_ab_cu: this.factor_ab_cuello.bind(this),
      factor_altura: this.factor_altura.bind(this),
      factor_grasa_normal: this.factor_grasa_normal.bind(this),
      factor_peso_normal: this.factor_peso_normal.bind(this),
      factor_nota_pechadas: this.factor_nota_pechadas.bind(this),
      factor_nota_abdominales: this.factor_nota_abdominales.bind(this),
      factor_nota_carrera: this.factor_nota_carrera.bind(this),
      factor_sobre_peso: this.factor_sobre_peso.bind(this),
      factor_apto: this.factor_apto.bind(this)

    };


  }
  factor_apto(exceso_grasa,presion,sobre_peso) {
      if(Number(exceso_grasa)>0) return false
      if(Number(sobre_peso)>=30) return false
      if(presion==='130\/80') return false
    return true
  }
  sacarRespuestaArreglo(codigo, arreglo) {
    let r = arreglo.find(elementAt => { return elementAt.codigo === codigo })
    return r
      ? (!isNaN(Number(r.respuesta))
        ? Number(r.respuesta)
        : r.respuesta)
      : 0;
  }

  factor_sobre_peso(id) {
    let p = this.sacarRespuestaArreglo("sp", this.examenMedicoHecho)
    return p
  }

  factor_nota_pechadas(pe) {
    return this._TablasEvaluacionService.obtenerPuntajePechas(this.personaSeleccionada.sexo, this.personaSeleccionada.edad, pe)

  }

  factor_nota_abdominales(ab) {
    return this._TablasEvaluacionService.obtenerPuntajeAbdominales(this.personaSeleccionada.sexo, this.personaSeleccionada.edad, ab)

  }

  factor_nota_carrera(car) {

    return this._TablasEvaluacionService.obtenerPuntajeCarrera3200(this.personaSeleccionada.sexo, this.personaSeleccionada.edad, car)


  }


  factor_grasa_normal(sexo: string, edad: number) {
    return this._TablasEvaluacionService.obtenerFactorGrasaNormal(this.personaSeleccionada.sexo, this.personaSeleccionada.edad)
  }
  factor_ab_cuello(diferencia_ab_cu) {
    if (!diferencia_ab_cu) return 0
    
    return this._TablasEvaluacionService.sacar_factor_abdomen_cuello(diferencia_ab_cu)
  }

  factor_altura(altura) {
    if (!altura) return 0

    let altura_pulgada = this.convertirMetrosAPulgadas(Number(altura))
    return this._TablasEvaluacionService.sacar_factor_altura(altura_pulgada)
  }

  factor_peso_normal(sexo, edad, altura) {
    if (!altura) return 0
    let altura_ = Number(altura)
    return this._TablasEvaluacionService.obtenerPesoNormal(this.personaSeleccionada.sexo, this.personaSeleccionada.edad, altura_)
  }

  calcularFlexiones(
    tiempo: any,
    sexo: any,
    edad: any
  ) {



    return 100;

  }
  calcularNatacion(
    tiempo: any,
    sexo: any,
    edad: any
  ) {


    return 100;

  }
  arregloTiposdeEvaluadores = []
  obtenerTiposEvaluador() {
    this._ServiciosMensajeService.show()
    this.arregloTiposdeEvaluadores = []

    this._ServicioBackendService.obtenerTiposEvaluador().subscribe({
      next: (respose) => {

        this._ServiciosMensajeService.hide()
        if (respose.mensaje) return this._ServiciosMensajeService.mensajeMalo(respose.mensaje)
        this.arregloTiposdeEvaluadores = respose.data

      }, error: () => {
        this._ServiciosMensajeService.hide()
      }
    })
  }


  cancelarBuscado() {
    this.personaBuscada = null
  }
  arregloEvaluadores = []
agregarEvaluador(persona, tipo_evaluador) {

  persona.tipo_evaluador = tipo_evaluador;

  const tipo = tipo_evaluador.ideval_tipos_evaluador;

  const tipos = {
    7: "Comandante",
    1: "Oficial Supervisor",
    2: "Jefe de Equipo",
    3: "Evaluador 1",
    4: "Evaluador 2",
    5: "Evaluador 3",
    6: "Oficial a ser Evaluado"
  };

  // Orden obligatorio de conformación de la terna
  const orden = [7, 1, 2, 3, 4, 5];

  // No permitir repetir personas
  if (this.arregloEvaluadores.some(e => e.identidad === persona.identidad)) {
    return this._ServiciosMensajeService.mensajeMalo(
      "La persona seleccionada ya forma parte de esta terna. No es posible agregar dos veces al mismo integrante."
    );
  }

  // ===========================
  // OFICIAL A SER EVALUADO (6)
  // ===========================
  if (tipo === 6) {

    const faltantes = orden.filter(id =>
      !this.arregloEvaluadores.some(
        e => e.tipo_evaluador.ideval_tipos_evaluador === id
      )
    );

    if (faltantes.length > 0) {
      return this._ServiciosMensajeService.mensajeMalo(
        `No es posible agregar Oficiales a ser Evaluados mientras la terna no esté completa. Aún debe agregar: ${faltantes
          .map(id => tipos[id])
          .join(", ")}.`
      );
    }

  } else {

    // ===========================
    // VALIDAR ORDEN OBLIGATORIO
    // ===========================

    const indice = orden.indexOf(tipo);

    if (indice > 0) {

      const tipoAnterior = orden[indice - 1];

      const existeAnterior = this.arregloEvaluadores.some(
        e => e.tipo_evaluador.ideval_tipos_evaluador === tipoAnterior
      );

      if (!existeAnterior) {
        return this._ServiciosMensajeService.mensajeMalo(
          `No puede agregar "${tipos[tipo]}" todavía. Primero debe agregar al "${tipos[tipoAnterior]}".`
        );
      }
    }

    // ===========================
    // SOLO UNO POR CARGO
    // ===========================

    const existe = this.arregloEvaluadores.some(
      e => e.tipo_evaluador.ideval_tipos_evaluador === tipo
    );

    if (existe) {
      return this._ServiciosMensajeService.mensajeMalo(
        `Ya existe un integrante con el cargo de "${tipos[tipo]}". Solo se permite una persona para este cargo dentro de la terna.`
      );
    }

  }

  persona.arma = this.armapersonaseleccionada;
  persona.unidad_Asignacion = this.unidad_asignacion;
 
  this.arregloEvaluadores.push(persona);
  this.personaBuscada = null;

  this._ServiciosMensajeService.mensajeBueno(
    `"${persona.nombres} ${persona.apellidos}" fue agregado correctamente como "${tipos[tipo]}".`
  );

}



  quitarLitaEvaluador(index) {
    this.arregloEvaluadores.splice(index, 1);
  }
  @ViewChild("formTerna") formTerna: NgForm;
  guardarTerna() {
    let fechaFormateada = this.formatearFecha(this.formTerna.value.fecha);
    this.formTerna.value.fecha = fechaFormateada;
    this.formTerna.value.evaluadores = this.arregloEvaluadores;
    this.formTerna.value.unidad = this.unidadesSeleccionadas['data'];

 
    this._ServiciosMensajeService.show()
    this._ServicioBackendService.registrarEvalTerna(this.formTerna.value).subscribe({
      next: (Response) => {
        this._ServiciosMensajeService.hide()
        if (Response.error) return this._ServiciosMensajeService.mensajeMalo(Response.error)
        if (Response.mensaje) return this._ServiciosMensajeService.mensajeMalo(Response.mensaje)
        this._ServiciosMensajeService.mensajeBueno("Se ha registrado la terna correctamente")
        this.formTerna.resetForm();
        this.arregloEvaluadores = []
        this.mostrarModal = false
      }, error: () => {
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }
    )
 
 

  }

  formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  listaTernas = []
  buscarTernas(form: NgForm) {

    let fechaFormateada = this.formatearFecha(form.value.fecha);
    form.value.fecha = fechaFormateada;

    this.listaTernas = []

    this._ServiciosMensajeService.show()
    this._ServicioBackendService.obtenerTernas(form.value).subscribe({
      next: (Response) => {
        this._ServiciosMensajeService.hide()
        if (Response.error) return this._ServiciosMensajeService.mensajeMalo(Response.error)
        if (Response.mensaje) return this._ServiciosMensajeService.mensajeMalo(Response.mensaje)

        this.listaTernas = Response.ternas

        form.resetForm();
        this.arregloEvaluadores = []
      }, error: () => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }
    )

  }
  criterios: Criterio[] = [];


  /*
    obtenerCriteriosTipoEvaluacion() {
  
      this._ServiciosMensajeService.show();
  
      this._ServicioBackendService.obtenerCriteriosTipoEvaluacion({
        id_tipo_evaluacion: 1
      }).subscribe({
  
        next: (Response) => {
  
          this._ServiciosMensajeService.hide();
  
          console.log(Response);
  
          if (Response.error) {
            return this._ServiciosMensajeService.mensajeMalo(Response.error);
          }
  
          if (Response.mensaje) {
            return this._ServiciosMensajeService.mensajeMalo(Response.mensaje);
          }
  
          this.criterios = Response.criterios;
  
          this.arregloEvaluadores = [];
  
        },
  
        error: () => {
  
          this._ServiciosMensajeService.hide();
  
          this._ServiciosMensajeService.mensajeerrorServer();
  
        }
  
      });
  
    }*/



  async obtenerXCriterios(
    numero: number,
    orden_llenado: number
  ): Promise<any[]> {

    try {
      const Response = await firstValueFrom(
        this._ServicioBackendService.obtenerCriteriosTipoEvaluacion({
          id_tipo_evaluacion: numero,
          orden_llenado: orden_llenado
        })
      );

      if (Response.error) {
        this._ServiciosMensajeService.mensajeMalo(Response.error);
        return [];
      }
      if (Response.mensaje) {
        this._ServiciosMensajeService.mensajeMalo(Response.mensaje);
        return [];
      }
      return Response.criterios ?? [];
    } catch (error) {

      this._ServiciosMensajeService.mensajeerrorServer();
      return [];
    }
  }


  actualizarCriterios(resultados: any[], criterios: any[]): any[] {

    const mapaResultados = new Map(
      resultados.map(r => [r.codigo, r])
    );

    criterios.forEach(c => {

      const resultado = mapaResultados.get(c.codigo);

      if (resultado) {
        c.respuesta = resultado.respuesta;
        c.readonly = true;
        c.modificado = true;      // Nueva propiedad
        c.visible= false
      } else {
        c.modificado = false;     // Opcional
      }

    });

    return criterios; // Opcional
  }


  criteriosPorCodigo = {}
  async obtenerCriteriosTipoEvaluacion(item?: any, orden_llenado_: any = 1) {
    //      let r = await this.obtenerResultadosEvaluacion_(tipo)
 
    if (item === 2 && orden_llenado_ === 3) {
      //Sacar Exacmen medico para calcular sobre peso
       let arreglo_respuestas_3 = await this.obtenerResultadosEvaluacion_(2, 3)
       if(arreglo_respuestas_3.length!==0) {
        this.limpiarCriterios()
        return this._ServiciosMensajeService.mensajeMalo("La corrida ya fue evaluada")
       }
      this._ServiciosMensajeService.show()
      await this.obtenerExamenMedico(1,1)
     //sACO TODO LOS CRITERIO DE EVALUACION FISICO
      let arreglos_pechasdas = await this.obtenerXCriterios(2, 1)
      let arreglos_abdominales = await this.obtenerXCriterios(2, 2)
      let arreglos_carrera = await this.obtenerXCriterios(2, 3)

      /**VERIFICAR SI HIZO LAS PECHADAS Y  LAS ABDOMINALES */
      let arreglo_respuestas_1 = await this.obtenerResultadosEvaluacion_(2, 1)
      let arreglo_respuestas_2 = await this.obtenerResultadosEvaluacion_(2, 2)
     


      this._ServiciosMensajeService.hide()
      if (arreglo_respuestas_1.length === 0) {
        this.limpiarCriterios()
        return this._ServicioBackendService.mensajeError("Evalue las pechadas antes de continuar")
      }
      if (arreglo_respuestas_2.length === 0) {
        this.limpiarCriterios()
        return this._ServicioBackendService.mensajeError("Evalue las abdominales antes de continuar")
      }

      let arreglo_respuestas = []
      arreglo_respuestas.push(...arreglo_respuestas_1)
      arreglo_respuestas.push(...arreglo_respuestas_2)


      let arreglo_final = []
      arreglo_final.push(...arreglos_pechasdas)
      arreglo_final.push(...arreglos_abdominales)
      arreglo_final.push(...arreglos_carrera)



      this.actualizarCriterios(arreglo_respuestas, arreglo_final)

    

   
      this.criterios = arreglo_final;
      this.criteriosPorCodigo = {};
      this.criterios.forEach((c: any) => {
        this.criteriosPorCodigo[c.codigo] = c;
      });

     
    } else {

      if (item === 2) {
       this._ServiciosMensajeService.show("Verificandos requisitos")
        let r = await this.obtenerExamenMedico(1,1)
  
        if (r.length === 0) {
          this._ServicioBackendService.mensajeError("Evalue el examen Medico primero")
          this.limpiarCriterios()
          return
        }


        if (orden_llenado_ === 1) {
          
          let arreglo_respuestas_1 = await this.obtenerResultadosEvaluacion_(2, 1)
 
          if (arreglo_respuestas_1.length !== 0) {
            this.limpiarCriterios()

            this._ServiciosMensajeService.mensajeMalo("Las pechadas ya fueron evaluadas")
            return
          }
        } else if (orden_llenado_ === 2) {
 
          let arreglo_respuestas_2 = await this.obtenerResultadosEvaluacion_(2, 2)
      

          if (arreglo_respuestas_2.length !== 0) {
            this.limpiarCriterios()
            this._ServiciosMensajeService.mensajeMalo("Las abdominales ya fueron evaluadas")
            return
          }
        }
        this._ServiciosMensajeService.hide()
      }

    if (item === 1) {
       this._ServiciosMensajeService.show("Verificando los examenes medicos....")
        let r = await this.obtenerResultadosEvaluacion_(1, 1)
        this._ServiciosMensajeService.hide()
        if (r.length !== 0) {
          this.limpiarCriterios()
          this._ServiciosMensajeService.mensajeMalo("El examen medico ya fue evaluado")
          return
        }

      }


       if (item === 3) {
        this._ServiciosMensajeService.show()
         let arreglo_respuestas_1 = await this.obtenerResultadosEvaluacion_(3, 1)
         this._ServiciosMensajeService.hide()
           if (arreglo_respuestas_1.length !== 0) {
            this.limpiarCriterios()

            this._ServiciosMensajeService.mensajeMalo("El examen de disparo ya fue evaluado")
            return
          }

      }

     this._ServiciosMensajeService.show("Cargando los criterios de evaluación")
      let arreglo = await this.obtenerXCriterios(item, orden_llenado_)
        this._ServiciosMensajeService.hide()
 
      this.criterios = arreglo;
      this.criteriosPorCodigo = {};
      this.criterios.forEach((c: any) => {
        this.criteriosPorCodigo[c.codigo] = c;
      });
      /*Esta sigue normal si no es corrida */
      /*  this._ServiciosMensajeService.show();
        this._ServicioBackendService.obtenerCriteriosTipoEvaluacion({
          id_tipo_evaluacion: item,
          orden_llenado: orden_llenado_
        }).subscribe({
          next: (Response) => {
            this._ServiciosMensajeService.hide();
            if (Response.error) return this._ServiciosMensajeService.mensajeMalo(Response.error);
            if (Response.mensaje) return this._ServiciosMensajeService.mensajeMalo(Response.mensaje);
            this.criterios = Response.criterios;
            // Diccionario por código
            console.log(Response)
            this.criteriosPorCodigo = {};
            this.criterios.forEach((c: any) => {
              this.criteriosPorCodigo[c.codigo] = c;
            });
  
            //  this.arregloEvaluadores = [];
  
          },
          error: () => {
            this._ServiciosMensajeService.hide();
            this._ServiciosMensajeService.mensajeerrorServer();
          }
  
        });*/

    }
  }


  @ViewChild("frmEvaluacion") frmEvaluacion: NgForm

  construirJsonEvaluacion(
    criterios: any[],
    idTipoEvaluacion: number,
    idEvaluado: number
  ): any | null {
    const sinResponder = criterios.filter(c =>
      c.respuesta === null ||
      c.respuesta === '' ||
      c.respuesta === undefined
    );
    
    if (sinResponder.length > 0) {
      alert("Formulario incompleto");
      return null;
    }
    const respuestas = criterios.map(c => ({
      id_tipo_criterio: c.id_tipo_criterios,
      respuesta: c.respuesta
    }));
    return {
      id_tipo_evaluacion: idTipoEvaluacion,
      idevaluado: idEvaluado,
      respuestas
    };

  }


  async guardarResultados(json: any): Promise<boolean> {
    try {
      this._ServiciosMensajeService.show();
      await firstValueFrom(this._ServicioBackendService.guardarResultadosEvaluacion(json));
      return true;
    } catch (error) {
      this._ServiciosMensajeService.mensajeerrorServer();
      return false;
    } finally {
      this._ServiciosMensajeService.hide();
    }
  }

  async guardarEvaluacion() {
   
    if(!this.frmEvaluacion.valid) return  this._ServiciosMensajeService.mensajeMalo("Formulario Invalido")

 
    let responder = await this._ServiciosMensajeService.mensajePregunta("Esta seguro de registrar los datos")
    if (!responder) return
    if (this.tipoPrueba === 'CORRIDA') {
       
      const criterios_faltantes = this.criterios.filter(x => x['modificado'] === false);
      const json = this.construirJsonEvaluacion(criterios_faltantes, 1, this.personaSeleccionada.idevaluador);
      if (!json) return this._ServiciosMensajeService.mensajeMalo("El JSON no se construyo correctamente")
    
      const ok = await this.guardarResultados(json);
      if (ok) {
        this.limpiarCriterios()
        return this._ServiciosMensajeService.mensajeBueno("Registrado correctamente")
      }
      this._ServiciosMensajeService.mensajeMalo("Error al guardar")
    } else {
      const json = this.construirJsonEvaluacion(this.criterios, 1, this.personaSeleccionada.idevaluador);
      if (!json) return this._ServiciosMensajeService.mensajeMalo("El JSON no se construyo correctamente")
      const ok = await this.guardarResultados(json);

      if (ok) {
        this.limpiarCriterios()
        return this._ServiciosMensajeService.mensajeBueno("Registrado correctamente")
      }
      this._ServiciosMensajeService.mensajeMalo("Error al guardar")

    }
 

    /*
        const sinResponder = this.criterios.filter(c =>
          c.respuesta === null ||
          c.respuesta === '' ||
          c.respuesta === undefined
        );
    
        if (sinResponder.length > 0) {
          // Mostrar mensaje con Toast o SweetAlert
          alert("Formulario incompleto")
          return;
        }
    
        const respuestas = this.criterios.map(c => ({
          id_tipo_criterio: c.id_tipo_criterios,
          respuesta: c.respuesta
        }));
    
        const json = {
          id_tipo_evaluacion: 1,
          idevaluado: this.personaSeleccionada.idevaluador,
          respuestas: respuestas
        };
    
        this._ServiciosMensajeService.show()
        this._ServicioBackendService.guardarResultadosEvaluacion(json).subscribe({
          next: (response) => {
            this._ServiciosMensajeService.hide()
          }, error: () => {
            this._ServiciosMensajeService.hide()
            this._ServiciosMensajeService.mensajeerrorServer()
          }
        })*/
  }

  valor(codigo: string): number {

    const criterio = this.criterios.find(c => c.codigo === codigo);

    return Number(criterio?.respuesta ?? 0);

  }
  calcularCriterio(criterio: Criterio): any {

    switch (criterio.codigo) {

      case 'PROMEDIO':
        return this.valor('m') + this.valor('n');
      /* return (
           this.valor('DISCIPLINA') +
           this.valor('LIDERAZGO') +
           this.valor('ASISTENCIA')
       ) / 3;*/

      case 'TOTAL':
        return this.valor('DISCIPLINA') + this.valor('LIDERAZGO');
      default:
        return criterio.respuesta;

    }

  }
  /*
  recalcularCriterios(): void {
    this.criterios
      .filter(c => c.origen_respuesta === 'CALCULADO')
      .forEach(c => {
        console.log(this.calcularCriterio(c));
        c.respuesta = this.calcularCriterio(c);
      });

  }*/
  /*
    recalcularCriterios2(): void {
      console.log('Recalculando...');
  
      this.criterios
        .filter(c => c.origen_respuesta === 'CALCULADO')
        .forEach(c => {
          console.log('Evaluando fórmula para criterio:', c.codigo, 'con fórmula:', c.formula);
          let resultado = this.evaluarFormula(c.formula ?? '');
          console.log('Resultado de la evaluación:', resultado);
          c.respuesta = resultado //this.evaluarFormula(c.formula ?? '');
  
        });
  
    }*/














  /**Nuevas funciones */
  evaluado = {

    sexo: 'M',

    edad: 25,

    peso: 78,

    estatura: 1.72,
    tiempo: 12.5

  };
  resolverParametro(parametro: any): any {


    switch (parametro.origen) {

      case 'CRITERIO':

        /*  console.log(
              "CRITERIO",
              parametro.referencia,
              this.criteriosPorCodigo[parametro.referencia]
          );
*/
        return this.criteriosPorCodigo[parametro.referencia]?.respuesta;

      case 'EVALUADO':

        /*  console.log(
              "EVALUADO",
              parametro.referencia,
              this.evaluado
          );
*/
        return this.evaluado[parametro.referencia];

      case 'CONSTANTE':

        return parametro.referencia;

      default:

        return null;

    }

  }
  /*
  evaluarFormula(formula: string): number {
 
    if (!formula) {
      return 0;
    }

    let expresion = formula;

    this.criterios.forEach(c => {

      const valor = isNaN(Number(c.respuesta)) ? 0 : Number(c.respuesta);
      const regex = new RegExp(`\\b${c.codigo}\\b`, 'g');

      let r = expresion.replace(regex, valor.toString());
      expresion = r

    });
    expresion = expresion
      .replace(/\bABS\s*\(/gi, "Math.abs(")
      .replace(/\bMAX\s*\(/gi, "Math.max(");

    try {

      let r = Function(`"use strict"; return (${expresion})`)()
      return r;

    } catch {


      return 0;

    }

  }*/
evaluarFormula(formula: string): number {

  if (!formula?.trim()) {
    return 0;
  }

  let expresion = formula;

  // Reemplazar criterios por sus valores
  for (const c of this.criterios) {

    const valor = Number(c.respuesta);

    expresion = expresion.replace(
      new RegExp(`\\b${c.codigo}\\b`, 'g'),
      isNaN(valor) ? '0' : valor.toString()
    );

  }

  // Reemplazar funciones permitidas
  expresion = expresion
    .replace(/\bABS\s*\(/gi, "Math.abs(")
    .replace(/\bMAX\s*\(/gi, "Math.max(")
    .replace(/\bMIN\s*\(/gi, "Math.min(");

  // Reemplazar cualquier variable que no exista por 0
  expresion = expresion.replace(
  /(?<!\.)\b(?!Math\b)[A-Za-z_][A-Za-z0-9_]*\b/g,
  "0"
);

  try {

    const resultado = Function(`"use strict"; return (${expresion})`)();

    return Number(resultado) || 0;

  } catch (e) {

     
    return 0;

  }

}
  convertirMetrosAPulgadas(alturaMetros: number): number {

    if (!alturaMetros || alturaMetros <= 0) {
      return 0;
    }

    return Number((alturaMetros * 39.37007874).toFixed(2));

  }

  resolverParametros(criterio: any): any[] {

    return criterio.parametros
      .sort((a: any, b: any) => a.orden - b.orden)
      .map((p: any) => this.resolverParametro(p));

  }
  ejecutarFuncion(nombre: string, parametros: any[]) {

    const funcion = this.funciones[nombre];

    if (!funcion) {
      throw new Error("No existe la función " + nombre);
    }

    return funcion(...parametros);

  }
  recalcularCriterios() {
    //aqui para ejecutar calculos de criterios que tengan origen calculado, ya sea por formula o funcion
    this.criterios.forEach((criterio: any) => {
      if (criterio.origen_respuesta !== 'CALCULADO') {
        return;
      }

      switch (criterio.tipo_calculo) {

        case 'FORMULA':
         
          criterio.respuesta = this.evaluarFormula(
            criterio.formula
          );

          break;

        case 'FUNCION':

          const parametros = this.resolverParametros(criterio);

          criterio.respuesta = this.ejecutarFuncion(
            criterio.funcion,
            parametros
          );

          break;

      }

    });

  }



  private timerRecalculo: any;

programarRecalculo() {

  clearTimeout(this.timerRecalculo);

  this.timerRecalculo = setTimeout(() => {
    this.recalcularCriterios();
  }, 200);

}

  seleccionarPersona(persona) {
    if(persona.ideval_tipos_evaluador!==6) return this._ServiciosMensajeService.mensajeMalo("Esta persona pertenece al equipo evaluador de esta terna, por lo que no puede ser evaluada dentro de la misma.")
    this.personaSeleccionada = persona
    this.verExpedienteTernaIndividual = true

  }

  personaSeleccionada = null;
  armapersonaseleccionada = null;
  unidad_asignacion = null

  buscarPersonaIdentidad(identidad) {
    this._ServiciosMensajeService.show()
    this.armapersonaseleccionada = null;

    let p = {
      identidad: identidad
    }
    this._ServicioBackendService.consultaPorIdentidad(p).subscribe(
      {
        next: (Response) => {
          this._ServiciosMensajeService.hide()
          if (Response.error) {
            this._ServiciosMensajeService.mensajeMalo(Response.error)
          } else {
            if (Response.mensaje) {
              this._ServiciosMensajeService.mensajeMalo(Response.mensaje)
            } else {


              this.personaBuscada = Response.resultado[0]
              this.armapersonaseleccionada = Response.arma[0]
              this.buscarunidadAsignacion(identidad)

            }
          }
        }, error: (error) => {
          this._ServiciosMensajeService.hide()

          this._ServiciosMensajeService.mensajeerrorServer();
        }
      }
    )
  }

  buscarunidadAsignacion(identidad) {
    this._ServiciosMensajeService.show()
    this.unidad_asignacion = null
    let p = {
      cadena: ` and identidad = '${identidad}' `
    }

    this._ServicioBackendService.buscarPersonasporNombreID(p).subscribe(
      {
        next: (Response) => {
          this._ServiciosMensajeService.hide()
          if (Response.error) {
            this._ServiciosMensajeService.mensajeMalo(Response.error)
          } else {
            if (Response.mensaje) {
              this._ServiciosMensajeService.mensajeMalo(Response.mensaje)
            } else {
              this.unidad_asignacion = Response.resultado[0]

            }
          }
        }, error: () => {
          this._ServiciosMensajeService.hide()

          this._ServiciosMensajeService.mensajeerrorServer();
        }
      }
    )
  }





  async obtenerResultadosEvaluacion_(tipo: number, orden_llenado): Promise<any[]> {

    const p = {
      idevaluador: this.personaSeleccionada.idevaluador,
      id_tipo_evaluacion: tipo,
      orden_llenado: orden_llenado
    };
    this.arregloResultados = [];
    try {
      const Response = await firstValueFrom(
        this._ServicioBackendService.obtenerResultadosEvaluacion(p)
      );

      if (Response.error) {
        this._ServiciosMensajeService.mensajeMalo(Response.error);
        return [];
      }
      if (Response.mensaje) {
        this._ServiciosMensajeService.mensajeMalo(Response.mensaje);
        return [];
      }
      this.arregloResultados = Response.datos ?? [];
      return this.arregloResultados;

    } catch (error) {


      this._ServiciosMensajeService.mensajeerrorServer();

      return [];
    }
  }




  arregloResultados = []

  async obtenerResultadosEvaluacion(tipo) {
    let r = []
    if(tipo===2) {
      this._ServiciosMensajeService.show("Cargando datos de examen fisico")
      let pecha1_ =  await this.obtenerResultadosEvaluacion_(tipo, 1)
  
      let abdominales =  await this.obtenerResultadosEvaluacion_(tipo, 2)
 

      let corridas =  await this.obtenerResultadosEvaluacion_(tipo, 3)
      
   
          r.push(...pecha1_)
          r.push(...abdominales)
          r.push(...corridas)
          this._ServiciosMensajeService.hide()
    }else{
      this._ServiciosMensajeService.show( )

       r = await this.obtenerResultadosEvaluacion_(tipo, 1)
                  this._ServiciosMensajeService.hide()


    }
       this.arregloResultados  =  r
    
  
    /*
    this._ServiciosMensajeService.show()
    let p = {
      idevaluador: this.personaSeleccionada.idevaluador,
      id_tipo_evaluacion: tipo
    }
    this.arregloResultados = []
    this._ServicioBackendService.obtenerResultadosEvaluacion(p).subscribe(
      {
        next: (Response) => {
          this._ServiciosMensajeService.hide()
          if (Response.error) return this._ServiciosMensajeService.mensajeMalo(Response.error)
          if (Response.mensaje) return this._ServiciosMensajeService.mensajeMalo(Response.mensaje)
          this.arregloResultados = Response.datos
        }, error: () => {
          this._ServiciosMensajeService.hide()
          this._ServiciosMensajeService.mensajeerrorServer();
        }
      }
    )*/
  }


  examenMedicoHecho = []

  async obtenerExamenMedico(tipo,orden_lelnado=1): Promise<any[]> {
    const p = {
      idevaluador: this.personaSeleccionada.idevaluador,
      id_tipo_evaluacion: tipo,
      orden_llenado:orden_lelnado
    };
    this.examenMedicoHecho = [];
    try {
      const Response: any = await firstValueFrom(
        this._ServicioBackendService.obtenerResultadosEvaluacion(p)
      );

      if (Response.error) {
        this._ServiciosMensajeService.mensajeMalo(Response.error);
        return [];
      }

      if (Response.mensaje) {
        this._ServiciosMensajeService.mensajeMalo(Response.mensaje);
        return [];
      }

      this.examenMedicoHecho = Response.datos;

      return Response.datos;

    } catch (error) {
      this._ServiciosMensajeService.mensajeerrorServer();
      return [];
    }

  }



  datosExamenesFisico = {
    cantidad_pechada: 0,
    nota_pechada: 0,
    cantidad_abdominal: 0,
    nota_abdominal: 0,
    cantidad_corrida: 0,
    nota_corrida: 0,
    promedio_general: 0,
    sobre_peso: 0,
    nota_final: 0,
    anos_: "",
    fecha_realizacion: ""

  }
  ternaSeleccionada = []
  seleccionarTerna(terna) {
    this.ternaSeleccionada = terna.evaluadores
  }
  cargarEvaluadores() {

    this.personalSupervisor.supervisor = this.buscartiposPersona(1, this.ternaSeleccionada)
    this.personalSupervisor.jefe_equipo = this.buscartiposPersona(2, this.ternaSeleccionada)
    this.personalSupervisor.evaluador_1 = this.buscartiposPersona(3, this.ternaSeleccionada)
    this.personalSupervisor.evaluador_2 = this.buscartiposPersona(4, this.ternaSeleccionada)
    this.personalSupervisor.evaluador_3 = this.buscartiposPersona(5, this.ternaSeleccionada)
    this.personalSupervisor.evaluador_3 = this.buscartiposPersona(5, this.ternaSeleccionada)
    this.personalSupervisor.comandante_encargado = this.ternaSeleccionada.find(elementAt => { return elementAt.ideval_tipos_evaluador === Number(7) })


  }
  cargarDataExamenFisico() {
    this.datosExamenesFisico.cantidad_pechada = this.sacarRespuestaArreglo('pe', this.arregloResultados)
    this.datosExamenesFisico.nota_pechada = this.sacarRespuestaArreglo('nota_pe', this.arregloResultados)
    this.datosExamenesFisico.cantidad_abdominal = this.sacarRespuestaArreglo('ab', this.arregloResultados)
    this.datosExamenesFisico.nota_abdominal = this.sacarRespuestaArreglo('nota_ab', this.arregloResultados)
    this.datosExamenesFisico.cantidad_corrida = this.sacarRespuestaArreglo('car', this.arregloResultados)
    this.datosExamenesFisico.nota_corrida = this.sacarRespuestaArreglo('nota_carre', this.arregloResultados)

    this.datosExamenesFisico.promedio_general = this.sacarRespuestaArreglo('prom_ge', this.arregloResultados)
    this.datosExamenesFisico.sobre_peso = this.sacarRespuestaArreglo('sobrepeso', this.arregloResultados)
    this.datosExamenesFisico.nota_final = this.sacarRespuestaArreglo('nota_final', this.arregloResultados)
    this.datosExamenesFisico.anos_ = this.sacarRespuestaArreglo('ano', this.arregloResultados)
    let tempo = this.arregloResultados.find(elementAt => { return elementAt.codigo === "ano" })
    this.datosExamenesFisico.fecha_realizacion = tempo ? tempo.fecha_sistema : "-----"

    //Buscar evaluadores
    this.cargarEvaluadores()

  }


  datosExamenMedico = {
    medida_abdomen: "",
    medida_cuello: "",
    diferencia_abdomen: "",
    factor_abdomen: "",
    factor_altura: "",
    porcentaje_grasa: "",
    presion_arteria: "",
    grasa_real: "",
    grasa_normal: "",
    exc_gra: "",
    peso_real: "",
    peso_normal: "",
    sobre_peso: "",
    altura: "",
    peso: ""
  }
  cargarDataExamenMedico() {
    this.datosExamenMedico.medida_abdomen = this.sacarRespuestaArreglo('m_ab', this.arregloResultados)
    this.datosExamenMedico.medida_cuello = this.sacarRespuestaArreglo('m_cu', this.arregloResultados)
    this.datosExamenMedico.diferencia_abdomen = this.sacarRespuestaArreglo('diferencia_ab_cu', this.arregloResultados)
    this.datosExamenMedico.factor_abdomen = this.sacarRespuestaArreglo('factor_ab_cu', this.arregloResultados)
    this.datosExamenMedico.factor_altura = this.sacarRespuestaArreglo('factor_al', this.arregloResultados)
    this.datosExamenMedico.porcentaje_grasa = this.sacarRespuestaArreglo('por_grasa_cu', this.arregloResultados)
    this.datosExamenMedico.presion_arteria = this.sacarRespuestaArreglo('pre_ar', this.arregloResultados)
    this.datosExamenMedico.grasa_real = this.sacarRespuestaArreglo('gr_re', this.arregloResultados)
    this.datosExamenMedico.grasa_normal = this.sacarRespuestaArreglo('gr_no', this.arregloResultados)
    this.datosExamenMedico.exc_gra = this.sacarRespuestaArreglo('exc_gra', this.arregloResultados)
    this.datosExamenMedico.peso_real = this.sacarRespuestaArreglo('p_re', this.arregloResultados)
    this.datosExamenMedico.peso_normal = this.sacarRespuestaArreglo('p_no', this.arregloResultados)
    this.datosExamenMedico.sobre_peso = this.sacarRespuestaArreglo('sp', this.arregloResultados)
    this.datosExamenMedico.altura = this.sacarRespuestaArreglo('altura', this.arregloResultados)
    this.datosExamenMedico.peso = this.sacarRespuestaArreglo('peso', this.arregloResultados)


    //Buscar evaluadores
    this.cargarEvaluadores()
  }

  datosExamenDisparo = {
    pistola: "",
    carabina: "",
    serie_carabina: "",
    serie_pistola: "",
    ano_tiro: "",
    nota_final: ""
  }
  cargarDataExamenDisparo() {
    this.datosExamenDisparo.pistola = this.sacarRespuestaArreglo('pi', this.arregloResultados)
    this.datosExamenDisparo.carabina = this.sacarRespuestaArreglo('ca', this.arregloResultados)
    this.datosExamenDisparo.serie_carabina = this.sacarRespuestaArreglo('serie_ca', this.arregloResultados)
    this.datosExamenDisparo.serie_pistola = this.sacarRespuestaArreglo('serie_pi', this.arregloResultados)
    this.datosExamenDisparo.ano_tiro = this.sacarRespuestaArreglo('tiro_ano', this.arregloResultados)
    this.datosExamenDisparo.nota_final = this.sacarRespuestaArreglo('nota', this.arregloResultados)


    //Buscar evaluadores
    this.cargarEvaluadores()
  }




  personalSupervisor = {
    supervisor: "",
    jefe_equipo: "",
    evaluador_1: "",
    evaluador_2: "",
    evaluador_3: "",
    comandante_encargado: {}
  }

  buscartiposPersona(codigo, arreglo) {
    let r = arreglo.find(elementAt => { return elementAt.ideval_tipos_evaluador === Number(codigo) })

    return r ? (r.idfuerza === 2 ? r.equivalente : r.nombre_grado) + " " + r.persona : ""
  }


  /**Crear pdf */
  async convertirImagenBase64(ruta: string): Promise<string> {

    return new Promise((resolve, reject) => {

      const img = new Image();

      img.crossOrigin = 'Anonymous';

      img.onload = () => {

        const canvas = document.createElement('canvas');

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('No se pudo obtener el contexto del canvas.');
          return;
        }

        ctx.drawImage(img, 0, 0);

        resolve(canvas.toDataURL('image/png'));

      };

      img.onerror = (e) => reject(e);

      img.src = ruta;

    });

  }
  logoBase64: any = '';

  private estilosPdf = {

    titulo: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 2, 0, 2]
    },

    subtitulo: {
      fontSize: 13,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 2]
    },

    normal: {
      fontSize: 10
    },

    negrita: {
      fontSize: 10,
      bold: true
    },

    tablaHeader: {
      bold: true,
      alignment: 'center',
      fillColor: '#EDEDED',
      fontSize: 10
    }

  };

  private encabezadoPDF() {

    return [

      {
        image: this.logoBase64,
        width: 70,
        alignment: 'center',
        margin: [0, 0, 0, 5]
      },

      {
        text: 'FUERZAS ARMADAS DE HONDURAS',
        style: 'titulo'
      },

      {
        text: 'INSPECTORÍA GENERAL',
        style: 'subtitulo'
      },

      {
        text: 'HOJA DE CONTROL DE PRUEBA FÍSICA ANUAL',
        style: 'subtitulo',
        margin: [0, 0, 0, 12]
      }

    ];

  }

  private datosGeneralesPDF() {

    return {

      margin: [0, 5, 0, 10],

      table: {

        widths: ['25%', '25%', '25%', '25%'],

        body: [

          [
            {
              text: [
                {
                  text: 'Grado y Arma\n',
                  bold: true,
                  fontSize: 10
                },
                {
                  text: this.personaSeleccionada.idfuerza === 3
                    ? this.personaSeleccionada.nombre_grado
                    : this.personaSeleccionada.equivalente + '/\n',
                  fontSize: 9
                },
                {
                  text: this.personaSeleccionada.arma_,
                  fontSize: 9
                }
              ],
              alignment: 'center'
            },

            {
              text: [
                { text: 'Edad\n\n', bold: true },
                { text: String(this.personaSeleccionada.edad) }
              ],
              alignment: 'center'
            },

            {
              text: [
                { text: 'Serie\n\n', bold: true },
                { text: this.personaSeleccionada.serie }
              ],
              alignment: 'center'
            },

            {
              text: [
                { text: 'Antigüedad en el grado\n\n', bold: true },
                { text: this.personaSeleccionada.antiguedadGrado + ' Años' }
              ],
              alignment: 'center'
            }

          ],

          [

            {
              colSpan: 4,

              text: [
                { text: 'Nombre: ', bold: true },
                { text: this.personaSeleccionada.persona }
              ]
            },

            {}, {}, {}

          ],

          [

            {
              colSpan: 4,

              text: [
                { text: 'Número de Identidad: ', bold: true },
                { text: this.personaSeleccionada.identidad }
              ]
            },

            {}, {}, {}

          ],

          [

            {

              colSpan: 2,

              text: [
                { text: 'Unidad Asignación: ', bold: true },
                { text: this.personaSeleccionada.unidad }
              ]

            },

            {},

            {

              colSpan: 2,

              text: [
                { text: 'Fecha de Nacimiento: ', bold: true },
                { text: this.personaSeleccionada.fecha_nacimiento.split("T")[0] }
              ]

            },

            {}

          ],
          [

            {

              colSpan: 2,

              text: [
                { text: 'Correspondiente al año: ', bold: true },
                { text: this.datosExamenesFisico.anos_ }
              ]

            },

            {},

            {

              colSpan: 2,

              text: [
                { text: 'Fecha de Realización: ', bold: true },
                { text: this.datosExamenesFisico.fecha_realizacion.split("T")[0] }
              ]

            },

            {}

          ]

        ]

      },

      layout: {

        defaultBorder: true,

        hLineWidth: () => 0.8,
        vLineWidth: () => 0.8,

        hLineColor: () => '#000',
        vLineColor: () => '#000',

        paddingLeft: () => 4,
        paddingRight: () => 4,
        paddingTop: () => 6,
        paddingBottom: () => 6

      }

    };

  }

  private tablaEventosPDF() {

    return {

      margin: [0, 0, 0, 10],

      table: {

        widths: ['50%', '15%', '35%'],

        body: [

          [
            {
              text: 'Eventos',
              bold: true,
              alignment: 'center'
            },
            {
              text: 'Cantidad',
              bold: true,
              alignment: 'center'
            },
            {
              text: 'Nota Obtenida',
              bold: true,
              alignment: 'center'
            }
          ],

          [
            '1. Pechadas (Tiempo 2")',

            {
              text: this.datosExamenesFisico.cantidad_pechada ?? '',
              alignment: 'center'
            },

            {
              text: `${this.datosExamenesFisico.nota_pechada ?? 0}%`,
              alignment: 'center'
            }
          ],

          [
            '2. Abdominales (Tiempo 2")',

            {
              text: this.datosExamenesFisico.cantidad_abdominal ?? '',
              alignment: 'center'
            },

            {
              text: `${this.datosExamenesFisico.nota_abdominal ?? 0}%`,
              alignment: 'center'
            }
          ],

          [
            '3. Carrera (3,200 MTS)',

            {
              text: this.datosExamenesFisico.cantidad_corrida ?? '',
              alignment: 'center'
            },

            {
              text: `${this.datosExamenesFisico.nota_corrida ?? 0}%`,
              alignment: 'center'
            }
          ],

          [
            {
              text: 'Eventos Alternos',
              colSpan: 3,
              bold: true,
              alignment: 'center',
              fillColor: '#EFEFEF'
            },
            {},
            {}
          ],

          [
            '1. Caminata (4,800 MTS)',
            {
              text: '------',
              alignment: 'center'
            },
            {
              text: '------',
              alignment: 'center'
            }
          ],

          [
            '2. Ciclismo (10 KMS)',
            {
              text: '------',
              alignment: 'center'
            },
            {
              text: '------',
              alignment: 'center'
            }
          ],
          [
            '3. Natación (400 MTS)',
            {
              text: '------',
              alignment: 'center'
            },
            {
              text: '------',
              alignment: 'center'
            }
          ],
          [
            '4. Barras',
            {
              text: '------',
              alignment: 'center'
            },
            {
              text: '------',
              alignment: 'center'
            }
          ],

          [
            {
              text: 'Promedio General',
              bold: true
            },

            '',

            {
              text: `${Number(this.datosExamenesFisico.promedio_general).toFixed(2)} %`,
              bold: true,
              alignment: 'center'
            }
          ],

          [
            'Sobre Peso (-)',

            '',

            {
              text: `${Number(this.datosExamenesFisico.sobre_peso).toFixed(2)} %`,
              alignment: 'center'
            }
          ],

          [
            {
              text: 'Nota Final',
              bold: true
            },

            '',

            {
              text: `${Number(this.datosExamenesFisico.nota_final).toFixed(2)} %`,
              bold: true,
              fontSize: 12,
              alignment: 'center'
            }
          ]

        ]

      },

      layout: {

        hLineWidth: () => 0.8,
        vLineWidth: () => 0.8,

        hLineColor: () => '#000',
        vLineColor: () => '#000',

        paddingLeft: () => 5,
        paddingRight: () => 5,
        paddingTop: () => 5,
        paddingBottom: () => 5

      }

    };

  }
  private bloqueFirma(etiqueta: string, nombre: string) {

    return {

      margin: [0, 3, 0, 3],

      table: {

        widths: [70, '*', 120],

        body: [

          [
            {
              text: etiqueta,
              bold: true,
              border: [false, false, false, false]
            },

            {
              stack: [

                {
                  text: nombre ?? '',
                  alignment: 'center',
                  margin: [0, 0, 0, 2]
                },

                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 370,
                      y2: 0,
                      lineWidth: 0.7
                    }
                  ]
                },

                {
                  text: 'Grado Nombre',
                  alignment: 'center',
                  fontSize: 9
                }

              ],

              border: [false, false, false, false]
            },

            {

              stack: [

                {
                  text: '',
                  margin: [0, 0, 0, 2]
                },

                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 110,
                      y2: 0,
                      lineWidth: 0.7
                    }
                  ]
                },

                {
                  text: 'Firma',
                  alignment: 'center',
                  fontSize: 9
                }

              ],

              border: [false, false, false, false]

            }

          ]

        ]

      },

      layout: 'noBorders'

    };

  }
  private firmasPDF() {

    return [

      {
        text: 'Firma del Evaluado: ____________________________________________',
        margin: [0, 10, 0, 5]
      },

      {
        text: 'En caso de no estar de acuerdo con la nota final, justificar al reverso.',
        italics: true,
        fontSize: 9,
        margin: [0, 0, 0, 10]
      },

      this.bloqueFirma(
        'Supervisor:',
        this.personalSupervisor.supervisor
      ),

      this.bloqueFirma(
        'Jefe Equipo:',
        this.personalSupervisor.jefe_equipo
      ),

      this.bloqueFirma(
        'Evaluador 1:',
        this.personalSupervisor.evaluador_1
      ),

      this.bloqueFirma(
        'Evaluador 2:',
        this.personalSupervisor.evaluador_2
      ),

      this.bloqueFirma(
        'Evaluador 3:',
        this.personalSupervisor.evaluador_3
      )

    ];

  }

  private inspectorGeneralPDF() {

    return {

      margin: [0, 40, 0, 0],

      stack: [

        {
          canvas: [
            {
              type: 'line',
              x1: 170,
              y1: 0,
              x2: 370,
              y2: 0,
              lineWidth: 0.8
            }
          ]
        },

        {

          text: this.personalSupervisor.comandante_encargado['idfuerza'] === 3 ? this.personalSupervisor.comandante_encargado['nombre_grado'] : this.personalSupervisor.comandante_encargado['equivalente'],
          alignment: 'center',
          bold: true,

          margin: [0, 6, 0, 2]

        },

        {

          text: this.personalSupervisor.comandante_encargado['persona'],

          alignment: 'center',

          bold: true

        },

        {

          text: this.personalSupervisor.comandante_encargado['cargo_'],

          alignment: 'center'

        },

        {

          text: this.personalSupervisor.comandante_encargado['serie'],

          alignment: 'center'

        }

      ]

    };

  }
  async generarPDF() {
 this.cargarDataExamenFisico()

    this.logoBase64 = await this.convertirImagenBase64('fuerzasArmadas2.jpg');
    const docDefinition: any = {

      pageSize: 'LEGAL',

      pageMargins: [25, 20, 25, 20],

      styles: this.estilosPdf,

      content: [
        ...this.encabezadoPDF(),
        this.datosGeneralesPDF(),
        this.tablaEventosPDF(),
        ...this.firmasPDF(),
        this.inspectorGeneralPDF()

      ]

    };

    pdfMake.createPdf(docDefinition).open();

  }

















  crearPFMedico() {
   this.cargarDataExamenMedico()

    const fechaHoraHN = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'America/Tegucigalpa',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());


    const docDefinition: any = {
      pageSize: 'LETTER',
      pageOrientation: 'landscape',

      pageMargins: [20, 20, 20, 25],

      defaultStyle: {
        fontSize: 9
      },

      styles: {

        titulo: {
          bold: true,
          fontSize: 15,
          alignment: 'center'
        },

        subtitulo: {
          bold: true,
          fontSize: 11,
          alignment: 'center'
        },

        encabezadoTabla: {
          bold: true,
          alignment: 'center',
          fillColor: '#EAEAEA'
        },

        celda: {
          margin: [3, 4, 3, 4]
        }

      },

      content: [

        {
          text: 'FUERZAS ARMADAS DE HONDURAS',
          style: 'titulo'
        },

        {
          text: 'INSPECTORIA GENERAL',
          style: 'subtitulo',
          margin: [0, 3, 0, 0]
        },
        {
          text: 'HOJA DE CONTENIDO DE GRASA EN EL CUERPO',
          style: 'subtitulo',
          margin: [0, 3, 0, 12]
        },

        {

          table: {

            headerRows: 0,

            widths: [
              210,
              60,
              60,
              60,
              '*'
            ],

            body: [

              [

                {
                  text: `Grado y Arma\n ${this.personaSeleccionada.idfuerza === 2 ? this.personaSeleccionada.equivalente : this.personaSeleccionada.nombre_grado}/\n ${this.personaSeleccionada.arma_} `,
                  style: 'celda'
                },

                {
                  text: `Nombre:\n ${this.personaSeleccionada.persona}`,
                  colSpan: 2,
                  style: 'celda'
                },

                {
                  text: `Serie: ${this.personaSeleccionada.serie}`,
                  style: 'celda'
                },

                {
                  text: `Unidad: \n${this.personaSeleccionada.unidad}`,
                  colSpan: 2,
                  style: 'celda'
                },

                {}

              ],

              [

                {
                  text: `Altura: ${this.datosExamenMedico.altura} MTS`,
                  style: 'celda'
                },

                {
                  text: `Peso: ${this.datosExamenMedico.peso} Lb`,
                  style: 'celda'
                },

                {

                  text: `Edad: ${this.personaSeleccionada.edad}`,
                  colSpan: 3,
                  style: 'celda'

                },

                {},
                {}

              ],

              [

                {
                  text: 'PASO',
                  style: 'encabezadoTabla',

                },

                {
                  text: 'PRIMERO',
                  style: 'encabezadoTabla'
                },

                {
                  text: 'SEGUNDO',
                  style: 'encabezadoTabla'
                },

                {
                  text: 'TERCERO',
                  style: 'encabezadoTabla'
                },

                {
                  text: 'PROMEDIO PULGADAS (MÁS CERCANO)',
                  style: 'encabezadoTabla'
                }

              ],

              [

                {

                  stack: [

                    {
                      text: '1. Medidas de Abdomen',
                      bold: true,
                      fontSize: 10
                    },

                    {
                      text: '(Al nivel del ombligo, al 0.25 pulgadas más cercano)',
                      fontSize: 8
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },

                {

                  stack: [

                    {
                      text: `${this.datosExamenMedico.medida_abdomen}`,
                      bold: true,
                      fontSize: 10
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },
                '',
                '',
                ''

              ],

              [

                {

                  stack: [

                    {
                      text: '2. Medida del Cuello',
                      bold: true,
                      fontSize: 10
                    },

                    {
                      text: '(Bajo la manzana de Adán, al 0.25 más cercano)',
                      fontSize: 8
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },

                {

                  stack: [

                    {
                      text: `${this.datosExamenMedico.medida_cuello}`,
                      bold: true,
                      fontSize: 10
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },
                '',
                '',
                ''

              ],

              [

                {

                  stack: [

                    {
                      text: '3. Diferencia de Abdomen',
                      bold: true,
                      fontSize: 10
                    },

                    {
                      text: '(Reste el paso 2 del paso 1 al 0.25 pulgadas más cercano)',
                      fontSize: 8
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },

                {

                  stack: [

                    {
                      text: `${this.datosExamenMedico.diferencia_abdomen}`,
                      bold: true,
                      fontSize: 10
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },
                '',
                '',
                ''

              ],

              [

                {

                  stack: [

                    {
                      text: '4. Factor Abdomen - Cuello',
                      bold: true,
                      fontSize: 10
                    },

                    {
                      text: '(Con este resultado vaya al anexo correspondiente y obtenga el factor)',
                      fontSize: 8
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },

                {

                  stack: [

                    {
                      text: `${this.datosExamenMedico.factor_abdomen}`,
                      bold: true,
                      fontSize: 10
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },
                '',
                '',
                ''

              ],
              [

                {

                  stack: [

                    {
                      text: '5. Factor Altura',
                      bold: true,
                      fontSize: 10
                    },

                    {
                      text: '(Con la altura medida vaya al anexo correspondiente y obtenga el factor)',
                      fontSize: 8
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },

                {

                  stack: [

                    {
                      text: `${this.datosExamenMedico.factor_altura}`,
                      bold: true,
                      fontSize: 10
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },
                '',
                '',
                ''

              ],

              [

                {

                  stack: [

                    {
                      text: '6. Grasa Corporal',
                      bold: true,
                      fontSize: 10
                    },

                    {
                      text: '(Reste el paso 5 del paso 4 y compare el resultado con los estándares)',
                      fontSize: 8
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },

                {

                  stack: [

                    {
                      text: `${this.redondear(this.datosExamenMedico.porcentaje_grasa)}`,
                      bold: true,
                      fontSize: 10
                    }

                  ],

                  margin: [3, 5, 3, 5]

                },
                '',
                '',
                ''

              ],

              [

                {
                  text: `7. Presión Arterial: ${this.datosExamenMedico.presion_arteria}`,
                  bold: true,
                  margin: [3, 8, 3, 8]
                },

                {
                  text: `Grasa Real: ${this.redondear(this.datosExamenMedico.grasa_real)}`,
                  bold: true,

                  alignment: 'center'
                },

                {
                  text: `Grasa Normal: ${this.redondear(this.datosExamenMedico.grasa_normal)}`,
                  bold: true,
                  alignment: 'center'
                },

                {

                  text: `Exceso de grasa: ${this.redondear(this.datosExamenMedico.exc_gra)}`,
                  bold: true,
                  alignment: 'center',
                  colSpan: 2

                },

                {}

              ],

              [

                {
                  text: `8. Peso  Real: ${this.datosExamenMedico.peso_real}`,
                  bold: true,
                  margin: [3, 8, 3, 8]
                },

                {

                  text: `Peso Normal: ${this.datosExamenMedico.peso_normal}`,
                  bold: true,
                  alignment: 'center'

                },

                {

                  text: `Sobre Peso: ${this.datosExamenMedico.sobre_peso}`,
                  bold: true,
                  alignment: 'center',
                  colSpan: 3

                },

                {},
                {}

              ]

            ]

          },

          layout: {

            hLineWidth: () => 0.8,

            vLineWidth: () => 0.8,

            hLineColor: () => "#000",

            vLineColor: () => "#000",

            paddingLeft: () => 5,

            paddingRight: () => 5,

            paddingTop: () => 0,

            paddingBottom: () => 0

          }

        }, {
          margin: [0, 45, 0, 0],

          columns: [

            {
              width: '*',
              stack: [

                {
                  text: fechaHoraHN, // 2026-07-08 13:48:35
                  alignment: 'center',
                  fontSize: 9,
                  margin: [0, 0, 0, 6] // espacio entre la fecha y la línea
                },

                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 15,
                      y1: 0,
                      x2: 200,
                      y2: 0,
                      lineWidth: 1
                    }
                  ]
                },

                {
                  text: 'LUGAR Y FECHA',
                  alignment: 'center',
                  bold: true,
                  margin: [0, 8, 0, 0],
                  fontSize: 10
                }



              ]
            },

            {
              width: 40,
              text: ''
            },

            {
              width: '*',
              stack: [

                {
                  text: "", // 2026-07-08 13:48:35
                  alignment: 'center',
                  fontSize: 9,
                  margin: [0, 0, 0, 6] // espacio entre la fecha y la línea
                },

                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 15,
                      y1: 0,
                      x2: 200,
                      y2: 0,
                      lineWidth: 1
                    }
                  ]
                },

                {
                  text: 'NOMBRE DEL MEDICO',
                  alignment: 'center',
                  bold: true,
                  margin: [0, 8, 0, 0],
                  fontSize: 10
                }

              ]
            },

            {
              width: 40,
              text: ''
            },

            {
              width: '*',
              stack: [

                {
                  text: " ", // 2026-07-08 13:48:35
                  alignment: 'center',
                  fontSize: 9,
                  margin: [0, 0, 0, 6] // espacio entre la fecha y la línea
                },

                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 15,
                      y1: 0,
                      x2: 200,
                      y2: 0,
                      lineWidth: 1
                    }
                  ]
                },

                {
                  text: 'FIRMA Y SELLO DEL MEDICO',
                  alignment: 'center',
                  bold: true,
                  margin: [0, 8, 0, 0],
                  fontSize: 10
                }



              ]
            },

          ]
        }

      ]

    };


    pdfMake.createPdf(docDefinition).open();
  }

  redondear(valor: any): number {

    const numero = Number(valor);

    if (isNaN(numero)) {
      return 0;
    }

    return Math.round((numero + Number.EPSILON) * 100) / 100;
  }













  /*
  Pdf de examen disparo
  */

  async generarpdfDisparo() {
    this.cargarDataExamenDisparo()
    this.logoBase64 = await this.convertirImagenBase64('fuerzasArmadas2.jpg');

    const documentDefinition: any = {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      pageMargins: [30, 25, 30, 25],

      styles: {
        titulo: {
          fontSize: 13,
          bold: true,
          alignment: 'center'
        },
        subtitulo: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        normal: {
          fontSize: 10
        },
        etiqueta: {
          fontSize: 10,
          bold: true
        }
      },

      content: [

        //====================================================
        // ENCABEZADO
        //====================================================

        {
          columns: [

            {
              stack: [

                // Logo
                {
                  image: this.logoBase64, // Tu imagen en Base64
                  width: 65,
                  alignment: 'center',
                  margin: [0, 0, 0, 8]
                },

                {
                  text: 'FUERZAS ARMADAS',
                  alignment: 'center',
                  bold: true,
                  fontSize: 14
                },

                {
                  text: 'INSPECTORÍA GENERAL',
                  alignment: 'center',
                  bold: true,
                  fontSize: 12,
                  margin: [0, 2, 0, 0]
                },

                {
                  text: 'HOJA INDIVIDUAL DE EVALUACIÓN DE DISPARO',
                  alignment: 'center',
                  bold: true,
                  fontSize: 12,
                  margin: [0, 2, 0, 10]
                }

              ]
            },

          ]
        },

        //====================================================
        // DATOS PERSONALES
        //====================================================

        {
          table: {
            widths: ['*'],
            body: [

              [
                {
                  text: [
                    'Nombre: ',
                    { text: this.personaSeleccionada.persona, bold: true }
                  ],
                  style: 'normal',
                  border: [false, false, false, false]
                }
              ],

              [
                {
                  text: [
                    'Grado: ',
                    {
                      text: this.personaSeleccionada.idfuerza == 2
                        ? this.personaSeleccionada.equivalente
                        : this.personaSeleccionada.nombre_grado,
                      bold: true
                    },
                    ' / Arma: ',
                    { text: this.personaSeleccionada.arma_, bold: true },
                    '   Serie: ',
                    { text: this.personaSeleccionada.serie, bold: true }
                  ],
                  style: 'normal',
                  border: [false, false, false, false]
                }
              ],

              [
                {
                  text: [
                    'Serie de Carabina: ',
                    { text: this.datosExamenDisparo.serie_carabina, bold: true },
                    '   Número Serie Fusil: ',
                    { text: this.datosExamenDisparo.serie_pistola, bold: true }
                  ],
                  style: 'normal',
                  border: [false, false, false, false]
                }
              ],

              [
                {
                  text: [
                    'Edad: ',
                    { text: this.personaSeleccionada.edad.toString(), bold: true },
                    '   Fecha de Nacimiento: ',
                    {
                      text: this.personaSeleccionada.fecha_nacimiento.split('T')[0],
                      bold: true
                    }
                  ],
                  style: 'normal',
                  border: [false, false, false, false]
                }
              ],

              [
                {
                  text: [
                    'Unidad de Asignación: ',
                    { text: this.personaSeleccionada.unidad, bold: true }
                  ],
                  style: 'normal',
                  border: [false, false, false, false]
                }
              ],

              [
                {
                  text: [
                    'Tiro Correspondiente al Año: ',
                    { text: this.datosExamenDisparo.ano_tiro.toString(), bold: true }
                  ],
                  style: 'normal',
                  border: [false, false, false, false]
                }
              ],

              [
                {
                  text: [
                    'Número de Identidad: ',
                    { text: this.personaSeleccionada.identidad, bold: true }
                  ],
                  style: 'normal',
                  border: [false, false, false, false]
                }
              ]

            ]
          },
          layout: 'noBorders',
          margin: [0, 8, 0, 10]
        },
        //====================================================
        // TABLA DE RESULTADOS
        //====================================================

        {
          table: {
            headerRows: 1,
            widths: [170, 120, '*'],
            body: [

              [
                {
                  text: 'Tipo de Arma',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#EAEAEA'
                },
                {
                  text: 'Porcentaje Obtenido',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#EAEAEA'
                },
                {
                  text: 'Observación',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#EAEAEA'
                }
              ],

              [
                {
                  text: 'Pistola 9 MM',
                  margin: [5, 8]
                },
                {
                  text: `${this.datosExamenDisparo.pistola}%`,
                  margin: [5, 8]
                },
                {
                  text: '',
                  margin: [5, 8]
                }
              ],

              [
                {
                  text: 'Carabina / Fusil M16',
                  margin: [5, 8]
                },
                {
                  text: `${this.datosExamenDisparo.carabina}%`,
                  margin: [5, 8]
                },
                {
                  text: '',
                  margin: [5, 8]
                }
              ],

              [
                {
                  text: 'Nota Final',
                  bold: true,
                  margin: [5, 8]
                },
                {
                  text: `${this.datosExamenDisparo.nota_final}%`,
                  margin: [5, 8]
                },
                {
                  text: '',
                  margin: [5, 8]
                }
              ]

            ]
          },

          layout: {
            hLineWidth: () => 0.8,
            vLineWidth: () => 0.8,
            hLineColor: () => '#000',
            vLineColor: () => '#000',
            paddingTop: () => 5,
            paddingBottom: () => 5,
            paddingLeft: () => 5,
            paddingRight: () => 5
          },

          margin: [0, 10, 0, 15]
        },    //====================================================
        // FIRMA DEL EVALUADO
        //====================================================

        {
          stack: [
            {
              columns: [

                {
                  width: 110,
                  text: 'Firma del evaluado:',
                  bold: true
                },

                {
                  width: '*',
                  stack: [
                    {
                      text: '',
                      alignment: 'center'
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: 0,
                          y1: 0,
                          x2: 400,
                          y2: 0,
                          lineWidth: 0.7
                        }
                      ]
                    }


                  ]
                }

              ]
            }


          ],
          border: [false, false, false, false]
        },

        {
          text: 'En caso de no estar de acuerdo con la nota final, justificar al reverso.',
          italics: true,
          fontSize: 9,
          margin: [0, 0, 0, 12]
        },

        //====================================================
        // SUPERVISORES Y EVALUADORES
        //====================================================

        {
          table: {

            widths: ['*', 160],

            body: [

              [
                {
                  stack: [

                    {
                      columns: [

                        {
                          width: 80,
                          text: 'Supervisor:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [

                            {
                              text: this.personalSupervisor.supervisor,
                              alignment: 'center'
                            },

                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 300,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            },

                            {
                              text: 'Grado Nombre',
                              alignment: 'center',
                              fontSize: 8
                            }

                          ]
                        }

                      ]
                    }

                  ],
                  border: [false, false, false, false]
                },

                {
                  stack: [
                    {
                      columns: [

                        {
                          width: 45,
                          text: 'Firma:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [
                            {
                              text: '',
                              alignment: 'center'
                            },
                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 100,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            }


                          ]
                        }

                      ]
                    }


                  ],
                  border: [false, false, false, false]
                }

              ],

              [
                {
                  stack: [

                    {
                      columns: [

                        {
                          width: 80,
                          text: 'Jefe Equipo:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [

                            {
                              text: this.personalSupervisor.jefe_equipo,
                              alignment: 'center'
                            },

                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 300,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            },

                            {
                              text: 'Grado Nombre',
                              alignment: 'center',
                              fontSize: 8
                            }

                          ]
                        }

                      ]
                    }

                  ],
                  border: [false, false, false, false]
                },

                {
                  stack: [
                    {
                      columns: [

                        {
                          width: 45,
                          text: 'Firma:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [
                            {
                              text: '',
                              alignment: 'center'
                            },
                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 100,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            }


                          ]
                        }

                      ]
                    }


                  ],
                  border: [false, false, false, false]
                }

              ],

              [
                {
                  stack: [

                    {
                      columns: [

                        {
                          width: 80,
                          text: 'Evaluador 1:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [

                            {
                              text: this.personalSupervisor.evaluador_1,
                              alignment: 'center'
                            },

                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 300,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            },

                            {
                              text: 'Grado Nombre',
                              alignment: 'center',
                              fontSize: 8
                            }

                          ]
                        }

                      ]
                    }

                  ],
                  border: [false, false, false, false]
                },

                {
                  stack: [
                    {
                      columns: [

                        {
                          width: 45,
                          text: 'Firma:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [
                            {
                              text: '',
                              alignment: 'center'
                            },
                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 100,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            }


                          ]
                        }

                      ]
                    }


                  ],
                  border: [false, false, false, false]
                }

              ],          //====================================================
              // EVALUADOR 2
              //====================================================

              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          width: 80,
                          text: 'Evaluador 2:',
                          bold: true
                        },
                        {
                          width: '*',
                          stack: [

                            {
                              text: this.personalSupervisor.evaluador_2,
                              alignment: 'center'
                            },

                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 300,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            },

                            {
                              text: 'Grado Nombre',
                              alignment: 'center',
                              fontSize: 8
                            }

                          ]
                        }
                      ]
                    }
                  ],
                  border: [false, false, false, false]
                },

                {
                  stack: [
                    {
                      columns: [

                        {
                          width: 45,
                          text: 'Firma:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [
                            {
                              text: '',
                              alignment: 'center'
                            },
                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 100,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            }


                          ]
                        }

                      ]
                    }


                  ],
                  border: [false, false, false, false]
                }
              ],

              //====================================================
              // EVALUADOR 3
              //====================================================

              [
                {
                  stack: [
                    {
                      columns: [
                        {
                          width: 80,
                          text: 'Evaluador 3:',
                          bold: true
                        },
                        {
                          width: '*',
                          stack: [

                            {
                              text: this.personalSupervisor.evaluador_3,
                              alignment: 'center'
                            },

                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 300,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            },

                            {
                              text: 'Grado Nombre',
                              alignment: 'center',
                              fontSize: 8
                            }

                          ]
                        }
                      ]
                    }
                  ],
                  border: [false, false, false, false]
                },

                {
                  stack: [
                    {
                      columns: [

                        {
                          width: 45,
                          text: 'Firma:',
                          bold: true
                        },

                        {
                          width: '*',
                          stack: [
                            {
                              text: '',
                              alignment: 'center'
                            },
                            {
                              canvas: [
                                {
                                  type: 'line',
                                  x1: 0,
                                  y1: 0,
                                  x2: 100,
                                  y2: 0,
                                  lineWidth: 0.7
                                }
                              ]
                            }


                          ]
                        }

                      ]
                    }


                  ],
                  border: [false, false, false, false]
                }
              ]

            ]

          },

          layout: 'noBorders',

          margin: [0, 0, 0, 25]

        },

        //====================================================
        // FIRMA DEL INSPECTOR GENERAL
        //====================================================

        {
          stack: [

            {
              text: this.personalSupervisor.comandante_encargado['idfuerza'] === 3 ? this.personalSupervisor.comandante_encargado['nombre_grado'] : this.personalSupervisor.comandante_encargado['equivalente'],
              alignment: 'center',
              bold: true
            },

            {
              margin: [0, 28, 0, 0],
              canvas: [
                {
                  type: 'line',
                  x1: 160,
                  y1: 0,
                  x2: 360,
                  y2: 0,
                  lineWidth: 0.8
                }
              ]
            },

            {
              text: this.personalSupervisor.comandante_encargado['persona'],
              alignment: 'center',
              bold: true,
              margin: [0, 3, 0, 0]
            },

            {
              text: this.personalSupervisor.comandante_encargado['cargo_'],
              alignment: 'center'
            },

            {
              text: this.personalSupervisor.comandante_encargado['serie'],
              alignment: 'center',
              fontSize: 9
            }

          ]
        }

      ] // FIN CONTENT

    }; // FIN DOCUMENT DEFINITION
    pdfMake.createPdf(documentDefinition).open();
  }



}
