import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuToeComponent } from '../../../configuraciones/toe/menu-toe/menu-toe.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { VisualizarPerfilComponent } from '../../../../Componentes/visualizar-perfil/visualizar-perfil.component';
 import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
  import { TreeSelectModule } from 'primeng/treeselect';


type Opcion = 'fuerza' | 'unidad'| 'seccion' ;

type Reporte = {
  id: string;
  titulo: string;
  descripcion?: string;
  icon: string;     // PrimeIcons: 'pi pi-...'
  categoria: string;
  ruta?: string;
   permiso?: string[]; // Array de permisos necesarios para ver el reporte
};
@Component({
  selector: 'app-menu-repo-fuerza',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, TooltipModule,RadioButtonModule,MenuToeComponent,DialogModule,ButtonModule,VisualizarPerfilComponent,
    TableModule,TagModule,ProgressSpinnerModule,TreeSelectModule
  ],
  templateUrl: './menu-repo-fuerza.component.html',
  styleUrl: './menu-repo-fuerza.component.css',
})
export class MenuRepoFuerzaComponent {
  usuarioLoguiado
  constructor(
    public _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService
  ) { }

  ngOnInit(): void {
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarTodalasUnidades()
    this.sacarunidades()
  }
   arregloCategorias =[
  {nombre:"Oficiales",nivel:[11,12,13,14,15,16,17,18,19],id:1},
  {nombre:"Sub Oficiales",nivel:[6,8,10],id:2},
  {nombre:"Tropa",nivel:[2] ,id:3},
  {nombre:"Cadetes",nivel:[4] ,id:4},
   {nombre:"Estudiante",nivel:[3] ,id:5},
  {nombre:"Auxiliares",nivel:[1] ,id:6},  
  {nombre:"Pensionado",nivel:[22] ,id:7},
  {nombre:"Catedratico",nivel:[20] ,id:8}


 ]
  q = signal('');

  opcion: Opcion = 'fuerza';
@ViewChild('formbuscar') formbuscar!: NgForm;
  opciones = [
    { label: 'Por fuerza', value: 'fuerza' as const },
    { label: 'Por unidad', value: 'unidad' as const },
    { label: 'Por Sección', value: 'seccion' as const },

 
  ];

  categoria = signal<'Todos' | string>('Todos');

  reportes = signal<Reporte[]>([
    { id: 'r1', titulo: 'Parte por Unidad', descripcion: 'Parte de toda la Unidad', icon: 'pi pi-wallet', categoria: 'Partes', ruta: '/reportes/planilla',permiso:[]  },
    {
      id: 'r2', titulo: 'Parte de bajas por unidad', descripcion: 'Aqui se muestran las bajas', icon: 'pi pi-percentage',
      categoria: 'Partes', ruta: '/reportes/isr',permiso:[] 
    },
    {
      id: 'r3', titulo: 'Cambio de Categorias', descripcion: 'Aqui estan las personas que cambiaron de categoria',
      icon: 'pi pi-calendar', categoria: 'RRHH', ruta: '/reportes/vacaciones',permiso:[] 
    },
     {
      id: 'r4', titulo: 'Bajas X Fuerza', descripcion: 'Aqui se muestran las bajas por fuerza de un mes seleccionado',
      icon: 'pi pi-asterisk', categoria: 'RRHH', ruta: '/reportes/vacaciones',permiso:[] 
    },
    {
      id: 'r5', titulo: 'Consulta pago Vacaciones', descripcion: 'Aqui el personal que se le paga vacaciones en un mes determinado',
      icon: 'pi pi-dollar', categoria: 'RRHH', ruta: '/reportes/vacaciones',permiso:[] 
    },
      {
      id: 'r6', titulo: 'Organizacion', descripcion: 'Consulta la organizacion completa ',
      icon: 'pi pi-clipboard', categoria: 'RRHH', ruta: '/reportes/vacaciones',permiso:[] 
    },
    { id: 'r7', titulo: 'Parte por Fuerza,Categoria', descripcion: 'Parte de fuerza y categoria', icon: 'pi pi-microchip', categoria: 'Partes', ruta: '/reportes/planilla',permiso:[]  },

    { id: 'r8', titulo: 'TOE', descripcion: 'Consulta TOE por Fuerza', icon: 'pi pi-asterisk', categoria: 'Partes', ruta: '/reportes/planilla',permiso:["Re_0005"]}
,{
      id: 'r9', titulo: 'Parte por fuerza,combatinete y genero', descripcion: 'Parte segun el genero y si es combatiente o no',
      icon: 'pi pi-crown', categoria: 'RRHH', ruta: '/reportes/promociones',permiso:[] 
    },{
      id: 'r10', titulo: 'Parte por situacion', descripcion: 'Parte segun la situacion del personal',
      icon: 'pi pi-crown', categoria: 'Partes', ruta: '/reportes/promociones',permiso:[] 
    }
     

  ]);


