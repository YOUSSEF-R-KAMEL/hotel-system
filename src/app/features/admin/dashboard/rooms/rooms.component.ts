import { Component, OnInit } from '@angular/core';
import { ITableAction, ITableInput } from '../../../../shared/interface/table/table-input.interface';
import { IRoomWithCount } from './interfaces/get-rooms-interface';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})

export class RoomsComponent implements OnInit {
  roomsData: ITableInput;
  page = 1;
  size = 5;
  actions: ITableAction[] = [];
  constructor(private _roomsService: RoomsService) {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'view',
        callback: (row) => {
          console.log('View', row);
        }
      }
    ]
    this.roomsData = {
      data: {
        data: [],
        totalCount: 0
      },
      actions: this.actions
    }
  }
  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    let roomParams = {
      page: this.page,
      size: this.size
    }
    this._roomsService.getRooms(roomParams).subscribe({
      next: (res) => {
        console.log(res.data.rooms)
        this.passDataToTable(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  passDataToTable(data: IRoomWithCount) {
    this.roomsData = {
      data: {
        data: data.rooms,
        totalCount: data.totalCount
      },
      actions: this.actions
    }
  }

  handlePageChange(event : {pageNumber: number; pageSize: number}) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getRooms();
  }
}
