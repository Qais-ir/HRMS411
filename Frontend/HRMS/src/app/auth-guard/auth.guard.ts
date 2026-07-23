import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router); // Inject object using depenecey injuction without costurctor

  let token = localStorage.getItem('token');
  if(token){
    return true;
  }
  else{

    router.navigate(['/login']);
    return false;
  }
};
