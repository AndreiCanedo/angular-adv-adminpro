import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { GraficalComponent } from './grafical/grafical.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';






@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesaComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent
  ],
  //teemos que exportar para ser utilizados si queremos usarlo fuera de este modulo
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
