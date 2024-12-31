import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Room } from '../../interfaces/IAdsResponse';
import { RoomsService } from '../../../rooms/services/rooms.service';

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
    room: new FormControl('', [Validators.required]),
    discount: new FormControl(0, [Validators.required]),
    isActive: new FormControl(false, [Validators.required]),
  });
  adsParams: any = {
    page: 1,
    size: 1000,
  };
  constructor(
    public dialogRef: MatDialogRef<AddAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string },
    private roomsService: RoomsService
  ) {}
  ngOnInit(): void {
    this.getRooms();
  }
  getRooms () {
    this.roomsService.getRooms(this.adsParams).subscribe({
      next: (res: any) => {
        this.rooms = res.data.rooms;
      },
      error: (err) => {
        console.log(err.error.message)
      },
    });
  }
}
