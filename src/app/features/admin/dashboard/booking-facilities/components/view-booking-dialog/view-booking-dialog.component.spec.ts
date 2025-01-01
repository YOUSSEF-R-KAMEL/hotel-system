import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingDialogComponent } from './view-booking-dialog.component';

describe('ViewBookingDialogComponent', () => {
  let component: ViewBookingDialogComponent;
  let fixture: ComponentFixture<ViewBookingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBookingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
