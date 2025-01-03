import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRoomsComponent } from './shared-rooms.component';

describe('SharedRoomsComponent', () => {
  let component: SharedRoomsComponent;
  let fixture: ComponentFixture<SharedRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