  categorias = computed(() => {
    const set = new Set(this.reportes().map(r => r.categoria));
    return ['Todos', ...Array.from(set)];
  });


  filtrados = computed(() => {
    const texto = this.q().trim().toLowerCase();
    const cat = this.categoria();

    return this.reportes().filter(r => {
      const matchCat = cat === 'Todos' || r.categoria === cat;
      const matchText =
        !texto ||
        r.titulo.toLowerCase().includes(texto) ||
        (r.descripcion || '').toLowerCase().includes(texto) ||
        r.categoria.toLowerCase().includes(texto);

      return matchCat && matchText;
    });
  });

  VentanaSeleccionada
  destruir() {
    this.arregloListaParteUnidad = []
    this.arregloResumenParteUnidad = []
    this.arregloBajas = []
    this.arregloCambioCategoria = []
    this.VentanaSeleccionada = null
    this.arregloResultado = []
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]
     this.arregloListaVacacioens  = []

  }

   ArregloUnidades = []
  sacarunidades() {

    let parametro = {
      cadena: ` and  idfuerza = ${this.usuarioLoguiado.idfuerza} `,
    };
     
    this.ArregloUnidades = [];
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarUnidadesArreglo(parametro).subscribe({
      next: (response) => {
      
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      this.ArregloUnidades = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }

    );


  }
  abrir(r: Reporte) {
    // Aquí luego lo cambias por Router navigate.
    this.destruir()
    this.VentanaSeleccionada = r
    
 


  }

  seleccionarCategoria(cat: string) {
    this.categoria.set(cat);
    this.destruir()
  }

  limpiar() {
    this.q.set('');
    this.categoria.set('Todos');

  }
  arregloResumenParteUnidad: any[] = []
  arregloListaParteUnidad: any[] = []
  sacarParteUnidad(form:NgForm) {
  
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]
    let param = {
          cadena:``,
          cadena2:"",
          idunidad:form.value.seccion.idunidad 
    }
  
    this._ServiciosMensajeService.show("Cargando parte de la unidad......");
    this._ServicioBackendService.sacarParteMenuInicio(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.arregloResumenParteUnidad = response.resultado_resumen
        this.arregloListaParteUnidad = response.resultado_lista


      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }
  sumarPropiedad<T>(
    arreglo: T[],
    propiedad: keyof T
  ): number {
    if (!Array.isArray(arreglo)) return 0;

    return arreglo.reduce((total, item) => {
      const valor = Number(item[propiedad]);
      return total + (isNaN(valor) ? 0 : valor);
    }, 0);
  }
  exportarExcelResumen(data) {
    this._ServicioBackendService.exportexcel2(data, "siapffaa")
  }

  arregloBajas: any[] = []

  sacarBajas(form) {
 
 
    let param = {
      cadena:` and year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')  `,
      idunidad:form.value.seccion.idunidad
    }

    this.arregloBajas = []
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarBajasUnidad(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        this.arregloBajas = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }

    sacarBajasXFuerza(form) {
 
 let  cade= ` and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')  and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
     
 
    let param = {
      cadena: cade,
      idunidad:form.value.seccion.idunidad
    }
    

    this.arregloBajas = []
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarBajasUnidad(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        this.arregloBajas = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }

  arregloCambioCategoria: any[] = []
  sacarCambioCategoria(form) {
    let param = {
       cadena:` and unidad.idfuerza =${this.usuarioLoguiado.idfuerza} 
        and year(fechaPrimerIngreso)=year('${form.value.fecha}-1') and month(fechaPrimerIngreso)=month('${form.value.fecha}-1')`
    }
 
    this.arregloCambioCategoria = []
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarCambioCategoria(param).subscribe({
      next: (response) => {
 
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        this.arregloCambioCategoria = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }
   


    arregloListaVacacioens =[]
  puscarPersonalVacacioensFuerza(form){
   let p ={
    cadena:`  and month(ia.fecha_planilla)=month('${form.value.fecha}-1')  and  c.idcategoria in (${form.value.categoria.nivel.join(',')}) `,
    idunidad:form.value.seccion.idunidad
   }
 this.arregloListaVacacioens=[]

   this._ServiciosMensajeService.show("Buscando personal.....");
 
   this._ServicioBackendService.sacaPersonalVacaciones(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloListaVacacioens = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
  }
  
 puscarPersonalVacacioensUnidad(form){
   let p ={
    cadena:` and u.idunidad=${this.usuarioLoguiado .idunidad}     
                and month(ia.fecha_planilla)=month('${form.value.fecha}-1')  and  c.idcategoria in (${form.value.categoria.nivel.join(',')}) `
   }
 this.arregloListaVacacioens=[]

   this._ServiciosMensajeService.show("Buscando personal.....");
 
   this._ServicioBackendService.sacaPersonalVacaciones(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloListaVacacioens = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
  }
  arregloOrganizacionCompleta =[]
sacarOrganizacion(form:NgForm,objeto){
this.arregloOrganizacionCompleta =[]
let q={cadena:``,data:{} as any}
   if(objeto === "fuerza"){
     q.cadena=` and ua.idfuerza=${form.value.fuerza.idfuerza}  and nivel in (${form.value.categoria.nivel }) `
   }else if(objeto === "unidad"){
     q.cadena=` and ua.idunidad=${form.value.unidad.idunidad}`
      q.data.cadena = ` and idunidad  =${form.value.unidad.idunidad} ` 
   } else  if(objeto === "seccion"){
      q.data.idunidad = Number(form.value.seccion.key);
   }

   this.ejecucatarConsultaOrganizacion(q)
}

ejecucatarConsultaOrganizacion(p){
 

   this._ServiciosMensajeService.show("Buscando personal.....");
   this._ServicioBackendService.sacarOrganizacionCompleta(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloOrganizacionCompleta = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
}
limpiar_organizacion(){
this.arregloOrganizacionCompleta =[]
this.arregloResultado=[]

}
buscar65Anos(data,objeto){
let cadena = ""
 if(objeto==="fuerza") cadena=` and unidad.idfuerza=${this.usuarioLoguiado.idfuerza} and month(fecha_nacimiento)=month('${data.value.fecha}-1')  `
 
 this.buscarPersonal_65_anos(cadena)
 
}
arregloResultado = []
buscarPersonal_65_anos(cadenita){
  let p={cadena:cadenita}
  this._ServiciosMensajeService.show("Buscando personal de 65 años o mas.....");
  this.arregloResultado = []
    this._ServicioBackendService.sacarPersonal65Anos(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloResultado = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );

}
limpiar_(){
  this.arregloResultado =[]
}

listaPrimerIngreso(form,objeto){
  let cadena = ""
  if(objeto==="fuerza") cadena=` and unidad.idfuerza=${this.usuarioLoguiado.idfuerza} and month(fecha)=month('${form.value.fecha}-1') and year(fecha)=year('${form.value.fecha}-1') `
  if(objeto==="unidad") cadena=` and unidad.idunidad=${this.usuarioLoguiado.idunidad} and month(fecha)=month('${form.value.fecha}-1') and year(fecha)=year('${form.value.fecha}-1') `
 this.personalPrimerIngreso(cadena)
}
personalPrimerIngreso(cadenita){
  let p={cadena:cadenita}
  this._ServiciosMensajeService.show("Buscando personal de primer ingreso.....");
  this.arregloResultado = []
    this._ServicioBackendService.personalPrimerIngreso(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloResultado = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );

}

listaAntiguedadGrado(form,objeto){
  let cadena = ""
  if(objeto==="fuerza") cadena=`    and ((YEAR(curdate())-YEAR(fechaPrimerIngreso)))>= ${form.value.anos}  and ingreso_ascenso.idfuerza =${this.usuarioLoguiado.idfuerza} `
 
 this.personalantiguedadGrado(cadena)
}
personalantiguedadGrado(cadenita){
  let p={cadena:cadenita}
  this._ServiciosMensajeService.show("Buscando personal con antiguedad en el grado.....");
  this.arregloResultado = []
    this._ServicioBackendService.sacarPersonalMas10anos(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloResultado = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );

}
   sacarParteFuerza(form:NgForm) {
      let cade=""
       cade= `  and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) and  personal.combatiente  in (${form.value.combatiente.join(',')})  `
     
   
      
   
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]
    let param = {
     cadena:cade,
     cadena2:`  and  c.idcategoria in (${form.value.categoria.nivel.join(',')}) and  p.combatiente  in (${form.value.combatiente.join(',')})  ` ,
     idunidad:form.value.seccion.idunidad
    }
    this._ServiciosMensajeService.show("Cargando parte de la unidad......");
    this._ServicioBackendService.sacarParteMenuInicio(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.arregloResumenParteUnidad = response.resultado_resumen
        this.arregloListaParteUnidad = response.resultado_lista


      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }

  verificarPermisos(reporte: Reporte): boolean {
  if (!reporte.permiso || reporte.permiso.length === 0) {
    return true; 
  }else{
    return this._ServicioBackendService.verificarPermisos(reporte.permiso);
      
  }
}

direcciones = []
mostrarNombramiento(unidad){
this.direcciones = []
this._ServiciosMensajeService.show("Cargando Direcciones y Secciones.....");
  this._ServicioBackendService.mostrarNombramiento(unidad).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
       this.direcciones = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()

      this._ServiciosMensajeService.mensajeerrorServer();
    }
  })
}




async exportexcelOrganizacion() {
let pregunta = await this._ServiciosMensajeService.mensajePregunta("Exportar con la foto puede tardar un poco mas, ¿Desea continuar?")
if(!pregunta)return this.exportarExcelResumen('tablaList')
  this._ServiciosMensajeService.show();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Organización');

  sheet.columns = [
    { header: '#', key: 'index', width: 6 },
    { header: 'Identidad', key: 'identidad', width: 20 },
    { header: 'Categoría', key: 'categoria', width: 18 },
    { header: 'Grado', key: 'grado', width: 15 },
    { header: 'Nombres', key: 'nombres', width: 25 },
    { header: 'Fecha Asignación', key: 'fecha_asignacion', width: 18 },
    { header: 'Unidad', key: 'unidad', width: 22 },
    { header: 'Sección', key: 'seccion', width: 20 },
    { header: 'Puesto', key: 'puesto', width: 25 },
  ];

  // Insertamos Foto como primera columna después del #
  sheet.spliceColumns(2, 0, { header: 'Foto', key: 'foto' } as any);
  sheet.getColumn(2).width = 14;

  // Estilo encabezado
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).alignment = {
    vertical: 'middle',
    horizontal: 'center',
  };
  sheet.getRow(1).height = 22;

  const datos = this.arregloOrganizacionCompleta || [];

  let excelRowIndex = 2;

  for (let index = 0; index < datos.length; index++) {

    const r = datos[index];
    const row = sheet.getRow(excelRowIndex);

    // Columna A -> #
    row.getCell('A').value = index + 1;

    // Columna C en adelante (porque B es foto)
    row.getCell('C').value = r.identidad;
    row.getCell('D').value = r.categoria;
    row.getCell('E').value = r.grado;
    row.getCell('F').value = r.nombres;
    row.getCell('G').value = r.fecha_asignacion;
    row.getCell('H').value = r.unidad;
    row.getCell('I').value = r.seccion ? r.seccion : 'Sin Cargo';
    row.getCell('J').value = r.Nombre_Puesto;

    row.height = 52;

    // FOTO (columna B)
    if (r.foto) {
      const urlFoto = this._ServicioBackendService.url2 + 'sacarfoto/' + r.foto;
      const buffer = await this._ServicioBackendService.descargarImagenComoArrayBuffer(urlFoto);

      if (buffer) {
        const imageId = workbook.addImage({
          buffer: buffer,
          extension: 'jpeg', // o png
        });

        sheet.addImage(imageId, {
          tl: { col: 1.2, row: excelRowIndex - 0.8 },
          ext: { width: 48, height: 48 },
          editAs: 'oneCell',
        });
      }
    }

    excelRowIndex++;
  }

  // Bordes
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

  this._ServiciosMensajeService.hide();

  saveAs(blob, 'organizacion_completa.xlsx');
}


verperfil =false
personaSeleccionada = null
seleccionarPersonal(personal){
  this.verperfil = true
this.personaSeleccionada = personal

  }
  limpiarVariable(){
    
    this.personaSeleccionada = null
  }




arregloParteGeneralFFAA = []
  sacarParteGeneralFFAA() {
  this._ServiciosMensajeService.show("Cargando parte general de las FFAA.....");
  this.arregloParteGeneralFFAA = [];
let p ={
  cadena:this.usuarioLoguiado.idfuerza ? ` and f.idfuerza=${this.usuarioLoguiado.idfuerza} ` : ""
}
  this._ServicioBackendService.sacarParteGeneralFFAA(p).subscribe({
    next: (response: any) => {
      this._ServiciosMensajeService.hide();

      if (response.error) {
        return this._ServiciosMensajeService.mensajeMalo(response.error);
      }

      if (response.mensaje) {
        return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      }

      this.arregloParteGeneralFFAA = response.resultado;
      this.calcularTotales();
    },
    error: () => {
      this._ServiciosMensajeService.hide();
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  });
}

 totales = {
  hombres_combatientes: 0,
  hombres_no_combatientes: 0,
  mujeres_combatientes: 0,
  mujeres_no_combatientes: 0,
  total: 0
};

calcularTotales() {

  this.totales = {
    hombres_combatientes: 0,
    hombres_no_combatientes: 0,
    mujeres_combatientes: 0,
    mujeres_no_combatientes: 0,
    total: 0
  };

  this.arregloParteGeneralFFAA.forEach(item => {
    this.totales.hombres_combatientes += +parseFloat(item.hombres_combatientes) || 0;
    this.totales.hombres_no_combatientes += +parseFloat(item.hombres_no_combatientes) || 0;
    this.totales.mujeres_combatientes += +parseFloat(item.mujeres_combatientes) || 0;
    this.totales.mujeres_no_combatientes += +parseFloat(item.mujeres_no_combatientes) || 0;
  });

  this.totales.total =
    this.totales.hombres_combatientes +
    this.totales.hombres_no_combatientes +
    this.totales.mujeres_combatientes +
    this.totales.mujeres_no_combatientes;
}



dataTransformada
asignaciones
categoriasPorAsignacion  
situaciones
ordenCategoriasGlobal: any = {
  'Auxiliar': 7,
  'Tropa': 4,
  'Estudiante': 6,
  'Cadete': 5,
  'Sub oficial': 3,
  'Oficial Auxiliar': 2,
  'Oficial de las Armas': 0,
  'Oficial de los Servicios': 1,
  'Pensionados': 8,
  'Catedraticos': 8
};
ordenarCategorias(categoriasFinal: any) {
  const ordenadas: any = {};

  Object.keys(categoriasFinal).forEach(asig => {
    ordenadas[asig] = categoriasFinal[asig].sort((a: string, b: string) => {
      const ordenA = this.ordenCategoriasGlobal[a] ?? 999;
      const ordenB = this.ordenCategoriasGlobal[b] ?? 999;

      return ordenA - ordenB;
    });
  });

  return ordenadas;
}


tipoBusquedaSituacion;
sacarParteSituacion(tipo_consulta){
  this._ServiciosMensajeService.show("Cargando parte situacional de las FFAA.....");
  this.arregloParteGeneralFFAA = [];
  this.tipoBusquedaSituacion = tipo_consulta
let p ={
  tipo_consulta:tipo_consulta,
  fuerza:this.usuarioLoguiado.idfuerza
}
  this._ServicioBackendService.sacarParteSituacion(p).subscribe({
    next: (response: any) => {
      this._ServiciosMensajeService.hide(); 
      if (response.error) {
        return this._ServiciosMensajeService.mensajeMalo(response.error);
      }

      if (response.mensaje) {
        return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      }
      let res = this.transformarData(response.resultado)

       this.dataTransformada = res.data;
      this.asignaciones = res.asignaciones;
      this.categoriasPorAsignacion = res.categoriasPorAsignacion;
      this.situaciones =  res.situaciones;
      this.calcularGranTotal()
 
      
    },
    error: () => {
      this._ServiciosMensajeService.hide();
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  });

}



/**
 * 
 * POR SI QUIERO ORDE3NAR POR RECOMENDACION ASIGNACION 
 */
ordenAsignaciones = [
  'EJERCITO',
  'FUERZA NAVAL',
  'FUERZA AEREA',
  'SEDENA'
];


ordenarAsignaciones(asignaciones: string[]) {
  return asignaciones.sort((a, b) => {
    const indexA = this.ordenAsignaciones.indexOf(a);
    const indexB = this.ordenAsignaciones.indexOf(b);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

transformarData(data: any[]) {
  const resultado: any = {};
  const asignaciones = new Set();
  const categoriasPorAsignacion: any = {};

  data.forEach(item => {

    const asignacion = item.asignacion?.trim();
    const categoria = item.categoria?.trim();
    const situacion = item.situacion?.trim();

    asignaciones.add(asignacion);

    if (!categoriasPorAsignacion[asignacion]) {
      categoriasPorAsignacion[asignacion] = new Set();
    }
    categoriasPorAsignacion[asignacion].add(categoria);

    if (!resultado[situacion]) {
      resultado[situacion] = {};
    }

    if (!resultado[situacion][asignacion]) {
      resultado[situacion][asignacion] = {};
    }

    resultado[situacion][asignacion][categoria] = item.cantidad;
  });

  const categoriasFinal: any = {};
  Object.keys(categoriasPorAsignacion).forEach(asig => {
    categoriasFinal[asig] = Array.from(categoriasPorAsignacion[asig]);
  });

  const categoriasOrdenadas = this.ordenarCategorias(categoriasFinal);

  const situacionesOrdenadas = Object.keys(resultado).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

 
  return {
    data: resultado,
    asignaciones: Array.from(asignaciones),
    categoriasPorAsignacion: categoriasOrdenadas,
    situaciones: situacionesOrdenadas
  };
}


filtroAsignacion: string = '';
mostrarTotales = false;
soloActivos = false;

toggleTotales() {
  this.mostrarTotales = !this.mostrarTotales;
}

resetTabla() {
  this.filtroAsignacion = '';
  this.mostrarTotales = false;
  this.soloActivos = false;
}

filtrarActivos() {
  this.soloActivos = !this.soloActivos;
}

situacionesFiltradas() {
  if (!this.soloActivos) return this.situaciones;

  return this.situaciones.filter(sit => {
    return this.asignaciones.some(asig =>
      this.categoriasPorAsignacion[asig]?.some(cat =>
        (this.dataTransformada[sit]?.[asig]?.[cat] || 0) > 0
      )
    );
  });
}

/* COLORES DINÁMICOS */
getColorCelda(valor: number) {
  //if (!valor) return 'celda-cero';
  //if (valor < 5) return 'celda-baja';
   if (valor >0 || valor === 100) return 'celda-media';
  return '' // 'celda-alta';
}

/* TOTAL POR COLUMNA */
getTotalColumna(asig: string, cat: string) {
  return this.situaciones.reduce((acc, sit) => {
    return acc + (this.dataTransformada[sit]?.[asig]?.[cat] || 0);
  }, 0);
}



displayDetalleModal: boolean = false;

detallePersonas: any[] = [];

loadingDetalle = false;

tituloDetalle = '';

mostrarDetalle(
  situacion: string,
  asig: string,
  cat: string,
  cantidad: number
) {
 

 
  if (!cantidad || cantidad === 0) return;

  this.displayDetalleModal = true;

  this.tituloDetalle =
    `${situacion} - ${asig} - ${cat}`;

  this.loadingDetalle = true;
let payload = {
    tipo_:this.tipoBusquedaSituacion,
    cadena: ""
    
  };

if(this.tipoBusquedaSituacion===1){
   payload.cadena= `
                and ingreso_ascenso.activo=1 and actual=1 and grados.idgrados<>113 
          and fuerza.nombre="${asig}" and categoria="${cat}" and ${situacion==='Disponible'? "detalle_situacion.descripcion is null": `detalle_situacion.descripcion="${situacion}"`}
    `
}else if(this.tipoBusquedaSituacion===2){
  payload.cadena =`
    and categoria ="${cat}"  and unidad.corto="${asig}" 
  and  ${situacion==='Disponible'? "detalle_situacion.descripcion is null": `detalle_situacion.descripcion="${situacion}"`}
  `
}else if(this.tipoBusquedaSituacion===3){
  payload.cadena =`
           and n.descripcion="${asig}"   and categoria="${cat}"
  and  ${situacion==='Disponible'? "detalle_situacion.descripcion is null": `detalle_situacion.descripcion="${situacion}"`}
    
     `
   
    
}else if(this.tipoBusquedaSituacion===4){
    payload.cadena =`
    and categoria ="${cat}"  and unidad.corto="${asig}" 
  and  ${situacion==='Disponible'? "detalle_situacion.descripcion is null": `detalle_situacion.descripcion="${situacion}"`}
  `
}else{
  return
}
  
 
  
  this._ServicioBackendService
   .sacarPersonalDEtallesituacion(payload)
    .subscribe({
      next: (res: any) => {
        this.detallePersonas = res.resultado || [];

        this.loadingDetalle = false;
      },
      error: () => {

        this.loadingDetalle = false;

      }
    });

}


 

getGlobalColIndex(asigIndex: number, catIndex: number): number {

  let index = 0;

  for (let i = 0; i < asigIndex; i++) {

    const asig = this.asignaciones[i];

    if (!this.filtroAsignacion || this.filtroAsignacion === asig) {

      index += this.categoriasPorAsignacion[asig]?.length || 0;

    }

  }

  return index + catIndex;

}


hoverRowIndex: number | null = null;
hoverColIndex: number | null = null;

hoverCelda(row: number, col: number) {

  this.hoverRowIndex = row;
  this.hoverColIndex = col;

}

clearHover() {

  this.hoverRowIndex = null;
  this.hoverColIndex = null;

}

isHoverRow(row: number) {

  return this.hoverRowIndex === row;

}

isHoverCol(col: number) {

  return this.hoverColIndex === col;

}

getTotalFila(situacion: string): number {

  let total = 0;

  for (let asig of this.asignaciones) {

    if (!this.filtroAsignacion || this.filtroAsignacion === asig) {

      for (let cat of this.categoriasPorAsignacion[asig]) {

        total +=
          this.dataTransformada[situacion]?.[asig]?.[cat] || 0;

      }

    }

  }

  return total;
}

granTotal = 0;

calcularGranTotal() {

  const situaciones = this.situacionesFiltradas();

  if (!situaciones) return;

  this.granTotal = 0;

  for (let situacion of situaciones) {

    this.granTotal += this.getTotalFila(situacion);

  }

}

getTotalColumnaSituacion(asig: string, cat: string): number {

  let total = 0;

  const situaciones = this.situacionesFiltradas();

  for (let situacion of situaciones) {

    total +=
      this.dataTransformada[situacion]?.[asig]?.[cat] || 0;

  }

  return total;
}








listaPersonal: any[] = [];
verDEtalleCombatiente(detalle,combatiente,genero){
  let p  =  {
    cadena : `  and c.categoria="${detalle.categoria}" and combatiente=${combatiente} and sexo="${genero}" and f.nombre ="${this.usuarioLoguiado?.nombre}" and i.activo=1`
  }
  this.listaPersonal = []
  this._ServiciosMensajeService.show()
   this._ServicioBackendService.sacarListapersonasCadena(p).subscribe({
    next: (response: any) => {
      this._ServiciosMensajeService.hide(); 
      if (response.error)   return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.listaPersonal = response.resultado
        this.listarPersonal = true
   },
    error: () => {
      this._ServiciosMensajeService.hide();
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  });
 
}



listarPersonal=false






sacarPermisoBuscar(id){

        if(id===46) return 46  //policarpo
        if(id===3045) return 3045  //choluteca
        if(id===94) return 94  //lenca
        if(id===2967) return 2967  //Morazan
        if(id===3046) return 3046  //olancho
        if(id===138) return 138  //atlantida
        if(id===99) return 99  //Maya chortie

        if(id===2) return 119 //naval
        if(id===3) return 108 //ejercito
        if(id===4) return 109 //aereo
        if(id===6) return 3081 // PMOP

        return id
}



    treeUnidades: any[] = [];
 

  sacarTodalasUnidades() {

    
    this._ServiciosMensajeService.show();
    
  //esto es pabar que unidad padre desbloquear
   let idunidadDesbloquear = this.sacarPermisoBuscar(this.usuarioLoguiado.idfuerza) 







    this._ServicioBackendService.sacarTodalasUnidades().subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide();
        const unidades = response.resultado || [];
         let  nodo = unidades.filter((x: any) => x.id_unidad_padre == null)
            .map((x: any) =>
            this.construirJerarquiaUnidades(
              x,
              unidades
             )
            );
           this.treeUnidades = nodo.map((x: any) => this.convertirTreeNodeUnidad(x,idunidadDesbloquear));
       },error: () => {
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
  nodo: any,
  idunidadDesbloquear: number,
  desbloquear: boolean = false
): any {

  // Si este es el nodo buscado, a partir de aquí todo queda desbloqueado
  const desbloqueado = desbloquear || nodo.idunidad === idunidadDesbloquear;

  return {
    key: String(nodo.idunidad),
    label: nodo.unidad_nombre,
    data: nodo,
    unidad_tipo: nodo.unidad_tipo,
    idunidad: nodo.idunidad,

    selectable: desbloqueado,

    icon: desbloqueado
      ? 'pi pi-lock-open'
      : 'pi pi-lock',

    children: nodo.hijos.map((h: any) =>
      this.convertirTreeNodeUnidad(
        h,
        idunidadDesbloquear,
        desbloqueado
      )
    )
  };
}
}