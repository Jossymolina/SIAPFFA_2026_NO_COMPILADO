import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, UntypedFormGroup,UntypedFormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
 
UntypedFormGroup
@Component({
  selector: 'app-registrar-personal',
  standalone:true,
  imports: [
    CommonModule,
FormsModule,
ReactiveFormsModule
  ],
  templateUrl: './registrar-personal.component.html',
  styleUrl: './registrar-personal.component.css',
})
export class RegistrarPersonalComponent {
 banderaPersonal = 1;
 pasoPasoForm =0
 pasosFormulario={
  p1:0,
  p2:0,
  p3:0,
  p4:0
 }
banderaVentanaPrincipal='1';
arregloAbrisCupos= new Array()
  banderabloqContrado = false;
  arregloRegistros= new Array();
  noesvalido = false;
  unidadSelected;
  arregloFuerzas = new Array();
  arregloUnidades = new Array();
  arregloCategoria = new Array();
  arregloPaises = new Array();
  arregloDepartamento = new Array();
  arreglomunicipio = new Array();
  arregloBancos = new Array();
  arregloGrados = new Array();
  fuerzaSelected:any;
  categoriaSelected:any;
 departamentoselected:any;
  PedirGrado = 0;
   gradoSelected:any;
   datopersona=0;
   
   ingresoAscenso={
     fecha_ingreso:"",
     fecha_ascenso:"",
     nombre_Completo:"",
     identidad:"",
     categoria:"",
     grado:"",
     fuerza:"",
     fuerzaAsignacion:"",
     unidad:"",
     banderaPrimerIngreso:"",
     numeroAcuerdo:"",
     identidadElaborado:""
   }
   quefuerzaSelected:any;
   fechaDelserver:any;
   unidadDelIngreso:any;
   categoriaAsignar:any;
   mesdelAno:any;
   anoActual:any;
   fuerzaQueVaSufrirUnRegistro:any;
   usuarioLogiado:any;
   spinner=0;
   arregloPersonal= new Array();
  public FilesToUploads: Array<File> = new Array();
  //private identidadregex: any = /\d{4}[-]\d{4}[-]\d{5}/;
  private identidadregex: any = /^[0-9]*$/;
  private rtnregex: any = /^[0-9]*$/;

 

 
 
 

 
 
