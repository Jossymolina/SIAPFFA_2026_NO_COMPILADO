import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// PrimeNG
// PrimeNG
 
import { Card } from 'primeng/card';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { FormsModule } from '@angular/forms';
 
 interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  route?: string;
  code:string[]
}
@Component({
  selector: 'app-planillas',
  standalone:true,
   imports: [CommonModule, Card,FormsModule],
  templateUrl: './planillas.component.html',
  styleUrl: './planillas.component.css',
})
export class PlanillasComponent implements OnDestroy,OnInit {
// Módulos centrales
objetoGasto=[
  {codigo:'1',nombre:'Sueldos'},
  {codigo:'4',nombre:'Vacaciones'},
  {codigo:'2',nombre:'Decimos terceros y cuartos'},
  {codigo:'3',nombre:'Decimos cuartos'},
 
]
  modules: ModuleCard[] = [
    {
      title: 'Planillas de la Unidad',
      description: 'Aqui se ven las planillas generadas por unidad',
      icon: 'pi pi-dollar',
      route: '/menu/lista-personal-pagos-cargo',
      code :['P_0005']
    } 
   
 
  ];
    constructor(private router: Router,private _ServicioBackendService:ServicioBackendService,private _ServiciosMensajeService:ServiciosMensajeService) {

  }
  usuarioLoguiado:any
  ngOnInit(): void {
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    
  }
    sacarPermisoPersonalVista(permiso:string[]){
   return this._ServicioBackendService.verificarPermisos(permiso)
    //console.log( JSON.parse(localStorage.getItem("permisos") || "[]") as any[])
  }
  queElijio=""
    openModule(m: ModuleCard) {
  
    this.queElijio = m.code[0];
    
  }
    sumas = {
    total_sueldos: 0.00,
    ipm: 0.00,
    hm: 0.00,
    fhema: 0.00,
    isr: 0.00,
    total_otras_deduccion: 0.00,
    total_deduccion: 0.00,
    total_sueldos_neto: 0.00,
    sueldo_bruto: 0.00,
    preAviso:0.00
  }
   arregloResultado = []
  sacarplanillaporunidad(form){
  this.arregloResultado = []
  let p ={
    fecha:form?.value.fecha ,
    idobjetode_gasto:form?.value.objeto.codigo ,
    idunidad:this.usuarioLoguiado.idunidad 
  }
  this._ServiciosMensajeService.show('Buscando información...')
    this._ServicioBackendService.sacarplanillaporunidad(p).subscribe({
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

  ngOnDestroy(): void {
    this.arregloResultado = []
  }

}
