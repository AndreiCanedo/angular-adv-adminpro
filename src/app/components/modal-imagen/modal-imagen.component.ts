import { Component, inject } from '@angular/core';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: any = '';

 public modalImagenService= inject(ModalImagenService);
 public fileUploadService= inject(FileUploadService);

  cerrarModal(){
    this.imgTemp = null;
    //esto para cada vez que cierres el nodal no te aparesca la imagen que subiste no guardaste
    this.modalImagenService.cerrarModal();
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

    const id =  this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService
        .actualizarFoto( this.imagenSubir, tipo, id )
        .then( img => {
          Swal.fire('Imagen Actualizada','Se guardo la imagen correctamente','success');

          this.modalImagenService.nuevaImagen.emit(img);

          this.cerrarModal();
        },(err) => {
          console.log(err);
          Swal.fire('Error', 'No se puedo subir la imagen', 'error');
        });

        
  }

}
