import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RoomsService } from '../services/rooms.service';
import { of } from 'rxjs';
import { IRoom } from '../interfaces/room.interface';

export const roomResolver: ResolveFn<any> = (route, state) => {
  const roomService = inject(RoomsService);
  const roomId = route.params['id'];
  console.log('Room ID:', roomId);
    roomService.getRoom(roomId).subscribe({
      next: (response) => {
        console.log(response.data.room);
        return response.data.room;
      }
    });
  return of(null);
};
