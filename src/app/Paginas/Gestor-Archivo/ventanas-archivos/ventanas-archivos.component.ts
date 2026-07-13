import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ServicioBackendService } from '../../../servicios/servicio-backend.service';
import { ServiciosMensajeService } from '../../../servicios/serviMensaje/servicios-mensaje.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-ventanas-archivos',
  standalone: true,
  imports: [
    TreeSelectModule,
    FormsModule,
    CommonModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    InputTextModule

  ],
  templateUrl: './ventanas-archivos.component.html',
  styleUrl: './ventanas-archivos.component.css',
})
export class VentanasArchivosComponent implements OnInit,AfterViewInit  {
mostrarModalCarpeta = false

permisosVisualizacion = [
  {nombre:"C1",id:1}
]


  @ViewChild('cm')
  cm!: ContextMenu;

  archivoSeleccionado: any;

  menuOpciones: MenuItem[] = [];

  constructor(
    private _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService
  ) { }

  nodosCategoria: any[] = [];

  treeCategorias: any[] = [];
  treeUnidades: any[] = [];


  categoriaSeleccionada = null;

  categoriaSeleccionadaDetalle: any = null;
unidadesSeleccionadas: any[] = [];
usuarioLoguiado = null
  ngOnInit(): void {
  this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    this.sacarCategorias();
  
   this.sacarTodalasUnidades()
  }
  ngAfterViewInit(): void {
    console.log(this.usuarioLoguiado )
    this.cargarContenido()
  }

sacarTodalasUnidades(){
  
    this._ServiciosMensajeService.show();

    this._ServicioBackendService.sacarTodalasUnidades().subscribe({
      next: (response) => {

        this._ServiciosMensajeService.hide();
       
       const unidades = response.resultado || [];
        let nodo = unidades.filter((x: any) => x.id_unidad_padre == null)
          .map((x: any) =>
            this.construirJerarquiaUnidades(
              x,
              unidades
            )
          );
       
           this.treeUnidades = nodo.map((x: any) =>  this.convertirTreeNodeUnidad(x)   );
           console.log(this.treeUnidades)
      },
      error: () => {

        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();

      }
    });
}
  sacarCategorias() {

    this._ServiciosMensajeService.show();

    this._ServicioBackendService.obtenerCategoriaArchivos().subscribe({
      next: (response) => {

        this._ServiciosMensajeService.hide();

        const categorias = response.data || [];

        this.nodosCategoria = categorias.filter((x: any) => x.categoria_padre == null)
          .map((x: any) =>
            this.construirJerarquia(
              x,
              categorias
            )
          );

        this.treeCategorias = this.nodosCategoria.map((x: any) =>
          this.convertirTreeNode(x)
        );



      },
      error: () => {

        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();

      }
    });

  }

  private construirJerarquia(
    item: any,
    categorias: any[],
    rutaPadre: string = ''
  ): any {

    const rutaActual = rutaPadre
      ? `${rutaPadre} > ${item.nombre}`
      : item.nombre;

    const hijos = categorias
      .filter(x => x.categoria_padre == item.id_categoria)
      .map(x =>
        this.construirJerarquia(
          x,
          categorias,
          rutaActual
        )
      );

    return {
      ...item,
      ruta: rutaActual,
      hijos
    };

  }

  private construirJerarquiaUnidades(
    item: any,
    unidad: any[],
    rutaPadre: string = ''
  ): any {

    const rutaActual = rutaPadre
      ? `${rutaPadre} > ${item.unidad_nombre}`
      : item.unidad_nombre;

    const hijos = unidad
      .filter(x => x.id_unidad_padre == item.idunidad)
      .map(x =>
        this.construirJerarquiaUnidades(
          x,
          unidad,
          rutaActual
        )
      );

    return {
      ...item,
      ruta: rutaActual,
      hijos
    };

  }

  private convertirTreeNodeUnidad(
  nodo: any
): any {

  const esHoja = nodo.seleccionable ? true : false // nodo.hijos.length === 0;

  return {

    key: String(nodo.idunidad),

    label:  nodo.unidad_nombre,

    data: nodo,

    selectable: esHoja,

    icon: esHoja
      ? 'pi pi-building'
      : 'pi pi-sitemap',

    children: nodo.hijos.map((h: any) =>
      this.convertirTreeNodeUnidad(h)
    )

  };

}


  private convertirTreeNode(
    nodo: any
  ): any {

    const esHoja = nodo.hijos.length === 0;

    return {

      key: String(nodo.id_categoria),

      label: `${nodo.codigo} - ${nodo.nombre}`,

      data: nodo,

      selectable: esHoja,

      icon: esHoja
        ? 'pi pi-file'
        : 'pi pi-folder',

      children: nodo.hijos.map((h: any) =>
        this.convertirTreeNode(h)
      )

    };

  }


