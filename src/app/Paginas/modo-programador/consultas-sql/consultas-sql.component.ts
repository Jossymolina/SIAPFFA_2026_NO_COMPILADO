import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, signal, computed, ViewEncapsulation, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ResultadoQueryComponent } from '../resultado-query/resultado-query.component';
 import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-consultas-sql',
  standalone:true,
imports: [CommonModule,ResultadoQueryComponent,  
        DialogModule,
        ButtonModule,
    ],
  templateUrl: './consultas-sql.component.html',
  styleUrl: './consultas-sql.component.css',
})
export class ConsultasSqlComponent {
@ViewChild('ta', { static: true }) taRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('pre', { static: true }) preRef!: ElementRef<HTMLPreElement>;

  sql = signal<string>(`----`);

  private KEYWORDS = [
    'SELECT','FROM','WHERE','AND','OR','NOT','IN','IS','NULL','LIKE','BETWEEN',
    'JOIN','INNER','LEFT','RIGHT','FULL','OUTER','ON','GROUP','BY','HAVING',
    'ORDER','ASC','DESC','LIMIT','OFFSET','DISTINCT','AS',
    'UNION','ALL','WITH','EXPLAIN','SHOW','DESCRIBE','DESC'
  ];

  chars = computed(() => this.sql().length);
  lines = computed(() => (this.sql().match(/\n/g)?.length ?? 0) + 1);

  highlighted = computed<SafeHtml>(() => {
    const html = this.highlight(this.sql());
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  constructor(
    private sanitizer: DomSanitizer,
    private  _ServicioBackendService: ServicioBackendService,
    private _servicioMensaje: ServiciosMensajeService
  ) {}

  onInput(v: string) {
    this.sql.set(v);
    queueMicrotask(() => this.syncScroll());
  }

  onScroll() {
    this.syncScroll();
  }

  copiar() {
    navigator.clipboard?.writeText(this.sql());
  }
  resultadoConsulta 
  capturarTexto() {
    const texto = this.sql().trim();
 
  
    this._servicioMensaje.show('Ejecutando consulta SQL...');
    this._ServicioBackendService.ejecutarSqlSoloLectura({ sql: texto }).subscribe(
      {
        next: (data) => {
          this._servicioMensaje.hide()
        
          this.resultadoConsulta = data
          this.abrirResultado()
        },
        error: (error) => {
          this._servicioMensaje.hide()

          
        }
      }
    );
  }
  limpiar() {
    this.sql.set('');
    queueMicrotask(() => this.syncScroll());
    this.taRef.nativeElement.focus();
  }

  private syncScroll() {
    const ta = this.taRef.nativeElement;
    const pre = this.preRef.nativeElement;
    pre.scrollTop = ta.scrollTop;
    pre.scrollLeft = ta.scrollLeft;
  }

  private escapeHtml(s: string) {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  private highlight(sql: string): string {
    let out = this.escapeHtml(sql);

    if (!out.trim()) {
      return `<span style="color:#9ca3af !important;">Escribe tu SQL aquí…</span>`;
    }

    // Comentarios: -- ...
    out = out.replace(/--.*$/gm, (m) =>
      `<span style="color:#9ca3af !important;font-style:italic !important;">${m}</span>`
    );

    // Strings: '...'
    out = out.replace(/'(?:\\'|[^'])*'/g, (m) =>
      `<span style="color:#16a34a !important;">${m}</span>`
    );

    // Keywords azules
    const kw = this.KEYWORDS.join('|');
    const re = new RegExp(`\\b(${kw})\\b`, 'gi');
    out = out.replace(re, (m) =>
      `<span style="color:#2563eb !important;font-weight:700 !important;">${m.toUpperCase()}</span>`
    );

    return out;
  }

visible = false;
 
abrirResultado() {
 
  this.visible = true;
}
}