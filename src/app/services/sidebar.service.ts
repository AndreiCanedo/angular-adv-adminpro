import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:any = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];

  
  }

//   menu:any[] =[
//   {
//     titulos:'Dashboard',
//     icono: 'mdi mdi-gauge',
//     submenu:[
//       {titulo:'Main',url:'/'},
//       {titulo:'Graficas',url:'grafical'},
//       {titulo:'rxjs',url:'rxjs'},
//       {titulo:'ProgressBar',url:'progress'},
//       {titulo:'Promesas',url:'promesa'}
//     ]
//   },
//   {
//     titulos:'Mantenimiento',
//     icono: 'mdi mdi-folder-lock-open',
//     submenu:[
//       {titulo:'Usuarios',url:'usuarios'},
//       {titulo:'Hospitales',url:'hospitales'},
//       {titulo:'Medicos',url:'medicos'},
//     ]
//   }
// ];


  constructor() { }
}
