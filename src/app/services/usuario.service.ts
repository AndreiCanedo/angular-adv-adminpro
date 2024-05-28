import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interface/register-form.interface';
import { LoginForm } from '../interface/login-form.interface';

declare const google: any;

const base_url= 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private router = inject(Router);
  private ngZone = inject(NgZone);
  
  private http = inject(HttpClient);

  logout() {
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('mec102092@gmail.com', () =>{
      
      this.router.navigateByUrl('/login');
      
    })
  }

  validarToken(): Observable<boolean>{

     
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),//siempre que hay una respuesta dara true
      catchError( error => of(false) )//el of nos ayuda a retornar algo y no romper el ciclo
    );
    
  }


 crearUsuario( formData: RegisterForm ){

  return this.http.post(`${base_url}/usuarios`, formData)
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token)
                })
              );
 
}
  //para guardar el token en el local storage ocupamos usar tap de rxjs
  //para eso usamos el comando pipe luego tap y con esto guardamos el item que queramos
  //en el local storage, estraemos token de la respuesta con el nombre de token
  login( formData: LoginForm){

    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                );

  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, { token })
                .pipe(
                  tap( (resp: any) => {
                    // console.log(resp)
                    localStorage.setItem('token', resp.token)
                  })
                );
  }

}
