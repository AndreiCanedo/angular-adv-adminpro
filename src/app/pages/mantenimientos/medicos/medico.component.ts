import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit{
  
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital | undefined;
  public medicoSeleccionado: Medico | undefined;
  public hospitalTem:Hospital | undefined;

  private fb = inject(FormBuilder);
  private hospitalServices =  inject(HospitalService);
  private medicoServices = inject(MedicoService);
  private router = inject(Router);
  private activateRoute= inject(ActivatedRoute);
  
  ngOnInit(): void {

    //con el activateRoute tomamos el parametro que tenemos en la ruta
    //y nosotros por medio del pagesRouter mandamos id por eso destructuramos
    //con el nombre del id y de esta manera tenemos el id del medico
    this.activateRoute.params.subscribe( ({ id }) => {
      this.cargarMedico( id );
    })

    // this.medicoServices.obtenerMedigoPorId();

    this.medicoForm = this.fb.group({
      nombre:[ '', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();
    //valueChanges es una promesa que revisara siempre si hospital cambia por lo
    //tanto me puedo subscribir
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
          
          this.hospitalSeleccionado = this.hospitales.find( h => h.uid === hospitalId );
          //filtro y el hospital seleccionado estara en hospitalSeleccionado
        })
  }

  cargarHospitales(){

    this.hospitalServices.cargarHospitales()
        .subscribe( (hospitales:Hospital[] ) => {
          this.hospitales = hospitales;
        })

  }

  cargarMedico(id:string){

     if( id ===  'nuevo'){
       return;
     }

    this.medicoServices.obtenerMedigoPorId( id )
        .pipe(
          delay(100)
        )
        .subscribe( (medico:any)  => {
           if( !medico ){
             this.router.navigateByUrl(`/dashboard/medicos`)
             return;
           }
           const { nombre, hospital: {_id} } = medico;
            this.medicoSeleccionado = medico;
            this.medicoForm.setValue({ nombre, hospital:_id })
         });
        
  }

  guardarMedico(){
    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado ){
      //actualizar
      const data = {
        ...this.medicoForm.value,
        uid: this.medicoSeleccionado.uid
      }
      this.medicoServices.actualizarMedico( data )
          .subscribe( resp => { 
            Swal.fire('Actualizado', `${ nombre } actualizado Correctamente`,'success');
          })
    }else{
      //crear
      this.medicoServices.crearMedico( this.medicoForm.value )
          .subscribe( (resp: any ) => {
            Swal.fire('Creado', `${ nombre } creado Correctamente`,'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico.uid }`)
          })

    }
  }

}
