import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { DialogModule } from 'primeng/dialog';


ActivatedRoute
@Component({
  selector: 'app-cambio-categoria',
  standalone:true,
  imports: [CommonModule,
FormsModule,DialogModule],
  templateUrl: './cambio-categoria.component.html',
  styleUrl: './cambio-categoria.component.css',
})
export class CambioCategoriaComponent {
 bandera=0;
  usuariologuiado;
  cambiarcategoria={
    identidad:"null",
    categoria:-1,
    fecha_Ingreso:"null",
    activo:1,
    idunidad:0,
    idfuerza:0,
    numeroAcuerdo:"",
    grado:"null",
    banderaPrimerIgreso:0,
    fechaAscenso:"null",
    ejecutado_por:"null",
    unidadEjecutoraSelecionada:null

  };
  Arreglocategoria = new Array();
  consulta = {
    identidad: ""
  }
  objetoConsultado ;
  arreglounidadEjecutora=[];
  
  constructor(
    private _Activatedroute: ActivatedRoute,
    public _DatospersonalesService: ServicioBackendService,
    private _ServicioMensajeService: ServiciosMensajeService

  ) { }

  ngOnInit(): void {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarUnidadEjecutora()
    
  }
  sacarUnidadEjecutora(){
    this._DatospersonalesService.sacarUnidadEjecutora().subscribe({
      next:(response)=>{
          this.arreglounidadEjecutora = response.resultado
      },error:()=>{

      }
    })
  }
buscarPorIdentidad(){
  this._ServicioMensajeService.show()
  this._DatospersonalesService.consultaPorIdentidad(this.consulta).subscribe(
   {
    next:(Response)=>{
 
      console.log(Response)
      this._ServicioMensajeService.hide()
      if (Response.error) return  this._DatospersonalesService.mensajeError(Response.error.sqlMessage + "BUSC")
      if (Response.mensaje) return      this._DatospersonalesService.mensajeError(Response.mensaje)
     
          this.objetoConsultado = Response.resultado[0];
         this.sacarcategorias(this.objetoConsultado.categoria_idcategoria)        
          this.bandera=1
          
        
    

   
    },error:()=>{
      this._ServicioMensajeService.hide()
      this._ServicioMensajeService.mensajeMalo("ERROR DE CONECCION AL BUSCAR POR IDENTIDAD");
    }
   }
  )
  
}
sacarcategorias(data){
  if (data===2) {
    var parametro={
      nivel:0
    }  
  } else {
    if (data===3) {
      var parametro={
        nivel:4
      }  
    }else{
      if (data===4) {
        var parametro={
          nivel:6
        }  
      }
    }
  } 
 
  this._DatospersonalesService.sacarcategoriaporNivel(parametro).subscribe(
    Response=>{
      this.Arreglocategoria= Response.resultado
    },error=>{
        this._DatospersonalesService.mensajeError("ERROR AL CARGAR LAS CATEGORIAS");
    }
  )
}
cambio(data){
      
     if(this.cambiarcategoria.categoria===1 ){
       this.cambiarcategoria.grado="17";
       
     }else{
    
       if (this.cambiarcategoria.categoria>=14) {
        
        this.cambiarcategoria.grado="1";
       }else{
         if (this.cambiarcategoria.categoria===6||this.cambiarcategoria.categoria===10||this.cambiarcategoria.categoria===8) {
          this.cambiarcategoria.grado="18";
         } else {
            alert("CAMBIO NO SOPORTADO ")
            
         }
       }
       
     }
  
   
    this.cambiarcategoria.idfuerza=data.idfuerza;
    this.cambiarcategoria.idunidad=data.idunidad;
    this.cambiarcategoria.identidad=data.identidad;
    this.cambiarcategoria.fecha_Ingreso = data.fecha.split("T")[0] 
   
    


  
}
guardarcategoriaNueva(){
  
  var objeto=this.quitarAlgodelTexto(this.cambiarcategoria.numeroAcuerdo," ",""); 
  this.cambiarcategoria.numeroAcuerdo = objeto
  this.cambiarcategoria.ejecutado_por = this.usuariologuiado.identidad
  
  this._DatospersonalesService.guardarcambiodeCategoria(this.cambiarcategoria).subscribe(
    Response=>{
      if (Response.mensaje) {
        this._DatospersonalesService.mensajeError(Response.mensaje)
      } else {
        this._DatospersonalesService.mensajeBueno("EXCELENTE OPERACION REALIZADO CON EXITO");
        this.consulta = {
          identidad: ""
        }
        this.bandera=0
        this.cambiarcategoria={
          identidad:"null",
          categoria:-1,
          fecha_Ingreso:"null",
          activo:1,
          idunidad:0,
          idfuerza:0,
          numeroAcuerdo:"",
          grado:"null",
          banderaPrimerIgreso:0,
          fechaAscenso:"null",
          ejecutado_por:"null",
          unidadEjecutoraSelecionada:null
      
        }; 
      }
    },error=>{
      this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL CAMBIAR LA CATEGORIA");
    }
  )


  
}
 quitarAlgodelTexto(str, buscar, remplazar) {
  var escapedFind=buscar.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, 'g'), remplazar);
}
tras(data){
  this.bandera=data ;
  this.objetoConsultado = new Array();
  this.consulta = {
    identidad: ""
  }
  this.cambiarcategoria={
    identidad:"null",
    categoria:-1,
    fecha_Ingreso:"null",
    activo:1,
    idunidad:0,
    idfuerza:0,
    numeroAcuerdo:"",
    grado:"null",
    banderaPrimerIgreso:0,
    fechaAscenso:"null",
    ejecutado_por:"null",
    unidadEjecutoraSelecionada:null

  };

}
verificarPermiso(data){
  return  this._DatospersonalesService.verificarPermisos(data)
 
 }
 displayCambioCategoria = false;

abrirModalCambioCategoria() {
  this.displayCambioCategoria = true;
}
}

