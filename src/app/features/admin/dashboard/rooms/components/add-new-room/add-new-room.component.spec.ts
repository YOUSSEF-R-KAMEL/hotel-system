import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewEditRoomComponent } from './add-new-room.component';

describe('AddNewRoomComponent', () => {
  let component: AddViewEditRoomComponent;
  let fixture: ComponentFixture<AddViewEditRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddViewEditRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddViewEditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