  constructor(private _ActivatedRoute: ActivatedRoute,
     private _DatospersonalesService: ServicioBackendService,
     private _ServiciosMensajeService: ServiciosMensajeService,
    private  _Router:Router
    ) {
    this._ActivatedRoute.params.subscribe(prm => {

      this.banderaVentanaPrincipal= prm['id'];
      if (this.banderaVentanaPrincipal==="1") {
        this.banderaPersonal=1
      } else {
        this.banderaPersonal=0
      }
   
 



    })
   }
sacarCategoria(){
   var categoria = {
      servicio: "AUX' or codigo='TRO' or codigo='EST",
      general: "CAD",

    }
    this._DatospersonalesService.sacarCategoria(categoria).subscribe(
      Response => {
        this.arregloCategoria = Response.resultado;
      }
    )
}
sacarPaises(){
     
   this._DatospersonalesService.sacarpaises().subscribe(
      Response => {

        this.arregloPaises = Response.resultado;
      }
    )
}
sacarFuerza(){
     this._DatospersonalesService.sacarFuerza().subscribe(
      Response => {
        this.arregloFuerzas = Response.resultado;
      }
    )
}
sacarBancos(){
        this._DatospersonalesService.sacarbancos().subscribe(
      Response => {
        console.log(Response)
        this.arregloBancos = Response.resultado
      }
    )
}
sacarDEpartamentos(){
    let p = {
      idpaises:137
    }
      this._DatospersonalesService.sacardepartamento(p).subscribe(
      Response => {
        this.arregloDepartamento = Response.resultado;;
      })
}
sacarFechaServer(){
       this._DatospersonalesService.sacarFecha().subscribe(
        Response=>{
         var Datefecha = Response.fecha.split("/")
        this.anoActual=Datefecha[2];
        this.mesdelAno =Datefecha[1]
         this.fechaDelserver = new Date(Datefecha[2]+"-"+Datefecha[1]+"-"+Datefecha[0])
       
        }
      ) 
}
  ngOnInit(): void {
      this.sacarCupos()
     this.usuarioLogiado=JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarCategoria()
    this.sacarFuerza()
    this.sacarPaises()
    this.sacarBancos()
    this.sacarDEpartamentos()
   
      this.sacarFechaServer()
  

   
   
  

 

  }
  @ViewChild("formIngreso")formIngreso:NgForm
  guardarPersonal(data:any) {
 
 
 

  var fechaSeleccionada= this.unidadDelIngreso.FechaIngresar.split("/")

  this.ingresoAscenso.fecha_ingreso= fechaSeleccionada[2]+"-"+fechaSeleccionada[1]+"-"+fechaSeleccionada[0]



  this.banderabloqContrado=false;
 
 
  
  this.categoriaAsignar = this.arregloCategoria.find( elemento => elemento.idcategoria === this.categoriaSelected.idcategoria )
 this.ingresoAscenso.nombre_Completo = this.formIngreso.value.nombre +" "+this.formIngreso.value.apellidos
 this.ingresoAscenso.identidad = this.formIngreso.value.identidad
 this.ingresoAscenso.categoria = this.categoriaAsignar.idcategoria;
 this.ingresoAscenso.grado =this.gradoSelected.idgrado;
 this.ingresoAscenso.fuerza = this.fuerzaSelected.FuerzaIngresar;
 this.ingresoAscenso.unidad = this.unidadDelIngreso.idunidad;
 this.ingresoAscenso.fuerzaAsignacion=this.fuerzaSelected.idfuerza
 this.ingresoAscenso.identidadElaborado = JSON.parse(localStorage.getItem('user_login')!).user.identidad
 this.ingresoAscenso.banderaPrimerIngreso = "1";
 var numAcuerdoCabie="";

 if ( this.categoriaAsignar.idcategoria===2 || this.categoriaAsignar.idcategoria===4|| this.categoriaAsignar.idcategoria===3) {
  if (this.categoriaAsignar.idcategoria===2) {
    if (parseInt(this.mesdelAno)<12) {
      numAcuerdoCabie = "Cabie 01-"+this.anoActual;
     } else {
      numAcuerdoCabie = "Cabie 02-"+this.anoActual;
     }
  } else {
    if (this.categoriaAsignar.idcategoria===4) {
      
        numAcuerdoCabie = "Cadete-"+this.anoActual;
    
    }else{
      if (this.categoriaAsignar.idcategoria===3) {
     
          numAcuerdoCabie = "Estudiante-"+this.anoActual;
      

      }
    }
  }
  this.pasosFormulario.p1 =0
  this.pasosFormulario.p2 =1
  this.banderabloqContrado=true;
   this.ingresoAscenso.numeroAcuerdo = numAcuerdoCabie;
 } else {
  this.ingresoAscenso.numeroAcuerdo = "";
 }

 
/*
   this._DatospersonalesService.guardarDatosPersonales(this.formIngreso.value).subscribe(
      Response => {
        if (Response.error) {
          this._DatospersonalesService.mensajeError(Response.error.sqlMessage)

        } else {
          this._DatospersonalesService.mensajeBueno(Response.resultado);
          this.banderaPersonal = data;
        }
      }
    )*/

  }
  siguienteAsignacion(){
    
    
    if (this.ingresoAscenso.numeroAcuerdo==="" || this.ingresoAscenso.numeroAcuerdo===null || this.ingresoAscenso.numeroAcuerdo===undefined)  {
       this._DatospersonalesService.mensajeError("INGRESE EL NUMERO DE ACUERDO")
    } else {
      if (this.ingresoAscenso.fecha_ingreso==="" || this.ingresoAscenso.fecha_ingreso===null || this.ingresoAscenso.fecha_ingreso===undefined)  {
        this._DatospersonalesService.mensajeError("SELECCIONE LA FECHA DE INGRESO")

     } else {
       this.ingresoAscenso.fecha_ascenso = this.ingresoAscenso.fecha_ingreso
         this.atrasFormularioPersona(0,0,1)
     }
    }
  }
  sacarunidad() {
    this._DatospersonalesService.sacarunidad(this.fuerzaSelected).subscribe(
      Response => {

        this.arregloUnidades = Response.resultado;

      }
    )

  }




