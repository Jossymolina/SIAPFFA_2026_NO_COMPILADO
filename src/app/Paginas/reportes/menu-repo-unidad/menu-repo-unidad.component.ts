import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';

type Reporte = {
  id: string;
  titulo: string;
  descripcion?: string;
  icon: string;     // PrimeIcons: 'pi pi-...'
  categoria: string;
  ruta?: string;
};

@Component({
  selector: 'app-menu-repo-unidad',
  standalone:true,
   imports: [CommonModule, FormsModule, CardModule, InputTextModule, TooltipModule],
  templateUrl: './menu-repo-unidad.component.html',
  styleUrl: './menu-repo-unidad.component.css',
})
export class MenuRepoUnidadComponent implements OnInit {
  usuarioLoguiado
constructor(
  private _ServicioBackendService:ServicioBackendService,
  private _ServiciosMensajeService:ServiciosMensajeService
){}

ngOnInit(): void {
  this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
}
  q = signal('');

   
  categoria = signal<'Todos' | string>('Todos');
 
  reportes = signal<Reporte[]>([
    { id: 'r1', titulo: 'Parte de la Unidad', descripcion: 'Parte de toda la Unidad', icon: 'pi pi-wallet', categoria: 'Partes', ruta: '/reportes/planilla' },
    { id: 'r2', titulo: 'Parte de bajas', descripcion: 'Aqui se muestran las bajas', icon: 'pi pi-percentage', 
      categoria: 'Partes', ruta: '/reportes/isr' },
    { id: 'r3', titulo: 'Cambio de Categorias', descripcion: 'Aqui estan las personas que cambiaron de categoria',
       icon: 'pi pi-calendar', categoria: 'RRHH', ruta: '/reportes/vacaciones' },
 
 
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
  destruir(){
    this.arregloListaParteUnidad =[]
    this.arregloResumenParteUnidad =[]
    this.arregloBajas =[]
    this.arregloCambioCategoria =[]
    this.VentanaSeleccionada=null
  }
  abrir(r: Reporte) {
    // Aquí luego lo cambias por Router navigate.
    this.destruir()
    this.VentanaSeleccionada=r
    if(r.id==="r1")   this.sacarParteUnidad()
    

  }

  seleccionarCategoria(cat: string) {
    this.categoria.set(cat);
    this.destruir()
  }

  limpiar() {
    this.q.set('');
    this.categoria.set('Todos');
  
  }
  arregloResumenParteUnidad:any[]=[]
  arregloListaParteUnidad : any[]=[]
sacarParteUnidad(){
  let param ={
     cadena:` and unidad.idunidad= ${this.usuarioLoguiado.idunidad} ` 
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
exportarExcelResumen(data){
this._ServicioBackendService.exportexcel2(data,"siapffaa")
}

arregloBajas:any[]=[]

sacarBajas(form){
   let param = {
      cadena:` and unidad.idunidad=${this.usuarioLoguiado.idunidad} and  year(fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(fecha_de_baja)=month('${form.value.fecha}-1')  `
    }

  
  this.arregloBajas=[] 
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

arregloCambioCategoria:any[]=[]
sacarCambioCategoria(form){
 
    
          let param = {
       cadena:`  and unidad.idunidad =${this.usuarioLoguiado.idunidad}
        and year(fechaPrimerIngreso)=year('${form.value.fecha}-1') and month(fechaPrimerIngreso)=month('${form.value.fecha}-1')`
    }
 
  
  this.arregloCambioCategoria=[] 
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

  
}