import { Component, OnInit, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent{
  private sidebarServices = inject(SidebarService);
  
  
  
  //public imgUrl = '';
  public usuario!: Usuario;//otra manera de llamar a diferencia de con el header component
  private usuarioService = inject(UsuarioService);
  
  
  
  public menuItems:any[] = this.sidebarServices.menu;
  

  //public nombre = this.usuarioService.usuario.nombre;
  
  constructor(){
    //console.log(this.menuItems);
    //this.imgUrl = this.usuarioService.usuario.imgenUrl;
    this.usuario = this.usuarioService.usuario;
  }

}
