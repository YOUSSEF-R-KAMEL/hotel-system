import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss',
})
export class UpdateAdComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {}
}
