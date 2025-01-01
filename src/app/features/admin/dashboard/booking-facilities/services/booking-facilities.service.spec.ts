import { TestBed } from '@angular/core/testing';

import { BookingFacilitiesService } from './booking-facilities.service';

describe('BookingFacilitiesService', () => {
  let service: BookingFacilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingFacilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
