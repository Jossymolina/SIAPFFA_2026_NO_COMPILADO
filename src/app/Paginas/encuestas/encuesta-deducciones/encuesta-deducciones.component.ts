import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';


import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';

import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';

import { TagModule } from 'primeng/tag';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';


import { TextareaModule } from 'primeng/textarea';

import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { TablasEvaluacionService } from '../../../servicios/tablas/tablas-evaluacion.service';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { InputGroup } from 'primeng/inputgroup';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { interval, Subscription } from 'rxjs';
(pdfMake as any).vfs = (pdfFonts as any).vfs;
@Component({
  selector: 'app-encuesta-deducciones',
  standalone: true,
    imports: [ 
    CardModule, TableModule,
     DatePickerModule, ButtonModule, 
     TagModule, FormsModule, DialogModule,
      InputTextModule,
    ProgressSpinnerModule,
    FormsModule,
    CommonModule,
    AccordionModule,
    TextareaModule,
    SelectButtonModule,
    InputNumberModule,
    SelectModule,
    MultiSelectModule,
    DividerModule,
    TabsModule,
    AvatarModule,
    PopoverModule,
    TreeSelectModule,
    InputGroup
    
  ],
  templateUrl: './encuesta-deducciones.component.html',
  styleUrl: './encuesta-deducciones.component.css',
})
export class EncuestaDeduccionesComponent implements OnInit,OnDestroy {
identidad = null


montosPorCategoria: number[] = [];

mostrarMontos = false;
mostrarGracias = false;
mostrarOtroMonto = false;

montoSeleccionado: number | null = null;
otroMonto: number | null = null;

 constructor(
    public _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService,
    private _TablasEvaluacionService: TablasEvaluacionService,

  ) { }

