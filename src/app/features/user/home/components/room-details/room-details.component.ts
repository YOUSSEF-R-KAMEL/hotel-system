import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../../services/rooms.service';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { IApiResponse } from './../../../../../shared/interface/api-data-response/api-response.interface';
import { IRouterMatcher } from 'express';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnInit {
  _roomsService = inject(RoomsService)
  currentRoomDetails: IRoom | null = null;
   constructor(private _activeRoute: ActivatedRoute,
                private _route: Router,
                private translate: TranslateService,
                private _authServices:AuthService) {
      this.translate.setDefaultLang(this.currentLang as string);
      this.translate.use(this.currentLang as string);
    }
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
  get currentLang() : string | null{
    return this._authServices.currentLang
  }
  id:string = ''
  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['id'];
    this.getRoomDetails()
  }
  getRoomDetails(){
    this._roomsService.getRoomDetails(this.id).subscribe({
      next: (res: IApiResponse) => {
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
  openPayment(){
    this._route.navigate(['home/payment'])
  }


}
