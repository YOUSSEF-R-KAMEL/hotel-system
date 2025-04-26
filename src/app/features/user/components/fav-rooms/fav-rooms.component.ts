import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { FavoriteRoomsService } from '../../services/favRooms/favorite-rooms.service';
import { IFavoriteRooms } from './../../interfaces/favorite-rooms-interface';

@Component({
  selector: 'app-fav-rooms',
  templateUrl: './fav-rooms.component.html',
  styleUrls: ['./fav-rooms.component.scss'],
})
export class FavRoomsComponent {
  rooms: IRoom[] = [];
  page: number = 1;
  size: number = 10;
  private route = inject(ActivatedRoute);
  private favRoomsService = inject(FavoriteRoomsService);
  private toast = inject(ToastrService);
  constructor() {
    this.route.data.subscribe((data: any) => {
      const favRooms = data?.filters?.data?.favoriteRooms[0];
      this.rooms = favRooms.rooms
    });
  }
  removeFromFav(id: string) {
    this.favRoomsService.deleteFavRoom(id).subscribe({
      error: (err) => {
        this.toast.error('please try again later')
      },
      complete: () => {
        this.toast.success('removed from favourites');
        this.favRoomsService.getAllFavRooms().subscribe({
          next: (res) => {
            this.rooms = (res.data.favoriteRooms![0] as IFavoriteRooms).rooms
          }
        });
      }
    })
  }
}
