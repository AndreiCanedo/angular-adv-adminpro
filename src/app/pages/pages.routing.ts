import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [authGuard],
        children:[
          {path: '', component: DashboardComponent, data:{titulo: 'Dashboard'}},
          {path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Ajustes de Cuenta'}},
          {path: 'grafical', component: GraficalComponent, data:{titulo: 'Grafica #1'}},
          {path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil Usuario'}},
          {path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'}},
          {path: 'promesa', component: PromesaComponent, data:{titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent, data:{titulo: 'RxJs'}},


          //Mantenimientos
          {path: 'usuarios', component: UsuariosComponent, data:{titulo: 'Usuarios de Aplicacion'}},
         
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
