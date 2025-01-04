import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';
import { RoomsService } from '../services/rooms.service';

export const roomResolver: ResolveFn<IApiResponse> = (route, state) => {
  const roomService = inject(RoomsService);
  const roomId = route.params['id'];
  return roomService.getRoom(roomId);
};
