import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioBackendService } from '../../servicios/servicio-backend.service';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const login = inject(ServicioBackendService);

  const { token } = login.islogin(); // que esto lea de localStorage

  // Si YA está logueado, no tiene sentido ver el login
  if (token) {
    router.navigate(['/menu/menu-principal']);
    return false;
  }

  // Si NO está logueado, que pueda ver la página de login
  return true;
};