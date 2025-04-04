import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = sessionStorage.getItem("user-role");

  if (!role) {
    router.navigate(["/login"]);
    return false;
  }

  return true; // Permite acesso se o usuário já estiver autenticado
};
