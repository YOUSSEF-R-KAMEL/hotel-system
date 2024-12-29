import { Component, OnInit, signal } from '@angular/core';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
} from 'chart.js/dist/types/index';
import { HomeService } from './services/home.service';
import { Charts, Data, ICard } from './interfaces/charts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookingChartData = signal<ChartConfiguration['data']>({
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        label: 'Bookings',
        data: [],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  });
  userChartData = signal<ChartConfiguration['data']>({
    labels: ['Admin', 'User'],
    datasets: [
      {
        label: 'Users',
        data: [],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(153, 102, 255)'],
        hoverOffset: 4,
      },
    ],
  });
  chartType: ChartType = 'doughnut';
  userChartType: ChartType = 'doughnut';
  chartOptions: ChartOptions = { responsive: true };
  cards = signal<ICard[]>([]);

  constructor(private _HomeService: HomeService, private toast: ToastrService) {}

  ngOnInit(): void {
    this._HomeService.getChartData().subscribe({
      next: (res: Charts) => {
        this.updateDataInCharts(res.data);
      },
      error: (err) => {
        // console.log(err);
        this.toast.error(err.error.message);
      }
    });
  }

  updateDataInCharts(res: Data) {
    this.cards.set([
      { name: 'Rooms', number: res.rooms },
      { name: 'Facilities', number: res.facilities },
      { name: 'Ads', number: res.ads },
    ]);

    this.bookingChartData.set({
      labels: ['Pending', 'Completed'],
      datasets: [
        {
          label: 'Bookings',
          data: [res.bookings.pending, res.bookings.completed],
          backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
          hoverOffset: 4,
        },
      ],
    });

    this.userChartData.set({
      labels: ['Admin', 'User'],
      datasets: [
        {
          label: 'Users',
          data: [res.users.admin, res.users.user],
          backgroundColor: ['rgb(75, 192, 192)', 'rgb(153, 102, 255)'],
          hoverOffset: 4,
        },
      ],
    });
  }
}

