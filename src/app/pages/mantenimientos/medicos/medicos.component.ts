import { Component, OnDestroy, OnInit, inject } from '@angular/core';


import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

import { Medico } from '../../../models/medico.model';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})

export class MedicosComponent implements OnInit, OnDestroy{
  
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;
  
  private medicoServices = inject(MedicoService);
  private modalImagenService = inject(ModalImagenService);
  private busquedaService = inject(BusquedasService);
  
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }
  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarMedicos() )
  }

  cargarMedicos(){

    this.cargando = true;

    this.medicoServices.cargarMedicos()
        .subscribe( medicos => {
          this.cargando = false;
          this.medicos = medicos;
          this.medicosTemp = medicos;
        })

  }

  borrarMedico( medico: Medico ){

    Swal.fire({
      title: "Desea Eliminar al Medico?",
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, Borrarlo"
    }).then((result) => {
      if (result.isConfirmed) {

          this.medicoServices.eliminarMedico( medico.uid )
                .subscribe( resp => { 
                  
                  this.cargarMedicos();
                  
                  Swal.fire({
                    title: "Eliminado!",
                    text: "El Medico ah sido eliminado",
                    icon: "success"
                  });

                });
      }
    });

    return;

  }

  abrirModal(medico : Medico){
    this.modalImagenService.abrirModal('medicos', medico.uid, medico.img);
  }

  buscar( termino: string){

    if ( termino.length === 0){
      
      return this.medicos = this.medicosTemp;
    }

    this.busquedaService.buscar('medicos', termino)
          .subscribe( (resp:any) => 
            
            this.medicos =resp
          
          )
    return;

  }

}
