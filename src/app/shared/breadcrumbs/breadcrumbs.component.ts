import { Component, OnDestroy, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo!: string;
  public tituloSubs$!: Subscription;

  private router = inject(Router);

  constructor(){
    this.tituloSubs$ = this.getArgumentosRuta()
                            // .subscribe(data => {
                            //   this.titulo = data.titulo
                            // }) el parentesis dentro de un corchete es destructurar 
                            // titulo lo que es igual poner data.titulo en este caso
                            .subscribe( ({ titulo }) => {
                              this.titulo = titulo
                              document.title = `AdminPro - ${titulo}`;
                            });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter((event:any) => event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild == null),
      map( (event:ActivationEnd) => event.snapshot.data)
    )
    
  }

}