  sacarmunicipio(form) {
    var params = {
      iddepartamento: form.value.departamentoselected.iddepartamento,
      prueba: "prueba"
    }
    console.log(form.value)

  this.arreglomunicipio = []
  this._ServiciosMensajeService.show()
    this._DatospersonalesService.sacarmunicipio(params).subscribe(
      {
        next:(Response)=>{
          console.log(Response)
        this._ServiciosMensajeService.hide()
        if(Response.error) return this._ServiciosMensajeService.mensajeMalo(Response.error)
          if(Response.mensaje) return this._ServiciosMensajeService.mensajeMalo(Response.error)
             this.arreglomunicipio = Response.resultado;
 
  },error:()=>{
          this._ServiciosMensajeService.hide()
        }
      }
    )
  }



  imgURL: any = "";
  public message: string="";
  preview(files:any, fileInput: any) {

    this.fileChangeEvenet(fileInput)
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {

      return;
    }

    var reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;


    }


  }

  fileChangeEvenet(fileInput: any) {

    this.FilesToUploads = <Array<File>>fileInput.target.files;


  }
  // guardo la foto del primer ingreeso
  probar(data:any) {
    //aqui espero respuesta
    this.makeFileReques(this._DatospersonalesService.url2 + "subirArchivo/" + this.formIngreso.value.identidad, [], this.FilesToUploads).then(
      (result: any) => {

        this.imgURL = "";
        if (result.error) {
          this._DatospersonalesService.mensajeError(result.error)

        } else {
          if (result.mesaje) {
            this._DatospersonalesService.mensajeError(result.mensaje)
          } else {
            this._DatospersonalesService.mensajeBueno(result.resultado);

            this.banderaPersonal = data;
          }

        }
      }
    )


  }
  //Aqui guardo foto del pariente
  probar2() {
    //aqui espero respuesta
    /*this.makeFileReques(this._DatospersonalesService.url2 + "subirArchivo/" + this.formulariopariente.value.identidad, [], this.FilesToUploads).then(
      (result: any) => {


        this.imgURL = "";
        if (result.error) {
          this._DatospersonalesService.mensajeError(result.error)

        } else {
          if (result.mesaje) {
            this._DatospersonalesService.mensajeError(result.mensaje)
          } else {
            this._DatospersonalesService.mensajeBueno(result.resultado);

         
          }

        }
      }
    )
*/

  }
  makeFileReques(url: string, params: Array<String>, file: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();


      if (file === undefined) {
        this._DatospersonalesService.mensajeError("SELECCIONE LA FOTO DE PERFIL")
      } else {
        for (let i = 0; i < file.length; i++) {
          formData.append("files", file[i], file[i].name);

        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(xhr.response);
            }

          } else {

          }
        }

        xhr.open("POST", url, true);
        xhr.send(formData)
      }


    })



  }
  ver2(){
    console.log(this.fechaingreso.value)
  }
