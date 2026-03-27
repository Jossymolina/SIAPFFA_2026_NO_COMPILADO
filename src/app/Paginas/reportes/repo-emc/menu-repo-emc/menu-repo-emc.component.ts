import { Component, computed, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { HttpClient } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuToeComponent } from '../../../configuraciones/toe/menu-toe/menu-toe.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { VisualizarPerfilComponent } from '../../../../Componentes/visualizar-perfil/visualizar-perfil.component';
import { from } from 'rxjs';
 


import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

type Opcion = 'fuerza' | 'unidad' | 'seccion' ;
type Reporte = {
  id: string;
  titulo: string;
  descripcion?: string;
  icon: string;     // PrimeIcons: 'pi pi-...'
  categoria: string;
  ruta?: string;
  permiso?: string[];
  peso_orden:number; // Array de permisos necesarios para ver el reporte
};
@Component({
  selector: 'app-menu-repo-emc',
  standalone: true,
    imports: [CommonModule, FormsModule, CardModule, InputTextModule, 
      TooltipModule, RadioButtonModule,MenuToeComponent,
      ButtonModule,DialogModule,VisualizarPerfilComponent,
    TableModule,TagModule,ProgressSpinnerModule],
  templateUrl: './menu-repo-emc.component.html',
  styleUrl: './menu-repo-emc.component.css',
})
export class MenuRepoEmcComponent implements OnInit,OnDestroy {
 usuarioLoguiado
 /**El nivel id es la categoria */
 arregloCategorias =[
  {nombre:"Oficiales",nivel:[11,12,13,14,15,16,17,18,19],id:1},
  {nombre:"Sub Oficiales",nivel:[6,8,10],id:2},
  {nombre:"Tropa",nivel:[2] ,id:3},
  {nombre:"Cadetes",nivel:[4] ,id:4},
   {nombre:"Estudiante",nivel:[3] ,id:5},
  {nombre:"Auxiliares",nivel:[1] ,id:6},  
  {nombre:"Pensionado",nivel:[22] ,id:7},
  {nombre:"Catedratico",nivel:[20] ,id:8},
  {nombre:"Todos",nivel:[11,12,13,14,15,16,17,18,19,6,8,10,2,4,3,1,22,20] ,id:9}

  
 ]

 /**Id nivel es nivel */
 arregloParaPromociones =[
  {nombre:"Oficiales de las Armas",nivel:"6",id:1},
  {nombre:"Oficiales Auxilar",nivel:"5",id:2},
  {nombre:"Sub Oficiales",nivel:"4",id:3},
  {nombre:"Auxiliares",nivel:"0",id:3},

  {nombre:"Todos",nivel:"6,4,5,0",id:3},


 ]





  constructor(
    public _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService,
     private http: HttpClient
  ) { }
 
  ngOnInit(): void {
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarFuerza()
    this.sacarPrmoionesAgrupadas()
  }
  q = signal('');

  opcion: Opcion = 'fuerza';
@ViewChild('formbuscar') formbuscar!: NgForm;
  opciones = [
    { label: 'Por fuerza', value: 'fuerza' as const },
    { label: 'Por unidad', value: 'unidad' as const },
    { label: 'Por Direccion/Seccion', value: 'seccion' as const },
 
  ];
  categoria = signal<'Todos' | string>('Partes');

