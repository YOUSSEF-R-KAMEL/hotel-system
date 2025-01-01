import { RoomRoutes } from './routes/room-routes';
import { Component, OnInit } from '@angular/core';
import { ITableAction, ITableInput } from '../../../../shared/interface/table/table-input.interface';
import { IRoomWithCount } from './interfaces/get-rooms-interface';
import { RoomsService } from './services/rooms.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoom } from './interfaces/room.interface';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})

export class RoomsComponent implements OnInit {
  roomsData: ITableInput;
  page = 1;
  size = 10;
  roomsColumns: string[] = [];
  actions: ITableAction[] = [];
  constructor(private _roomsService: RoomsService, private router: Router, private route: ActivatedRoute) {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (row: IRoom) => {
          this.router.navigate([RoomRoutes.VIEW_ROOM, row._id], { relativeTo: this.route });
        }
      },
      {
        type: 'icon',
        color: 'primary',
        label: 'Edit',
        icon: 'edit_square',
        callback: (row) => {
          console.log('Edit', row);
        }
      },
      {
        type: 'icon',
        color: 'warn',
        label: 'Delete',
        icon: 'delete',
        callback: (row) => {
          console.log('Delete', row);
        }
      },
    ]
    this.roomsData = {
      data: {
        rooms: [],
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
    console.log(data);
    this.roomsData = {
      data: {
        rooms: data.rooms,
        totalCount: data.totalCount
      },
      actions: this.actions
    }
    this.roomsColumns = [
      'Room',
      'Price',
      'Capacity',
      'Discount',
      'Facilities',
      'Created by',
      'Room images'
    ]
  }

  handlePageChange(event: { pageNumber: number; pageSize: number }) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getRooms();
  }

  get RoomRoutes() {
    return RoomRoutes
  }
}
