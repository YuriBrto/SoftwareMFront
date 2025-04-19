import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const role = sessionStorage.getItem('user-role');

  if (!role) {
    router.navigate(['/login']);
    return false;
  }

  // Verificar se o usuário tem a permissão correta para acessar a rota
  if (route.routeConfig?.path === 'admin-dashboard' && role !== 'admin') {
    router.navigate(['/login']);
    return false;
  }

  if (route.routeConfig?.path === 'professor-dashboard' && role !== 'professor') {
    router.navigate(['/login']);
    return false;
  }

  return true; // Permite o acesso caso a verificação passe
};
