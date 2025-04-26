import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-view-dialog',
  templateUrl: './add-edit-view-dialog.component.html',
  styleUrl: './add-edit-view-dialog.component.scss'
})
export class AddEditViewDialogComponent {
  name = '';
  public data = inject(MAT_DIALOG_DATA);

  constructor() {
    if (this.data.data) {
      this.name = this.data.data.name;
    }
  }
}
