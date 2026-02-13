import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ServicioBackendService } from '../../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../../servicios/serviMensaje/servicios-mensaje.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuToeComponent } from '../../../configuraciones/toe/menu-toe/menu-toe.component';

type Opcion = 'fuerza' | 'unidad' ;

type Reporte = {
  id: string;
  titulo: string;
  descripcion?: string;
  icon: string;     // PrimeIcons: 'pi pi-...'
  categoria: string;
  ruta?: string;
};
@Component({
  selector: 'app-menu-repo-fuerza',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, TooltipModule,RadioButtonModule,MenuToeComponent],
  templateUrl: './menu-repo-fuerza.component.html',
  styleUrl: './menu-repo-fuerza.component.css',
})
export class MenuRepoFuerzaComponent {
  usuarioLoguiado
  constructor(
    private _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService
  ) { }

  ngOnInit(): void {
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarunidades()
  }
   arregloCategorias =[
  {nombre:"Oficiales",nivel:[11,12,13,14,15,16,17,18,19],id:1},
  {nombre:"Sub Oficiales",nivel:[6,8,10],id:2},
  {nombre:"Tropa",nivel:[2] ,id:3},
  {nombre:"Cadetes",nivel:[4] ,id:4},
   {nombre:"Estudiante",nivel:[3] ,id:5},
  {nombre:"Auxiliares",nivel:[1] ,id:6},  
  {nombre:"Pensionado",nivel:[22] ,id:7},
  {nombre:"Catedratico",nivel:[20] ,id:8}


 ]
  q = signal('');

  opcion: Opcion = 'fuerza';
@ViewChild('formbuscar') formbuscar!: NgForm;
  opciones = [
    { label: 'Por fuerza', value: 'fuerza' as const },
    { label: 'Por unidad', value: 'unidad' as const },
 
  ];

  categoria = signal<'Todos' | string>('Todos');

  reportes = signal<Reporte[]>([
    { id: 'r1', titulo: 'Parte por Unidad', descripcion: 'Parte de toda la Unidad', icon: 'pi pi-wallet', categoria: 'Partes', ruta: '/reportes/planilla' },
    {
      id: 'r2', titulo: 'Parte de bajas por unidad', descripcion: 'Aqui se muestran las bajas', icon: 'pi pi-percentage',
      categoria: 'Partes', ruta: '/reportes/isr'
    },
    {
      id: 'r3', titulo: 'Cambio de Categorias', descripcion: 'Aqui estan las personas que cambiaron de categoria',
      icon: 'pi pi-calendar', categoria: 'RRHH', ruta: '/reportes/vacaciones'
    },
     {
      id: 'r4', titulo: 'Bajas X Fuerza', descripcion: 'Aqui se muestran las bajas por fuerza de un mes seleccionado',
      icon: 'pi pi-asterisk', categoria: 'RRHH', ruta: '/reportes/vacaciones'
    },
    {
      id: 'r5', titulo: 'Consulta pago Vacaciones', descripcion: 'Aqui el personal que se le paga vacaciones en un mes determinado',
      icon: 'pi pi-dollar', categoria: 'RRHH', ruta: '/reportes/vacaciones'
    },
      {
      id: 'r6', titulo: 'Organizacion', descripcion: 'Consulta la organizacion completa ',
      icon: 'pi pi-clipboard', categoria: 'RRHH', ruta: '/reportes/vacaciones'
    },
    { id: 'r7', titulo: 'Parte por Fuerza,Categoria', descripcion: 'Parte de fuerza y categoria', icon: 'pi pi-microchip', categoria: 'Partes', ruta: '/reportes/planilla' },

    { id: 'r8', titulo: 'TOE', descripcion: 'Consulta TOE por Fuerza', icon: 'pi pi-asterisk', categoria: 'Partes', ruta: '/reportes/planilla' },

     

  ]);


  categorias = computed(() => {
    const set = new Set(this.reportes().map(r => r.categoria));
    return ['Todos', ...Array.from(set)];
  });


  filtrados = computed(() => {
    const texto = this.q().trim().toLowerCase();
    const cat = this.categoria();

    return this.reportes().filter(r => {
      const matchCat = cat === 'Todos' || r.categoria === cat;
      const matchText =
        !texto ||
        r.titulo.toLowerCase().includes(texto) ||
        (r.descripcion || '').toLowerCase().includes(texto) ||
        r.categoria.toLowerCase().includes(texto);

      return matchCat && matchText;
    });
  });

