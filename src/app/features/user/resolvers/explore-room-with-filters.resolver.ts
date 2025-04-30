import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { IRoomParams } from '../../../shared/interface/params/params.interface';
import { RoomsService } from '../services/rooms/rooms.service';

export const exploreRoomWithFiltersResolver: ResolveFn<IApiResponse> = (route, state) => {
  const filters = route.queryParams as IRoomParams;
  const roomsService = inject(RoomsService);
  roomsService.getAllRooms(filters).subscribe({
    next: (res) => {
    }
  })
  return roomsService.getAllRooms(filters);
};
