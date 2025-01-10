import { Component, Input } from '@angular/core';
import { IGetRoomReview } from '../../../interfaces/room-review.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-testimonial-carousel',
  templateUrl: './testimonial-carousel.component.html',
  styleUrl: './testimonial-carousel.component.scss',
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(-100%)' })),
      state('center', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(100%)' })),
      transition('center => left, center => right', [
        animate('300ms ease-out')
      ]),
      transition('left => center, right => center', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class TestimonialCarouselComponent {
  @Input() reviews: IGetRoomReview[] = [];
  currentIndex = 0;
  animationState = 'center';

  get currentReview(): IGetRoomReview | null {
    return this.reviews.length > 0 ? this.reviews[this.currentIndex] : null;
  }

  navigate(direction: 'prev' | 'next'): void {
    if (this.reviews.length === 0) return;
    if (direction === 'prev') {
      this.currentIndex--;
    } else if (direction === 'next') {
      this.currentIndex++;
    }
    setTimeout(() => {
      this.animationState = 'center';
    }, 300);
  }
}
