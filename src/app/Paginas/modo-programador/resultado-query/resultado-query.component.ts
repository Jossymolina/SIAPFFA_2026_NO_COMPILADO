import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import * as XLSX from 'xlsx';

export interface SqlResponse {
  ok?: boolean;
  mensaje?: string;
  resultado?: Array<Record<string, unknown>>;
  error?: string;
}

@Component({
  selector: 'app-resultado-query',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './resultado-query.component.html',
  styleUrl: './resultado-query.component.css',
})
export class ResultadoQueryComponent {
 @Input() response: SqlResponse | null = null;

  rows: Array<Record<string, unknown>> = [];
  columns: string[] = [];
  message = '';

  ngOnChanges(): void {
    this.rows = [];
    this.columns = [];
    this.message = '';

    if (!this.response) return;

    if (Array.isArray(this.response.resultado)) {
      this.rows = this.response.resultado;
      this.columns = this.buildColumns(this.rows);
      if (this.rows.length === 0) this.message = this.response.mensaje ?? 'No hay datos';
      return;
    }

    // Si no viene resultado
    this.message = this.response.mensaje
      ?? this.response.error
      ?? 'Respuesta sin datos';
  }

private buildColumns(rows: Array<Record<string, unknown>>): string[] {
  const cols: string[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    for (const k of Object.keys(row)) { // respeta el orden del objeto
      if (!seen.has(k)) {
        seen.add(k);
        cols.push(k);
      }
    }
  }

  return cols;
}

  formatCell(v: unknown): string {
    if (v === null || v === undefined) return '';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  }

  exportarExcel(): void {
    if (!this.rows.length) return;

    const flat = this.rows.map(r => {
      const obj: Record<string, unknown> = {};
      for (const c of this.columns) obj[c] = (r[c] ?? '');
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(flat, { header: this.columns });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resultado');

    XLSX.writeFile(wb, `resultado_sql_${this.stamp()}.xlsx`);
  }

  exportarCSV(): void {
    if (!this.rows.length) return;

    const flat = this.rows.map(r => {
      const obj: Record<string, unknown> = {};
      for (const c of this.columns) obj[c] = (r[c] ?? '');
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(flat, { header: this.columns });
    const csv = XLSX.utils.sheet_to_csv(ws);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `resultado_sql_${this.stamp()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  private stamp(): string {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  }
}
