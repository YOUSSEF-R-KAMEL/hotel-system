import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { IFavoriteRooms } from '../../interfaces/favorite-rooms-interface';
import { FavoriteRoomsService } from '../../services/favorite-rooms.service';

@Component({
  selector: 'app-fav-rooms',
  templateUrl: './fav-rooms.component.html',
  styleUrls: ['./fav-rooms.component.scss'],
})
export class FavRoomsComponent {
  rooms: IRoom[] = [];
  page: number = 1;
  size: number = 10;
  constructor(
    private route: ActivatedRoute,
    private favRoomsService: FavoriteRoomsService
  ) {
    this.route.data.subscribe((data: any) => {
      console.log(data);
      const favRooms = data?.filters?.data?.favoriteRooms;
      this.rooms = favRooms.map((room: IFavoriteRooms) => room.rooms);
    });
  }
}
