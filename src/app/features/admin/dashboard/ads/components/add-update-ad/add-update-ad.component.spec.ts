import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAdComponent } from './add-update-ad.component';

describe('AddUpdateAdComponent', () => {
  let component: AddUpdateAdComponent;
  let fixture: ComponentFixture<AddUpdateAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
