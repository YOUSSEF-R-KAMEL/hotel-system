import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
} from 'chart.js/dist/types/index';
import { BaseChartDirective } from 'ng2-charts';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(BaseChartDirective) bookingChart!: BaseChartDirective;
  @ViewChild(BaseChartDirective) userChart!: BaseChartDirective;
  cards: any[] = [];
  public bookingChartData: ChartConfiguration['data'] = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        label: 'Bookings',
        data: [],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  };
  public chartType: ChartType = 'doughnut';
  public userChartData: ChartConfiguration['data'] = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        label: 'Users',
        data: [],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(153, 102, 255)'],
      },
    ],
  };
  public chartOptions: ChartOptions = { responsive: true };
  public userChartType: ChartType = 'polarArea';
  constructor(private _HomeService: HomeService) {}
  ngOnInit(): void {
    this._HomeService.getChartData().subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.cards = [
            { name: 'Rooms', number: res.data.rooms },
            { name: 'Facilities', number: res.data.facilities },
            { name: 'Ads', number: res.data.ads },
          ];

          this.bookingChartData.datasets[0].data = [
            res.data.bookings.pending,
            res.data.bookings.completed,
          ];

          this.userChartData.datasets[0].data = [
            res.data.users.admin,
            res.data.users.user,
          ];
          this.bookingChart?.update();
          this.userChart?.update();
        }
      },
    });
  }
}
