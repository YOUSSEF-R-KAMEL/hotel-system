import { Component, OnInit } from '@angular/core';
import { ITableAction, ITableInput } from '../../../../shared/interface/table/table-input.interface';
import { IGetRooms, IRoomWithCount } from './interfaces/get-rooms-interface';
import { RoomsService } from './services/rooms.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { IRoom } from './interfaces/room.interface';
import { Router } from '@angular/router';
import { DeleteItemComponent } from '../../../../shared/components/delete-item/delete-item.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})

export class RoomsComponent implements OnInit {
  roomsData: ITableInput;
  page = 1;
  size = 10;
  actions: ITableAction[] = [];
  dataForCurrentRoom!:IRoom
  constructor(private _roomsService: RoomsService,
              private _toast: ToastrService,
              private _dialog: MatDialog,
              private _router:Router
            ) {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (row) => {
          this.onViewRoom(row);
        }
      },
      {
        type: 'icon',
        color: 'primary',
        label: 'Edit',
        icon: 'edit_square',
        callback: (row) => {
          this.onUpdateRoom(row)
        }
      },
      {
        type: 'icon',
        color: 'warn',
        label: 'Delete',
        icon: 'delete',
        callback: (row) => {
          this.onDeleteRoom(row)
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
        rooms: data.rooms,
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
  onViewRoom(data:IRoom){
    this.dataForCurrentRoom = data;
    this._dialog.open(ViewRoomComponent, {
      data: data,
    });
  }
  onUpdateRoom(data:IRoom){
    this.dataForCurrentRoom = data
    this._router.navigate(['/admin/dashboard/rooms/update-room', data._id])
  }
  onDeleteRoom(data: IRoom) {
    const dialogRef = this._dialog.open(DeleteItemComponent, {
      data: { text: 'Room' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._roomsService.deleteRoom(data._id).subscribe({
          next: (res) => {
          },
          error: (err) => {
            this._toast.error(err.error.message);
          },
          complete: () => {
            this._toast.success('Room Deleted Successfully');
            this.getRooms();
          }
        });
      }
    });
  }
}
