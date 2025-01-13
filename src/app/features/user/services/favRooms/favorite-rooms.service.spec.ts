import { TestBed } from '@angular/core/testing';

import { FavoriteRoomsService } from './favorite-rooms.service';

describe('FavoriteRoomsService', () => {
  let service: FavoriteRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
