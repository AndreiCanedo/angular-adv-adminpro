import { Component } from '@angular/core';
import { ChartData } from 'chart.js';



@Component({
  selector: 'app-grafical',
  templateUrl: './grafical.component.html',
  styles: ``
})
export class GraficalComponent{

  public labels1: string[] = ['Pan','Refresco','Tacos'];
  public data1:ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [400, 100 ,200],
        backgroundColor: [
          '#6857e6',
          '#009fee',
          '#f02059']
       },
    ],
  };

   
}
