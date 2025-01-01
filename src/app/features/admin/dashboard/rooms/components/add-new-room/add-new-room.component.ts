import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFacility } from '../../interfaces/facilities.interface';
import { RoomsService } from '../../services/rooms.service';
import { IRoom } from '../../interfaces/room.interface';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrl: './add-new-room.component.scss'
})
export class AddViewEditRoomComponent implements OnInit {
  resMsg: any = ''
  files: File[] = [];
  facilities: IFacility[] = []
  room!: IRoom;
  newRoomForm: FormGroup = new FormGroup({
    roomNumber: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    capacity: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    discount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    facilities: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _roomsService: RoomsService,
    private _ToastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['room'];
    console.log('Resolved data:', resolvedData);
    if (resolvedData) {
      this.room = resolvedData;
      console.log('Room data:', this.room);
    } else {
      this._ToastrService.error('Room not found!', 'Error');
    }
  }

  addRoom() {
    const formData = this.buildFormData(this.newRoomForm, { images: this.files });
    this._roomsService.addRoom(formData).subscribe({
      next: (response) => {
      },
      error: (error) => {
        this._ToastrService.error('Failed to add room.', 'Error');
      },
      complete: () => {
        this._ToastrService.success('Room added successfully!', 'Success');
        this.router.navigateByUrl('../')
      }
    });
  }

  getFacilities() {
    this._roomsService.getFacilities().subscribe({
      next: (res) => {
        this.facilities = res.data.facilities;
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error');
      },
    })
  }
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private buildFormData(formGroup: FormGroup, fileFields: { [key: string]: File[] }): FormData {
    const formData = new FormData();
    // Iterate over form controls and add values to FormData
    Object.keys(formGroup.controls).forEach((key) => {
      const value = formGroup.get(key)?.value;
      if (key === 'facilities' && Array.isArray(value)) {
        // Handle facilities as an array
        value.forEach((facilityId: string) => {
          formData.append('facilities', facilityId);
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    // Add files to FormData
    Object.keys(fileFields).forEach((key) => {
      const files = fileFields[key];
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('imgs', file);
        });
      }
    });
    return formData;
  }



}
