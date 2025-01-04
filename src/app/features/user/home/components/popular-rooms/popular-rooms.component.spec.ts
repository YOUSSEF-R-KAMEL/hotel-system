import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularRoomsComponent } from './popular-rooms.component';

describe('PopularRoomsComponent', () => {
  let component: PopularRoomsComponent;
  let fixture: ComponentFixture<PopularRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
