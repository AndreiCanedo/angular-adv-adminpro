import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';


const base_url= 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class BusquedasService {

  private http = inject(HttpClient);
 
  constructor() { }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private tranformarUsuarios( resultados: any[] ): Usuario[]{

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );

  }

  private tranformarHospital( resultados: any[] ): Hospital[]{

    return resultados.map(
      hospital => new Hospital(hospital.nombre, hospital.uid,hospital.img, hospital.usuario )
    );

  }

  private tranforarMedicos( resultados: any[] ): Medico[]{

    return resultados;//otra manera de hacerlo
    //no es necesario decir que es tipo medico porque ya lo expresamos posteriormente

  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales',
          termino: string
  ){

    const url = `${ base_url }/todo/coleccion/${ tipo }/${termino}`;
    return this.http.get< any[] >( url,this.headers)
                .pipe(
                  map( (resp: any) => {
                    switch ( tipo ) {
                      case 'usuarios':
                         return this.tranformarUsuarios( resp.resultados )
                        break;
                      case 'hospitales':
                        return this.tranformarHospital( resp.resultados )
                        break;
                      case 'medicos':
                        return this.tranforarMedicos( resp.resultados )
                        break
                        default:
                          return [];
                    }
                  })
                )

  }

}
