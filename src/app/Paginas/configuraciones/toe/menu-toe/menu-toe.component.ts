import { Component, Input, input, OnInit } from '@angular/core';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
ServiciosMensajeService
@Component({
  selector: 'app-menu-toe',
  standalone: true,
  imports: [FormsModule, CommonModule,MultiSelectModule,MultiSelectModule],
  templateUrl: './menu-toe.component.html',
  styleUrl: './menu-toe.component.css',
})
export class MenuToeComponent implements OnInit {
  constructor(
    private _servicioBackend: ServicioBackendService,
    private _servicioMensaje: ServiciosMensajeService
  ) {

  }
  fuerzasSeleccionadas: any[] = [];
@Input('tipoBusqueda') tipoBusqueda
usuarioLoguiado
  ngOnInit() {
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarFuerza()
  }

  data: any[] = [];
  columnas: string[] = []; // todas las keys
  groups: Array<{ name: string; cols: Array<{ key: string; label: string; kind: string }> }> = [];

  titulo = 'Tabla de Organizacion de Efectivo (TOE) de Tropa';
armarFiltroFuerza(): string {

  if (!this.fuerzasSeleccionadas?.length) {
    return '';
  }

  // Solo una fuerza
  if (this.fuerzasSeleccionadas.length === 1) {
    return ` and u.idfuerza=${this.fuerzasSeleccionadas[0].idfuerza}`;
  }

  // Varias fuerzas
  const condiciones = this.fuerzasSeleccionadas
    .map((f: any) => `u.idfuerza=${f.idfuerza}`)
    .join(' or ');

  return ` and (${condiciones})`;
}
  armarFiltroIdFuerza(): string {

  let filtro = '';

  this.fuerzasSeleccionadas.forEach((fuerza: any) => {
    filtro += ` and idfuerza=${fuerza.idfuerza}`;
  });
 

  return filtro;
}



  getToePivotPorCorto(form) {
    this._servicioMensaje.show()
    let p ={
      cadena:` and u.idfuerza=${form.value.fuerza.idfuerza} `,
      idfuerza: form.value.fuerza.idfuerza
    }
    this._servicioBackend.getToePivotPorCorto(p).subscribe({
      next: (Response) => {
        this._servicioMensaje.hide();
        this.data = Response?.data ?? [];
        
        this.buildPivotHeader();
      },
      error: (error) => {
        this._servicioMensaje.hide();
        this._servicioMensaje.mensajeMalo('Error al obtener los datos del TOE Pivot por corto');
      }
    });
  }


  getToePivotPorCortoGeneralCompleto(form) {
    this._servicioMensaje.show()
    let p ={
      cadena:this.armarFiltroFuerza(),
      idfuerza_cadena: this.armarFiltroIdFuerza()
    }
   
    
    this._servicioBackend.getToePivotPorCortoGeneralCompleto(p).subscribe({
      next: (Response) => {
        this._servicioMensaje.hide();
        
        this.data = Response?.data ?? [];
       
        
        this.buildPivotHeader();
      },
      error: (error) => {
        this._servicioMensaje.hide();
        this._servicioMensaje.mensajeMalo('Error al obtener los datos del TOE Pivot por corto');
      }
    });
  }










    getToePivotPorCortoUnidad( ) {
 
    this._servicioMensaje.show()
    let p ={
       idunidad:this.usuarioLoguiado.idunidad
    }

    this._servicioBackend.sacarToeUnidad(p).subscribe({
      next: (Response) => {
        this._servicioMensaje.hide();
        this.data = Response?.resultado ?? [];

      },
      error: (error) => {
        this._servicioMensaje.hide();
        this._servicioMensaje.mensajeMalo('Error al obtener los datos del TOE Pivot por corto');
      }
    });
  }

