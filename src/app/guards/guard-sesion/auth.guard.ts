import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServiciosMensajeService } from '../../servicios/serviMensaje/servicios-mensaje.service';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';
 
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const msg = inject(ServiciosMensajeService);
  const login = inject(ServicioBackendService);
  if (!login.islogin().token) {
    msg.mensajeMalo('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    router.navigate(['/autenticarse']);
    return false;
  }
  return true;
};
