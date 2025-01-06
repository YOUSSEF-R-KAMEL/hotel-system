import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { exploreRoomWithFiltersResolver } from './explore-room-with-filters.resolver';

describe('exploreRoomWithFiltersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => exploreRoomWithFiltersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
