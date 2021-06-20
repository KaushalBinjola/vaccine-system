import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService:CrudService, private router:Router) { }

  canActivate(){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login'])
    }
    return true
  }
}
