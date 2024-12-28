import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedInAdminGuard } from './logged-in-admin.guard';

describe('loggedInAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loggedInAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
