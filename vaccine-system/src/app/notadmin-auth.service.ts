import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root'
})
export class ConsumerAuth implements CanActivate {

    constructor(private authService: CrudService, private router: Router) { }

    canActivate() {
        if (this.authService.isAdmin()==true) {
            this.router.navigate(['/login'])
        }
        return true
    }
}