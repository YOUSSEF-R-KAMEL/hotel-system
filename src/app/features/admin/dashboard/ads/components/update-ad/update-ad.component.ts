import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ads } from '../../interfaces/IAdsResponse';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss',
})
export class UpdateAdComponent {
  updateAdForm: FormGroup;
  discount = 0;
  isActive = false;
  public dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA)
  constructor() {
    this.updateAdForm = new FormGroup({
      discount: new FormControl(this.data.data.room.discount , [Validators.required]),
      isActive: new FormControl(this.data.data.isActive , [Validators.required]),
    });
  }
}
