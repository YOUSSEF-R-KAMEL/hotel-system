import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Room } from '../../interfaces/IAdsResponse';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrl: './add-ad.component.scss',
})
export class AddAdComponent implements OnInit {
  rooms: Room[] = [];
  status: any[] = [];
  roomId: string = '';
  statusId: string = '';
  adsForm: FormGroup = new FormGroup({
    room: new FormControl(''),
    discount: new FormControl(null),
    isActive: new FormControl(false),
  });
  adsParams: any = {
    page: 1000,
    size: 1,
  };
  constructor(
    public dialogRef: MatDialogRef<AddAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {}
  ngOnInit(): void {}
}
