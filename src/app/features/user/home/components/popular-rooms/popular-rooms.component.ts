import { Component, Input } from '@angular/core';
import { IRoom } from '../../../../../shared/interface/room/room.interface';

@Component({
  selector: 'app-popular-rooms',
  templateUrl: './popular-rooms.component.html',
  styleUrl: './popular-rooms.component.scss'
})
export class PopularRoomsComponent {
  @Input() rooms: IRoom[] = [];

}
