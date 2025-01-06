import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRoom } from '../../../../shared/interface/room/room.interface';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  rooms: IRoom[] = [];
  page: number = 1;
  size: number = 10;
  constructor(private route: ActivatedRoute, private roomsService: RoomsService) {
    this.route.data.subscribe((data: any) => {
      const rooms = data.filters.data.rooms;
      this.rooms = rooms;
    })
  }

}
