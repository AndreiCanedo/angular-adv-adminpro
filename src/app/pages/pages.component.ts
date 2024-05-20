import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():any;
//si no declaro la funcion me marca error, esta funcion esta de modo global
//y con esta linea le digo a angular que hay una funcion de manera
//global que si existe y se llama asi para que no me la marque como error

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent  implements OnInit{
  
  private settingsService= inject(SettingsService);

  ngOnInit(): void {
    customInitFunctions();
    //esta funcion se tubo que hacer para que cuando logueara no me volviera a cargar la pagina
    //esta funcion viene de  assets/js/custom.js, esto no es causa de angular si no de 
    //quien diseño el archivo
  }

}
