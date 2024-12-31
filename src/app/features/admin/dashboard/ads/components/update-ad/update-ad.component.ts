import { Component, Inject } from '@angular/core';
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
  constructor(
    public dialogRef: MatDialogRef<UpdateAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string; data: Ads }
  ) {
    this.updateAdForm = new FormGroup({
      discount: new FormControl(data.data.room.discount , [Validators.required]),
      isActive: new FormControl(data.data.isActive , [Validators.required]),
    });
  }
}
