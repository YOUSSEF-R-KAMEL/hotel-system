import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  // startDate: Date = 2023-01-01;
  // endDate: Date = '2023-01-30';
  constructor(private _RoomService: RoomsService) {}
  ngOnInit(): void {
    // this.onGetAllRooms();
  }
  onGetAllRooms(): void {
    // let roomsParams: IParams = {
    //   page: this.page,
    //   size: this.size,
    // };
    this._RoomService.getAllRooms().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