  reportes = signal<Reporte[]>([
    { id: 'r1', titulo: 'Parte por Unidad', descripcion: 'Parte de toda la Unidad', 
      icon: 'pi pi-wallet', categoria: 'Partes', ruta: '/reportes/planilla',permiso:[] 
    ,peso_orden:18 },
    { id: 'r4', titulo: 'Parte por Combatiente,Fuerza,Categoria', descripcion: 'Parte de fuerza y categoria', icon: 'pi-microchip', 
      categoria: 'Partes', ruta: '/reportes/planilla',permiso:[]  ,peso_orden:17},
    {
      id: 'r2', titulo: 'Parte de bajas por unidad', descripcion: 'Aqui se muestran las bajas', icon: 'pi pi-percentage',
      categoria: 'Listados', ruta: '/reportes/isr',permiso:[] ,peso_orden:16
    },
      {
      id: 'r5', titulo: 'Parte de bajas por fuerza,categoria', descripcion: 'Aqui se muestran las bajas por fuerza', icon: 'pi pi-prime',
      categoria: 'Listados', ruta: '/reportes/isr',permiso:[] ,peso_orden:15
    },
    {
      id: 'r3', titulo: 'Cambio de Categorias x mes', descripcion: 'Aqui estan las personas que cambiaron de categoria',
      icon: 'pi pi-calendar', categoria: 'Listados', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:14
    }
   ,
      {
      id: 'r6', titulo: 'Buscar personal para Ascender', descripcion: 'Aqui estan las personas que pueden ascender segun su antiguedad',
      icon: 'pi pi-chart-line', categoria: 'Listados', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:13
    },
     
      {
      id: 'r7', titulo: 'Parte por Fuerza,Categoria y Unidad', descripcion: 'Aqui se busca el parte por unidad y categoria',
      icon: 'pi pi-building-columns', categoria: 'Partes', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:12
    },
    
      {
      id: 'r8', titulo: 'Consulta pago Vacaciones', descripcion: 'Aqui  el personal que se le paga vacaciones en un mes determinado',
      icon: 'pi pi-dollar', categoria: 'Listados', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:11
    }
     ,
      {
      id: 'r9', titulo: 'Organizacion', descripcion: 'Consulta la organizacion completa de las fuerzas',
      icon: 'pi pi-clipboard', categoria: 'Organizacion', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:3
    }
     ,
      {
      id: 'r10', titulo: 'Personal 65 Años', descripcion: 'Personal de 65 años o mas',
      icon: 'pi pi-gift', categoria: 'Listados', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:9
    }
 ,
      {
      id: 'r11', titulo: 'Personal Primer Ingreso', descripcion: 'Se muestra el personal que tuvo su primer ingreso en un mes determinado',
      icon: 'pi pi-twitter', categoria: 'Listados', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:8
    }
    ,
      {
      id: 'r12', titulo: 'Antiguedad en el Grado', descripcion: 'Se muestra el personal con antiguedad en el grado',
      icon: 'pi pi-check', categoria: 'Listados', ruta: '/reportes/vacaciones',permiso:[] ,peso_orden:7
    },
     
      {
      id: 'r13', titulo: 'Lista de Personal de sin cargo', descripcion: 'Se muestra el personal que esta sin cargo asignado',
      icon: 'pi pi-bars', categoria: 'Listados', ruta: '/reportes/vacaciones',permiso:[],peso_orden:6
    },
    {
      id: 'r14', titulo: 'TOE', descripcion: 'Se muestra el personal con TOE',
      icon: 'pi pi-asterisk', categoria: 'TOE', ruta: '/reportes/toe',permiso:['Re_0005'] ,peso_orden:5
    },
    {
      id: 'r15', titulo: 'Cambio de categoria que pasaron a Oficiales y Suboficiales', descripcion: 'Personal que cambio a oficiales y suboficiales',
      icon: 'pi pi-discord', categoria: 'Listados', ruta: '/reportes/cambio-categoria',permiso:[] ,peso_orden:4
    },
    {
      id: 'r16', titulo: 'Reporte por Promocion', descripcion: 'Reporte de personal por promociones',
      icon: 'pi pi-bell', categoria: 'Organizacion', ruta: '/reportes/promociones',permiso:[] ,peso_orden:10
    },{
      id: 'r17', titulo: 'Parte General FFAA', descripcion: 'Parte general de las FFAA',
      icon: 'pi pi-address-book', categoria: 'Partes', ruta: '/reportes/promociones',permiso:[] ,peso_orden:1
    },{
      id: 'r18', titulo: 'Parte por situacion', descripcion: 'Parte segun la situacion del personal',
      icon: 'pi pi-crown', categoria: 'Partes', ruta: '/reportes/promociones',permiso:[] ,peso_orden:2
    }
  ]);


