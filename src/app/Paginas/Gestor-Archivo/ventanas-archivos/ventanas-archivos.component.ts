import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { TableModule } from 'primeng/table';
type Ventana = "Principal" | "Compartidos";
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
    InputTextModule,
    TableModule


  ],
  templateUrl: './ventanas-archivos.component.html',
  styleUrl: './ventanas-archivos.component.css',
})
export class VentanasArchivosComponent implements OnInit, AfterViewInit {
  mostrarModalCarpeta = false
  mostrarModalRenombrar = false
  permisosVisualizacion = [
    { nombre: "C1", id: 1 }
  ]
  itemsClickDerecho: MenuItem[] = [];

  archivoSeleccionado: any;

  menuOpciones: MenuItem[] = [];


  nodosCategoria: any[] = [];

  treeCategorias: any[] = [];
  treeUnidades: any[] = [];


  categoriaSeleccionada = null;

  categoriaSeleccionadaDetalle: any = null;
  unidadesSeleccionadas: any[] = [];
  usuarioLoguiado = null

  ventanaAVisualizar: Ventana = "Principal";
  @ViewChild('cm') cm!: ContextMenu;
  @ViewChild('cmDerecho') cmDerecho!: ContextMenu;
  constructor(
    private _ServicioBackendService: ServicioBackendService,
    private _ServiciosMensajeService: ServiciosMensajeService
  ) { }


  abrirMenuClickDerecho(event: MouseEvent) {
    event.preventDefault(); // Evita el menú del navegador
    this.cmDerecho.show(event);
  }

  cambiarVentana(data) {
    this.archivos = []

    if (data === "Compartidos") {
      this.ventanaAVisualizar = data
      this.sacarDocumentosCompartidos()
    } else {
      this.breadcrumb = []
      this.ventanaAVisualizar = data
      this.archivoPadreActual = null
      this.cargarContenido()

    }

  }

