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
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';


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


          //Mantenimientos ADMIN
          {path: 'usuarios', canActivate: [ adminGuard ], component: UsuariosComponent, data:{titulo: 'Mantenimiento Usuarios'}},


          //Mantenimeintos Users
          {path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Mantenimiento Hospitales'}},
          {path: 'medicos', component: MedicosComponent, data:{titulo: 'Mantenimiento Medicos'}},
          {path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Mantenimiento Medicos'}},

          //Busqueda total
          {path: 'buscar/:termino', component: BusquedaComponent, data:{titulo: 'Busquedas'}},
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
