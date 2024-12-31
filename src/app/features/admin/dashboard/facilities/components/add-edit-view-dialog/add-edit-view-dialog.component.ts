import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-view-dialog',
  templateUrl: './add-edit-view-dialog.component.html',
  styleUrl: './add-edit-view-dialog.component.scss'
})
export class AddEditViewDialogComponent {
  name = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: string, data: any },
  ) {
    if (data.data) {
      this.name = data.data.name;
    }
  }
}