  VentanaSeleccionada
  destruir() {
    this.arregloListaParteUnidad = []
    this.arregloResumenParteUnidad = []
    this.arregloBajas = []
    this.arregloCambioCategoria = []
    this.VentanaSeleccionada = null
    this.arregloResultado = []
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]

  }
  abrir(r: Reporte) {
    // Aquí luego lo cambias por Router navigate.
    this.destruir()
    this.VentanaSeleccionada = r
 


  }

  seleccionarCategoria(cat: string) {
    this.categoria.set(cat);
    this.destruir()
  }

  limpiar() {
    this.q.set('');
    this.categoria.set('Todos');

  }
  arregloResumenParteUnidad: any[] = []
  arregloListaParteUnidad: any[] = []
  sacarParteUnidad(form:NgForm) {
  
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]
    let param = {
          cadena:` and unidad.idunidad= ${form.value.unidad.idunidad}` 
    }
  
    this._ServiciosMensajeService.show("Cargando parte de la unidad......");
    this._ServicioBackendService.sacarParteMenuInicio(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.arregloResumenParteUnidad = response.resultado_resumen
        this.arregloListaParteUnidad = response.resultado_lista


      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }
  sumarPropiedad<T>(
    arreglo: T[],
    propiedad: keyof T
  ): number {
    if (!Array.isArray(arreglo)) return 0;

    return arreglo.reduce((total, item) => {
      const valor = Number(item[propiedad]);
      return total + (isNaN(valor) ? 0 : valor);
    }, 0);
  }
  exportarExcelResumen(data) {
    this._ServicioBackendService.exportexcel2(data, "siapffaa")
  }

  arregloBajas: any[] = []

  sacarBajas(form) {
 
 

    let param = {
      cadena:` and unidad.idunidad=${form.value.unidad.idunidad} and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')  `
    }

    this.arregloBajas = []
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarBajasUnidad(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        this.arregloBajas = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }

    sacarBajasXFuerza(form) {
 
 let cade =""
if(form.value.categoria.id===1 || form.value.categoria.id===2){
          cade= ` and ingreso_ascenso.idfuerza=${this.usuarioLoguiado.idfuerza} and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')  and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }  else{
         cade= ` and unidad.idfuerza=${this.usuarioLoguiado.idfuerza} and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')   and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }
       /**` and  year(bajaspersonal.fecha_de_baja)=year('${form.value.fecha}-1') 
                and month(bajaspersonal.fecha_de_baja)=month('${form.value.fecha}-1')  and unidad.idfuerza=${this.usuarioLoguiado.idfuerza} 
                and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) 
                ` */
    let param = {
      cadena: cade
    }

    this.arregloBajas = []
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarBajasUnidad(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        this.arregloBajas = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }

  arregloCambioCategoria: any[] = []
  sacarCambioCategoria(form) {
    let param = {
       cadena:` and unidad.idfuerza =${this.usuarioLoguiado.idfuerza} 
        and year(fechaPrimerIngreso)=year('${form.value.fecha}-1') and month(fechaPrimerIngreso)=month('${form.value.fecha}-1')`
    }
 
    this.arregloCambioCategoria = []
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarCambioCategoria(param).subscribe({
      next: (response) => {
 
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        this.arregloCambioCategoria = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }
  ArregloUnidades = []
  sacarunidades() {

    let parametro = {
      cadena: ` and  idfuerza = ${this.usuarioLoguiado.idfuerza} `,
    };
     
    this.ArregloUnidades = [];
    this._ServiciosMensajeService.show();
    this._ServicioBackendService.sacarUnidadesArreglo(parametro).subscribe({
      next: (response) => {
      
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      this.ArregloUnidades = response.resultado
      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    }

    );


  }


    arregloListaVacacioens =[]
  puscarPersonalVacacioensFuerza(form){
   let p ={
    cadena:` and ia.idfuerza=${this.usuarioLoguiado.idfuerza}     
                and month(ia.fecha_planilla)=month('${form.value.fecha}-1')  and  c.idcategoria in (${form.value.categoria.nivel.join(',')}) `
   }
 this.arregloListaVacacioens=[]

   this._ServiciosMensajeService.show("Buscando personal.....");
 
   this._ServicioBackendService.sacaPersonalVacaciones(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloListaVacacioens = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
  }
  
 puscarPersonalVacacioensUnidad(form){
   let p ={
    cadena:` and u.idunidad=${this.usuarioLoguiado .idunidad}     
                and month(ia.fecha_planilla)=month('${form.value.fecha}-1')  and  c.idcategoria in (${form.value.categoria.nivel.join(',')}) `
   }
 this.arregloListaVacacioens=[]

   this._ServiciosMensajeService.show("Buscando personal.....");
 
   this._ServicioBackendService.sacaPersonalVacaciones(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloListaVacacioens = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
  }
  arregloOrganizacionCompleta =[]
sacarOrganizacion(form:NgForm,objeto){
this.arregloOrganizacionCompleta =[]
let q={cadena:``}
   if(objeto === "fuerza") q.cadena=` and unidad.idfuerza=${this.usuarioLoguiado.idfuerza}`
   if(objeto === "unidad") q.cadena=` and unidad.idunidad=${form.value.unidad.idunidad}`


   this.ejecucatarConsultaOrganizacion(q)
}

ejecucatarConsultaOrganizacion(p){
 

   this._ServiciosMensajeService.show("Buscando personal.....");
   this._ServicioBackendService.sacarOrganizacionCompleta(p).subscribe({
    next: (response) => {
      this._ServiciosMensajeService.hide()
      if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
      if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
      this.arregloOrganizacionCompleta = response.resultado;
    }, error: (error) => {
      this._ServiciosMensajeService.hide()
      this._ServiciosMensajeService.mensajeerrorServer();
    }
  }
  );
}
limpiar_organizacion(){
this.arregloOrganizacionCompleta =[]
this.arregloResultado=[]

}
buscar65Anos(data,objeto){
let cadena = ""
 if(objeto==="fuerza") cadena=` and unidad.idfuerza=${this.usuarioLoguiado.idfuerza} and month(fecha_nacimiento)=month('${data.value.fecha}-1')  `
 
 this.buscarPersonal_65_anos(cadena)
 
}
arregloResultado = []
buscarPersonal_65_anos(cadenita){
  let p={cadena:cadenita}
  this._ServiciosMensajeService.show("Buscando personal de 65 años o mas.....");
  this.arregloResultado = []
    this._ServicioBackendService.sacarPersonal65Anos(p).subscribe({
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
limpiar_(){
  this.arregloResultado =[]
}

listaPrimerIngreso(form,objeto){
  let cadena = ""
  if(objeto==="fuerza") cadena=` and unidad.idfuerza=${this.usuarioLoguiado.idfuerza} and month(fecha)=month('${form.value.fecha}-1') and year(fecha)=year('${form.value.fecha}-1') `
  if(objeto==="unidad") cadena=` and unidad.idunidad=${this.usuarioLoguiado.idunidad} and month(fecha)=month('${form.value.fecha}-1') and year(fecha)=year('${form.value.fecha}-1') `
 this.personalPrimerIngreso(cadena)
}
personalPrimerIngreso(cadenita){
  let p={cadena:cadenita}
  this._ServiciosMensajeService.show("Buscando personal de primer ingreso.....");
  this.arregloResultado = []
    this._ServicioBackendService.personalPrimerIngreso(p).subscribe({
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

listaAntiguedadGrado(form,objeto){
  let cadena = ""
  if(objeto==="fuerza") cadena=`    and ((YEAR(curdate())-YEAR(fechaPrimerIngreso)))>= ${form.value.anos}  and ingreso_ascenso.idfuerza =${this.usuarioLoguiado.idfuerza} `
 
 this.personalantiguedadGrado(cadena)
}
personalantiguedadGrado(cadenita){
  let p={cadena:cadenita}
  this._ServiciosMensajeService.show("Buscando personal con antiguedad en el grado.....");
  this.arregloResultado = []
    this._ServicioBackendService.sacarPersonalMas10anos(p).subscribe({
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
   sacarParteFuerza(form:NgForm) {
      let cade=""
     
      if(form.value.categoria.id===1 || form.value.categoria.id===2 ){
           cade= ` and ingreso_ascenso.idfuerza= ${this.usuarioLoguiado.idfuerza} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }else{
          cade= ` and unidad.idfuerza= ${this.usuarioLoguiado.idfuerza} and  categoria.idcategoria in (${form.value.categoria.nivel.join(',')}) `
      }

      
      cade += ` and  personal.combatiente  in (${form.value.combatiente.join(',')})   `
   
      
   
     this.arregloListaParteUnidad = []
     this.arregloResumenParteUnidad =[]
    let param = {
     cadena:cade 
    }
    this._ServiciosMensajeService.show("Cargando parte de la unidad......");
    this._ServicioBackendService.sacarParteMenuInicio(param).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        if (response.error) return this._ServiciosMensajeService.mensajeMalo(response.error);
        if (response.mensaje) return this._ServiciosMensajeService.mensajeMalo(response.mensaje);
        this.arregloResumenParteUnidad = response.resultado_resumen
        this.arregloListaParteUnidad = response.resultado_lista


      }, error: (error) => {
        this._ServiciosMensajeService.hide()

        this._ServiciosMensajeService.mensajeerrorServer();
      }
    })
  }
}