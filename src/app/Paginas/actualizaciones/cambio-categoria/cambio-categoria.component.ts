import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { DialogModule } from 'primeng/dialog';


ActivatedRoute
@Component({
  selector: 'app-cambio-categoria',
  standalone: true,
  imports: [CommonModule,
    FormsModule, DialogModule],
  templateUrl: './cambio-categoria.component.html',
  styleUrl: './cambio-categoria.component.css',
})
export class CambioCategoriaComponent {
  bandera = 0;
  usuariologuiado;
  cambiarcategoria = {
    identidad: "null",
    categoria: null,
    fecha_Ingreso: "null",
    activo: 1,
    idunidad: 0,
    idfuerza: 0,
    numeroAcuerdo: "",
    grado: "null",
    banderaPrimerIgreso: 0,
    fechaAscenso: "null",
    ejecutado_por: "null",
    unidadEjecutoraSelecionada: null

  };
  categoriaSeleccionada
  GradoSeleccionado
  fuerzaSeleccionada
  Arreglocategoria = new Array();
  consulta = {
    identidad: ""
  }
  objetoConsultado;
  arreglounidadEjecutora = [];

  Cambios_Categoria = [
    {
      nombre: "Tropa a Axuiliar",
      idcategoria_inicio: 2,
      idcategoria_final: 1,
      grados: [
        { nombre: "Auxiliar", idgrado: 17,  
           fuerza: [
        { nombre: "Ejercito", idfuerza: 3,idunidad:108 },
        { nombre: "Aereo", idfuerza: 4,idunidad:109  },
        { nombre: "Naval", idfuerza: 2 ,idunidad:119 },
        { nombre: "PMOP", idfuerza: 6 ,idunidad:80 },
      ] }
      ],
   
    },
    {
      nombre: "Tropa a Cadete",
      idcategoria_inicio: 2,
      idcategoria_final: 4,
      grados: [
        { nombre: "Cadete", idgrado: 48, fuerza: [
        { nombre: "Ejercito", idfuerza: 3,idunidad:108 },
        { nombre: "Aereo", idfuerza: 4,idunidad:109  },
        { nombre: "Naval", idfuerza: 2 ,idunidad:119 },
   
      ] }
      ]
     
    },
    {
      nombre: "Tropa a Estudiante",
      idcategoria_inicio: 2,
      idcategoria_final: 3,
      grados: [
        { nombre: "Estudiante", idgrado: 49 ,
      fuerza: [
        { nombre: "Ejercito", idfuerza: 3,idunidad:108 },
        { nombre: "Aereo", idfuerza: 4,idunidad:109  },
        { nombre: "Naval", idfuerza: 2 ,idunidad:119 }


      ]}
      ]
    },
    {
      nombre: "Auxiliar a Cadete",
      idcategoria_inicio: 1,
      idcategoria_final: 4,
      grados: [
        { nombre: "Cadete", idgrado: 48 ,
      fuerza: [
        { nombre: "Ejercito", idfuerza: 3,idunidad:108 },
        { nombre: "Aereo", idfuerza: 4,idunidad:109  },
        { nombre: "Naval", idfuerza: 2 ,idunidad:119 }


      ]}
      ]
    },
    {
      nombre: "Auxiliar a Estudiante",
      idcategoria_inicio: 1,
      idcategoria_final: 3,
      grados: [
        { nombre: "Estudiante", idgrado: 49,
      fuerza: [
        { nombre: "Ejercito", idfuerza: 3,idunidad:108 },
        { nombre: "Aereo", idfuerza: 4,idunidad:109  },
        { nombre: "Naval", idfuerza: 2 ,idunidad:119 }


      ] }
      ]
    },
    {
      nombre: "Auxiliar a Oficial Auxiliar Ejercito",
      idcategoria_inicio: 1,
      idcategoria_final: 11,
      grados: [
        { nombre: "Sub Teniente", idgrado: 1 ,fuerza: [
        { nombre: "Ejercito", idfuerza: 3,idunidad:108 },


      ] }
      ],
     
    },
    {
      nombre: "Auxiliar a Oficial Auxiliar Aereo",
      idcategoria_inicio: 1,
      idcategoria_final: 13,
      grados: [
        { nombre: "Sub Teniente", idgrado: 1,
      fuerza: [
        { nombre: "Ejercito", idfuerza: 4,idunidad:108 },


      ] }
      ]
    },
    
    {
      nombre: "Auxiliar a Oficial Auxiliar Naval",
      idcategoria_inicio: 1,
      idcategoria_final: 12,
      grados: [
        { nombre: "Alferez de Fragata", idgrado: 1 ,
      fuerza: [
        { nombre: "Naval", idfuerza: 2 ,idunidad:119}


      ]}
      ]
    },

    {
      nombre: "Sub Oficial a Oficial Axuiliar Ejercito",
      idcategoria_inicio: 6,
      idcategoria_final: 11,
      grados: [
        { nombre: "Sub Teniente", idgrado: 1,
      fuerza: [
        { nombre: "Ejercito", idfuerza: 3,idunidad:108 },


      ] }
      ]
    },
    {
      nombre: "Sub Oficial a Oficial Axuiliar Aereo",
      idcategoria_inicio: 10,
      idcategoria_final: 13,
      grados: [
        { nombre: "Sub Teniente", idgrado: 1,
      fuerza: [
        { nombre: "Ejercito", idfuerza: 4,idunidad:108  },


      ] }
      ]
    },
    {
      nombre: "Sub Oficial a Oficial Axuiliar Naval",
      idcategoria_inicio: 8,
      idcategoria_final: 12,
      grados: [
        {
          nombre: "Sub Teniente", idgrado: 1, fuerza: [
            { nombre: "Ejercito", idfuerza: 2 ,idunidad:108}
          ]
        }
      ],

    },

    {
      nombre: "Cadete a Tropa",
      idcategoria_inicio: 4,
      idcategoria_final: 2,
      grados: [
        {
          nombre: "Soldado del Ejercito", idgrado: 30, fuerza: [
            { nombre: "Ejercito", idfuerza: 3,idunidad:108 }
          ]
        },
        {
          nombre: "Soldado Aereo", idgrado: 30, fuerza: [
            { nombre: "Aereo", idfuerza: 4,idunidad:109  }
          ]
        },
        {
          nombre: "Soldado Naval (Infante de Marina)", idgrado: 30
          , fuerza: [
            { nombre: "Naval", idfuerza: 2 ,idunidad:119}
          ]
        },
        {
          nombre: "Soldado Naval (Marino)", idgrado: 103, fuerza: [
            { nombre: "Naval", idfuerza: 2 ,idunidad:119}
          ]
        }
      ]

    },
    {
      nombre: "Cadete a Oficial de las Armas Ejercito",
      idcategoria_inicio: 4,
      idcategoria_final: 14,
      grados:[
        {nombre: "Sub Teniente", idgrado: 1, fuerza: [
          { nombre: "Ejercito", idfuerza: 3,idunidad:108 },
        ]
      }
      ]
    }, {
      nombre: "Cadete a Oficial de las Armas Aereo",
      idcategoria_inicio: 4,
      idcategoria_final: 16,
      grados:[
        {nombre: "Sub Teniente", idgrado: 1, fuerza: [
          { nombre: "Aereo", idfuerza: 4,idunidad:109  },
        ]
      }
      ]
    },
    {
      nombre: "Cadete a Oficial de las Armas Navale",
      idcategoria_inicio: 4,
      idcategoria_final: 15,
      grados:[
        {nombre: "Sub Teniente", idgrado: 1, fuerza: [
          { nombre: "Naval", idfuerza: 2 ,idunidad:119},
        ]
      }
      ]
    },
    {
      nombre: "Cadete a Oficial de los Servicios Ejercito",
      idcategoria_inicio: 4,
      idcategoria_final: 17,
      grados:[
        {nombre: "Sub Teniente", idgrado: 1, fuerza: [
          { nombre: "Ejercito", idfuerza: 3,idunidad:108 },
        ]
      }
      ]
    },
    {
      nombre: "Cadete a Oficial de los Servicios Aereo",
      idcategoria_inicio: 4,
      idcategoria_final: 19,
       grados:[
        {nombre: "Sub Teniente", idgrado: 1, fuerza: [
          { nombre: "Aereo", idfuerza: 4,idunidad:109  },
        ]
      }
      ]
    },
    {
      nombre: "Cadete a Oficial de los Servicios Naval",
      idcategoria_inicio: 4,
      idcategoria_final: 18,
         grados:[
        {nombre: "Sub Teniente", idgrado: 1, fuerza: [
          { nombre: "Navales", idfuerza: 2 ,idunidad:119},
        ]
      }
      ]
    },
    {
      nombre: "Estudiante a Tropa",
      idcategoria_inicio: 3,
      idcategoria_final: 2,
         grados: [
        {
          nombre: "Soldado del Ejercito", idgrado: 30, fuerza: [
            { nombre: "Ejercito", idfuerza: 3,idunidad:108 }
          ]
        },
        {
          nombre: "Soldado Aereo", idgrado: 30, fuerza: [
            { nombre: "Aereo", idfuerza: 4,idunidad:109  }
          ]
        },
        {
          nombre: "Soldado Naval (Infante de Marina)", idgrado: 30
          , fuerza: [
            { nombre: "Naval", idfuerza: 2 ,idunidad:119}
          ]
        },
        {
          nombre: "Soldado Naval (Marino)", idgrado: 103, fuerza: [
            { nombre: "Naval", idfuerza: 2 ,idunidad:119}
          ]
        }
      ]
    },
    {
      nombre: "Estudiante a Sub Ofial Ejercito",
      idcategoria_inicio: 3,
      idcategoria_final: 6,
      grados: [
        {
          nombre: "Comando I", idgrado: 18, fuerza: [
            { nombre: "Ejercito", idfuerza: 3,idunidad:108 }
          ]
        }
      ]
    },
    {
      nombre: "Estudiante a Sub Ofial Aerea",
      idcategoria_inicio: 3,
      idcategoria_final: 10,
       grados: [
        {
          nombre: "Comando I", idgrado: 18, fuerza: [
            { nombre: "Aerea", idfuerza: 4,idunidad:109  }
          ]
        }
      ]
    },
    {
      nombre: "Estudiante a Sub Ofial Naval",
      idcategoria_inicio: 3,
      idcategoria_final: 8,
       grados: [
        {
          nombre: "Comando I", idgrado: 18, fuerza: [
            { nombre: "Navales", idfuerza: 2 ,idunidad:119}
          ]
        }
      ]
    }

  ]

