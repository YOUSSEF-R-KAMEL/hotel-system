import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { FavoriteRoomsService } from '../services/favRooms/favorite-rooms.service';

export const favoriteRoomsResolver: ResolveFn<IApiResponse> = (
  route,
  state
) => {
  const favoriteRoomsService = inject(FavoriteRoomsService);
  favoriteRoomsService.getAllFavRooms().subscribe({
    next: (res) => {
    },
  });
  return favoriteRoomsService.getAllFavRooms();
};
