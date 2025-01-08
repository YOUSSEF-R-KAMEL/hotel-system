import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRoomsComponent } from './fav-rooms.component';

describe('FavRoomsComponent', () => {
  let component: FavRoomsComponent;
  let fixture: ComponentFixture<FavRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
