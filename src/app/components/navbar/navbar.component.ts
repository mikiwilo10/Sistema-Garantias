import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario= localStorage.getItem('nombreApellido') || "";
  fecha=new Date;

  constructor(private authService:AuthService,private router:Router) {
  }

  ngOnInit() {
  }

  CerrarSesion(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/');

  }

}
