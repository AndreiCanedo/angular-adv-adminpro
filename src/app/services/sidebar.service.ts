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
      {titulo:'ProgressBar',url:'progress'},
      {titulo:'Graficas',url:'grafical'}
    ]
  }];


  constructor() { }
}