  private buscarNodo(
    nodos: any[],
    key: string
  ): any {

    for (const nodo of nodos) {

      if (nodo.key == key) {
        return nodo.data;
      }

      const encontrado =
        this.buscarNodo(
          nodo.children || [],
          key
        );

      if (encontrado) {
        return encontrado;
      }

    }

    return null;

  }
  crear_archivo_documento(form) {

    let p = {
      id_categoria: null,
      id_archivo_padre: this.archivoPadreActual?.id_archivo?this.archivoPadreActual?.id_archivo:null,
      tipo: "carpeta",
      nombre: form.value.nombre,
      descripcion: "Carpeta",
      nombre_original: null,
      nombre_fisico: null,
      ruta_fisica: null,
      extension: null,
      tamano_bytes: 0,
      texto_extraido: null,
      usuario_creacion: 2,
      estado: "activo",
      idunidad_direccion:this.usuarioLoguiado.idunidad_direccion
      
    }
 

    this._ServiciosMensajeService.show();

    this._ServicioBackendService.crearCarpeta(p).subscribe({
      next: (response) => {

        this._ServiciosMensajeService.hide();
          this.cargarContenido()

      },
      error: () => {

        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();

      }
    }); 
  }


  archivos
  cargarContenido() {
    const params: any = {};

    if (this.archivoPadreActual) {
      params.id_archivo_padre = this.archivoPadreActual.id_archivo;
    
     
    }
      params.idunidad_dir = this.usuarioLoguiado.idunidad_direccion;
    console.log(params)
    this._ServiciosMensajeService.show()
    this._ServicioBackendService.obtenerArchivos_(params).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()
        this.archivos = response.data
      }, error: () => {
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer()
      }
    });

  }
  archivoPadreActual
  historial = []
 async abrir(item: any) {

  if (item.tipo !== 'CARPETA') {
    return;
  }

  if (this.archivoPadreActual) {

    this.historial.push(
      this.archivoPadreActual
    );

  }

  this.archivoPadreActual = item;

  this.breadcrumb.push({
    id_archivo: item.id_archivo,
    nombre: item.nombre
  });

  this.cargarContenido();
}

  async cargarRuta() {

    if (!this.archivoPadreActual) {

      this.breadcrumb = [];
 
      return;
    }


  }
abrirDesdeRuta(item: any) {

  const index =
    this.breadcrumb.findIndex(
      x => x.id_archivo === item.id_archivo
    );

  this.breadcrumb =
    this.breadcrumb.slice(
      0,
      index + 1
    );

  this.archivoPadreActual = item;

  this.cargarContenido();
}



  mostrarMenu(event: any, item: any) {

    event.preventDefault();

    this.archivoSeleccionado = item;

    this.construirMenu();

    this.cm.show(event);
  }


  mostrarMenuBoton(event: any, item: any) {
    this.archivoSeleccionado = item;

    this.construirMenu();

    this.cm.show(event);
  }

  construirMenu() {

    if (this.archivoSeleccionado.tipo === 'CARPETA') {

      this.menuOpciones = [

        {
          label: 'Abrir',
          icon: 'pi pi-folder-open',
          command: () =>
            this.abrir(this.archivoSeleccionado)
        },

        {
          separator: true
        },

        {
          label: 'Nueva carpeta',
          icon: 'pi pi-folder-plus',
          command: () =>
            this.crearCarpetaHija()
        },
/*
        {
          label: 'Subir archivo',
          icon: 'pi pi-upload',
          command: () =>
            this.subirArchivo()
        },

        {
          separator: true
        },

        {
          label: 'Renombrar',
          icon: 'pi pi-pencil',
          command: () =>
            this.editar()
        },

        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () =>
            this.eliminar()
        }*/
      ];

      return;
    }

    // ARCHIVOS

    this.menuOpciones = [

      {
        label: 'Abrir',
        icon: 'pi pi-eye'
      },

      {
        label: 'Descargar',
        icon: 'pi pi-download'
      },

      {
        separator: true
      },

      {
        label: 'Renombrar',
        icon: 'pi pi-pencil'
      },

      {
        label: 'Eliminar',
        icon: 'pi pi-trash'
      }
    ];
  }
  editar() {

  }
  eliminar() {

  }

  crearCarpetaHija() {
this.mostrarModalCarpeta=true
  }
 
  crearCarpeta() {
this.mostrarModalCarpeta = true;
  }

  menuRaiz(event: any) {

    event.preventDefault();

    this.menuOpciones = [

      {
        label: 'Nueva carpeta',
        icon: 'pi pi-folder-plus',
        command: () =>
          this.crearCarpeta()
      },

      {
        label: 'Subir archivo',
        icon: 'pi pi-upload',
        command: () =>
          this.subirArchivo()
      },

      {
        label: 'Actualizar',
        icon: 'pi pi-refresh',
        command: () =>
          this.cargarContenido()
      }
    ];

    this.cm.show(event);
  }










  breadcrumb: any[] = [];

  async irInicio() {

    this.archivoPadreActual = null;

    this.historial = [];

    this.breadcrumb = [];

    await this.cargarContenido();
  }

  async irRaiz() {

    this.archivoPadreActual = null;

    this.historial = [];

    this.breadcrumb = [];

    await this.cargarContenido();
  }


