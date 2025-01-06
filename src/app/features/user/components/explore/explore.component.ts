import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApiResponse } from '../../../../shared/interface/api-data-response/api-response.interface';
import { IRoom } from '../../../../shared/interface/room/room.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  rooms: IRoom[] = [];
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data: any) => {
      const rooms = data.filters.data.rooms;
      this.rooms = rooms;
    })
  }
}
