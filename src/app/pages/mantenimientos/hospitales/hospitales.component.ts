import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';


import { BusquedasService } from '../../../services/busquedas.service';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy {
  
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;
  
  private hospitalService = inject(HospitalService);
  private modalImagenService = inject(ModalImagenService)
  private busquedaService = inject(BusquedasService);
 
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }
  
  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarHospitales() )
    
  }

  cargarHospitales(){
    this.cargando = true; 

    this.hospitalService.cargarHospitales()
        .subscribe(hospitales => {
          this.cargando = false
          this.hospitales = hospitales;
          this.hospitalesTemp = hospitales;
        });
    
    
    
  }

  guardarCambios(hospital: Hospital){

    this.hospitalService.actualizarHospital( hospital.uid, hospital.nombre )
        .subscribe(resp => {
          Swal.fire('Actualizado', hospital.nombre,'success');
        });
  }

  eliminarHospital( hospital: Hospital ){

    console.log(hospital);
    this.hospitalService.eliminarHospital( hospital.uid )
        .subscribe(resp => {
          this.cargarHospitales();
          Swal.fire('Borrado', hospital.nombre,'success');
        });
  }

  async abrirSweetAlert(){
    const { value='' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre de Hospital',
      showCancelButton: true,
    })

    
     if( value ){
      const trimValue = value.trim();
      const valuelength = trimValue.length;
      if(valuelength > 0){
        this.hospitalService.crearHospital( value )
          .subscribe( (resp: any) => {
            this.hospitales.push(resp.hospital )
          })
      }
    }
  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital.uid, hospital.img);
  }

  buscar( termino: string){

    if ( termino.length === 0){
      
      return this.hospitales = this.hospitalesTemp;
    }

    this.busquedaService.buscar('hospitales', termino)
          .subscribe( (resp:any) => 
            
            this.hospitales =resp
          
          )
    return;

  }
}
