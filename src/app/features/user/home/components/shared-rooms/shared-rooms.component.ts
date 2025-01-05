import { Component, OnInit } from '@angular/core';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-shared-rooms',
  templateUrl: './shared-rooms.component.html',
  styleUrl: './shared-rooms.component.scss',
})
export class SharedRoomsComponent implements OnInit {
  rooms: IRoom[] = [];
  page: number = 1;
  size: number = 10;
  constructor(private _RoomsService: RoomsService) {}
  ngOnInit(): void {
    this.getAllRooms();
  }
  getAllRooms() {
    this._RoomsService
      .getAllRooms({ page: this.page, size: this.size })
      .subscribe({
        next: (res) => {
          this.rooms = res.data.rooms as IRoom[];
          console.log(this.rooms);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
