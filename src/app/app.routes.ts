import { Routes } from '@angular/router';
import { authGuard } from './guards/guard-sesion/auth.guard';
import { permisosGuard } from './guards/guard-sesion/permisos.guard';
import { homeGuard } from './guards/guard-sesion/home.guard';
import { MenuRepoEmcComponent } from './Paginas/reportes/repo-emc/menu-repo-emc/menu-repo-emc.component';
 
export const routes: Routes = [
  // Opcional: si alguien entra a '/', lo mandas al menú
  {
    path: '',
    redirectTo: 'menu/menu-principal',
    pathMatch: 'full'
  },

  {
    path: 'menu',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Paginas/menu/menu-principal/menu-principal.component')
        .then(m => m.MenuPrincipalComponent),
    children: [
      {
        path: 'menu-principal',
        loadComponent: () =>
          import('./Paginas/menu/cuerpo-principal/cuerpo-principal.component')
            .then(m => m.CuerpoPrincipalComponent)
      },
      {
        path: 'menu-busqueda',
        canActivate: [permisosGuard],
        data: { permisos: ["B_0001", 'B_0002', 'B_0003'] },
        loadComponent: () =>
          import('./Paginas/busquedas/menu-busquedas/menu-busquedas.component')
            .then(m => m.MenuBusquedasComponent)
      },
      {
        path: 'busqueda-global',
        canActivate: [permisosGuard],
        data: { permisos: ['B_0001'] },
        loadComponent: () =>
          import('./Paginas/busquedas/busqueda-global/busqueda-global.component')
            .then(m => m.BusquedaGlobalComponent)
      },
      {
        path: 'busqueda-dni-nombre',
        canActivate: [permisosGuard],
        data: { permisos: ['B_0002'] },
        loadComponent: () =>
          import('./Paginas/busquedas/busqueda-normal/busqueda-normal.component')
            .then(m => m.BusquedaNormalComponent)
      },
      {
        path: 'busqueda-personalizada',
        canActivate: [permisosGuard],
        data: { permisos: ['B_0003'] },
        loadComponent: () =>
          import('./Paginas/busquedas/busqueda-personalizada/busqueda-personalizada.component')
            .then(m => m.BusquedaPersonalizadaComponent)
      },
      {
        path: 'menu-registro',
        canActivate: [permisosGuard],
        data: { permisos: ["R_0001","R_0002"] },
        loadComponent: () =>
          import('./Paginas/registros/menu-registros/menu-registros.component')
            .then(m => m.MenuRegistrosComponent)
      },
      {
        path: 'registras-personal',
        canActivate: [permisosGuard],
        data: { permisos: ["R_0001"] },
        loadComponent: () =>
          import('./Paginas/registros/registrar-personal/registrar-personal.component')
            .then(m => m.RegistrarPersonalComponent)
      },
      {
        path: 'registras-bajas',
        canActivate: [permisosGuard],
        data: { permisos: ["R_0002"] },
        loadComponent: () =>
          import('./Paginas/registros/registrar-bajas/registrar-bajas.component')
            .then(m => m.RegistrarBajasComponent)
      },
      {
        path: 'menu-actualizaciones',
        canActivate: [permisosGuard],
        data: { permisos: ["A_0001", "A_0002", "A_0003"] },
        loadComponent: () =>
          import('./Paginas/actualizaciones/menu-actualizaciones/menu-actualizaciones.component')
            .then(m => m.MenuActualizacionesComponent)
      },
      {
        path: 'actualizar-ascensos',
        canActivate: [permisosGuard],
        data: { permisos: ["A_0001"] },
        loadComponent: () =>
          import('./Paginas/actualizaciones/ascensos/ascensos.component')
            .then(m => m.AscensosComponent)
      },
      {
        path: 'modificar-perfil',
        canActivate: [permisosGuard],
        data: { permisos: ["A_0003"] },
        loadComponent: () =>
          import('./Paginas/actualizaciones/modificar-perfil/modificar-perfil.component')
            .then(m => m.ModificarPerfilComponent)
      },
      {
        path: 'cambio-categoria',
        canActivate: [permisosGuard],
        data: { permisos: ["A_0002"] },
        loadComponent: () =>
          import('./Paginas/actualizaciones/cambio-categoria/cambio-categoria.component')
            .then(m => m.CambioCategoriaComponent)
      },
      {
        path: 'crear-cupos-ingreso',
        canActivate: [permisosGuard],
        data: { permisos: ["C_0001"] },
        loadComponent: () =>
          import('./Paginas/configuraciones/configuracion-sistema/crear-cupos-ingreso/crear-cupos-ingreso.component')
            .then(m => m.CrearCuposIngresoComponent)
      },
      {
        path: 'menu-confi-sistema',
        canActivate: [permisosGuard],
        data: { permisos: ["C_0001","C_0002","C_0003","C_0004"] },
        loadComponent: () =>
          import('./Paginas/configuraciones/configuracion-sistema/menu-confi-sistema/menu-confi-sistema.component')
            .then(m => m.MenuConfiSistemaComponent)
      },
      {
        path: 'crear-cupos-ascensos',
        canActivate: [permisosGuard],
        data: { permisos: ["C_0002"] },
        loadComponent: () =>
          import('./Paginas/configuraciones/configuracion-sistema/crear-cupos-ascensos/crear-cupos-ascensos.component')
            .then(m => m.CrearCuposAscensosComponent)
      },
      {
        path: 'crear-puestos',
        canActivate: [permisosGuard],
        data: { permisos: ["C_0003"] },
        loadComponent: () =>
          import('./Paginas/configuraciones/configuracion-sistema/crear-puestos/crear-puestos.component')
            .then(m => m.CrearPuestosComponent)
      },
      {
        path: 'menu-conexion-planffaa',
        canActivate: [permisosGuard],
        data: { permisos: ["P_0001","P_0002","P_0003","P_0004"] },
        loadComponent: () =>
          import('./Paginas/planffaa-conexiones/pagos-x-cargo/menu-conexion-planffaa/menu-conexion-planffaa.component')
            .then(m => m.MenuConexionPlanffaaComponent)
      },
      {
        path: 'lista-personal-pagos-cargo',
        canActivate: [permisosGuard],
        data: { permisos: ["P_0001"] },
        loadComponent: () =>
          import('./Paginas/planffaa-conexiones/pagos-x-cargo/lista-personal-pagos-cargo/lista-personal-pagos-cargo.component')
            .then(m => m.ListaPersonalPagosCargoComponent)
      },
      {
        path: 'lista-cargos-con-pago',
        canActivate: [permisosGuard],
        data: { permisos: ["P_0002"] },
        loadComponent: () =>
          import('./Paginas/planffaa-conexiones/pagos-x-cargo/lista-cargos-con-pago/lista-cargos-con-pago.component')
            .then(m => m.ListaCargosConPagoComponent)
      },
      {
        path: 'solicitud-constancias-planffaa',
        canActivate: [permisosGuard],
        data: { permisos: ["P_0003"] },
        loadComponent: () =>
          import('./Paginas/planffaa-conexiones/solicitud-constancias-planffaa/solicitud-constancias-planffaa.component')
            .then(m => m.SolicitudConstanciasPlanffaaComponent)
      },
      {
        path: 'control-usuario',
        canActivate: [permisosGuard],
        data: { permisos: ["C_0004"] },
        loadComponent: () =>
          import('./Paginas/configuraciones/configuracion-sistema/usuarios/configurar-usuarios/configurar-usuarios.component')
            .then(m => m.ConfigurarUsuariosComponent)
      }
      ,
      {
        path: 'menu-programador',
        canActivate: [permisosGuard],
        data: { permisos: ["PRG_0001"] },
        loadComponent: () =>
          import('./Paginas/modo-programador/menu-modo-programador/menu-modo-programador.component')
            .then(m => m.MenuModoProgramadorComponent)
      }
      ,
      {
        path: 'consultas-sql',
        canActivate: [permisosGuard],
        data: { permisos: ["PRG_0001"] },
        loadComponent: () =>
          import('./Paginas/modo-programador/consultas-sql/consultas-sql.component')
            .then(m => m.ConsultasSqlComponent)
      }
      ,
      {
        path: 'menu-reportes',
        canActivate: [permisosGuard],
        data: { permisos: [] },
        loadComponent: () =>
          import('./Paginas/reportes/reportes-menu/reportes-menu.component')
            .then(m => m.ReportesMenuComponent)
      } ,
      {
        path: 'menu-repo-unidad',
        canActivate: [permisosGuard],
        data: { permisos: [] },
        loadComponent: () =>
          import('./Paginas/reportes/menu-repo-unidad/menu-repo-unidad.component')
            .then(m => m.MenuRepoUnidadComponent)
      }
      ,
      {
        path: 'menu-repo-fuerza',
        canActivate: [permisosGuard],
        data: { permisos: [] },
        loadComponent: () =>
          import('./Paginas/reportes/repo-fuerzas/menu-repo-fuerza/menu-repo-fuerza.component')
            .then(m => m.MenuRepoFuerzaComponent)
      }  ,
      {
        path: 'menu-repo-emc',
        canActivate: [permisosGuard],
        data: { permisos: [] },
        loadComponent: () =>
          import('./Paginas/reportes/repo-emc/menu-repo-emc/menu-repo-emc.component')
            .then(m => m.MenuRepoEmcComponent)
      }
    ]
  },

  {
    path: 'autenticarse',
    canActivate: [homeGuard],
    loadComponent: () =>
      import('./Paginas/login/autenticarse/autenticarse.component')
        .then(m => m.AutenticarseComponent)
  },

  // 👇 ESTA SIEMPRE AL FINAL
  {
    path: '**',
    redirectTo: 'menu/menu-principal'
  }
];
