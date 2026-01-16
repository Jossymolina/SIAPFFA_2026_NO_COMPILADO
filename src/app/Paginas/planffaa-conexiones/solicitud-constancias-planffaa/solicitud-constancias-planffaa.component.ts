import { Component } from '@angular/core';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-solicitud-constancias-planffaa',
  standalone: true,
  imports: [CommonModule,
    FormsModule, Button, CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    SelectModule,
    TableModule,
    TagModule,
    DividerModule,
    ChipModule],
  templateUrl: './solicitud-constancias-planffaa.component.html',
  styleUrl: './solicitud-constancias-planffaa.component.css',
})
export class SolicitudConstanciasPlanffaaComponent {

  usuarioLogin: any;
  constructor(
    private _DatospersonalesService: ServicioBackendService,
    private _ServiciosMensajesService: ServiciosMensajeService
  ) { }


  ngOnInit(): void {
    this.usuarioLogin = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarObjetoGasto()
  }
  enter(key, data) {


    if (key.keyCode === 13) {
      if (data.nombre.length === 0) return this._ServiciosMensajesService.mensajeMalo("Rellene el campo")
      this.buscarPorNombre(data)
    }
  }
  pantalla = 1
  atras(pantalla) {
    this.pantalla = pantalla
  }
  arregloPersonaNombre = []
  buscarPorNombre(data) {

    if (data.nombre.trim().length <= 3) return this._ServiciosMensajesService.mensajeMalo("Rellene el campo, o escriba mas de 3 letras")

    let parametro = {
      cadena: ` and  nombre_id like "%${data.nombre}%"`
    }
    this._ServiciosMensajesService.show()
    this.arregloPersonaNombre = []
    this._DatospersonalesService.buscarPersonal_en_siapffa(parametro).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide()
        if (response.error) {
          this._ServiciosMensajesService.mensajeMalo(response.error)
        } else {
          if (response.mensaje) {
            this._ServiciosMensajesService.mensajeMalo(response.mensaje)
          } else {

            this.arregloPersonaNombre = response.resultado
            this.pantalla = 2
          }
        }
      }, error: () => {
        this._ServiciosMensajesService.hide()


        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }
  personaSeleccionada
  correos = []
  telefonos = []

  seleccionarPersona(data) {
    this.personaSeleccionada = data
    this._ServiciosMensajesService.show()

    this._DatospersonalesService.sacarCorreoYtelefono({ identidad: this.personaSeleccionada.identidad }).subscribe({
      next: (response) => {
        this._ServiciosMensajesService.hide()

        this.correos = response.correo
        this.telefonos = response.numero
        this.pantalla = 3
      }, error: () => {
        this._ServiciosMensajesService.hide()
        this._ServiciosMensajesService.mensajeerrorServer()
      }
    })

  }

  arregloObjeto = []
  sacarObjetoGasto() {
    this._DatospersonalesService.sacarObjetoGasto().subscribe({
      next: (responder) => {
        if (responder.error) return this._ServiciosMensajesService.mensajeMalo(responder.error)
        if (responder.mensaje) return this._ServiciosMensajesService.mensajeMalo(responder.mensaje)
        this.arregloObjeto = responder.resultado
        this.sacarEmpresa()
      }, error: () => {
        this._ServiciosMensajesService.mensajeerrorServer()
      }
    })
  }
  arregloEmpresa = []
  sacarEmpresa() {
    this._ServiciosMensajesService.show()

    this._DatospersonalesService.consultaEmpresa().subscribe({
      next: (Response) => {
        this._ServiciosMensajesService.hide();
        if (Response.error) return this._ServiciosMensajesService.mensajeMalo(Response.error);
        if (Response.mensaje) return this._ServiciosMensajesService.mensajeMalo(Response.mensaje);
        this.arregloEmpresa = Response.resultado

      }, error: () => {
        this._ServiciosMensajesService.hide();

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    })
  }

  async registrarconsanciadeCorreo(data: NgForm) {
    let espera = await this._ServiciosMensajesService.mensajePregunta("Esta segur@ de registrar esta solicitud")
    if (!espera) return

    /**
     * donde_solicitu detallw
     * 1 - colicitud corroe
     */
    if (this.telefonos.length === 0) return this._ServiciosMensajesService.mensajeMalo("Debe tener almenos un número de celular con whatsap registrado en el sistema SIAPFFAA")
    if (this.correos.length === 0) return this._ServiciosMensajesService.mensajeMalo("Debe tener almenos un correo registrado en el sistema SIAPFFAA")

    let parametro = {
      persona_solicitante: this.personaSeleccionada,
      usuario: this.usuarioLogin,
      empresa: data.value.empresa,
      tipo_constancia: this.tipoConstancia,//data.value.tipo,
      idestado_whatssap: 1,

      donde_solicito: "Correo",
      numero: "504" + this.telefonos[0].numero.replace("-", ""),
      correo: this.correos[0].correo,
      vauche_mes: data.value.mes ? data.value.mes : -1,
      objeto: data.value.objeto ? data.value.objeto : -1,
      ano_historico: data.value.ano,
      fecha_inicio: (data.value.ano ? data.value.ano + "-01-01" : data.value.mes + "-01"),
      ue_pertenece: this.personaSeleccionada.ue_pertenece

    }
    console.log(parametro)
  this._ServiciosMensajesService.show()
    this._DatospersonalesService.registrarconsanciadeCorreo(parametro).subscribe({
      next: (response) => {
        console.log(response)
        this._ServiciosMensajesService.hide()

        if (response.error) return this._ServiciosMensajesService.mensajeMalo(response.error)
        if (response.mensaje) return this._ServiciosMensajesService.mensajeMalo(response.mensaje)
        this.pantalla = 1
        return this._ServiciosMensajesService.mensajeBueno(response.resultado)

      }, error: () => {
        this._ServiciosMensajesService.hide()

        this._ServiciosMensajesService.mensajeerrorServer();
      }
    }) 
  }
  verificarPermiso(data) {
    return this._DatospersonalesService.verificarPermisos(data)

  }

  objetoSeleccionado
  empresaSeleccionada
  tipoConstancia: number | null = null;
 
}