  ngOnInit(): void {
  this.iniciarConteoAutomatico();
  }
  contarRresultado={
    autorizado :0,
    noAutorizado:0
  }
  validarIdentidad(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.identidad = input.value.replace(/[^0-9]/g, '').slice(0, 13);
    input.value = this.identidad;
}
aceptarDonacion(): void {


    this.mostrarGracias = false;
    this.mostrarMontos = true;

    this.montoSeleccionado = null;
    this.otroMonto = null;
    this.mostrarOtroMonto = false;

    this.cargarMontosPorCategoria();
}


 
cancelar(){
  
    this.mostrarGracias = false;
    this.mostrarMontos = false;

    this.montoSeleccionado = null;
    this.otroMonto = null;
    this.mostrarOtroMonto = false;
    this.personaBuscada = null
    this.identidad = null
    this.token= null
    this.tokenValido=false

}

cargarMontosPorCategoria(): void {

const categoria = String(
    this.personaBuscada?.categoria || ''
)
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');

if (categoria.includes('SUBOFICIAL')) {

    this.montosPorCategoria = [200, 250, 300, 350];

} else if (categoria.includes('OFICIAL')) {

    this.montosPorCategoria = [
        300, 350, 400, 450, 500,
        550, 600, 650, 700
    ];

} else if (categoria.includes('TROPA')) {

    this.montosPorCategoria = [150, 200, 250];

} else if (categoria.includes('AUXILIAR')) {

    this.montosPorCategoria = [150, 200, 250];

} else {

    this.montosPorCategoria = [50, 100, 150, 200];

}
}


seleccionarMonto(monto: number): void {

    this.montoSeleccionado = monto;
    this.otroMonto = null;
    this.mostrarOtroMonto = false;
}


seleccionarOtroMonto(): void {

    this.montoSeleccionado = null;
    this.mostrarOtroMonto = true;
}


async rechazarDonacion() {
  

  let respuesta = await this._ServiciosMensajeService.mensajePregunta("¿Está seguro de que no desea realizar su aporte? 🤕💙")

  if (respuesta) {

    this.mostrarMontos = false;
 
  

    //genero el nuevo token
   /* const tokenGenerado = await this.generarToken();

    if (!tokenGenerado) {
      return;
    }
*/
    const tokenIngresado = await this.solicitarToken();
    if (!tokenIngresado) {
      return;
    }

    this.token = tokenIngresado;


    const tokenValido = await this.validarTokenGoogle();
    if (!tokenValido) {
      this._ServiciosMensajeService.mensajeMalo("Token no Valido")
      return;
    }
     
 
    this.guadarRespuesta(
        this.personaBuscada.identidad,
        this.personaBuscada.idgrados,
        0,
        this.mostrarMontos
    )
    }

}

async rechazarDonacionTropa() {
  

  let respuesta = await this._ServiciosMensajeService.mensajePregunta("¿Está seguro de que no desea realizar su aporte? 🤕💙")

  if (respuesta) {

    this.mostrarMontos = false;
 
  

    //genero el nuevo token
   /* const tokenGenerado = await this.generarToken();

    if (!tokenGenerado) {
      return;
    }
 
    const tokenIngresado = await this.solicitarToken();
    if (!tokenIngresado) {
      return;
    }

    this.token = tokenIngresado;


    const tokenValido = await this.validarTokenGoogle();
    if (!tokenValido) {
      this._ServiciosMensajeService.mensajeMalo("Token no Valido")
      return;
    }
     
 */
    this.guadarRespuesta(
        this.personaBuscada.identidad,
        this.personaBuscada.idgrados,
        0,
        this.mostrarMontos
    )
    }

}
 async solicitarToken(): Promise<string | null> {
  const { value: token } = await Swal.fire({
    title: 'Validación de datos',
    text: 'Ingrese el código de 6 caracteres de Google Authenticator.',
    input: 'text',
    inputPlaceholder: 'Ingrese su token',

    inputAttributes: {
      maxlength: '6',
      minlength: '6',
      autocomplete: 'one-time-code'
    },

    showCancelButton: true,
    confirmButtonText: 'Validar',
    cancelButtonText: 'Cancelar',
    allowOutsideClick: false,
    allowEscapeKey: false,

    inputValidator: (value) => {

      const token = String(value || '').trim();

      if (!token) {
        return 'Debe ingresar el token.';
      }

      if (!/^[A-Za-z0-9]{6}$/.test(token)) {
        return 'El token debe contener exactamente 6 caracteres';
      }

      return undefined;
    }
  });

  if (!token) {
    return null;
  }

  return String(token).trim();
}


async  confirmarDonacion() {



    const monto = this.otroMonto || this.montoSeleccionado;

    if([4,5,6,0].includes(this.personaBuscada.nivel) && monto<=99){
          this._ServicioBackendService.mensajeError("Aporte minimo es de 100 Lp.")
          return
    } 

    const resultado = await Swal.fire({
  title: 'Confirmar aporte',
  html: `¿Está seguro de que desea donar <strong>L. ${monto.toFixed(2)}</strong>? ❤️`,
  icon: 'question',
  showCancelButton: true,
  confirmButtonText: 'Sí, donar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true,
  allowOutsideClick: false
});
if(resultado){

    if (!monto || monto <= 0) {
        return;
    }

  /*  //genero el nuevo token
    const tokenGenerado = await this.generarToken();

    if (!tokenGenerado) {
      return;
    }
 */
    const tokenIngresado = await this.solicitarToken();
    if (!tokenIngresado) {
    return;
  }
 
    this.token = tokenIngresado;


   const tokenValido = await this.validarTokenGoogle();
    if (!tokenValido) {
         this._ServiciosMensajeService.mensajeMalo("Token no Valido")
        return;
    }

   
    this.guadarRespuesta(
        this.personaBuscada.identidad,
        this.personaBuscada.idgrados,
        monto,
        this.mostrarMontos
    )
 
}


}

async  confirmarDonacionTropa() {



    const monto = this.otroMonto || this.montoSeleccionado;

    if( monto<=19){
          this._ServicioBackendService.mensajeError("Aporte minimo es de 20 Lp.")
          return
    } 

    const resultado = await Swal.fire({
  title: 'Confirmar aporte',
  html: `¿Está seguro de que desea donar <strong>L. ${monto.toFixed(2)}</strong>? ❤️`,
  icon: 'question',
  showCancelButton: true,
  confirmButtonText: 'Sí, donar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true,
  allowOutsideClick: false
});
if(resultado){

    if (!monto || monto <= 0) {
        return;
    }

  /*  //genero el nuevo token
    const tokenGenerado = await this.generarToken();

    if (!tokenGenerado) {
      return;
    }
 
    const tokenIngresado = await this.solicitarToken();
    if (!tokenIngresado) {
    return;
  }
 
    this.token = tokenIngresado;


   const tokenValido = await this.validarTokenGoogle();
    if (!tokenValido) {
         this._ServiciosMensajeService.mensajeMalo("Token no Valido")
        return;
    }
 */
   
    this.guadarRespuesta(
        this.personaBuscada.identidad,
        this.personaBuscada.idgrados,
        monto,
        this.mostrarMontos
    )
 
}


}

 


guadarRespuesta(identidad,idgrados,monto,acepto){
     let  p  = {
            identidad:identidad,
            idgrados:idgrados,
            monto:monto,
            acepto: acepto,
            tipo_deduccion:"MEDIA MARATON"
        }
        this._ServiciosMensajeService.show("Guardando respuesta...")
       this._ServicioBackendService.registrarDeduccionAutorizacion(p).subscribe(
      {
        next: (Response) => {
          this._ServiciosMensajeService.hide()
          if(!Response.ok){
            this.cancelar()
             return this._ServiciosMensajeService.mensajeMalo(Response.mensaje)
          }
          this._ServiciosMensajeService.mensajeBueno("Gracias por su participación.")
          this.contar()
        this.cancelar()
        }, error: (error) => {
          this._ServiciosMensajeService.hide()
          this._ServiciosMensajeService.mensajeerrorServer();
        }
      }
    )
}

personaBuscada = null
 

async buscarPersonaIdentidad(identidad: string): Promise<boolean> {
  this._ServiciosMensajeService.show();
  try {
    if (!identidad || String(identidad).trim() === '') {
      this._ServiciosMensajeService.mensajeMalo(
        'Debe ingresar una identidad.'
      );
      return false;
    }

    const p = {
      identidad: String(identidad).trim()
    };

    const response = await firstValueFrom(
      this._ServicioBackendService.consultaPorIdentidad(p)
    );


    if (!response) {
      this._ServiciosMensajeService.mensajeMalo(
        'No se recibió respuesta del servidor.'
      );

      return false;
    }

    if (response.error) {
      this._ServiciosMensajeService.mensajeMalo(
        response.error
      );

      return false;
    }

    if (response.mensaje) {

      this._ServiciosMensajeService.mensajeMalo(
        response.mensaje
      );

      return false;
    }

  

    if (
      !response.resultado ||
      !Array.isArray(response.resultado) ||
      response.resultado.length === 0
    ) {

      this._ServiciosMensajeService.mensajeMalo(
        'No se encontró ninguna persona con la identidad indicada.'
      );

      return false;
    }

    // ==============================
    // GUARDAR PERSONA
    // ==============================
    this.personaBuscada = response.resultado[0];

   //  let t = await this.generarToken()

    return true;

  } catch (error) {

   

    this._ServiciosMensajeService.mensajeerrorServer();

    return false;

  } finally {

    this._ServiciosMensajeService.hide();

  }
}
 

async generarToken(): Promise<boolean> {

  this._ServiciosMensajeService.show();

  try {

    // ==============================
    // VALIDAR PERSONA
    // ==============================

    if (!this.personaBuscada?.identidad) {

      this._ServiciosMensajeService.mensajeMalo(
        'No se encontró la identidad de la persona.'
      );

      return false;
    }

    const p = {
      identidad: this.personaBuscada.identidad
    };


    

    // ==============================
    // SOLICITAR TOKEN AL BACKEND
    // ==============================

    const response = await firstValueFrom(
      this._ServicioBackendService.generarToken(p)
    );

   
    
    // ==============================
    // VALIDAR RESPUESTA
    // ==============================

    if (!response || response.ok !== true) {
      return false;
    }

    return true;

  } catch (error) {

    
    this._ServiciosMensajeService.mensajeerrorServer();
    return false;
  } finally {
    this._ServiciosMensajeService.hide();

  }
}
/*

validarTokenGoogle(){
   const tokenLimpio = String(this.token).trim();
   
    const p = {
      identidadusuario: this.personaBuscada.identidad,
      codigo: tokenLimpio
    };


  this.tokenValido = false
 this._ServiciosMensajeService.show("Verificando código 2FA......");
     this._ServicioBackendService.calidartoken2fa(p).subscribe({
      next:(response)=>{
       this._ServiciosMensajeService.hide()
        if(!response.ok){
                   this.tokenValido =  response.ok

        return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        } else{
        this.tokenValido =  response.ok
        
        }
      
 
      },error:(error)=>{
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })  
}
*/
async validarTokenGoogle(): Promise<boolean> {

  this.tokenValido = false;
  this._ServiciosMensajeService.show("Verificando código 2FA......");

  try {

    const tokenLimpio = String(this.token).trim();

    const p = {
      identidadusuario: this.personaBuscada.identidad,
      codigo: tokenLimpio
    };
    const response = await firstValueFrom(
      this._ServicioBackendService.calidartoken2fa(p)
    );

    if (!response || !response.ok) {
      this.tokenValido = false;

      this._ServiciosMensajeService.mensajeMalo(response?.mensaje);

      return false;
    }

    this.tokenValido = response.ok;

    return true;

  } catch (error) {

    this.tokenValido = false;

    this._ServiciosMensajeService.mensajeerrorServer();

    return false;

  } finally {

    this._ServiciosMensajeService.hide();

  }
}

 



async validarToken(): Promise<boolean> {

  this._ServiciosMensajeService.show();

  try {
   if (!this.personaBuscada?.identidad) {
      this.tokenValido = false;
      return false;
    }

 

    const tokenLimpio = String(this.token).trim();

 

    const p = {
      identidad: this.personaBuscada.identidad,
      token: tokenLimpio
    };

  
    

    const response = await firstValueFrom(
      this._ServicioBackendService.validarToken(p)
    );
   
    

    if (!response || response.ok !== true) {
      this.tokenValido = true;
      return false;
    }

     this.tokenValido = true;

 
    return true;

  } catch (error) {

     this.tokenValido = false;

    this._ServiciosMensajeService.mensajeerrorServer();

    return false;

  } finally {

    this._ServiciosMensajeService.hide();

  }
}

async validandoToken(){
  let r= await  this.validarTokenGoogle()
 
  
  if(!r) {
    Swal.fire({
  icon: 'error',
  title: 'Token no válido',
  text: 'El token ingresado no es correcto.'
});
this.cancelar2()
  }
}



cancelar2(){
  
    this.mostrarGracias = false;
    this.mostrarMontos = false;

    this.montoSeleccionado = null;
    this.otroMonto = null;
    this.mostrarOtroMonto = false;
 
 
    this.tokenValido=false

}

  token
  tokenValido = false;




contar() {
  this._ServicioBackendService.contarAutorizaciones({}).subscribe({

    next: (response: any) => {

      

      if (!response || response.ok !== true) {
        return;
      }

      this.contarRresultado.autorizado =
        Number(response.autorizados) || 0;

      this.contarRresultado.noAutorizado =
        Number(response.noAutorizados) || 0;
    },

    error: (error) => {

    

      this.contarRresultado.autorizado = 0;
      this.contarRresultado.noAutorizado = 0;
    }

  });
}

private contadorSubscription?: Subscription;

iniciarConteoAutomatico() {

  // Evita crear múltiples intervalos
  if (this.contadorSubscription) {
    return;
  }

  // Consulta inmediatamente
  this.contar();

  // Luego consulta cada 30 segundos
  this.contadorSubscription = interval(30000).subscribe(() => {
    this.contar();
  });
}

ngOnDestroy() {

  this.contadorSubscription?.unsubscribe();

}
}
