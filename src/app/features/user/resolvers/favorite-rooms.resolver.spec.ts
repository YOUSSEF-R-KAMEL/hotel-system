import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { favoriteRoomsResolver } from './favorite-rooms.resolver';

describe('favoriteRoomsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => favoriteRoomsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
