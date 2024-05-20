import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  private sidebarServices = inject(SidebarService);

  menuItems:any[] = this.sidebarServices.menu;
  
  constructor(){
    console.log(this.menuItems);
  }

}
