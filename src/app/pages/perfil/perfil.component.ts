import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit{
  
  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';
  
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private fileUploadService = inject(FileUploadService);

  constructor(){
    this.usuario = this.usuarioService.usuario;
  }
  
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( ( resp: any ) => {
          //se puede extraer el nombre y el email tambien de la respuesta
          const { nombre, email } = this.perfilForm.value;
          //al tenerlo referenciado el usuario al usuarioService este puede cambiar
          //en todas las funciones que es llamada el usuario
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire('Perfil Actualizado','Email y Nombre actualizados','success')
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error')
        })
        
      }
      
      cambiarImagen( file:File ){
        this.imagenSubir = file;
        
    if( !file ){
       this.imgTemp =null;
       return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL( file );
      
      reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
        .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( img => {
          this.usuario.img = img
          Swal.fire('Imagen Actualizada','Se guardo la imagen correctamente','success')
        },(err) => {
          console.log(err);
          Swal.fire('Error', 'No se puedo subir la imagen', 'error');
        });

        
  }
}