  categorias = computed(() => {
    const set = new Set(this.reportes().map(r => r.categoria));
    return ['Todos', ...Array.from(set)];
  });

/*
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
  });*/

  filtrados = computed(() => {

  const texto = this.q().trim().toLowerCase();
  const cat = this.categoria();

  return this.reportes()
    .filter(r => {

      const titulo = (r.titulo ?? '').toLowerCase();
      const descripcion = (r.descripcion ?? '').toLowerCase();
      const categoria = (r.categoria ?? '').toLowerCase();

      const matchCat =
        cat === 'Todos' || categoria === cat.toLowerCase();

      if (!texto) return matchCat;

      return (
        matchCat &&
        (
          titulo.includes(texto) ||
          descripcion.includes(texto) ||
          categoria.includes(texto)
        )
      );

    })
    .sort((a, b) => 
      (a.peso_orden ?? 0) - (b.peso_orden ?? 0)
    );

});

  VentanaSeleccionada
  destruir() {
    this.arregloListaParteUnidad = []
    this.arregloResumenParteUnidad = []
    this.arregloBajas = []
    this.arregloCambioCategoria = []
    this.VentanaSeleccionada = null
    this.arregloResultado = []
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
     cadena:` and unidad.idunidad= ${form.value.unidad.idunidad} `  
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
    sacarParteFuerza(form:NgForm) {
      let cade=""
     
      if(form.value.categoria.id===1 || form.value.categoria.id===2 ){
           cade= ` and ingreso_ascenso.idfuerza= ${form.value.fuerza.idfuerza} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }else{
          cade= ` and unidad.idfuerza= ${form.value.fuerza.idfuerza} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }

      cade += ` and  personal.combatiente  in (${form.value.combatiente.join(',')})   `
   
      
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]
    let param = {
     cadena:cade 
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

  arregloToe=[]
    sacarParteFuerzaYUnidad(form:NgForm) {
      let cade=""
     
      if(form.value.categoria.id===1 || form.value.categoria.id===2 ){
           cade= ` and ingreso_ascenso.idfuerza= ${form.value.fuerza.idfuerza} and unidad.idunidad=${form.value.unidad.idunidad} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }else{
          cade= ` and unidad.idfuerza= ${form.value.fuerza.idfuerza}  and unidad.idunidad=${form.value.unidad.idunidad} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }
   
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]
  this.arregloToe=[]

    let param = {
     cadena:cade,
     form:form.value
    }
    this._ServiciosMensajeService.show("Cargando parte de la unidad......");
    this._ServicioBackendService.sacarParteMenuInicio(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.arregloResumenParteUnidad = response.resultado_resumen
        this.arregloListaParteUnidad = response.resultado_lista
  this.arregloToe = response.toe_resultado


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
        let cade=""
      if(form.value.categoria.id===1 || form.value.categoria.id===2){
          cade= ` and ingreso_ascenso.idfuerza=${form.value.fuerza.idfuerza} and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')  and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }  else{
         cade= ` and unidad.idfuerza=${form.value.fuerza.idfuerza} and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')   and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }
 
    let param = {
   
      cadena:cade
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

  sacarBajasPorUnidad(form) {
        let cade=""
    
          cade= ` and unidad.idunidad=${form.value.unidad.idunidad} and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')  `
    
 
    let param = {
   
      cadena:cade
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
       cadena:`  
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
  ArregloUnidades = []
  sacarunidades(form:NgForm) {

    let parametro = {
      cadena: ` and  idfuerza = ${form.value.fuerza.idfuerza} `,
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
arregloFuerzas =[]

  sacarFuerza() {
    this.arregloFuerzas = [];

    this._ServicioBackendService.sacarFuerza().subscribe((Response) => {
      this.arregloFuerzas = Response.resultado;
    
    });
  }
  objetoAScensos=[
    {nombre:"Sub Tenientes/Alferes de Fragata",idgrado:1,ano:4},
    {nombre:"Tenientes/Teniente de Fragata",idgrado:3,ano:5},
    {nombre:"Capitan/Teniente de Navio",idgrado:5,ano:6},
    {nombre:"Mayor/Capitan de Corbeta",idgrado:7,ano:5},
    {nombre:"Teniente Coronel/Capitan de Fragata",idgrado:29,ano:5},

    {nombre:"Comando I",idgrado:18,ano:4},
    {nombre:"Comando II",idgrado:20,ano:5},
    {nombre:"Comando III",idgrado:22,ano:6},
    {nombre:"Jefe Primero",idgrado:24,ano:5},
    {nombre:"Jefe Mestro",idgrado:26,ano:5}
  ]

 limpiar2(fomr:NgForm){
  fomr.resetForm();
  this.arregloListaParteUnidad = []
  this.arregloResumenParteUnidad =[]
  this.arregloResultado = []
 }
 arregloListaAscenso:any[]=[]
 sacarPersonalAscenso(form:NgForm){
 this.arregloListaAscenso=[]

   this._ServiciosMensajeService.show("Buscando personal para ascender.....");
   let parametro={
     codigoGrado: form.value.grado.idgrado,
         antiguedad :form.value.grado.ano,
   }
   this._ServicioBackendService.sacarPersonalAscenso(parametro).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloListaAscenso = response.resultado[0];
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
 }


  async exportarExcelConfoto(_idTabla?: string) {
    this._ServiciosMensajeService.show()
     const workbook = new ExcelJS.Workbook();
     const sheet = workbook.addWorksheet('Resultados');
 
     sheet.columns = [
       
       { header: 'Identidad', key: 'Identidad', width: 20 },
       { header: 'Grado', key: 'Grado', width: 15 },
         { header: 'Categoría', key: 'Categoria', width: 18 },
       { header: 'Nombres', key: 'Nombre', width: 22 },

       { header: 'Fuerza', key: 'Fuerza', width: 22 },
       { header: 'Fecha Ultimo Ascenso', key: 'Fecha_Ascenso', width: 22 },
       { header: 'Fecha Ingreso', key: 'Fecha_Ingreso', width: 22 },
       { header: 'Antiguedad', key: 'Antiguedad', width: 22 }



 
     ];
 
     // Insertamos columna Foto como primera
     sheet.spliceColumns(1, 0, { header: 'Foto', key: 'Foto' } as any);
     sheet.getColumn(1).width = 14;
 
     sheet.getRow(1).font = { bold: true };
     sheet.getRow(1).alignment = {
       vertical: 'middle',
       horizontal: 'center',
     };
     sheet.getRow(1).height = 22;
 
     const datos = this.arregloListaAscenso || [];
 
     let excelRowIndex = 2;
 
     for (const i of datos) {
       const row = sheet.getRow(excelRowIndex);
 
 
       row.getCell('B').value = i.Identidad;
       row.getCell('C').value = i.Grado;
  
       row.getCell('D').value = i.Categoria;
       row.getCell('E').value = i.Nombre;

       row.getCell('F').value = i.Fuerza;
       row.getCell('G').value = i.Fecha_Ascenso;
       row.getCell('H').value = i.Fecha_Ingreso;
       row.getCell('I').value = i.Antiguedad;

 
 
       row.height = 52;
 
       if (i.Foto) {
         const urlFoto =
           this._ServicioBackendService.url2 + 'sacarfoto/' + i.Foto;
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
     saveAs(blob, 'resultados_consulta_combinada.xlsx');
     this._ServiciosMensajeService.hide()
   }
     private async descargarImagenComoArrayBuffer(
    url: string
  ): Promise<ArrayBuffer | null> {
    try {
      return (await this.http.get(url, {
        responseType: 'arraybuffer',
      }).toPromise()) as ArrayBuffer;
    } catch (e) {
      return null;
    }
  }

  arregloListaVacacioens =[]
  puscarPersonalVacacioensFuerza(form){
     let p ={
    cadena:``
   }
   if(form.value.categoria.id ===1 || form.value.categoria.id ===2){
           p.cadena =` and ia.idfuerza=${form.value.fuerza.idfuerza}     
                and month(ia.fecha_planilla)=month('${form.value.fecha}-1')  and  c.idcategoria in (${form.value.categoria.nivel.join(',')}) `
   }else{
       p.cadena =` and u.idfuerza=${form.value.fuerza.idfuerza}     
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
  
 puscarPersonalVacacioensUnidad(form){
   let p ={
    cadena:` and u.idunidad=${form.value.unidad.idunidad}     
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
let q={cadena:``}
   if(objeto === "fuerza") q.cadena=` and unidad.idfuerza=${form.value.fuerza.idfuerza}  and nivel in (${form.value.categoria.nivel }) `
   if(objeto === "unidad") q.cadena=` and unidad.idunidad=${form.value.unidad.idunidad}`
   if(objeto === "seccion") q.cadena= ` and Nombramiento.idunidad=${form.value.unidad.idunidad}  and Nombramiento.idNombramiento=${form.value.seccion.idNombramiento} `



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
this.arregloResultado = []

}
buscar65Anos(data,objeto){
let cadena = ""
 if(objeto==="fuerza") cadena=` and unidad.idfuerza=${data.value.fuerza.idfuerza} and month(fecha_nacimiento)=month('${data.value.fecha}-1')  `
 
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
 
listaPrimerIngreso(form,objeto){
  let cadena = ""
  if(objeto==="fuerza") cadena=` and unidad.idfuerza=${form.value.fuerza.idfuerza} and month(fecha)=month('${form.value.fecha}-1') and year(fecha)=year('${form.value.fecha}-1') `
  if(objeto==="unidad") cadena=` and unidad.idunidad=${form.value.unidad.idunidad} and month(fecha)=month('${form.value.fecha}-1') and year(fecha)=year('${form.value.fecha}-1') `
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
  if(objeto==="fuerza") cadena=`    and ((YEAR(curdate())-YEAR(fechaPrimerIngreso)))>= ${form.value.anos} `
 
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

lisataPersonalSinCargo(){
  
  this._ServiciosMensajeService.show("Buscando personal sin cargo.....");
  this.arregloResultado = []
    this._ServicioBackendService.sacarPersonalSinCargo().subscribe({
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
arregloAscensos: any[] = [];
buscarEmc(form){
 
  let  p ={
    fecha:form.value.fecha
  }
  this.arregloAscensos = []
    this._ServiciosMensajeService.show("Buscando personal EMC.....");
  this.arregloResultado = []
    this._ServicioBackendService.sacarCambiosCategoriaGeneral(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
     
          this.arregloAscensos = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
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
verperfil =false
personaSeleccionada = null
seleccionarPersonal(personal){
  this.verperfil = true
this.personaSeleccionada = personal

  }
  limpiarVariable(){
    
    this.personaSeleccionada = null
  }



   async exportexcel2(_idTabla?: string) {
       //let preguntas = await this._ServiciosMensajesService.mensajePregunta("¿Desea exportar con las fotos?")
      // if (!preguntas) return this.exportarSinfoto(_idTabla);
   
       this._ServiciosMensajeService.show()
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
   
       const datos = this.arregloOrganizacionCompleta || [];
   
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
           const urlFoto =  this._ServicioBackendService.url2 + 'sacarfoto/' + i.foto;
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
       this._ServiciosMensajeService.hide()
       saveAs(blob, 'resultados_consulta_combinada.xlsx');
   
     }
async exportexcelOrganizacion() {

  let r = await this._ServiciosMensajeService.mensajePregunta("¿Desea exportar con las fotos?")
  if(!r) return this.exportarExcelResumen('tablaList')

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
      const buffer = await this.descargarImagenComoArrayBuffer(urlFoto);

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
arregloPromocionesAgrupadas = []
sacarPrmoionesAgrupadas(){
this.arregloPromocionesAgrupadas = []

   this._ServiciosMensajeService.show("Cargando promociones agrupadas.....");
   this._ServicioBackendService.sacarPrmoionesAgrupadas().subscribe({
    next:(response)=>{
      this._ServiciosMensajeService.hide()
      if(response.error) return this._ServiciosMensajeService.mensajeMalo(response.error)
      if(response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje)

this.arregloPromocionesAgrupadas =  response.resultado

    },error:()=>{
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
   })


}

arregloBusquedaPromociones= []
buscarPromocionesAgrupadas(form:NgForm){
 
   let cadena = ` and idpromociones in (${form.value.promocion.ids}) and nivel=${form.value.categoria.nivel} `
 
this.arregloBusquedaPromociones = []

   this._ServiciosMensajeService.show("Cargando...");
   this._ServicioBackendService.sacarPersonalPromocion({cadena:cadena}).subscribe({
    next:(response)=>{
     
      this._ServiciosMensajeService.hide()
      if(response.error) return this._ServiciosMensajeService.mensajeMalo(response.error)
      if(response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje)
      form.reset()
this.arregloBusquedaPromociones =  response.resultado

    },error:()=>{
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
   })


}

 ngOnDestroy(): void {
   this.arregloBusquedaPromociones  = []
 }
      

  async exportarExcelConfotoPromociones(_idTabla?: string) {

    let r = await this._ServiciosMensajeService.mensajePregunta("¿Desea exportar con las fotos?")
    if (!r) return this.exportarExcelResumen('tablaPromociones');
    
    this._ServiciosMensajeService.show()
     const workbook = new ExcelJS.Workbook();
     const sheet = workbook.addWorksheet('Resultados');
 
     sheet.columns = [
       
       { header: 'Identidad', key: 'identidad', width: 20 },
       { header: 'Grado', key: 'grado', width: 15 },
       { header: 'Nombres', key: 'nombres', width: 22 },

       { header: 'Fecha Ingreso', key: 'fecha_ingreso', width: 22 },
       { header: 'Fecha Ultimo Ascenso', key: 'fecha_ultimo_ascenso', width: 22 },
       { header: 'Promoción', key: 'promocion', width: 22 },
       { header: 'Nota Final', key: 'nota_final', width: 22 }

 
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
 
     const datos = this.arregloBusquedaPromociones || [];
 
     let excelRowIndex = 2;
 
     for (const i of datos) {
       const row = sheet.getRow(excelRowIndex);
 
 
       row.getCell('B').value = i.identidad;
       row.getCell('C').value = i.grado;
  
    
       row.getCell('D').value = i.nombres;
 
       
       row.getCell('E').value = i.fecha_ingreso;

       row.getCell('F').value = i.fecha_ultimo_ascenso;
      row.getCell('G').value = i.promocion;
      row.getCell('H').value = i.nota_final;


 
 
       row.height = 52;
 
       if (i.foto) {
         const urlFoto =
           this._ServicioBackendService.url2 + 'sacarfoto/' + i.foto;
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
     saveAs(blob, 'resultados_consulta_combinada.xlsx');
     this._ServiciosMensajeService.hide()
   }
    arregloParteGeneralFFAA = []
    
sacarParteGeneralFFAA() {
  this._ServiciosMensajeService.show("Cargando parte general de las FFAA.....");
  this.arregloParteGeneralFFAA = [];
let p ={
  cadena:""
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
  tipo_consulta:tipo_consulta
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
      
    
      
    
    
}
  
 
  
  console.log(payload)
  this._ServicioBackendService
   .sacarPersonalDEtallesituacion(payload)
    .subscribe({
      next: (res: any) => {
console.log(res)
        this.detallePersonas = res.resultado || [];

        this.loadingDetalle = false;
        console.log(res)
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






}