import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Medico } from '../models/medico.model'
import { map } from 'rxjs';


const base_url= 'http://localhost:3000/api';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

    cargarMedicos(){

      const url = `${ base_url }/medicos`;
      return this.http.get( url,this.headers)
                  .pipe(
                    map<any,Medico[]>( ( resp: { ok:boolean, medicos:Medico[] } ) => resp.medicos )
                  )
    }

    obtenerMedigoPorId(id: string){
      console.log(id);
      const url = `${ base_url }/medicos/${id}`;
      return this.http.get<any>( url,this.headers)
                  .pipe(
                    map( (resp: {ok: boolean, medico: Medico } ) => resp.medico)
                  )
    }

    crearMedico(medico: { nombre: string, hospital: string } ){
  
      const url = `${ base_url }/medicos`;
      return this.http.post( url, medico ,this.headers)
    }
  
    actualizarMedico( medico: Medico ){
    
      const url = `${ base_url }/medicos/${ medico.uid }`;
      return this.http.put( url,medico,this.headers)
    }
  
    eliminarMedico( _id: string ){
    
      const url = `${ base_url }/medicos/${ _id }`;
      return this.http.delete( url,this.headers)
    }
}
