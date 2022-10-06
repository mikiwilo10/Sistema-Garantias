import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from '../../../environments/conexion';
import { AuthResponse } from '../pages/login/model/authinterface';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id:number;
  constructor(private http: HttpClient) { }

  login(correos: string, pass: string) {
    return this.http.get<AuthResponse>(environment.ip + 'orden/login?usuario=' + correos + '&password=' + pass)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            
            localStorage.setItem('token', resp.token!);
            localStorage.setItem('id', resp.idUsuario!);
            localStorage.setItem('nombreApellido', resp.nombreApellido!);
          }
        }),
        map(resp => resp.ok),
        catchError(error => of(error.error.mensaje))
      )
  }

  validarToken(): Observable<boolean> {
    const url = `${environment.ip}orden/validarToken?x-token=`;
    const token = localStorage.getItem('token') || "";
   
    //console.log(token);
   // const headers = new HttpHeaders()
    //  .set('x-token', localStorage.getItem('token') || "")
    return this.http.get<AuthResponse>(url+token)
      .pipe(
        map(resp => {
          return resp.ok
        }), catchError(error => of(false))
      );
  }

  logout() {
    localStorage.clear();
    
  }


}
