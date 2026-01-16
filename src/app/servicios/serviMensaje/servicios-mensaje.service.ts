import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root',
})
export class ServiciosMensajeService {
  
  piedeMensaje="SIAPFFAA 1111"
  constructor() { 

  }
  mensajeBueno(data){
    Swal.fire({
      icon: 'success',
      title: 'Excelente',
      text: data,
      footer: '<strong>'+this.piedeMensaje+'</strong>'
    })
  }
  mensajeMalo(data){
    Swal.fire({
      icon: 'error',
      title: 'Oppsss',
      text: data,
      footer: '<strong>'+this.piedeMensaje+'</strong>'
    })
  }
  mensajeAdvertencia(data){
    Swal.fire({
      icon: 'warning',
      title: 'Oppsss',
      text: data,
      footer: '<strong>'+this.piedeMensaje+'</strong>'
    })
  }
  async mensajePregunta(data){
    
  var respuesta = await  Swal.fire({
    title: 'PRECAUCION',
    icon: 'question',
    text:data,
      showDenyButton: true,
     confirmButtonText: 'ACEPTAR',
    denyButtonText: `CANCELAR`,
  }).then((result) => {
 
    if (result.isConfirmed) {
      return true;
    } else if (result.isDenied) {
      Swal.fire('Cancelado', '', 'info')
      return false;
    }
   return false;
  })
  return respuesta; 
  }
  mensajeerrorServer(){
    Swal.fire({
      icon: 'error',
      title: 'Oppsss',
      text: "ERROR DE CONEXION AL SERVIDOR",
      footer: '<strong>'+this.piedeMensaje+'</strong>'
    })
  }
  async mensajeConimput(titulo,texto){
   
  let respuesta =  Swal.fire({
      title: titulo,
      text:texto,
      input: "text",
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (datos) => {
        if (datos=="") {
      Swal.fire("Datos Invalidos")

          return "error";
      }else{
        return datos
  
      }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
    if ((await respuesta).value===undefined ) {
      Swal.fire("Datos Invalidos")
        return "error";
    }else{
      return (await respuesta).value;

    }
  }
  private loadingVisible = false;

  show(message: string = 'Cargando...') {
    if (this.loadingVisible) return;

    this.loadingVisible = true;

    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'rounded-4'
      }
    });
  }
    hide() {
    if (!this.loadingVisible) return;

    Swal.close();
    this.loadingVisible = false;
  }
}

