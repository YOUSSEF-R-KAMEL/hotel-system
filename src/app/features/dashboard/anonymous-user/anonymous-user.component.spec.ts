import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousUserComponent } from './anonymous-user.component';

describe('AnonymousUserComponent', () => {
  let component: AnonymousUserComponent;
  let fixture: ComponentFixture<AnonymousUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnonymousUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnonymousUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