fechaingreso
  ver() {
    this.banderaPersonal=0;
    this.arregloGrados = new Array();
    if (this.fechaingreso.value.condicionDe === 2) {
      var parametros = {
        grado_pertenece_a: 3
      }
      this._DatospersonalesService.sacarGrados(parametros).subscribe(
        Response => {
          this.PedirGrado = 1
          this.arregloGrados = Response.resultado
        }
      )
    } else {
      if (this.fechaingreso.value.condicionDe === 1) {
        var parametros = {
          grado_pertenece_a: 0
        }
        
        this._DatospersonalesService.sacarGrados(parametros).subscribe(
          Response => {
            this.PedirGrado = 1
            this.arregloGrados = Response.resultado
          }
        )
      } else {
        if (this.fechaingreso.value.condicionDe === 3) {
          var parametros = {
            grado_pertenece_a: 6
          }
          this._DatospersonalesService.sacarGrados(parametros).subscribe(
            Response => {
              this.PedirGrado = 1
              this.arregloGrados = Response.resultado
            }
          )
        } else {
          if (this.fechaingreso.value.condicionDe === 4) {
            var parametros = {
              grado_pertenece_a: 5
            }
            this._DatospersonalesService.sacarGrados(parametros).subscribe(
              Response => {
                this.PedirGrado = 1
                this.arregloGrados = Response.resultado
              }
            )
          }
        }
        this.PedirGrado = 0

      }
    }
  }
  VerInformacion(DATA:any){
    Swal.fire(
      'INFORMACIÓN',
      DATA,
      'question'
    )
  }
  sacarGrados(data:any){
    var parametros = {
      idgrados: data
    }
    this.banderaPersonal=0;
    this.datopersona=0;
  
    this._DatospersonalesService.sacargradosporid(parametros).subscribe(
      Response => {
        
        this.arregloGrados = Response.resultado
      }
    )
  }
  quefuerzaSelecciono(){
    
    this.banderaPersonal=1
 
    this._DatospersonalesService.sacarunidad(this.fuerzaSelected).subscribe(
      Response => {

        this.arregloUnidades = Response.resultado;

      }
    )
    if (this.fuerzaSelected.idfuerza===2) {
      Swal.fire("Fuerza Naval")
      this.quefuerzaSelected=2
    } else {
      if (this.fuerzaSelected.idfuerza===3) {
        Swal.fire("Fuerza Ejercito")
        this.quefuerzaSelected=3
      } else {
        if (this.fuerzaSelected.idfuerza===4) {
          Swal.fire("Fuerza Aerea")
          this.quefuerzaSelected=4
        } else {
          this.quefuerzaSelected=0
          Swal.fire("Seleccione una de las tres fuerzas")
        }
      }
    }
  }
  quefuerzaSeleccionoAuxiliar(){

    if (this.fuerzaSelected==="2") {
      Swal.fire("Fuerza Naval")
    } else {
      if (this.fuerzaSelected==="3") {
        Swal.fire("Fuerza Ejercito")
      } else {
        if (this.fuerzaSelected==="4") {
          Swal.fire("Fuerza Aerea")
        } else {
          if (this.fuerzaSelected==="6") {
            Swal.fire("Policia M ilitar de Orden Publico")
          } else {
            Swal.fire("Seleccione una de las cuatro fuerzas")
          }
        }
      }
    }
  }
  
  pedirdatoPersona(){
    this.quefuerzaSelected=0
    this.datopersona=1;
  }
  
  atrasFormularioPersona(p1,p2,p3){
  this.pasosFormulario.p1 =p1
  this.pasosFormulario.p2 =p2
  this.pasosFormulario.p3 =p3
  }
 
  //funciones para agregar personal por unidades
  sacarCupos(){

    this.arregloRegistros =[]; 
    var parametro={
      activo:1,
      idunidad:JSON.parse(localStorage.getItem('user_login')!).user.idunidad
    }
    this._ServiciosMensajeService.show()
    this._DatospersonalesService.sacarToeUnidad(parametro).subscribe({
      next: (Response)=>{
        this._ServiciosMensajeService.hide()
         if (Response.error)  return  this._DatospersonalesService.mensajeError(Response.error)
        if (Response.mensaje) return 
      
          for (let index = 0; index < Response.resultado.length; index++) {
            if(Response.resultado[index].FuerzaIngresar===3){
              Response.resultado[index].NombreFuerzaIngresar="Ejercito"
            }else{
              if(Response.resultado[index].FuerzaIngresar===2){
                Response.resultado[index].NombreFuerzaIngresar="Naval"
              }else{
                if(Response.resultado[index].FuerzaIngresar===4){
                  Response.resultado[index].NombreFuerzaIngresar="Aereo"
                }else{
                  if(Response.resultado[index].FuerzaIngresar===6){
                    Response.resultado[index].NombreFuerzaIngresar="PMOP"
                  }else{
                        Response.resultado[index].NombreFuerzaIngresar="Error"
                            }
                }
              }
            }
            
          }
     this.banderaVentanaPrincipal="1"
     this.banderaPersonal=1
          this.arregloRegistros = Response.resultado
    
        
      },error:()=>{
        this._ServiciosMensajeService.hide()
        this._DatospersonalesService.mensajeError("Error de conexion | Problema")
      }
    }) 
   
  }
  Card_Selecionado
