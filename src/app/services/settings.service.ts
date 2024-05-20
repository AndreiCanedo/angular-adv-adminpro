import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') ||'./assets/css/colors/purple-dark.css';
    //usamos el getItem para tomar la informacion del tema guardado en el local storage y si viene 
    //vacio usar el purple-dark por defecto

    this.linkTheme?.setAttribute('href',url);
    //localStorage.setItem('theme',url);
   }

   changeTheme(theme:string){
      
      
    const url = `./assets/css/colors/${ theme }.css`;

    // console.log(url);
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme', url);
    //local storage guarda informacion de la aplicacion para el usuario, por lo tanto no es
    //recomendable a que muestre informacion sencible
    
    this.checkCurrentTheme();

  }

  checkCurrentTheme(){
    const links= document.querySelectorAll('.selector');
    //lo que hago con el query selectorAll busco todas la informacion que contengan la clase selector
    //so el setting es algo muy pesado no deberia de estar aqui, pero como en este caso
    //solo son 10 no hay problema
    //console.log(this.links);


   links.forEach(elem =>{
     elem.classList.remove('working');
     //primero borramos nuestro selector quitando la palabra working
     const btnTheme = elem.getAttribute('data-theme');
     //aqui estoy opteniendo el valor de data-theme
     const btnThemeUrl =  `./assets/css/colors/${ btnTheme }.css`;
     //construyo el url que estamos usando
     const currentTheme = this.linkTheme?.getAttribute('href');
     
     if(btnThemeUrl === currentTheme){
       elem.classList.add('working');
     }

   })

 }
}
