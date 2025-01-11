import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopularRoomsComponent } from './components/popular-rooms/popular-rooms.component';
import { SharedRoomsComponent } from './components/shared-rooms/shared-rooms.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { TestimonialCarouselComponent } from './components/testimonial-carousel/testimonial-carousel.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './components/payment/payment.component';
const publicKey = 'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8';
@NgModule({
  declarations: [
    HomeComponent,
    SharedRoomsComponent,
    PopularRoomsComponent,
    TestimonialsComponent,
    TestimonialCarouselComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    SharedModule,
    NgxStripeModule.forRoot(publicKey)
  ],
})
export class HomeModule { }
