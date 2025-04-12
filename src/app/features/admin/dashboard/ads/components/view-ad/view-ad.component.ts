import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ads } from '../../interfaces/IAdsResponse';

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrl: './view-ad.component.scss',
})
export class ViewAdComponent {
  public dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
}
