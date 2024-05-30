import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

//const base_url = environment.base_url;
const base_url= 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  //este es otra manera de hacerlo a diferencia de cuando
  //importamos con http

  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: any
  ){

    try{

      const url= `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData;
      formData.append('imagen',archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      } )

      const data = await resp.json()

      if ( data.ok ){
        return data.nombreArchivo;
      } else {
        console.log( data.msg );
        return false;
      }


      return 'nombre de la imagen'

    }catch(error){
      console.log(error);
      return false;
    }
    

  }

}
