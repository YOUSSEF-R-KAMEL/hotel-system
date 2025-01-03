import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { of } from 'rxjs';
import { IRoom } from '../interfaces/room.interface';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';

export const roomResolver: ResolveFn<IApiResponse> = (route, state) => {
  const roomService = inject(RoomsService);
  const roomId = route.params['id'];
  return roomService.getRoom(roomId);
};
