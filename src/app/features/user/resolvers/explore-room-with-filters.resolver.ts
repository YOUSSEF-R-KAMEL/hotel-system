import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { IApiResponse } from '../../../shared/interface/api-data-response/api-response.interface';
import { IRoomParams } from '../../../shared/interface/params/params.interface';

export const exploreRoomWithFiltersResolver: ResolveFn<IApiResponse> = (route, state) => {
  const filters = route.queryParams as IRoomParams;
  const roomsService = inject(RoomsService);
  return roomsService.getAllRooms(filters);
};
