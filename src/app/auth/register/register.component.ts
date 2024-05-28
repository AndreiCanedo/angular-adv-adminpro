import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private router = inject(Router);
  public formSumitted = false;
  //form summitted se hizo para cada vez que le piquemos al boton de loguear
  //los errores nos aparesca no antes
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  
  public registerForm= this.fb.group({

    nombre: ['Fernando', Validators.required ],
    email: ['Test@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['123456', Validators.required ],
    password2: ['123456', Validators.required ],
    terminos: [ true, Validators.required ]

  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  crearUsuario() {
    this.formSumitted = true;
    console.log( this.registerForm.value );
    //console.log(this.registerForm)

    if ( this.registerForm.invalid ){
      return;
    }
    
    //Relizar el posteo si es valido
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          //console.log( 'usuario creado' );
          //console.log( resp );
          //navegar al Dashboard
          this.router.navigateByUrl('/');
        }, (err) => {
          //si susede un error
          Swal.fire('Error',err.error.msg, 'error' );
        })
  
  }

  campoNoValido( campo: string):boolean{

    if ( this.registerForm.get(campo)?.invalid && this.formSumitted ){
      return true;
    }
    return false;

  }

  contrasenasNoValidas(){
    const pass1 =  this.registerForm.get('password')?.value;
    const pass2 =  this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSumitted ){
      return true;
    } else {
      return false;
    }
  }
  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSumitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string ){

    return ( formGrup: FormGroup ) => {
      
      const pass1Control =  formGrup.get(pass1Name);
      const pass2Control =  formGrup.get(pass2Name);

      if ( pass1Control?.value == pass2Control?.value ){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({ noEsIgual: true })
      }

    }

  }


}
