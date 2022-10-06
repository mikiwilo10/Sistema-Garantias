import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ServidorConexion } from '../../../../environments/conexion';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  @ViewChild('txtcorreo') txtcorreo!: ElementRef<HTMLInputElement>;
  @ViewChild('txtpassword') txtpassword!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient,
    private auth: AuthService,
    private router: Router) { }



  login() {

    const correos = this.txtcorreo.nativeElement.value;
    const pass = this.txtpassword.nativeElement.value;
    this.auth.login(correos, pass).subscribe(
      ok => {
        //console.log(ok);
        if (ok === true) {

          this.router.navigate(['/orden/listar']);

        } else {
          Swal.fire('Datos Incorrectos',ok, 'error')
        }
      }
    );
  }
}
