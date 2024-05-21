import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] =[{
    titulos:'Dashboard',
    icono: 'mdi mdi-gauge',
    submenu:[
      {titulo:'Main',url:'/'},
      {titulo:'Graficas',url:'grafical'},
      {titulo:'rxjs',url:'rxjs'},
      {titulo:'ProgressBar',url:'progress'},
      {titulo:'Promesas',url:'promesa'}
    ]
  }];


  constructor() { }
}
