import { Pipe, PipeTransform } from '@angular/core';

const base_url = 'http://localhost:3000/api';

@Pipe({
  name: 'imagen'
})
//un pipe tranforma lo que tiene de manera visual
//osea tranforma un string a algo visual pero no afecta
//los valores
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
  
    if( !img ){
        return `${ base_url }/upload/${ tipo }/no-image`;
    } else if( img.includes('http') ){
        return img;
    }else if( img ){
        return `${ base_url }/upload/${ tipo }/${ img }`;
    }else{
        return `${ base_url }/upload/${ tipo }/no-image`;
    }
  
    
  }

}
