import { Component, computed, OnInit, signal } from '@angular/core';
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

type Reporte = {
  id: string;
  titulo: string;
  descripcion?: string;
  icon: string;     // PrimeIcons: 'pi pi-...'
  categoria: string;
  ruta?: string;
};
@Component({
  selector: 'app-menu-repo-emc',
  standalone: true,
    imports: [CommonModule, FormsModule, CardModule, InputTextModule, TooltipModule],
  templateUrl: './menu-repo-emc.component.html',
  styleUrl: './menu-repo-emc.component.css',
})
export class MenuRepoEmcComponent {
 usuarioLoguiado
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
  constructor(
    public _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService,
     private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarFuerza()
  }
  q = signal('');


  categoria = signal<'Todos' | string>('Todos');

  reportes = signal<Reporte[]>([
    { id: 'r1', titulo: 'Parte por Unidad', descripcion: 'Parte de toda la Unidad', icon: 'pi pi-wallet', categoria: 'Partes', ruta: '/reportes/planilla' },
     { id: 'r4', titulo: 'Parte por Fuerza', descripcion: 'Parte de fuerza y categoria', icon: 'pi-microchip', categoria: 'Partes', ruta: '/reportes/planilla' },
    {
      id: 'r2', titulo: 'Parte de bajas por unidad', descripcion: 'Aqui se muestran las bajas', icon: 'pi pi-percentage',
      categoria: 'Partes', ruta: '/reportes/isr'
    },
      {
      id: 'r5', titulo: 'Parte de bajas por fuerza', descripcion: 'Aqui se muestran las bajas por fuerza', icon: 'pi pi-prime',
      categoria: 'Partes', ruta: '/reportes/isr'
    },
    {
      id: 'r3', titulo: 'Cambio de Categorias', descripcion: 'Aqui estan las personas que cambiaron de categoria',
      icon: 'pi pi-calendar', categoria: 'RRHH', ruta: '/reportes/vacaciones'
    }
   ,
      {
      id: 'r6', titulo: 'Buscar personal para Ascender', descripcion: 'Aqui estan las personas que pueden ascender segun su antiguedad',
      icon: 'pi pi-chart-line', categoria: 'RRHH', ruta: '/reportes/vacaciones'
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
      console.log(form.value.categoria.id)
      let cade=""
     
      if(form.value.categoria.id===1 || form.value.categoria.id===2 ){
           cade= ` and ingreso_ascenso.idfuerza= ${form.value.fuerza.idfuerza} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }else{
          cade= ` and unidad.idfuerza= ${form.value.fuerza.idfuerza} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }
      console.log(cade)
   
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
          cade= ` and ingreso_ascenso.idfuerza=${form.value.fuerza.idfuerza} and  year(fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(fecha_de_baja)=month('${form.value.fecha}-1')  `
      }  else{
         cade= ` and unidad.idfuerza=${form.value.fuerza.idfuerza} and  year(fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(fecha_de_baja)=month('${form.value.fecha}-1')   and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
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
    
          cade= ` and unidad.idunidad=${form.value.unidad.idunidad} and  year(fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(fecha_de_baja)=month('${form.value.fecha}-1')  `
    
 
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
 }
 arregloListaAscenso:any[]=[]
 sacarPersonalAscenso(form:NgForm){
   console.log(form.value)
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
      console.log(response)
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
 }


  async exportexcel2(_idTabla?: string) {
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
      console.error('Error descargando imagen', e);
      return null;
    }
  }
  

}