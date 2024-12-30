import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ads } from '../../interfaces/IAdsResponse';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss',
})
export class UpdateAdComponent {
  discount = 0;
  isActive = false;
  constructor(
    public dialogRef: MatDialogRef<UpdateAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string; data: Ads }
  ) {
    this.discount = data.data.room.discount;
    this.isActive = data.data.isActive;
  }
}
