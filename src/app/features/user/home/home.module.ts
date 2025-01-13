import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { NgxStripeModule } from 'ngx-stripe';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentComponent } from './components/payment/payment.component';
import { PopularRoomsComponent } from './components/popular-rooms/popular-rooms.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { SharedRoomsComponent } from './components/shared-rooms/shared-rooms.component';
import { TestimonialCarouselComponent } from './components/testimonial-carousel/testimonial-carousel.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const publicKey =
  'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8';
@NgModule({
  declarations: [
    HomeComponent,
    SharedRoomsComponent,
    PopularRoomsComponent,
    TestimonialsComponent,
    TestimonialCarouselComponent,
    PaymentComponent,
    RoomDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    SharedModule,
    QuillModule.forRoot(),
    MatStepperModule,
    NgxStripeModule.forRoot(publicKey),
  ],
  exports: [RoomDetailsComponent],
})
export class HomeModule {}
