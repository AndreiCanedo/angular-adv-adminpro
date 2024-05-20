import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit{
    
    
   // public linkTheme = document.querySelector('#theme');
    //se saca de changeTheme porque es un selector, mientras menos veces sea llamado
    //mas eficiente es el selector

    private settingsService = inject(SettingsService)

    ngOnInit(): void {
        this.settingsService.checkCurrentTheme();
        
    }

    changeTheme(theme:string){
      
      this.settingsService.changeTheme(theme);

    }

    
}
