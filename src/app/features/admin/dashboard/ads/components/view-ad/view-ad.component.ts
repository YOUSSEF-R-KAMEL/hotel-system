import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ads } from '../../interfaces/IAdsResponse';

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrl: './view-ad.component.scss',
})
export class ViewAdComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ads
  ) {}
}
