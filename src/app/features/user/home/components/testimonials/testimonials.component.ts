import { Component, inject, Input, OnInit } from '@angular/core';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';
import { IRoom } from '../../../../../shared/interface/room/room.interface';
import { IGetRoomReview } from '../../../interfaces/room-review.interface';
import { RoomsService } from '../../../services/rooms/rooms.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit{
  stars: number[] = Array(5).fill(0);
  @Input() room: IRoom | null = null;
  reviews: IGetRoomReview[] = [];
  private roomsService = inject(RoomsService);
  ngOnInit(): void {
    if (this.room) {
      this.roomsService.getRoomReviews(this.room?._id as string).subscribe({
        next: (res: IApiResponse) => {
          this.reviews = res.data.roomReviews as IGetRoomReview[];
          console.log(this.reviews)
        }
      })
    }
  }
}
