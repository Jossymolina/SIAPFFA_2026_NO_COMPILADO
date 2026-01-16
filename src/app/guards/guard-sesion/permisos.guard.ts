import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
 
 
export const permisosGuard: CanActivateFn = (route, state) => {
  const permisosService = inject(ServicioBackendService);
  const router = inject(Router);
  const msg = inject(ServiciosMensajeService);

  //  Definimos los permisos requeridos en la ruta: data: { permisos: [15, 99] }
  // 👇 ahora son strings
  const requeridos = route.data?.['permisos'] as string[] | undefined;
  // Si la ruta no define permisos específicos → se permite pasar
  if (!requeridos || requeridos.length === 0) {
    return true;
  }

  // Si el usuario tiene al menos uno de esos permisos
  if (permisosService.verificarPermisos(requeridos)) {
    return true;
  }

  //  No tiene permiso → mensaje + redirección
  msg.mensajeMalo('No tiene permiso para acceder a esta opción.');
 // router.navigate(['/menu', 'autenticarse']);
  return false;
};
