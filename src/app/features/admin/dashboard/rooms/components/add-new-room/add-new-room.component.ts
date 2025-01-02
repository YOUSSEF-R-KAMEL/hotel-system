import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from '../../../../../../shared/interface/api-data-response/api-response.interface';
import { IFacility } from '../../interfaces/facilities.interface';
import { RoomsService } from '../../services/rooms.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrl: './add-new-room.component.scss'
})
export class AddViewEditRoomComponent implements OnInit {
  resMsg: any = ''
  files: File[] = [];
  facilities: IFacility[] = [];
  newRoomForm: FormGroup = new FormGroup({
    roomNumber: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    capacity: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    discount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    facilities: new FormControl(null, [Validators.required]),
  });
  dropdownOpen: boolean = false;
  constructor(
    private _roomsService: RoomsService,
    private _ToastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.data.subscribe((data: any) => {
      const roomData = data.room.data.room;
      console.log(roomData.facilities);
      this.newRoomForm.patchValue({
        roomNumber: roomData.roomNumber,
        price: roomData.price,
        capacity: roomData.capacity,
        discount: roomData.discount,
        facilities: roomData.facilities.map((facility: IFacility) => facility._id),
      })
    })
  }

  ngOnInit(): void {
    this.getFacilities();
  }

  addRoom() {
    const formData = this.buildFormData(this.newRoomForm, { images: this.files });
    this._roomsService.addRoom(formData).subscribe({
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
      next: (res: IApiResponse) => {
        this.facilities = res.data.facilities as IFacility[];
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

  buildFormData(formGroup: FormGroup, fileFields: { [key: string]: File[] }): FormData {
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
