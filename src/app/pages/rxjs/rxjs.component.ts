import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent  implements OnDestroy{

  public intervaleSubs!: Subscription;

  constructor(){

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs:',valor),
    //   err => console.warn('Error',err),
    //   () => console.info('Obs Terminado')
    // );

    // this.retornaIntervalo()
    //     .subscribe(
    //       (valor)=>console.log(valor)
    //     )
    // Lo de arriba es lo mismo que el de abajo, solo tomo el primer valor y lo imprimo
    this.intervaleSubs = this.retornaIntervalo()
        .subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervaleSubs.unsubscribe();
  }

  retornaIntervalo():Observable<number>{
    return interval(500)
             .pipe(
               take(10),
               map(valor => valor+1),
               filter(valor => (valor % 2 == 0)? true:false )//cuando es falso no continua con las demas emociones
             );
  }

  retornaObservable():Observable<number>{
    let i = -1;

    return new Observable<number>( observer => {
      
      const intervalo = setInterval(() =>{
      
        i++;
        observer.next(i);
        /*console.log('tick');*/
        if(i == 4){
          clearInterval( intervalo );
          observer.complete();
        }

        if(i == 2){
          observer.error('i llego al valor de 2');
        }
      
      },1000)

    });


  }

}
