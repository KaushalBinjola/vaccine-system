import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CrudService } from '../crud.service';
import { SignupValidators } from '../signup.validators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false
  decodedToken: any
  isAdmin: boolean = false

  constructor(private router: Router, private navbarService: CrudService) { }

  ngOnInit(): void {
    this.isAdmin = false
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true
      this.decodedToken = this.navbarService.token()
      this.isAdmin = this.decodedToken.admin
    }
  }


  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }


}
