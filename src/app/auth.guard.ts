import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && localStorage) {
    const token = localStorage.getItem('token');
    return !!token;
  }

  const token = localStorage.getItem('token');

  if(token) {
    return true;
  }

  window.location.href = '/login';
  return false;
};
