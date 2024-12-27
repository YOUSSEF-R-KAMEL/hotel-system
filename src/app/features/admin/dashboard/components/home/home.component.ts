import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js/dist/types/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public chartData: ChartConfiguration['data'] = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  public chartType: ChartType = 'doughnut';
}
