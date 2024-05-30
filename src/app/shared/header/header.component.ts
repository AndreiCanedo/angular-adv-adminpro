import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  public imgUrl = '';

  public usuario!:Usuario;
  private usuarioService = inject(UsuarioService);

 ////// public nombre = this.usuarioService.usuario.nombre;

 // public correo =  this.usuarioService.usuario.email;

  constructor(){
    //this.imgUrl = this.usuarioService.usuario.imgenUrl;
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

}
