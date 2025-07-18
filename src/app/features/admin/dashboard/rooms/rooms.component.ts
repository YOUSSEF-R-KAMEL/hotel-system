import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteItemComponent } from '../../../../shared/components/delete-item/delete-item.component';
import { IApiResponse } from '../../../../shared/interface/api-data-response/api-response.interface';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import {
  ITableAction,
  ITableInput,
} from '../../../../shared/interface/table/table-input.interface';
import { IRoomWithCount } from './interfaces/get-rooms-interface';
import { RoomRoutes } from './routes/room-routes';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent implements OnInit {
  roomsData: ITableInput;
  page = 1;
  size = 10;
  roomsColumns: string[] = [];
  actions: ITableAction[] = [];
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  private _roomsService = inject(RoomsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor() {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (row: IRoom) => {
          this.router.navigate([RoomRoutes.VIEW_ROOM, row._id], {
            relativeTo: this.route,
          });
        },
      },
      {
        type: 'icon',
        color: 'primary',
        label: 'Edit',
        icon: 'edit_square',
        callback: (row) => {
          this.router.navigate([RoomRoutes.EDIT_ROOM, row._id], {
            relativeTo: this.route,
          });
        },
      },
      {
        type: 'icon',
        color: 'warn',
        label: 'Delete',
        icon: 'delete',
        callback: (room: IRoom) => {
          this.openDeleteDialog(room);
        },
      },
    ];
    this.roomsData = {
      data: {
        rooms: [],
        totalCount: 0,
      },
      actions: this.actions,
    };
  }
  ngOnInit(): void {
    this.getRooms();
  }
  getRooms() {
    let roomParams = {
      page: this.page,
      size: this.size,
    };
    this._roomsService.getRooms(roomParams).subscribe({
      next: (res) => {
        this.passDataToTable(res.data);
      },
      error: (err) => {
      },
    });
  }
  passDataToTable(data: IRoomWithCount) {
    this.roomsData = {
      data: {
        rooms: data.rooms,
        totalCount: data.totalCount,
      },
      actions: this.actions,
    };
    this.roomsColumns = [
      'Room',
      'Price',
      'Capacity',
      'Discount',
      'Facilities',
      'Created by',
      'Room images',
    ];
  }

  handlePageChange(event: { pageNumber: number; pageSize: number }) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getRooms();
  }
  openDeleteDialog(room: IRoom) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: { text: 'room' },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this._roomsService.deleteRoom(room._id).subscribe({
            next: (res: IApiResponse) => {},
            error: (err) => {
              this.toast.error(err.error.message);
            },
            complete: () => {
              this.toast.success('Room deleted successfully!');
              this.getRooms();
            },
          });
        }
      },
    });
  }

  get RoomRoutes() {
    return RoomRoutes;
  }
}
