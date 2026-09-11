import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
 

 
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-tb-historial-sueldos',
  standalone:true,
  imports: [   CommonModule,
    FormsModule,

    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TagModule],
  templateUrl: './tb-historial-sueldos.component.html',
  styleUrl: './tb-historial-sueldos.component.css',
})
export class TbHistorialSueldosComponent implements OnInit {
  @Input("identidad") identidad;
  @Input("personaBuscada") personaBuscada;

  constructor(
        private _DatospersonalesService:ServicioBackendService,
        private _ServiciosMensajesService:ServiciosMensajeService

  ){

  }
 
  ngOnInit(): void {
      const anioActual = new Date().getFullYear();

  for (let anio = anioActual - 5; anio <= anioActual + 1; anio++) {
    this.anios.push(anio);
  }
  this.sacarPermisoTransferencia()
  }
  sacarHistoricoSueldo() {
    this._ServiciosMensajesService.show()
    let p = {
      identidad: this.identidad,
      fecha: `${this.anioSeleccionado}-01-01`
    }
    this.historicoSueldo = []
    this._DatospersonalesService.sacarHistoricoSueldoPersona(p).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide()
        if (!response.ok) return this._ServiciosMensajesService.mensajeMalo(response.error)
      
    
        this.historicoSueldo = response.resultado;

     
      }, error: (error) => {
        this._ServiciosMensajesService.hide()

      }
    })
  }


historicoSueldo: any[] = [];
 
filtroGlobal: string = '';

limpiarBusqueda(): void {
  this.filtroGlobal = '';
}


mostrarDetallePago: boolean = false;

detallePago: any[] = [];

totalDeducciones: number = 0;

 
sueldoBruto: number = 0;
sueldoNeto: number = 0;
mostrarDetalle(arreglo: any[]): void {

  this.detallePago = arreglo;

  // Sueldo bruto
  this.sueldoBruto = Number(this.planillaSeleccionado.sueldo_base|| 0);

  // Total de todas las deducciones
  this.totalDeducciones = arreglo.reduce(
    (total, item) => total + Number(item.monto || 0),
    0
  );

  // Sueldo neto
  this.sueldoNeto = this.sueldoBruto - this.totalDeducciones;

  this.mostrarDetallePago = true;
}
planillaSeleccionado = null
sacarDetallePago(data){
  this._ServiciosMensajesService.show()
    let p = {
      iddetalle_planilla: data.iddetalle_planilla
    }
this.planillaSeleccionado = data
    
    this._DatospersonalesService.sacarDetallePago(p).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide()
         this.mostrarDetalle(response.data);
    
      }, error: (error) => {
        this._ServiciosMensajesService.hide()

      }
    })
}

token_valido = false
validarToken(form:NgForm){
  let p ={
    identidadusuario:this.identidad,
    codigo:form.value.token
  }

  this.token_valido = false
 this._ServiciosMensajesService.show("Verificando código 2FA......");
     this._DatospersonalesService.calidartoken2fa(p).subscribe({
      next:(response)=>{
       this._ServiciosMensajesService.hide()
        if(!response.ok){
                   this.token_valido =  response.ok

        return this._ServiciosMensajesService.mensajeMalo(response.mensaje);
        } else{
        this.token_valido =  response.ok
         this.sacarHistoricoSueldo()
        }
      

 
      },error:(error)=>{
        this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })  
}

anioSeleccionado: number = new Date().getFullYear();

anios: number[] = [];
mostrarAyudaToken: boolean = false;
permisoVerSueldos = false
  sacarPermisoTransferencia() {
  
   
 this.permisoVerSueldos = this._DatospersonalesService.verificarPermisos(['P_0007'])

 if (!this.permisoVerSueldos) {
   if(this.personaBuscada.grado_pertenece_a===1){
            this.permisoVerSueldos = this._DatospersonalesService.verificarPermisos(['P_0008'])
    }else if(this.personaBuscada.grado_pertenece_a===2){
            this.permisoVerSueldos = this._DatospersonalesService.verificarPermisos(['P_0009'])
      }else if(this.personaBuscada.grado_pertenece_a===3){
            this.permisoVerSueldos = this._DatospersonalesService.verificarPermisos(['P_0010'])
      }else if(this.personaBuscada.grado_pertenece_a===0){
            this.permisoVerSueldos = this._DatospersonalesService.verificarPermisos(['p_0011'])
      } 
        if(this.permisoVerSueldos){
          this.token_valido = true
            this.sacarHistoricoSueldo()
        }
 }else{
  this.token_valido = true
            this.sacarHistoricoSueldo()
 }

  }
 
}
