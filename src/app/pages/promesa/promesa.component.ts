import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: ``
})
export class PromesaComponent implements OnInit{
  
  
  ngOnInit(): void {

    this.getUsuario().then(usuarios => {
      console.log(usuarios)
    });
    //gracias a la promesa puedo consultar los usuarios
    
    
    // const promesa = new Promise((resolve,reject) =>{
    //   if(true){
    //   resolve('Hola mundo');
    //   }else{
    //     reject('Algo Salio mal');
    //   }

    // });

    // promesa.then((mensaje) =>{
    //   console.log(mensaje)
    // })
    // .catch(error => console.log('error en mi promesa'))

    // console.log('Fin init');
    
    
  }

  getUsuario(){

    return new Promise(resolve => {

    fetch('https://reqres.in/api/users')
    //en esta promesa recibo la informacion de esta pagina
      .then(resp => resp.json() )
      //en esta la convierto a json
      .then(body => resolve(body.data));
      //en esta extraigo la informacion que quiero en esta vez el body
      //pero del body solo quiero la data, para poder consultar los usuarios

    });

    

  }

}
