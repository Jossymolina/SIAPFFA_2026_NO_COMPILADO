import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';



@Component({
  selector: 'app-tb-ascensos',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './tb-ascensos.component.html',
  styleUrl: './tb-ascensos.component.css',
})
export class TbAscensosComponent {
@Input("identidad") identidad_
 
  arregloAscensos = [];
  consulta = {
    identidad: ""
  }
  gradoselected
  banderacambiocategoria: any;
  arregloCategorias = []
  arregloGrados = []
  gradoActualdelConsultado: any;
  objetoConsultado: any;
  fechaSelected: any;
  numeroAcuerdoNuevo
  categoriaSelected
  activar=false
  constructor(
    private _Router: Router,
    private _Activatedroute: ActivatedRoute,
    public _DatospersonalesService: ServicioBackendService,
      private _ServiciosMensajesService:ServiciosMensajeService
 

  ) {
    /*
    this._Activatedroute.params.subscribe(prm => {
      this.tipoConsulta = prm['id'];

    })*/
  }
 ngOnInit(): void {
   this.sacarAscensosdelPersonal();
 }
  sacarAscensosdelPersonal() {
    var params = {
      identidad: this.identidad_
    }
    this.activar=!this.activar
    this._DatospersonalesService.sacarAscensosporPersona(params).subscribe(
      Response => {
    this.activar=!this.activar

        this.arregloAscensos = Response.resultado
        this.arregloAscensos.forEach(element => {
          if (element.activo == 1) {
            this.gradoActualdelConsultado = element;

          }
        });
      },error=>{
    this.activar=!this.activar
this._ServiciosMensajesService.mensajeerrorServer();
      }
    )
  }
  gradoCambiado() {

    if (this.gradoActualdelConsultado.nivel != 3) {

      var params = {
        idpersonal: this.objetoConsultado.identidad,
        condicionDe: this.objetoConsultado.idcategoria,
        fecha_ingreso: this.fechaSelected,
        activo: 1,
        unidad: this.objetoConsultado.idunidad,
        idfuerza: this.objetoConsultado.idfuerza,
        numeroacuerdo: this.numeroAcuerdoNuevo,
        grado: this.gradoselected.idgrados,
        banderaPrimerIngreso: 0
      }
    } else {

      var params = {
        idpersonal: this.objetoConsultado.identidad,
        condicionDe: this.categoriaSelected.idcategoria,
        fecha_ingreso: this.fechaSelected,
        activo: 1,
        unidad: this.objetoConsultado.idunidad,
        idfuerza: this.objetoConsultado.idfuerza,
        numeroacuerdo: this.numeroAcuerdoNuevo,
        grado: this.gradoselected.idgrados,
        banderaPrimerIngreso: 0
      }
    }


    this._DatospersonalesService.agregarascensoPersonalIngresado(params).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

        } else {

          this._DatospersonalesService.mensajeBueno(Response.resultado + "ADD");
          this.sacarAscensosdelPersonal();

        }
      }
    )

  }

 
  siguienteparacambiarcategoria() {
    this.banderacambiocategoria = 2;
  }
}