registrarPaso_1(data:any,bandera:any){
  this.Card_Selecionado = data
  if (data.NombreFuerzaIngresar==='Error') {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'LA FUERZA CONTIENE UN ERROR, CONTACTESE CON SOPORTE TECNICO',
      showConfirmButton: false,
      timer: 2000
    })
  } else {
    if (data.idcategoria>=5) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'ERROR DE CATEGORIA, CONTACTESE CON SOPORTE TECNICO',
        showConfirmButton: false,
        timer: 2000
      })
    } else {
   
      this.gradoSelected=data
      this.fuerzaSelected=data;
      this.unidadDelIngreso = data;
      this.categoriaSelected = data;

      if (data.autorizado<=0) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'NO CUENTA CON CUPOS AUTORIZADOS',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        this.banderaPersonal=bandera;
        this.pasosFormulario.p1=1
      }
    }

  
  }

}
loading = false
 idcategoria_validarRTN = [1,6,8,10,11,12,13,14,15,16,17,18,19,20] //idcategorias que es obligatorio colocar rtn

 async guardar_personal_nuevo(){
  if(this.idcategoria_validarRTN.includes(parseInt(this.ingresoAscenso.categoria)) && this.formIngreso.value.rtn==="" ) return this._DatospersonalesService.mensajeError("El rtn es obligatorio para esta categoria")
  
    this.formIngreso.value.rtn===""?"-------":this.formIngreso.value.rtn;

    var parametorEnviar={
    persona:this.formIngreso.value,
    ascenso:this.ingresoAscenso,
    ejecutado_por:this.usuarioLogiado.identidad,
    card:this.Card_Selecionado,
    usuario:this.usuarioLogiado
  }
  console.log(parametorEnviar)
 let respuesta = await this._DatospersonalesService.mensajePregunta("Precaucion","Esta seguro de guardar los datos")
 if (respuesta) {
  this.formIngreso.value.combatiente = this.categoriaSelected.combatiente
  this.formIngreso.value.numero_pasaporte= (  this.formIngreso.value.numero_pasaporte===""?'----':this.formIngreso.value.numero_pasaporte)

  this._ServiciosMensajeService.show()
  this._DatospersonalesService.guardarDatosPersonales(parametorEnviar).subscribe(
  {
    next:(Response)=>{
this._ServiciosMensajeService.hide()
      if (Response.error) return   this._DatospersonalesService.mensajeError(Response.error)

      
        if (Response.resultado) {
          this._DatospersonalesService.mensajeBueno(Response.resultado);
          this.banderaPersonal=1;
          this.formIngreso.reset();
          this.ingresoAscenso={
            fecha_ingreso:"",
            fecha_ascenso:"",
            nombre_Completo:"",
            identidad:"",
            categoria:"",
            grado:"",
            fuerza:"",
            fuerzaAsignacion:"",
            unidad:"",
            banderaPrimerIngreso:"",
            numeroAcuerdo:"",
            identidadElaborado:""
          }
        
        } else {
          this._DatospersonalesService.mensajeError(Response.mensaje)
          this.banderaPersonal=1;
          this.formIngreso.reset();
          this.ingresoAscenso={
            fecha_ingreso:"",
            fecha_ascenso:"",
            nombre_Completo:"",
            identidad:"",
            categoria:"",
            grado:"",
            fuerza:"",
            fuerzaAsignacion:"",
            unidad:"",
            banderaPrimerIngreso:"",
            numeroAcuerdo:"",
            identidadElaborado:""
          }
      
        }
      
       
      this.sacarCupos();
      this.atrasFormularioPersona(0,0,0)
    },error:()=>{
      this._ServiciosMensajeService.hide()
      this._DatospersonalesService.mensajeError("Error de conexion | Problema")
    
    }
  }
  ) 
 }

   
 
  

}

sacarcoposhabilitadosdelaunidad(){
  var parametro={
    idunidad:this.unidadSelected.idunidad
  }
    
  this._DatospersonalesService.sacarcoposhabilitados(parametro).subscribe(
    Response=>{
      
      if (Response.mensaje) {
        this._DatospersonalesService.mensajeError(Response.mensaje)
      } else {
        this.arregloAbrisCupos= Response.resultado
        this.banderaVentanaPrincipal='3';
      }
      
    },error=>{
       this._DatospersonalesService.mensajeError(error)
    }
  )
}
verificarPermiso(data){
  return  this._DatospersonalesService.verificarPermisos(data)
 
 }
 atrasMenu(ruta){
this._Router.navigate([ruta]);

 }
}
