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

@NgModule({
  declarations: [
    HomeComponent,
    SharedRoomsComponent,
    PopularRoomsComponent,
    TestimonialsComponent,
    TestimonialCarouselComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    SharedModule
  ],
})
export class HomeModule {}
