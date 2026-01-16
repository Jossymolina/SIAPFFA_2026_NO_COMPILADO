import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

import * as XLSX from 'xlsx';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServiciosMensajeService } from './serviMensaje/servicios-mensaje.service';

@Injectable({
  providedIn: 'root',
})
//ng build --aot --output-hashing=all
export class ServicioBackendService {
  public url2 = "https://siapfa.ffaa.mil.hn:4443/" //"http://localhost:3978/" //"https://siapfa.ffaa.mil.hn:4443/"
  refrescar = 0
  public url ="https://siapfa.ffaa.mil.hn:4443/" //"http://localhost:3978/" //"https://siapfa.ffaa.mil.hn:4443/"     
  usuarioLogin: any;
  token = "";

  arregloPermisos = new Array();



  arregloFirmantes_RRHH = [
    {
      nombre: "Gerardo Antonio Arguijo Valenzuela", grado: "Capitan Auxiliar de Administración",
      serie: "FAHOA-0513", titulo_doc: "El suscrito Jefe de Recursos Humanos de la SEDENA", cargo: "", idunidad: 107
    }
  ]
  constructor(public http: HttpClient,
    private router: Router,
    private _ServiciosMensajeService: ServiciosMensajeService


  ) { }
  sacarCambioCategoria(data){
    return this.metodopost('sacarCambioCategoria', data);
  }
  verificar2FA(data, token) {
    return this.metodopostAlGenerar2FA("verificar2FA", data, token)

  }
  validarEntradaConToken(data, token) {
    return this.metodopostAlGenerar2FA("verificar2FA", data, token)
  }
  metodopostAlGenerar2FA(link, data, token): Observable<any> {
    var json = JSON.stringify(data)
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token + ";V10"
    });
    return this.http.post(this.url + link, json, { headers: headers });
  }
  generar2FA(data, token) {
    return this.metodopostAlGenerar2FA("generar2FA", data, token)
  }
  ejecutarSqlSoloLectura(data) {
    return this.metodopost("ejecutarSqlSoloLectura", data)
  }
  cabeceras() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("user_login") ? JSON.parse(localStorage.getItem("user_login")).token + this.getControlVersion() : ""
    });
  }
  buscarPersonal_en_siapffa(data) {
    return this.metodopost("buscarPersonal_en_siapffa_planffaa", data)
  }
  sacarCorreoYtelefono(data) {
    return this.metodopost("sacarCorreoYtelefono_planffaa", data)
  }
  registrarconsanciadeCorreo(data) {
    return this.metodopost("registrarconsanciadeCorreo_planffaa", data)
  }
  consultaEmpresa() {
    return this.metodoget("consultaEmpresa_planffaa")
  }
  sacarObjetoGasto() {
    return this.metodoget("sacarObjetosGasto_planffaa");
  }
  sacarfirmanteRRHH(idunidad) {
    return this.arregloFirmantes_RRHH.find((Element) => {
      return Element.idunidad === idunidad
    })
  }
  sacarDatosDeReporteVacaciones(data) {
    return this.metodopost("sacarDatosDeReporteVacaciones", data)
  }
  guardarHistorialVisualizarPerfil(data) {
    return this.metodopost("guardarHistorialVisualizarPerfil", data)
  }
  modificarRTN(data) {
    return this.metodopost("modificarRTN", data)
  }
  agregarArchivos_nuevo(data: FormData): Observable<any> {

    var headers = new HttpHeaders({
      "Authorization": this.getToken()
    });
    return this.http.post(this.url + "agregarArchivos_nuevo", data, { headers: headers });
  }

  sacarDocumentosBajas(data) {
    return this.metodopost("sacarDocumentosBajas", data)
  }
  sacarTodo_losGrados() {
    return this.metodoget("sacarTodo_losGrados")
  }
  sacarHistorialPorPersona(data) {
    return this.metodopost("sacarHistorialPorPersona", data)
  }
  AnosServicios35(data) {
    return this.metodopost("AnosServicios35", data)
  }
  sacarOrganizacion(data) {
    return this.metodopost("sacarOrganizacion", data)
  }

  sacarDetallePersonalSituacion(data) {
    return this.metodopost("sacarDetallePersonalSituacion", data)
  }
  sacarpersonalGradoedad(data) {
    return this.metodopost("sacarpersonalGradoedad", data)
  }
  sacarPersonalCambioCategoria(data) {
    return this.metodopost("sacarPersonalCambioCategoria", data)
  }
  desactivarSituacion(data) {
    return this.metodopost("desactivarSituacion", data)
  }
  sacarSituacionPersonal(data) {
    return this.metodopost("sacarSituacionPersonal", data)
  }
  parte_varios() {
    return this.metodoget("parte_varios")
  }
  sacarPersonalSinCargo() {
    return this.metodoget("sacarPersonalSinCargo")
  }
  bajasOficialesySub(data) {
    return this.metodopost("bajasOficialesySub", data)
  }
  actualizarDireccion(data) {
    return this.metodopost("actualizarDireccion", data)
  }
  actualizarNombrePuesto(data) {
    return this.metodopost("actualizarNombrePuesto", data)
  }
  sacarPersonas_pagos_gargo() {
    return this.metodoget("sacarPersonas_pagos_gargo")
  }
  sacarListaCargosPorPago() {
    return this.metodoget("sacarListaCargosPorPago")
  }
  //Ojo
  agregarDescargoRadio(data: FormData): Observable<any> {
    var headers = new HttpHeaders({
      "Authorization": this.getToken() || ""
    });
    return this.http.post(this.url + "agregarDescargoRadio", data, { headers: headers });
  }

  buscarPersonasporNombreID(data) {
    return this.metodopost("buscarPersonasporNombreID", data)
  }
  intelegenciaArtificial_(data) {
    return this.metodopost("intelegenciaArtificial_", data)
  }
  guardarSituacionPersonal(data) {
    return this.metodopost("guardarSituacionPersonal", data)
  }
  sacarDetalleSituacion(data) {
    return this.metodopost("sacarDetalleSituacion", data)
  }
  sacarSituacion() {
    return this.metodoget("sacarSituacion")
  }
  sacarTotoCursosMilitares() {
    return this.metodoget("sacarTotoCursosMilitares")
  }
  sacararmasArreglo(data) {
    return this.metodopost("sacararmasArreglo", data)
  }

  sacarProfecionArreglo(data) {
    return this.metodopost("sacarProfecionArreglo", data)
  }
  busquedaglobal(data) {
    return this.metodopost("busquedaglobal", data)
  }
  sacarUnidadesArreglo(data) {
    return this.metodopost("sacarUnidadesArreglo", data)
  }
  sacaArmaYAccesoriosPersona(data) {
    return this.metodopost("sacaArmaYAccesoriosPersona", data)
  }
  vistaSiapffaa(data) {

    return this.metodopost("vistaSiapffaa", data)
  }
  consultaPorIdentidad(data: any) {
    return this.metodopost("consultaPorIdentidad", data)
  }
  islogin() {
    return localStorage.getItem("user_login") ? this.arregloPermisos = JSON.parse(localStorage.getItem("user_login")) : "";
  }

  getrefrescar() {
    return this.refrescar;
  }
  metodoget(data): Observable<any> {
    return this.http.get(this.url + data, { headers: this.cabeceras() })
      .pipe(
        tap((res: any) => {
          if (res?.codigo_error) {
            this._ServiciosMensajeService.mensajeMalo(res.mensaje || "Error desconocido");
            if ([2001, 2002, 2003].includes(res?.codigo_error)) {
              this.router.navigate(['/autenticarse']);
            }
          }
        })
      );
  }

  metodopost(link, data): Observable<any> {
    const json = JSON.stringify(data);
    return this.http.post(this.url + link, json, { headers: this.cabeceras() })
      .pipe(
        tap((res: any) => {
          if (res?.codigo_error) {
            // Mostrar mensaje de error
            this._ServiciosMensajeService.mensajeMalo(
              res.mensaje || 'Error desconocido'
            );
            if ([2001, 2002, 2003].includes(res?.codigo_error)) {
              this.router.navigate(['/autenticarse']);
            }
            // Si es error de sesión → cerrar y redirigir

          }

        })
      );
  }


  /*De aqui empiesan las rutas viejas*/
  cuadroPoblacion(data): Observable<any> {
    return this.metodopost('cuadroPoblacion', data);
  }
  sacarTelefonodeAdministradoresdeFuuerza(data): Observable<any> {
    return this.metodopost('sacarTelefonodeAdministradoresdeFuuerza', data);
  }
  guardarPlanilla(data): Observable<any> {
    return this.metodopost('guardarPlanilla', data);
  }
  sacarPersonalSegunCursoMilitar(data): Observable<any> {
    return this.metodopost('sacarPersonalSegunCursoMilitar', data);
  }
  eliminarCursodelaPersona(data) {
    return this.metodopost('eliminarCursosPersonal', data);
  }
  SacarCursosMilitaresDeUnaPersona(data): Observable<any> {
    return this.metodopost('SacarCursosMilitaresDeUnaPersona', data);
  }
  GuardarCursosmilitar(data) {
    return this.metodopost('GuardarCursosmilitar', data);
  }
  sacarFuerzaCursos(data) {
    return this.metodopost('sacarFuerzaCursos', data);
  }
  sacaurUnidadesCurso(data) {
    return this.metodopost('sacaurUnidadesCurso', data);
  }
  sacarCursosMilitares(data) {
    return this.metodopost('sacarCursosMilitares', data);
  }
  logs(data, id): Observable<any> {
    return this.http.post('logs/' + id, data);
  }
  sacarPersonalSegunProfesion(data): Observable<any> {
    return this.metodopost('sacarPersonalSegunProfesion', data);
  }
  eliminarProfesionDelaPersona(data) {
    return this.metodopost('eliminarProfesionDelaPersona', data);
  }
  sacarnivelesEducativos() {
    return this.metodoget('sacarnivelesEducativos');
  }
  cambiarnombreDocumento(data): Observable<any> {
    return this.metodopost('cambiarnombreDocumento', data);
  }
  cambiarnombreCarpetaSegundaria(data) {
    return this.metodopost('cambiarnombreCarpetaSegundaria', data);
  }
  cambiarnombreCarpetaPrincipal(data) {
    return this.metodopost('cambiarnombreCarpetaPrincipal', data);
  }

  eliminarCuposAcensos(data): Observable<any> {
    return this.metodopost('eliminarCuposAcensos', data);
  }
  actualizarcuposAcensos(data): Observable<any> {

    return this.metodopost('actualizarcuposAcensos', data);
  }
  sacarcuposAscenso(data): Observable<any> {
    return this.metodopost('sacarcuposAscenso', data);
  }
  sacarGradosSoloAscenso(data): Observable<any> {
    return this.metodopost('sacarGradosSoloAscenso', data);
  }
  AgregarCupoAscenso(data): Observable<any> {
    return this.metodopost('AgregarCupoAscenso', data);
  }
  sacarPrimerIngreso(data): Observable<any> {
    return this.metodopost('sacarPrimerIngreso', data);
  }
  eliminarUsuario(data): Observable<any> {
    return this.metodopost('eliminarUsuario', data);
  }
  modificarUsuarioAdministrarUnidad(data): Observable<any> {
    return this.metodopost('modificarUsuarioAdministrarUnidad', data);
  }
  verificarPermisos(requeridos: string[]): boolean {
    try {
      const permisos = JSON.parse(localStorage.getItem("permisos") || "[]") as any[];

      if (!Array.isArray(permisos) || permisos.length === 0) {
        return false;
      }

      // ✔ tiene al menos UNO de los permisos requeridos
      return permisos.some(p =>
        requeridos.includes(String(p.codigo_permiso))
      );

    } catch (error) {
      return false;
    }
  }
  setArregloPermisos(data) {
    localStorage.setItem("permisos", JSON.stringify(data))
    this.arregloPermisos = JSON.parse(localStorage.getItem("permisos"));
  }

  cambiarPermisoUsuario(data): Observable<any> {
    return this.metodopost('cambiarPermisoUsuario', data);
  }
  sacarPermisosDisponibles(data): Observable<any> {
    return this.metodopost('sacarPermisosDisponibles', data);
  }
  CambiarContrasena(data): Observable<any> {
    return this.metodopost('CambiarContrasena', data);
  }
  EliminarTarjetadeIngreso(data): Observable<any> {
    return this.metodopost('EliminarTarjetadeIngreso', data);
  }
  agregarnuevoscupos(data): Observable<any> {
    return this.metodopost('agregarnuevoscupos', data);
  }
  sacarGradosSegunOrden(data): Observable<any> {
    return this.metodopost('sacarGradosSegunOrden', data);
  }
  modificarSiesCombatiente(data): Observable<any> {
    return this.metodopost('modificarSiesCombatiente', data);
  }

  modificarcupo(data): Observable<any> {
    return this.metodopost('modificarcupo', data);
  }

  desactivarCupos(data): Observable<any> {
    return this.metodopost('desactivarCupos', data);
  }
  sacarControlGrados(data): Observable<any> {
    return this.metodopost('sacarControlGrados', data);
  }
  cambioIdentidad(data): Observable<any> {
    return this.metodopost('cambioIdentidad', data);
  }
  consultacorreoPersonal(data) {
    return this.metodopost('consultacorreoPersonal', data);
  }
  agregarCorreo(data) {
    return this.metodopost('agregarCorreo', data);
  }
  eliminarCorreo(data) {
    return this.metodopost('eliminarCorreo', data);
  }
  sacarpersonalPorDireccionSeccion(data): Observable<any> {
    return this.metodopost('sacarpersonalPorDireccionSeccion', data);
  }
  getMesesdelAno() {
    return new Array({ mes: "Enero", codigo: "01" }, { mes: "Febrero", codigo: "02" }, { mes: "Marzo", codigo: "03" }, { mes: "Abril", codigo: "04" }, { mes: "Mayo", codigo: "05" },
      { mes: "Junio", codigo: "06" }, { mes: "Julio", codigo: "07" }, { mes: "Agosto", codigo: "08" }, { mes: "Septiembre", codigo: "09" }, { mes: "Octubre", codigo: "10" },
      { mes: "Noviembre", codigo: "11" }, { mes: "Diciembre", codigo: "12" })
  }
  getanos() {
    var max = new Date().getFullYear()
    var min = max - 10
    var anos = []

    for (var i = max; i >= min; i--) {
      anos.push(i)
    }
    return anos
  }
  sacarDireccionAsignadoActual(data): Observable<any> {
    return this.metodopost('sacarDireccionAsignadoActual', data);
  }
  desactivarAsignacionDireccion(data): Observable<any> {
    return this.metodopost('desactivarAsignacionDireccion', data);
  }
  sacarDireccionDeAsignado(data) {
    return this.metodopost('sacarDireccionDeAsignado', data);
  }
  agregarAsignacionDireccion(data): Observable<any> {
    return this.metodopost('agregarAsignacionDireccion', data);
  }
  busquedaporEdad(data): Observable<any> {
    return this.metodopost('busquedaporEdad', data);
  }
  sacarPersonalAscenso(data): Observable<any> {
    return this.metodopost('sacarPersonalAscenso', data);
  }

  eliminarArresto(data): Observable<any> {
    return this.metodopost('eliminarArresto', data);
  }
  eliminarGradoTablaAscenso(data): Observable<any> {
    return this.metodopost('eliminarGradoTablaAscenso', data);
  }

  actualizarTablaascenso(data): Observable<any> {
    return this.metodopost('actualizarTablaascenso', data);
  }

  actualizarAcuerdoyfechaIngreso(data): Observable<any> {

    return this.metodopost('actualizarAcuerdoyfechaIngreso', data);
  }
  actualizarNombresYapellidos(data): Observable<any> {

    return this.metodopost('actualizarNombresYapellidos', data);
  }
  eliminarNombramiento(data): Observable<any> {
    return this.metodopost('eliminarNombramiento', data);
  }

  eliminarPuesto(data): Observable<any> {
    return this.metodopost('eliminarPuesto', data);
  }
  sacarOrganizacionPorUnidad(data): Observable<any> {
    return this.metodopost('sacarOrganizacionPorUnidad', data);
  }
  desactivarPuesto(data) {
    return this.metodopost('desactivarPuesto', data);
  }
  datosparaConstaciadeTropaMiembroActivo(data) {
    return this.metodopost('datosparaConstaciadeTropaMiembroActivo', data);
  }
  agregarPersonaenOrganizacion(data): Observable<any> {
    return this.metodopost('agregarPersonaenOrganizacion', data);
  }
  sacarCargoDeUnapersona(data) {
    return this.metodopost('sacarCargoDeUnapersona', data);
  }
  sacarcoposhabilitados(data): Observable<any> {
    return this.metodopost('sacarcoposhabilitados', data);
  }

  consultaporArma(data): Observable<any> {
    return this.metodopost('consultaporArma', data);
  }

  sacarpersonalDarbajaEMC(data) {
    return this.metodopost('sacarpersonalDarbajaEMC', data);

  }
  guardarcambiodeCategoria(data): Observable<any> {
    return this.metodopost('guardarcambiodeCategoria', data);
  }

  sacarcategoriaporNivel(data): Observable<any> {
    return this.metodopost('sacarcategoriaporNivel', data);
  }

  paraRellenarCuadroPrincipalTropayAuxiliar(data): Observable<any> {
    return this.metodopost('paraRellenarCuadroPrincipalTropayAuxiliar', data);
  }


  paraRellenarCuadroPrincipal(data): Observable<any> {
    return this.metodopost('paraRellenarCuadroPrincipal', data);
  }

  parteGeneroCombatienteTropa(data): Observable<any> {

    return this.metodopost('parteGeneroCombatienteTropa', data);
  }
  sacarpartePorCategoriayFuerza(data: any): Observable<any> {

    return this.metodopost('sacarpartePorCategoriayFuerza', data);
  }
  sacarGenerosPorfuerzas(data: any): Observable<any> {

    return this.metodopost('sacarGenerosPorfuerzas', data);
  }
  sacarBajasUnidad(data: any): Observable<any> {

    return this.metodopost('sacarBajasUnidad', data);
  }
  sacaraccionActual(data: any): Observable<any> {

    return this.metodopost('sacarasignacionActual', data);
  }
  getToken() {
    return this.islogin().token ? this.islogin().token + ";V10" : ""
  }
  getControlVersion() {
    return ";V10"
  }
  setToken(data: any) {
    //console.log("SET TOKEN: 11",data+this.getControlVersion())
    this.token = data + this.getControlVersion();

  }
  getUsuario() {
    return this.usuarioLogin;
  }
  setUsuario(data: any) {
    this.usuarioLogin = data;

  }
  guardarDatosPersonales(data: any) {
    return this.metodopost('gardarDatoPersonal', data);

  }
  sacarParteMenuInicio(data){
    return this.metodopost('parte_por_grados_general',data);
  }

  sacarFuerza() {
    return this.metodoget('sacarFuerza');
  }
  partedetropaporUnidad(data: any): Observable<any> {
    return this.metodopost('parteporunidaddetropas', data);
  }
  parteporFuerzadetropas(data: any): Observable<any> {

    return this.metodopost('parteporFuerzadetropas', data);
  }

  sacarunidad(data: any) {
    return this.metodopost('unidad', data);
  }
  sacarCategoria(data: any) {

    return this.metodopost('sacarcategoria', data);
  }
  sacarpersonaldeUnidad(data: any): Observable<any> {
    return this.metodopost('sacarpersonaldeUnidad', data);
  }
  guardarascenso(data: any): Observable<any> {
    return this.metodopost('agregarascenso', data);
  }
  sacarPersonalIdentidad(data: any): Observable<any> {
    return this.metodopost('sacatrpersonalporidentidad', data);
  }

  guardarPerientes(data: any) {
    return this.metodopost('guardarpariente', data);
  }

  guardarhijo(data: any) {

    return this.metodopost('agregarhijo', data);
  }
  agregarconyugue(data: any) {
    return this.metodopost('agregarconyugue', data);
  }

  consultaConyuguePersonal(data: any) {
    return this.metodopost('consultaConyuguePersonal', data);
  }

  guardarpadres(data: any) {
    return this.metodopost('agregarpadres', data);
  }
  agregarTelefono(data: any) {
    return this.metodopost('agregarTelefono', data);
  }
  sacarpaises() {
    return this.metodopost('sacarpaises', {});
  }
  guardarpaisdelpersonal(data: any) {
    return this.metodopost('agregarpaisPersonal', data);
  }
  sacaridiomas() {
    return this.metodopost('sacarIdiomas', {});
  }
  guardaridiomadelpersonal(data: any) {
    return this.metodopost('guardaridiomadelpersonal', data);
  }
  sacaruniversidad(data: any): Observable<any> {
    return this.metodopost('sacaruniversidad', data);
  }
  sacarprofesiondeuniversidades(data: any): Observable<any> {
    return this.metodopost('sacarprofesiondelasUniversidad', data);
  }
  sacardepartamento(data: any) {
    return this.metodopost("sacarDepartamento", data)
  }
  sacardepartamentoTodos() {

    return this, this.metodopost("sacarDepartamentoTodos", {})

  }

  guardarprofesiondeunpersonal(data: any): Observable<any> {
    return this.metodopost('guardarProfesiondelpersonal', data);
  }

  sacarmunicipio(data: any) {

    return this.metodopost("sacarmunicipio", data)
  }


  consultaPorIdentidadPrfuerza(data: any): Observable<any> {
    return this.metodopost('consultaPorIdentidadPrfuerza', data);
  }
  consultaPorIdentidadPrfuerzaYunidad(data: any): Observable<any> {

    return this.metodopost('consultaPorIdentidadPrfuerzaYunidad', data);
  }

  consultaprofecionDelPersonal(data: any): Observable<any> {
    return this.metodopost('consultaprofecionDelPersonal', data);
  }
  consultaPaisesDelPersonal(data: any): Observable<any> {
    return this.metodopost('consultaPaisesDelPersonal', data);
  }
  consultaIdiomasPersonal(data: any): Observable<any> {
    return this.metodopost('consultaIdiomasPersonal', data);
  }
  consultaTelefonoPersonal(data: any): Observable<any> {
    return this.metodopost('consultaTelefonoPersonal', data);
  }
  consultaPadresPersonal(data: any) {
    return this.metodopost('consultaPadresPersonal', data);
  }
  consultaHijosPersonal(data: any) {
    return this.metodopost('consultaHijosdelPersonal', data);
  }
  sacarGrados(data: any) {
    return this.metodopost('sacargrados', data);
  }
  sacargradosporid(data: any): Observable<any> {
    return this.metodopost('sacargradosporid', data);
  }

  sacarAscensosporPersona(data: any) {
    return this.metodopost('consultaAscensos', data);
  }
  sacarbancos() {

    return this.metodopost("sacarbancos", {});

  }

  asignarpersonalaUnidad(data: any) {
    return this.metodopost('AsignarPersonalAUnidad', data);
  }
  sacarLasAsignacionesDeunaPersona(data: any): Observable<any> {
    return this.metodopost('sacarAsignaciones_de_unPersonal', data);
  }
  guardarAresto(data: any): Observable<any> {

    return this.metodopost('guardarAresto', data);
  }
  sacarAresto(data: any): Observable<any> {
    return this.metodopost('sacarAresto', data);
  }
  consultaPorAntiguedadAsignado(data: any): Observable<any> {
    return this.metodopost('consultaPorAntiguedadAsignado', data);
  }
  consultapersonaldeunidad(data: any): Observable<any> {
    return this.metodopost('buscarOficialdeUnidad', data);
  }
  sacarpersonalPorIdioma(data: any): Observable<any> {
    return this.metodopost('sacarpersonalPorIdioma', data);
  }
  sacarpersonalPorIdiomaFuerza(data: any): Observable<any> {
    return this.metodopost( 'sacarpersonalPorIdiomaFuerza', data);
  }

  planillaOficiles(data: any): Observable<any> {
    return this.metodopost('planillaOficiles', data);
  }

  sacarempresas(): Observable<any> {

    return this.metodopost('sacarempresas', {});
  }

  sacarFecha() {

    return this.metodoget("sacarFecha")

  }
  agregarDeducciones(data: any): Observable<any> {

    return this.metodopost('agregarDeducciones', data);
  }
  sacarDeduccionesporfecha(data: any): Observable<any> {

    return this.metodopost('sacarDeduccionesporfecha', data);
  }
  sacardeduccionparapagadurias(data: any): Observable<any> {
    return this.metodopost('sacardeduccionparapagadurias', data);
  }
  planillaTropa(data: any): Observable<any> {

    return this.metodopost('planillaTropa', data);
  }
  planillaAuxilia(data: any): Observable<any> {

    return this.metodopost('planillaAuxilia', data);
  }
  planillasuboficial(data: any): Observable<any> {

    return this.metodopost('planillasuboficial', data);
  }
  autenticarse(data: any): Observable<any> {

    return this.metodopost('autenticarse', data);
  }
  agregarascensoPersonalIngresado(data: any): Observable<any> {

    return this.metodopost('agregarascensoPersonalIngresado', data);
  }
  guardarDocumento(data: any): Observable<any> {
    return this.metodopost('guardarDocumento', data);
  }

  sacarUnidadEjecutora(): Observable<any> {

    return this.metodopost('sacarUnidadEjecutora', {});
  }
  sacartiposDebajas() {

    return this.metodopost('sacartiposDebajas', {});

  }
  agregarBajaEMC(data: FormData): Observable<any> {
     var headers = new HttpHeaders({
      "Authorization": this.getToken()
    });
    console.log(this.url + "agregarBajaEMC")
    return this.http.post(this.url + "agregarBajaEMC", data, { 
      headers: headers
     });

  }
  /*
  agregarBajaEMC(data:any): Observable<any> {
    var json = JSON.stringify(data)
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization":   this.getToken()
    });
 
    return this.http.post(this.url + 'agregarBajaEMC',json, { headers: headers });
  }
  */

  agregarBaja(data: FormData): Observable<any> {
 var headers = new HttpHeaders({
      "Authorization": this.getToken() || ""
    });
    return this.http.post(this.url + "agregarBaja", data, { headers: headers});
  }


  consultadeduccionPorEmpresa(data: any): Observable<any> {

    return this.metodopost('consultadeduccionPorEmpresa', data);
  }
  consultadeduccionPorUnidad(data: any): Observable<any> {

    return this.metodopost('consultadeduccionPorUnidad', data);
  }
  validardeduccionesengurpo(data: any): Observable<any> {

    return this.metodopost('validardeduccionesengurpo', data);
  }
  cargardeduccionesenbloque(data: any): Observable<any> {

    return this.metodopost('cargardeduccionesenbloque', data);
  }
  cambiareidbloquecuentas(data: any): Observable<any> {

    return this.metodopost('cambiarcuentabloque', data);
  }
  planillaSIREPTropa(data: any): Observable<any> {

    return this.metodopost('planillaSIREPTropa', data);
  }

  sacarpersonalParaDarDebaja(data: any): Observable<any> {

    return this.metodopost('sacarpersonalParaDarDebaja', data);
  }
  listadepersonalActivo(data: any): Observable<any> {

    return this.metodopost('listadepersonalActivo', data);
  }
  listadepersonaldeBaja(data: any): Observable<any> {

    return this.metodopost('listadepersonaldeBaja', data);
  }
  sacarplanillaporunidad(data: any): Observable<any> {

    return this.metodopost('sacarplanillaporunidad', data);
  }
  consultaporNombre(data: any): Observable<any> {

    return this.metodopost('consultaporNombre', data);
  }
  consultaporNombrePorUnidad(data: any): Observable<any> {
    return this.metodopost('consultaporNombrePorUnidad', data);
  }

  sacarpersonalParaDarDebajadelamismaFuerza(data: any): Observable<any> {

    return this.metodopost('sacarpersonalParaDarDebajadelamismaFuerza', data);
  }
  consultaDeduccionPorfuerza(data: any): Observable<any> {
    return this.metodopost('consultaDeduccionPorfuerza', data);
  }
  consultadeduccionempresaYfuerza(data: any): Observable<any> {
    return this.metodopost('sacarDeducionPorEmpresaYfuerza', data);
  }
  listadepersonaldeBajadeunaFuerza(data: any): Observable<any> {

    return this.metodopost('listadepersonaldeBajadeunaFuerza', data);
  }
  //Borrar esta funcion
  resumandeduccionesdeHierro(data: any): Observable<any> {

    return this.metodopost('deduccionesdeHierro', data);
  }
  deduccionesdeHierrounidad(data: any): Observable<any> {
    return this.metodopost('deduccionesdeHierrounidad', data);
  }
  datosparaConstaciadeTropa(data: any): Observable<any> {
    return this.metodopost('datosparaConstaciadeTropa', data);
  }
  sacardeduccionsParaAPp(data: any): Observable<any> {
    return this.metodopost('sacardeduccionsParaAPp', data);
  }
  eleminarnumeroTelefono(data: any): Observable<any> {

    return this.metodopost('eleminarnumeroTelefono', data);
  }
  sacarplanillasporunidadTropaDecimos(data: any): Observable<any> {
    return this.metodopost('sacarplanillasporunidadTropaDecimos', data);
  }
  sacarplanillasporunidadTropaDecimosPorunidadEjecutora(data: any): Observable<any> {

    return this.metodopost('sacarplanillasporunidadTropaDecimosPorunidadEjecutora', data);
  }
  sacarplanillasTropaVacacionesPorunidadEjecutora(data: any): Observable<any> {

    return this.metodopost('sacarplanillasTropaVacacionesPorunidadEjecutora', data);
  }
  sacarplanillasTropaVacacionesPorunidad(data: any): Observable<any> {
    return this.metodopost('sacarplanillasTropaVacacionesPorunidad', data);
  }
  sacarcarpetaPrimaria(data: any) {
    return this.metodopost('sacarcarpetaPrimaria', data);
  }
  sacarcarpetaSegundaria(data: any) {
    return this.metodopost('sacarcarpetaSegundaria', data);
  }
  sacarDocumento(data: any) {
    return this.metodopost('sacarDocumento', data);
  }
  crearcarpetaPrincipal(data: any) {
    return this.metodopost('crearcarpetaPrincipal', data);
  }
  crearcarpetaSegundaria(data: any) {

    return this.metodopost('crearcarpetaSegundaria', data);
  }


  mensajeError(data: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data,
      footer: '<a href>Control de errores</a>'
    });
  }
  mensajeBueno(data: any) {
    Swal.fire({
      icon: 'success',
      title: 'Excelente',
      text: data,
      footer: '<a href>Control del Sistema</a>'
    });
  }
  async mensajePregunta(titulo, texto) {
    var t = await Swal.fire({
      title: titulo,
      text: texto,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        return true

      } else {
        Swal.fire(
          'Cancelado',
          'Operación Cancelada',
          'error'
        )
        return false;
      }
    })
    return t;
  }
  eliminararchivo(data: any) {
    return this.metodopost('eliminararchivo', data);

  }
  deleteDocumento(data: any) {
    return this.metodopost('deleteDocumento', data);
  }
  deleteDocumentoArrestos(data: any) {
    return this.metodopost('deleteDocumentoArrestos', data);
  }
  deletecarpetaSegundaria(data: any) {
    return this.metodopost('deletecarpetaSegundaria', data);
  }
  deletecarpetaPrimaria(data: any) {
    return this.metodopost('deletecarpetaPrimaria', data);
  }
  deletepais(data: any) {
    return this.metodopost('deletepais', data);
  }
  deleteidomas(data: any): Observable<any> {
    return this.metodopost('deleteidomas', data);
  }
  deletePadres(data: any) {
    return this.metodopost('deletePadres', data);
  }
  deleteConyugue(data: any) {
    return this.metodopost('deleteConyugue', data);
  }

  disponibilidadpresupuestaria(data: any): Observable<any> {
    return this.metodopost('disponibilidadpresupuestaria', data);

  }

  deleteHijo(data: any) {
    return this.metodopost('deleteHijo', data);

  }
  actualizarGenero(data: any): Observable<any> {
    return this.metodopost('actualizarGenero', data);


  }
  actualizarFechaNacimiento(data: any): Observable<any> {

    return this.metodopost('actualizarFechaNacimiento', data);


  }
  actualizarSerie(data: any): Observable<any> {

    return this.metodopost('actualizarSerie', data);
  }


  actualizarPasaporte(data: any): Observable<any> {
    return this.metodopost('actualizarPasaporte', data);


  }
  actualizartipoSangre(data: any): Observable<any> {

    return this.metodopost('actualizartipoSangre', data);


  }
  actualizarCuentaBanco(data: any): Observable<any> {

    return this.metodopost('actualizarCuentaBanco', data);


  }
  actualizarReligion(data: any): Observable<any> {

    return this.metodopost( 'actualizarReligion', data);


  }
  actualizarestadoCivil(data: any): Observable<any> {

    return this.metodopost('actualizarestadoCivil', data);


  }
  actualizarCombatiente(data: any): Observable<any> {

    return this.metodopost('actualizarCombatiente', data);


  }
  buscarcumpleanero(data: any): Observable<any> {
    return this.metodopost('buscarcumpleaneros', data);


  }
  sacarArmas(data: any): Observable<any> {

    return this.metodopost('sacarArmas', data);

  }
  ActualizarArma(data: any): Observable<any> {

    return this.metodopost('ActualizarArma', data);


  }
  ActualizarlugarNacimiento(data: any): Observable<any> {

    return this.metodopost('ActualizarlugarNacimiento', data);


  }
  reasignarOficialesAuxSub(data: any): Observable<any> {
    return this.metodopost('reasignarOficialesAuxSub', data);

  }
  crearusuario(data: any): Observable<any> {

    return this.metodopost('crearusuario', data);


  }
  buscarusuario(data: any): Observable<any> {

    return this.metodopost('consultarusuario', data);


  }
  actualizacionContrasenas(data: any, token): Observable<any> {
    return this.metodopost('actualizarContrasena', data);

  }
  PparteDeSubOficial(data: any): Observable<any> {

    return this.metodopost('parteporFuerzadeSubOficiales', data);


  }
  parteporUnidaddeSubOficiales(data: any): Observable<any> {

    return this.metodopost('parteporUnidaddeSubOficiales', data);


  }
  agregarNombramiento(data: any): Observable<any> {


    return this.metodopost('agregarNombramiento', data);


  }
  mostrarNombramiento(data: any) {
    return this.metodopost('mostrarNombramiento', data);
  }
  agregarPuesto(data: any): Observable<any> {


    return this.metodopost('agregarPuesto', data);


  }

  MostrarPuesto(data: any) {
    return this.metodopost('MostrarPuesto', data);
  }
  sacarToeUnidad(data: any) {

    return this.metodopost("sacarToeUnidad", data)



  }
  SacarPorSexo(data: any): Observable<any> {


    return this.metodopost('SacarPorSexo', data);

  }
  exportexcel2(name, nombre_archivo): void {

    let objeto = document.getElementById(name);

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(objeto,
      { dateNF: 'dd/mm/yyyy;@', cellDates: true, raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    XLSX.writeFile(wb, nombre_archivo + ".xlsx");
    // this.exportTableToExcel();


  }

}

