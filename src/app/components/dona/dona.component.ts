import { Component, Input, input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent {


  @Input() title: string= "Sin titulo";


  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [
    'label1',
    'label2',
    'label3',
  ];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ 
      data: [200,400,100],
      backgroundColor: [
        '#6857e6',
        '#009fee',
        '#f02059'
      ]},
      ],
  };
  public doughnutChartType: ChartType = 'doughnut';


  // ngOnChanges(){
  //   this.doughnutChartData ={
  //     labels: this.doughnutChartLabels,
  //     datasets:[{data:this.data,
  //       backgroundColor:[
  //         '#6857e6',
  //         '#009fee',
  //         '#f02059'
  //       ]}
  //     ]
  //   };
  // }
  

}