async volver() {

  if (this.historial.length === 0) {

    this.archivoPadreActual = null;

    this.breadcrumb = [];

    this.cargarContenido();

    return;
  }

  this.archivoPadreActual =
    this.historial.pop();

  this.breadcrumb.pop();

  this.cargarContenido();
}

 


 
onCategoriaChange(idCategoria: string) {
 /*
  this.categoriaSeleccionadaDetalle =
    this.buscarNodo(
      this.treeCategorias,
      idCategoria
    );

   
  this.archivoPadreActual = null;

  this.historial = [];

  this.breadcrumb = [];

  this.cargarContenido();*/
}

modalSubirArchivo = false


archivo_documento: File | null = null;

seleccionarArchivo(event: any) {

  if (event.target.files && event.target.files.length > 0) {

    this.archivo_documento = event.target.files[0];


  }

}


@ViewChild("formArchivo")formArchivo:NgForm
subirArchivo() {
 
 const unidadesLimpias = this.unidadesSeleccionadas.map((unidad: any) => ({
            key: unidad.key,
            label: unidad.label,
            data: unidad.data
          }));
 
          console.log(unidadesLimpias)

  if(this.formArchivo.value.descripcion.length >400) return this._ServiciosMensajeService.mensajeMalo("Descripcion en menos de 400 caracteres")

    
  if (!this.archivo_documento) {

    this._ServiciosMensajeService.mensajeAdvertencia(
      'Seleccione un archivo'
    );

    return;
  }

  const formData = new FormData();

  formData.append(
    'id_archivo_padre',
    this.archivoPadreActual?.id_archivo?.toString() ?? ''
  );

  formData.append('id_categoria', this.categoriaSeleccionada.data.id_categoria);
  formData.append('tipo', 'ARCHIVO');

  formData.append(
    'nombre',
    this.archivo_documento.name
  );

  formData.append(
    'descripcion',
    this.formArchivo.value.descripcion
  );

  formData.append(
    'usuario_creacion',
    this.usuarioLoguiado.identidadusuario
  );

  formData.append(
    'estado',
    'ACTIVO'
  );

  formData.append(
    'archivo',
    this.archivo_documento
  );

    formData.append(
    'unidades',
    JSON.stringify( unidadesLimpias)
  );
   formData.append(
    'idunidad_direccion',
    this.usuarioLoguiado.idunidad_direccion
  );

  
  this._ServiciosMensajeService.show();
 
  this._ServicioBackendService
    .crear_archivo_documentos(formData)
    .subscribe({
      next: () => {

        this._ServiciosMensajeService.hide();

        this.archivo_documento = null;

        this.cargarContenido();

      },
      error: () => {

        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();

      }
    });
 
}

buscarDocumento_en_archivos(form){
  console.log(this.usuarioLoguiado)
  let  p  = {
    texto : form.value.texto,
    id_direccion:this.usuarioLoguiado.idunidad_direccion
  }
  console.log(p)
  if( form.value.texto.trim()==="") return this.cargarContenido()
  this._ServiciosMensajeService.show()
console.log("22222222222222222")
this._ServicioBackendService.buscarDocumento_en_archivos(p).subscribe({
  next:(response)=>{
    console.log(response)
      this._ServiciosMensajeService.hide()
      
      this.archivos = response.resultado
  },error:()=>{
    this._ServiciosMensajeService.hide()
    this._ServiciosMensajeService.mensajeerrorServer()
  }
})
}


descargarArchivo(item){
 this._ServiciosMensajeService.show()
  this._ServicioBackendService.obtenerArchivo(item.id_archivo).subscribe({
  next: (blob: Blob) => {
this._ServiciosMensajeService.hide()
    const url = window.URL.createObjectURL(blob);

    window.open(url, '_blank');
  },error:()=>{
this._ServiciosMensajeService.hide()
this._ServiciosMensajeService.mensajeerrorServer()
  }
});
}

}