  buildPivotHeader() {
    if (!Array.isArray(this.data) || this.data.length === 0) {
      this.columnas = [];
      this.groups = [];
      return;
    }

    this.columnas = Object.keys(this.data[0] || {});
    const pivotCols = this.columnas.filter(k => k !== 'corto');

    // Agrupar por base: SGTO_BTN_aut -> base=SGTO_BTN ; kind=aut
    const map = new Map<string, Array<{ key: string; kind: string }>>();

    for (const k of pivotCols) {
      const m = k.match(/^(.*)_(aut|dia|disp)$/i);
      if (!m) continue;
      const base = m[1];
      const kind = m[2].toLowerCase();

      if (!map.has(base)) map.set(base, []);
      map.get(base)!.push({ key: k, kind });
    }

    // Orden de subcolumnas como en tu imagen (TOE primero, luego DIA, luego DISP si existe)
    const order = (kind: string) => kind === 'aut' ? 1 : kind === 'dia' ? 2 : 3;
    const label = (kind: string) => kind === 'aut' ? 'TOE' : kind === 'dia' ? 'DIA' : 'DISP';
/*
    this.groups = Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0])) // si tenés orden real por jerarquía lo ajustamos
      .map(([base, cols]) => ({
        name: base.replaceAll('_', ' '), // header bonito
        cols: cols
          .sort((a, b) => order(a.kind) - order(b.kind))
          .map(c => ({ key: c.key, kind: c.kind, label: label(c.kind) }))
      }));
*/
    this.groups = Array.from(map.entries())

      .filter(([base, cols]) => {

        return this.data.some(row => {

          return cols.some(c => {
            const valor = Number(row[c.key] ?? 0);
            return valor !== 0;
          });

        });

      })

      .sort((a, b) => a[0].localeCompare(b[0]))

      .map(([base, cols]) => ({
        name: base.replaceAll('_', ' '),
        cols: cols
          .sort((a, b) => order(a.kind) - order(b.kind))
          .map(c => ({
            key: c.key,
            kind: c.kind,
            label: label(c.kind)
          }))
      }));

  }

  // helper
  val(row: any, key: string) {
    const v = row?.[key];
    return (v === null || v === undefined || v === '') ? '' : v;
  }
  hoverRow: number = -1;
  hoverCol: string | null = null;

  setHover(i: number, colKey: string) {
    this.hoverRow = i;
    this.hoverCol = colKey;
  }

  clearHover() {
    this.hoverRow = -1;
    this.hoverCol = null;
  }

  rowToeTotal(row: any): number {
    let sum = 0;
    for (const g of (this.groups || [])) {
      for (const c of (g.cols || [])) {
        const key = (c.key || '').toLowerCase();

        // AJUSTA AQUÍ el patrón real de TOE:
        // ejemplo: termina en "_toe" o contiene "_toe_"

        const isToe = key.endsWith('_aut');

        if (isToe) {
          const n = +this.val(row, c.key);
          if (!Number.isNaN(n)) sum += n;
        }
      }
    }
    return sum;
  }

  rowDiasTotal(row: any): number {
    let sum = 0;
    for (const g of (this.groups || [])) {
      for (const c of (g.cols || [])) {
        if (c.kind === 'dia') {
          const n = +this.val(row, c.key);
          if (!Number.isNaN(n)) sum += n;
        }
      }
    }
    return sum;
  }

  rowDispTotal(row: any): number {
    return this.rowToeTotal(row) - this.rowDiasTotal(row);
  }


  FOOTER_ROW = -999;
  colTotal(key: string): number {
    let sum = 0;
    for (const row of (this.data || [])) {
      const n = +this.val(row, key);
      if (!Number.isNaN(n)) sum += n;
    }
    return sum;
  }

  toeTotalAll(): number {
    let sum = 0;
    for (const row of (this.data || [])) sum += this.rowToeTotal(row);
    return sum;
  }

  diasTotalAll(): number {
    let sum = 0;
    for (const row of (this.data || [])) sum += this.rowDiasTotal(row);
    return sum;
  }

  dispTotalAll(): number {
    // consistente con tu regla: DISP = TOE - DÍAS
    return this.toeTotalAll() - this.diasTotalAll();
  }
arregloFuerza =[]
  sacarFuerza(){
this.arregloFuerza =[]

    this._servicioBackend.sacarFuerza().subscribe({
      next:(response)=>{
            if(response.error) return this._servicioMensaje.mensajeMalo(response.error)
                if(response.mensaje) return this._servicioMensaje.mensajeMalo(response.mensaje)
                  this.arregloFuerza = response.resultado
      },error:()=>{
        this._servicioMensaje.hide()
        this._servicioMensaje.mensajeerrorServer()
      }
    })
  }

exportar(nombre:string){
  this._servicioBackend.exportexcel2(nombre,'TOE')
}


  sumarPropiedad(arreglo, propiedad) {
  if (!Array.isArray(arreglo)) return 0;

  return arreglo.reduce((total, item) => {
    if (item && Object.prototype.hasOwnProperty.call(item, propiedad)) {
      const valor = parseFloat(item[propiedad]);
      return total + (isNaN(valor) ? 0 : valor);
    }
    return total;
  }, 0);
}



}
