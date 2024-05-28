import { Component, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  //para loguear con google y tomar referencia sin ID
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  
  
  public formSumitted = false;
  
  public loginForm: FormGroup = this.fb.group({
    
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [ localStorage.getItem('remember') || false]
  });
  

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "1019020184344-d0qo2h2rs00vrgq5l4eh2m2vach4d9jc.apps.googleusercontent.com",
      // callback: this.handleCredentialResponse
      callback: (response: any) => this.handleCredentialResponse(response)
      //tener cuidado cuando el callback apunta al this ya que en la funcion a la que manda a llamar
      //el this de esa funcion no llamara al componente, es por ello que se hace de este modo
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
          .subscribe( resp => {
            // console.log({ login:resp })
            //navegar al Dashboard
            this.router.navigateByUrl('/');
          })
  }

  login(){
    
    this.usuarioService.login( this.loginForm.value ) 
    .subscribe( resp =>{
      
          if( this.loginForm.get('remember')?.value ){
            localStorage.setItem('email', this.loginForm.get('email')?.value );
            localStorage.setItem('remember', this.loginForm.get('remember')?.value );
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }

          //navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
            Swal.fire('Error',err.error.msg, 'error');
        });

    //console.log( this.loginForm.value )

    //this.router.navigateByUrl('/');
  }

}
