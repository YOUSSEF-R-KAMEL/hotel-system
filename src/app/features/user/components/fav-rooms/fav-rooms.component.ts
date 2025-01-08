import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFavoriteRooms } from '../../interfaces/favorite-rooms-interface';

@Component({
  selector: 'app-fav-rooms',
  templateUrl: './fav-rooms.component.html',
  styleUrls: ['./fav-rooms.component.scss'],
})
export class FavRoomsComponent {
  favRooms: IFavoriteRooms[] = [];
  page: number = 1;
  size: number = 10;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data: any) => {
      const favRooms = data.filters.data.favoriteRooms;
      this.favRooms = favRooms;
    });
  }
}
