import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy{
  
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  
  public imgSubs!: Subscription;
  public desde: number=0;
  public cargando: boolean = true;
  
  private usuariosService = inject(UsuarioService);
  private busquedasService = inject(BusquedasService);
  private modalImagenService = inject(ModalImagenService);
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  ngOnInit(): void {
    
   this.cargarUsuarios();

   this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )//este es para que nos de tiempo que actualice la pagina
                          //no es lo mas bonito pero funciona
        .subscribe( img => this.cargarUsuarios() )
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuariosService.cargarUsuarios( this.desde )
    .subscribe( ({ total, usuarios }) => {

      this.totalUsuarios= total;
      
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;

      this.cargando = false;
      
    })
    //en lugar de solo hacer lo de abajo desestructuramos
    // .subscribe( resp => {
    //   console.log(resp);
    //   this.totalUsuarios= resp.total
    // })
  }

  cambiarPagina( valor: number ){
    
    this.desde += valor;

    if( this.desde < 0){
      this.desde = 0;
    }else if(this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string){

    if ( termino.length === 0){
      
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
          .subscribe( (resp:any) => 
            
            this.usuarios =resp
          
          )
    return;

  }

  eliminarUsuario( usuario:Usuario ){

    if( usuario.uid === this.usuariosService.uid ){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    }

    Swal.fire({
      title: "Desea Eliminar al Usuario?",
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, Borrarlo"
    }).then((result) => {
      if (result.isConfirmed) {

          this.usuariosService.eliminarUsuario( usuario )
                .subscribe( resp => { 
                  
                  this.cargarUsuarios();
                  
                  Swal.fire({
                    title: "Eliminado!",
                    text: "El Usuario ah sido eliminado",
                    icon: "success"
                  });

                });
      }
    });

    return;
    
  }

  cambiarRole( usuario: Usuario){
    this.usuariosService.guardarUsuario(usuario)
        .subscribe( resp => {
          console.log(resp);
        })
  }

  abrirModal(usuario:Usuario){
    //console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
