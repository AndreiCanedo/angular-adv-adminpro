import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interface/register-form.interface';
import { LoginForm } from '../interface/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

declare const google: any;

//const base_url= environment.base_url;
const base_url= 'http://localhost:3000/api';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private router = inject(Router);
  private ngZone = inject(NgZone);
  public usuario!: Usuario;
  
  
  private http = inject(HttpClient);

  logout() {
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('mec102092@gmail.com', () =>{
      
      this.router.navigateByUrl('/login');
      
    })
  
  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean>{

    google.accounts.id.initialize({
      client_id:
        '1019020184344-d0qo2h2rs00vrgq5l4eh2m2vach4d9jc.apps.googleusercontent.com'
    });
     
    //const token = localStorage.getItem('token') || '';
    //lo quitamos porque lo hicimos una funcion
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      //se cambio el map por el map por si en algun momento el map era mas rapido que el tap
      map( (resp: any) => {
        //si yo quisiera llamar una funcion de usuario esta funcion 
        //nos mandaria error y entrariamos al catch, por lo tanto
        //es necesario desestructurar la informacion que quiero para luego
        //optenerla...... '' seria la password esperada
        //console.log(resp.usuario)
        const{ email, google, nombre, img = '', role, uid } = resp.usuario;

        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        
        localStorage.setItem('token', resp.token );

        return true;
      }),
      //map( resp => true),//siempre que hay una respuesta dara true
      catchError( error => of(false))//el of nos ayuda a retornar algo y no romper el ciclo
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
  //para no poner la data podemos hacer una interface que tenga la informacion
  //esta es otra manera de hacerlo
  actualizarPerfil( data: {email:string, nombre:string, role: any}){

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
      // .pipe(
      //   tap((resp: any)=> {

      //     this.usuario =  resp.data

      //     this.usuario.nombre = resp.data.nombre;
      //     this.usuario.email = resp.data.email;

      //   })
      // )


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
