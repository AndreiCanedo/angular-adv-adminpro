import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ``
})
export class IncrementadorComponent implements OnInit{
  
  
  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }
  // En este ejemplo en lugar de que mi input espere progreso este sera llamado como valor
   @Input('valor') progreso: number =20;
   @Input() btnClass: string = 'btn-primary';
  //@Input() progreso: number =20;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  // get getPorsentaje(){
  //   return `${this.progreso}%`
  // }
  
  cambiarValor(valor: number){
    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      this.progreso = 100;
    }else if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      this.progreso = 0;
    }else{
      this.progreso = this.progreso + valor;
      this.valorSalida.emit(this.progreso);
    }
  }

  onChange(nuevoValor:number){

    // console.log('Hey!!')

    if(nuevoValor >= 100){
      this.progreso = 100;
    }else if(nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }


    this.valorSalida.emit( this.progreso);
  }


}
