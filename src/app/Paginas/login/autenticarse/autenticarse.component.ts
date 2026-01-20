 
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
ServiciosMensajeService
@Component({
  selector: 'app-autenticarse',
  standalone:true,
   imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
DialogModule,
CarouselModule
     
  ],
  templateUrl: './autenticarse.component.html',
  styleUrl: './autenticarse.component.css',
})
export class AutenticarseComponent {
 
 
  passwordVisible = false;
   activar = false
  @Output("verificar") verificar = new EventEmitter<string>();
 
  actualizarcontrasena = {
    contrasena: "",
    confirmarContrasena: ""
  }
  usuarioLoguiado;
  login = {
    usuario: "",
    contrasena: ""
  }
  banderaCambioContrasena = 0;
    opt_token=""
 
  constructor(
  
    private _ServicioBackendService:ServicioBackendService,
    private _ServiciosMensajeService:ServiciosMensajeService,
     private _Router: Router
  ) {
   
  }

  

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

   actualizarContrasena(form) {
    if (form.value.nuevaContrasena !== form.value.confirmarContrasena) return this._ServiciosMensajeService.mensajeMalo("Contraseña no coinciden");
  let passwordPattern =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]{12,}$/;
const pass = (form.value.nuevaContrasena || '').trim();

if (!passwordPattern.test(pass)) {
  return this._ServiciosMensajeService.mensajeMalo(
    "La contraseña debe tener al menos 12 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
  );
}
  
  var parametros = {
      contrasena: form.value.nuevaContrasena,
      identidad: this.usuarioLoguiado[0].identidad
    }
   this._ServiciosMensajeService.show("Actualizando contraseña......");

    this._ServicioBackendService.actualizacionContrasenas(parametros,this.opt_token+this._ServicioBackendService.getControlVersion()).subscribe({
      next: (response) => {
    this._ServiciosMensajeService.hide()

        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this._ServiciosMensajeService.mensajeBueno('SU CONTRASEÑA FUE ACTUALIZADO CON EXITO')
        this._ServicioBackendService.setToken("");
        this._ServicioBackendService.setUsuario("");
        this.usuarioLoguiado = null;
        this.banderaCambioContrasena = 0;
      }, error: (error) => {
    this._ServiciosMensajeService.hide()


        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }
solicitarToken=false
 
  dataTemporal
  usuarioLogin
  autenticarse(formulario) {
 
this.solicitarToken=false
 
    this._ServiciosMensajeService.show("Validando......");
 
    this._ServicioBackendService.autenticarse(formulario.value).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) {
          return this._ServiciosMensajeService.mensajeMalo(response.error)
        }
        if (response.mensaje) {
          return this._ServiciosMensajeService.mensajeMalo(response.mensaje)
        }
         
        localStorage.setItem("permisos", JSON.stringify(response.arregloPermisos))
        if (response.resultado[0].cambioContrasena === 1) {
      
           this.opt_token =response.token
        //  localStorage.setItem('user_login', JSON.stringify(prueba));
          this._ServiciosMensajeService.mensajeAdvertencia("NECESITAS ACTUALIZAR TU CONTRASEÑA")
          this.usuarioLoguiado = response.resultado
         
          this.banderaCambioContrasena = 1;
        } else {
        this.opt_token =response.token
        this.dataTemporal = response.resultado
        this.usuarioLogin =response.resultado[0]
    
      if (response.resultado[0].activar_2fa===1)return  this.solicitarToken =true

         this.generar2FA(response.resultado[0])
       
    
        } 

      }, error: () => {
        this._ServiciosMensajeService.hide()
        
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }) 
  }
  
  
qr
  generar2FA(usuario){

    this._ServicioBackendService.generar2FA(usuario,this.opt_token).subscribe({
      next:(response)=>{
        if(response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if(response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.qr = response
        this.abrir()
      //  this.verificar.emit(response.codigo2FA)
      },error:(error)=>{
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }) 
  }
 showModal = false;
@ViewChild('form2FA') form2FA: NgForm;
abrir() {
  this.showModal = true;
  this.form2FA.resetForm();
}
verificar2FA_primera_ves(form:NgForm){
  let p ={
    identidadusuario:this.usuarioLogin.identidad,
    codigo:form.value.codigo
  }
 this._ServiciosMensajeService.show("Verificando código 2FA......");
     this._ServicioBackendService.verificar2FA(p,this.opt_token).subscribe({
      next:(response)=>{
       this._ServiciosMensajeService.hide()
        if(!response.ok) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.showModal=false
      },error:(error)=>{
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }) 
}
validarToken(form:NgForm){
  let p ={
    identidadusuario:this.usuarioLogin.identidad,
    codigo:form.value.token
  }

  
 this._ServiciosMensajeService.show("Verificando código 2FA......");
     this._ServicioBackendService.validarEntradaConToken(p,this.opt_token).subscribe({
      next:(response)=>{
       this._ServiciosMensajeService.hide()
        if(!response.ok) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);

 

          this._ServicioBackendService.setUsuario( this.dataTemporal)
           this._ServicioBackendService.setToken(this.opt_token)
          var prueba = {
           user:  this.usuarioLogin,
            token: this.opt_token
          }
       localStorage.setItem('user_login', JSON.stringify(prueba));
  this._Router.navigate(['/menu/menu-principal'])
      },error:(error)=>{
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })  
}
 

 mostrarLoginModal = false;

slidesHome = [
  {
    kicker: 'SIAPFFAA 2026',
    title: 'Acceso seguro y moderno',
    text: 'Gestión institucional con enfoque en seguridad y control.',
    img: 'teniente-molina.jpg'
  },
  {
    kicker: 'Mejora continua',
    title: 'Eficiencia en procesos',
    text: 'Optimización de flujos administrativos y trazabilidad.',
    img: '4983559598929718590.jpg'
  },
  {
    kicker: 'Operación',
    title: 'Soporte y continuidad',
    text: 'Disponibilidad y soporte para usuarios autorizados.',
    img: 'militares-mujeres-1.jpg'
  },
  {
    kicker: 'Operación',
    title: 'Soporte y continuidad',
    text: 'Disponibilidad y soporte para usuarios autorizados.',
    img: 'NVZ02713.jpg'
  },
  {
    kicker: 'Operación',
    title: 'Soporte y continuidad',
    text: 'Disponibilidad y soporte para usuarios autorizados.',
    img: 'NVZ07135-1-e1693432160636-1024x763.jpg'
  },
  {
    kicker: 'Operación',
    title: 'Soporte y continuidad',
    text: 'Disponibilidad y soporte para usuarios autorizados.',
    img: 'Portada-Boletin-v4-DDHH.png'
  },
  {
    kicker: 'Operación',
    title: 'Soporte y continuidad',
    text: 'Disponibilidad y soporte para usuarios autorizados.',
    img: 'Cinthya-Torres-PD.jpg'
  }
];

}