  sacarDocumentosCompartidos() {
    this._ServiciosMensajeService.show();
    let p = {
      idunidad: this.usuarioLoguiado.idunidad_direccion,
    }
    this.historial = []
    this.breadcrumb = []
    this.archivos = []
    this.archivoPadreActual = null
    this._ServicioBackendService.sacarDocumentosCompartidos(p).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide();

        if (response.ok) this.archivos = response.resultado
      },
      error: () => {

        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();

      }
    });
  }

  sacarDocumentosCompartidosCarpetas_hijos(mesj = "") {
    this._ServiciosMensajeService.show();

    let p = {
      idunidad: this.usuarioLoguiado.idunidad_direccion,
      id_archivo_padre: this.archivoPadreActual ? this.archivoPadreActual.id_archivo : null

    }
    if (mesj.length >= 1) {
      console.log("", mesj)
      console.log(p)
    }

    this.archivos = []
    this._ServicioBackendService.sacarHijosDeArchivosCompartidos(p).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide();

        if (response.ok) this.archivos = response.resultado

      },
      error: () => {

        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();

      }
    });
  }


  ngOnInit(): void {
    this.usuarioLoguiado = JSON.parse(localStorage.getItem('user_login')!).user;
    
    this.sacarCategorias();

    this.sacarTodalasUnidades()
    this.itemsClickDerecho = [
      {
        label: 'Nueva Carpeta',
        icon: 'pi pi-folder-plus',
        command: () => { this.crearCarpeta() }

      },
      {
        label: 'Nuevo Archivo',
        icon: 'pi pi-file',
        command: () => {
          this.limpiarFomsubir();
          this.modalSubirArchivo = true
        }

      },
      {
        separator: true
      },

    ];
  }
  ngAfterViewInit(): void {
    this.cargarContenido()
  }

  sacarTodalasUnidades() {

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

        this.treeUnidades = nodo.map((x: any) => this.convertirTreeNodeUnidad(x));
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

      label: nodo.unidad_nombre,

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
    if (!this.usuarioLoguiado.idunidad_direccion) return this._ServiciosMensajeService.mensajeMalo("Para usar este servicio debe de estar en una Direccin/Depto o Sección")

    let p = {
      id_categoria: null,
      id_archivo_padre: this.archivoPadreActual?.id_archivo ? this.archivoPadreActual?.id_archivo : null,
      tipo: "carpeta",
      nombre: form.value.nombre,
      descripcion: "Carpeta",
      nombre_original: null,
      nombre_fisico: null,
      ruta_fisica: null,
      extension: null,
      tamano_bytes: 0,
      texto_extraido: null,
      usuario_creacion: this.usuarioLoguiado.identidad,
      estado: "activo",
      idunidad_direccion: this.usuarioLoguiado.idunidad_direccion

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



  async abrir_carpeta_compartida(item: any) {


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
 
    this.sacarDocumentosCompartidosCarpetas_hijos()

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
        {
          label: 'Renombrar',
          icon: 'pi pi-pencil',
          command: () => { this.editar() }

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
        */
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () =>
            this.eliminar()
        }
      ];

      return;
    }

    // ARCHIVOS

    this.menuOpciones = [
      {
        label: 'Descargar',
        icon: 'pi pi-download',
        command: () => {
          this.descargarArchivo(this.archivoSeleccionado)
        }
      },

      {
        separator: true
      },

      {
        label: 'Renombrar',
        icon: 'pi pi-pencil',
        command: () => { this.editar() }

      },

      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          this.eliminar();
        }
      },
      {
        label: 'Compartir',
        icon: 'pi pi-share-alt',
        command: () => {
          this.verCompartidos();
        }
      }
    ];
  }

  @ViewChild("formCambiarNombre") formCambiarNombre: NgForm
  editar() {
    if (this.archivoSeleccionado.usuario_creacion !== this.usuarioLoguiado.identidad) return this._ServiciosMensajeService.mensajeMalo("Solo el usuario que subio el archivo puede eliminarlo")
    this.mostrarModalRenombrar = true
    setTimeout(() => {
      this.formCambiarNombre.controls["nombre"].setValue(this.archivoSeleccionado.nombre)
    }, 400);
  }
  async guardarCambioNombre(): Promise<void> {
    // Validar formulario
    if (this.formCambiarNombre.invalid) {
      this._ServiciosMensajeService.mensajeMalo(
        'Ingrese un nombre válido para el archivo.'
      );
      return;
    }

    // Validar archivo seleccionado
    if (!this.archivoSeleccionado) {
      this._ServiciosMensajeService.mensajeMalo(
        'No hay ningún archivo seleccionado.'
      );
      return;
    }

    // Confirmación
    const confirmar = await this._ServiciosMensajeService.mensajePregunta(
      '¿Está seguro de cambiar el nombre de este archivo?'
    );

    if (!confirmar) {
      return;
    }

    const payload = {
      id_archivo: this.archivoSeleccionado.id_archivo,
      nombre: this.formCambiarNombre.value.nombre.trim(),
      usuario: this.usuarioLoguiado
    };


    this._ServiciosMensajeService.show();

    this._ServicioBackendService.modificarNombreArchivo(payload).subscribe({
      next: (response: any) => {

        this._ServiciosMensajeService.hide();

        if (response.error) {
          this._ServiciosMensajeService.mensajeMalo(response.error);
          return;
        }

        if (response.mensaje) {
          this._ServiciosMensajeService.mensajeMalo(response.mensaje);
          return;
        }

        // Actualizar el nombre localmente
        this.archivoSeleccionado.nombre = payload.nombre;

        // Cerrar modal
        this.mostrarModalRenombrar = false;

        // Recargar listado
        this.cargarContenido();

        this._ServiciosMensajeService.mensajeBueno(
          'El nombre del archivo se actualizó correctamente.'
        );
      },

      error: (err) => {


        this._ServiciosMensajeService.hide();
        this._ServiciosMensajeService.mensajeerrorServer();
      }
    });
  }
  async eliminar(): Promise<void> {
    // Validar que exista un archivo seleccionado

    if (this.archivoSeleccionado.usuario_creacion !== this.usuarioLoguiado.identidad) return this._ServiciosMensajeService.mensajeMalo("Solo el usuario que subio el archivo puede eliminarlo")

    if (!this.archivoSeleccionado) {
      this._ServiciosMensajeService.mensajeMalo(
        'Debe seleccionar un archivo para eliminar.'
      );
      return;
    }

    // Confirmación del usuario
    const confirmar = await this._ServiciosMensajeService.mensajePregunta(
      '¿Está seguro de eliminar este archivo?\n\n' +
      'El archivo será enviado a la papelera y podrá recuperarse durante los próximos 90 días.'
    );

    if (!confirmar) {
      return;
    }

    // Objeto a enviar al backend
    const payload = {
      estado: 'ELIMINADO',
      id_archivo: this.archivoSeleccionado.id_archivo,
      usuario: this.usuarioLoguiado
    };




    this._ServicioBackendService.eliminacionLogicaArchivo(payload).subscribe({
      next: (response: any) => {

        // Error devuelto por el backend
        if (response.error) {
          this._ServiciosMensajeService.mensajeMalo(response.error);
          return;
        }

        // Mensaje de validación
        if (response.mensaje) {
          this._ServiciosMensajeService.mensajeMalo(response.mensaje);
          return;
        }

        // Éxito
        this._ServiciosMensajeService.mensajeBueno(
          'El archivo fue enviado a la papelera correctamente.'
        );

        // Limpiar selección
        this.archivoSeleccionado = null;

        // Recargar contenido
        this.cargarContenido();
      },

      error: (err) => {


        this._ServiciosMensajeService.mensajeerrorServer();
      }
    });
  }

  crearCarpetaHija() {
    this.mostrarModalCarpeta = true
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



  async volverCompartido() {
 

    if (this.historial.length === 0) {

      this.archivoPadreActual = null;

      this.breadcrumb = [];

      this.sacarDocumentosCompartidos();

      return;
    }

    this.archivoPadreActual = this.historial.pop();

    this.breadcrumb.pop();

    this.sacarDocumentosCompartidosCarpetas_hijos();
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


  archivo_documento: File[] = [];

  seleccionarArchivo(event: any) {

    if (event.target.files && event.target.files.length > 0) {

      this.archivo_documento = Array.from(event.target.files);//event.target.files[0];


    }

  }


  @ViewChild("formArchivo") formArchivo: NgForm
  /*
  subirArchivo() {
   
   const unidadesLimpias = this.unidadesSeleccionadas.map((unidad: any) => ({
              key: unidad.key,
              label: unidad.label,
              data: unidad.data
            }));
   
  
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
          this.modalSubirArchivo = false
          this.formArchivo.reset()
  
        },
        error: () => {
  
          this._ServiciosMensajeService.hide();
          this._ServiciosMensajeService.mensajeerrorServer();
  
        }
      });
   
  }
  */
  @ViewChild('archivo') archivo!: ElementRef;
  async subirArchivo() {
    if (!this.usuarioLoguiado.idunidad_direccion) return this._ServiciosMensajeService.mensajeMalo("Para usar este servicio debe de estar en una Direccin/Depto o Sección")
    if (this.unidadesSeleccionadas) {
      let mismaUnidad = this.unidadesSeleccionadas.find(element => { return Number(element.key) === Number(this.usuarioLoguiado.idunidad_direccion) })
      if (mismaUnidad) return this._ServiciosMensajeService.mensajeMalo("No puede compartise el archivo con la misma unidad que sube el documento")
    }

    let r = await this._ServiciosMensajeService.mensajePregunta("Esta seguro")
    if (!r) return
    let unidadesLimpias = []
    if (this.unidadesSeleccionadas) {
      unidadesLimpias = this.unidadesSeleccionadas.map((unidad: any) => ({
        key: unidad.key,
        label: unidad.label,
        data: unidad.data
      }));
    }



    if (this.formArchivo.value.descripcion.length > 400) {
      return this._ServiciosMensajeService.mensajeMalo(
        "Descripción de máximo 400 caracteres"
      );
    }
    if (this.archivo_documento.length >= 5) return this._ServiciosMensajeService.mensajeMalo("Maximo 5 Archivos a  la ves")

    if (!this.archivo_documento || this.archivo_documento.length === 0) {

      this._ServiciosMensajeService.mensajeAdvertencia(
        'Seleccione al menos un archivo'
      );

      return;
    }

    const formData = new FormData();

    formData.append(
      'id_archivo_padre',
      this.archivoPadreActual?.id_archivo?.toString() ?? ''
    );

    formData.append(
      'id_categoria',
      this.categoriaSeleccionada ? this.categoriaSeleccionada.data.id_categoria : null
    );

    formData.append('tipo', 'ARCHIVO');

    // Nombre general (opcional)
    formData.append(
      'nombre',
      this.archivo_documento.length === 1
        ? this.archivo_documento[0].name
        : 'Carga múltiple'
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

    // Agregar todos los archivos
    this.archivo_documento.forEach((archivo) => {
      formData.append('archivos', archivo);
    });

    formData.append(
      'unidades',
      JSON.stringify(unidadesLimpias)
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



          this.cargarContenido();

          this.modalSubirArchivo = false;

          this.formArchivo.reset();
          this.archivo_documento = [];
          this.archivo.nativeElement.value = '';
        },
        error: () => {

          this._ServiciosMensajeService.hide();

          this._ServiciosMensajeService.mensajeerrorServer();

        }
      });

  }
  limpiarFomsubir() {
    setTimeout(() => {
      this.formArchivo.reset();
      this.archivo_documento = [];
      this.archivo.nativeElement.value = '';
    }, 300)

  }
  buscarDocumento_en_archivos(form) {
    let p = {
      texto: form.value.texto,
      id_direccion: this.usuarioLoguiado.idunidad_direccion
    }
    if (form.value.texto.trim() === "") return this.cargarContenido()
    this._ServiciosMensajeService.show()
    this._ServicioBackendService.buscarDocumento_en_archivos(p).subscribe({
      next: (response) => {
        this._ServiciosMensajeService.hide()

        this.archivos = response.resultado
      }, error: () => {
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer()
      }
    })
  }


  descargarArchivo(item) {
    this._ServiciosMensajeService.show()
    let p = {
      id_archivo_documentos: item.id_archivo,
      usuario: this.usuarioLoguiado
    }
    this._ServiciosMensajeService.show()
    this._ServicioBackendService.obtenerArchivo(p).subscribe({
      next: (blob: Blob) => {
        this._ServiciosMensajeService.hide()
        const url = window.URL.createObjectURL(blob);

        window.open(url, '_blank');
      }, error: () => {
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer()
      }
    });
  }

  mostrarDialogCompartir = false
  aregloUnidadCompartidas = []
  verCompartidos() {
    this.mostrarDialogCompartir = true
    let p = {
      idarchivo: this.archivoSeleccionado.id_archivo
    }
    this.aregloUnidadCompartidas = []

    this._ServiciosMensajeService.show()
    this._ServicioBackendService.sacarCompartidoArchivos(p).subscribe({
      next: (resultado) => {
        this._ServiciosMensajeService.hide()

        if (!resultado.ok) return this._ServiciosMensajeService.mensajeMalo(resultado.mensaje)
        this.aregloUnidadCompartidas = resultado.resultado

      }, error: () => {
        this._ServiciosMensajeService.hide()
        this._ServiciosMensajeService.mensajeerrorServer()
      }
    });

  }

  
  compartirArchivo() {
 const idUnidadUsuario = Number(this.usuarioLoguiado.idunidad_direccion);

const unidadesYaCompartidas = this.unidadesSeleccionadas.filter(
  (seleccionada: any) =>
    this.aregloUnidadCompartidas.some(
      (compartida: any) =>
        Number(seleccionada.key) === Number(compartida.idunidad)
    )
);

const unidadPropiaSeleccionada = this.unidadesSeleccionadas.find(
  (seleccionada: any) =>
    Number(seleccionada.key) === idUnidadUsuario
);


if (unidadPropiaSeleccionada) {
    this._ServiciosMensajeService.mensajeMalo('Su unidad ya tiene acceso automáticamente al archivo.')
 

  return;
}

if (unidadesYaCompartidas.length > 0) {

  const nombres = unidadesYaCompartidas
    .map((item: any) => item.label)
    .join(', ');
  this._ServiciosMensajeService.mensajeMalo(`Unidades ya compartidas \nLas siguientes unidades ya tienen acceso: ${nombres}.`)
 

  return;
}

 
    

    if (!this.unidadesSeleccionadas?.length) {
      return;
    }

    const unidades = this.unidadesSeleccionadas.map(
      (item: any) => Number(item.key)
    );
 const unidades_completas = this.unidadesSeleccionadas.map(
  (item: any) => item.data
);

    const data = {
      idarchivo: this.archivoSeleccionado.id_archivo,
      unidades: unidades,
      usuario:this.usuarioLoguiado,
      unidades_detalle: unidades_completas,
      archivo_seleccionado:this.archivoSeleccionado
    };

    this._ServicioBackendService.compartir_recompartir_Archivo(data).subscribe({
      next: (resp: any) => {
        if(!resp.ok) return this._ServicioBackendService.mensajeError(resp.mensaje)

          this._ServiciosMensajeService.mensajeBueno(resp.mensaje)
          this.unidadesSeleccionadas = [];
        // Opcional: recargar unidades compartidas
        this.verCompartidos()
      },
      error: (error) => {
this._ServiciosMensajeService.mensajeMalo(error)

      }
    });
  }


  eliminarCompartido(item){

if (!item?.idarchivo_documentos_unidad) {
    return;
  }

  const data = {
    idarchivo_documentos_unidad: item.idarchivo_documentos_unidad,
    usuario:this.usuarioLoguiado,
    unidades_detalle: item,
      archivo_seleccionado:this.archivoSeleccionado
  };
  this._ServiciosMensajeService.show()

  this._ServicioBackendService.eliminarCompartido(data).subscribe({
    next: (resp: any) => {
      this._ServiciosMensajeService.hide()
      this.verCompartidos()
    },
    error: (error) => {
      this._ServiciosMensajeService.hide()
this._ServiciosMensajeService.mensajeMalo(error)

    }
  });
  }
}
