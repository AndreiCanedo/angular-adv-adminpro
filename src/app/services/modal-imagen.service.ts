import { EventEmitter, Injectable } from '@angular/core';

const base_url = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  //el colocar _ da a entender que es una propiedad privada
  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios'|'medicos'|'hospitales';
  public id!: string;
  public img!: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( 
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string,
    img: string = 'no-image'
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    //this.img = img;

    if ( img.includes('https') ){
      this.img = img;
    }else{
      this.img = `${ base_url }/upload/${ tipo }/${ img }`
    }

  }

  cerrarModal(){
    this._ocultarModal = true;
  }
}