  constructor(
    private _Activatedroute: ActivatedRoute,
    public _DatospersonalesService: ServicioBackendService,
    private _ServicioMensajeService: ServiciosMensajeService

  ) { }

  ngOnInit(): void {
    this.usuariologuiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarUnidadEjecutora()
    this.sacarfuerzas()

  }
  arregloFuerzas = []
  sacarfuerzas() {
    this._DatospersonalesService.sacarFuerza().subscribe({
      next: (response) => {
        this.arregloFuerzas = response.resultado;
      },
      error: (error) => {
        this._DatospersonalesService.mensajeError("Error al cargar las fuerzas");
      }
    })
  }
  sacarUnidadEjecutora() {
    this._DatospersonalesService.sacarUnidadEjecutora().subscribe({
      next: (response) => {
        this.arreglounidadEjecutora = response.resultado
      }, error: () => {

      }
    })
  }
  buscarPorIdentidad() {
    this._ServicioMensajeService.show()
    this._DatospersonalesService.consultaPorIdentidad(this.consulta).subscribe(
      {
        next: (Response) => {
          this._ServicioMensajeService.hide()
          if (Response.error) return this._DatospersonalesService.mensajeError(Response.error.sqlMessage + "BUSC")
          if (Response.mensaje) return this._DatospersonalesService.mensajeError(Response.mensaje)

          this.objetoConsultado = Response.resultado[0];
          this.sacarcategorias(this.objetoConsultado.idcategoria)
          this.bandera = 1





        }, error: () => {
          this._ServicioMensajeService.hide()
          this._ServicioMensajeService.mensajeMalo("ERROR DE CONECCION AL BUSCAR POR IDENTIDAD");
        }
      }
    )

  }
  sacarcategorias(data) {
    if (data === 2) {
      var parametro = {
        nivel: 0
      }
    } else {
      if (data === 3) {
        var parametro = {
          nivel: 4
        }
      } else {
        if (data === 4) {
          var parametro = {
            nivel: 6
          }
        }
      }
    }

    this._DatospersonalesService.sacarcategoriaporNivel(parametro).subscribe(
      Response => {
        this.Arreglocategoria = Response.resultado
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR AL CARGAR LAS CATEGORIAS");
      }
    )
  }
  cambio(data) {

    if (this.cambiarcategoria.categoria === 1) {
      this.cambiarcategoria.grado = "17";

    } else {

      if (this.cambiarcategoria.categoria >= 14) {

        this.cambiarcategoria.grado = "1";
      } else {
        if (this.cambiarcategoria.categoria === 6 || this.cambiarcategoria.categoria === 10 || this.cambiarcategoria.categoria === 8) {
          this.cambiarcategoria.grado = "18";
        } else {
          alert("CAMBIO NO SOPORTADO ")

        }
      }

    }


    this.cambiarcategoria.idfuerza = data.idfuerza;
    this.cambiarcategoria.idunidad = data.idunidad;
    this.cambiarcategoria.identidad = data.identidad;
    this.cambiarcategoria.fecha_Ingreso = data.fecha.split("T")[0]





  }
  guardarcategoriaNueva(form:NgForm) {
 
 
    if(this.objetoConsultado.idcategoria===form.value.categoria.idcategoria_final)  return this._DatospersonalesService.mensajeError("LA CATEGORIA SELECCIONADA ES LA MISMA QUE LA ACTUAL")
 let p ={
    activo: 1,
    banderaPrimerIgreso:1,
    categoria:form.value.categoria.idcategoria_final,
    fechaAscenso:form.value.fechaAscenso,
    fecha_Ingreso:form.value.fechaAscenso,
    grado:form.value.grado.idgrado,
    identidad:this.objetoConsultado.identidad,
    idfuerza:form.value.fuerza.idfuerza,
    idunidad:form.value.fuerza.idunidad,
    numeroAcuerdo:this.quitarAlgodelTexto(form.value.numeroAcuerdo, " ", ""),
    ejecutado_por:this.usuariologuiado.identidad,
    usuario:this.usuariologuiado,
    metatData:form.value,
    idunidadEjecutora:form.value.categoria.idcategoria_final===1? form.value.ue.idunidad_ejecutora:-1
 }
  
    this._DatospersonalesService.guardarcambiodeCategoria(p).subscribe(
      Response => {
        if (!Response.ok) {
          this._DatospersonalesService.mensajeError(Response.mensaje)
        } else {
          this._DatospersonalesService.mensajeBueno(Response.mensaje);
          this.consulta = {
            identidad: ""
          }
          form.reset()
          this.displayCambioCategoria = false;
      
         
        }
      }, error => {
        this._DatospersonalesService.mensajeError("ERROR DE CONECCION AL CAMBIAR LA CATEGORIA");
      }
    )   


  }
  quitarAlgodelTexto(str, buscar, remplazar) {
    var escapedFind = buscar.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), remplazar);
  }
  tras(data) {
    this.bandera = data;
    this.objetoConsultado = new Array();
    this.consulta = {
      identidad: ""
    }
    /*
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
  
    };*/

  }
  verificarPermiso(data) {
    return this._DatospersonalesService.verificarPermisos(data)

  }
  displayCambioCategoria = false;

  abrirModalCambioCategoria() {
    this.displayCambioCategoria = true;
  }
}

