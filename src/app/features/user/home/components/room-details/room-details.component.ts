import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../../services/rooms.service';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { IApiResponse } from './../../../../../shared/interface/api-data-response/api-response.interface';
import { IApiRoomResponse } from '../../../interfaces/api-response-room.interface';
import { IRouterMatcher } from 'express';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnInit {
  _route = inject(ActivatedRoute)
  _roomsService = inject(RoomsService)
  currentRoomDetails: IRoom | null = null;
  id:string = ''
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.getRoomDetails()
  }

  getRoomDetails(){
    this._roomsService.getRoomDetails(this.id).subscribe({
      next: (res: IApiRoomResponse) => {
        this.currentRoomDetails = res.data.room as IRoom;
      },
      error: (err) => {
        console.error('Error fetching room details', err);
      },
      complete: () => {
        console.log(this.currentRoomDetails);
      }
    });
  }


}
