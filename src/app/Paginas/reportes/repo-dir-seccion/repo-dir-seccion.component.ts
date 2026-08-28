import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuToeComponent } from '../../configuraciones/toe/menu-toe/menu-toe.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { VisualizarPerfilComponent } from '../../../Componentes/visualizar-perfil/visualizar-perfil.component';


import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
  import { TreeSelectModule } from 'primeng/treeselect';
  type Reporte = {
  id: string;
  titulo: string;
  descripcion?: string;
  icon: string;     // PrimeIcons: 'pi pi-...'
  categoria: string;
  ruta?: string;
};
@Component({
  selector: 'app-repo-dir-seccion',
  standalone:true,
  imports:  [CommonModule, FormsModule, CardModule, InputTextModule, TooltipModule, RadioButtonModule, MenuToeComponent, VisualizarPerfilComponent, DialogModule, ButtonModule,
    TableModule,TagModule,ProgressSpinnerModule,TreeSelectModule
  ],
  templateUrl: './repo-dir-seccion.component.html',
  styleUrl: './repo-dir-seccion.component.css',
})
export class RepoDirSeccionComponent implements OnInit {
   constructor(
    public _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService
  ) { }
  usuarioLoguiado
  ngOnInit(): void {
     this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
  }
    reportes = signal<Reporte[]>([
      { id: 'r1', titulo: 'Parte', descripcion: 'Parte de la Dirección/Sección', icon: 'pi pi-wallet', categoria: 'Partes', ruta: '/reportes/planilla' },
      
  
    ]);

   categoria = signal<'Todos' | string>('Todos');
  q = signal('');
  seleccionarCategoria(cat: string) {
    this.categoria.set(cat);
    this.destruir()
  }
    VentanaSeleccionada
  destruir() {
      this.VentanaSeleccionada =null
      this.arregloResumenParteUnidad = []
        this.arregloListaParteUnidad = []
        this.bajo_control = []

  }
   categorias = computed(() => {
    const set = new Set(this.reportes().map(r => r.categoria));
    return ['Todos', ...Array.from(set)];
  });
    limpiar() {
    this.q.set('');
    this.categoria.set('Todos');

  }
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
    abrir(r: Reporte) {
    // Aquí luego lo cambias por Router navigate.
    this.destruir()
    this.VentanaSeleccionada = r
    if(r.id==="r1"){
      this.sacarParteUnidad()
    }
   


  }
    exportarExcelResumen(data) {
    this._ServicioBackendService.exportexcel2(data, "siapffaa")
  }

   arregloResumenParteUnidad: any[] = []
  arregloListaParteUnidad: any[] = []
  bajo_control: any[] = []

  sacarParteUnidad() {
    let param = {
      cadena: ``,
      cadena2:``,
      idunidad:  this.usuarioLoguiado.idunidad_direccion
    }  
    this.arregloResumenParteUnidad = []
  this.arregloListaParteUnidad = []
  this.bajo_control= []
    this._ServiciosMensajeService.show("Cargando parte de la unidad......");
    this._ServicioBackendService.parte_por_grados_direccion(param).subscribe({
      next: (response) => {
         
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.arregloResumenParteUnidad = response.resultado_resumen
        this.arregloListaParteUnidad = response.resultado_lista
        this.bajo_control = response.bajo_control




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

    verperfil = false
  personaSeleccionada = null
  seleccionarPersonal(personal) {
    this.verperfil = true
    this.personaSeleccionada = personal

  }

    limpiarVariable() {

    this.personaSeleccionada = null
  }

}
