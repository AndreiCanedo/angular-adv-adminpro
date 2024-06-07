import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Hospital } from '../models/hospital.model';

const base_url= 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(){

    const url = `${ base_url }/hospitales`;
    return this.http.get( url,this.headers)
                .pipe(
                  map<any,Hospital[]>( ( resp: { ok:boolean, hospitales:Hospital[] } ) => resp.hospitales )
                )
  }

  crearHospital(nombre: string){
  
    const url = `${ base_url }/hospitales`;
    return this.http.post( url,{ nombre },this.headers)
  }

  actualizarHospital( _id: string, nombre: string ){
  
    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.put( url,{ nombre },this.headers)
  }

  eliminarHospital( _id: string ){
  
    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.delete( url,this.headers)
  }
}
