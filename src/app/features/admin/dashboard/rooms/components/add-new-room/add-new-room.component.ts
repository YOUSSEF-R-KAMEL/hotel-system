import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from '../../../../../../shared/interface/api-data-response/api-response.interface';
import { IRoom } from '../../../../../../shared/interface/room /room.interface';
import { IFacility } from '../../interfaces/facilities.interface';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrl: './add-new-room.component.scss',
})
export class AddViewEditRoomComponent implements OnInit {
  isViewMode = true;
  resMsg: any = '';
  files: File[] = [];
  room: IRoom | null = null;
  facilities: IFacility[] = [];
  imagePreviews: { url: string; file: File }[] = [];
  roomForm: FormGroup = new FormGroup({
    roomNumber: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{0,9}$/),
    ]),
    capacity: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{0,9}$/),
    ]),
    discount: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{0,9}$/),
    ]),
    facilities: new FormControl(null, [Validators.required]),
  });
  dropdownOpen: boolean = false;

  constructor(
    private _roomsService: RoomsService,
    private _ToastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data: any) => {
      const roomData = data.room.data.room;
      this.room = roomData;
      this.roomForm.patchValue({
        roomNumber: roomData.roomNumber,
        price: roomData.price,
        capacity: roomData.capacity,
        discount: roomData.discount,
        facilities: roomData.facilities.map(
          (facility: IFacility) => facility._id
        ),
      });
      this.initializeImages(roomData.images);
    });
  }

  ngOnInit(): void {
    this.isViewMode = this.isView();
    if (this.isViewMode) {
      this.roomForm.disable();
    }
    this.getFacilities();
  }
  isView() {
    const currentPath = this.router.url;
    return currentPath.includes('view-room') ? true : false;
  }

  initializeImages(imageUrls: string[]) {
    imageUrls.forEach(async (url) => {
      const blob = await fetch(url).then((res) => res.blob());
      const file = new File([blob], url.substring(url.lastIndexOf('/') + 1), {
        type: blob.type,
      });
      this.imagePreviews.push({ url, file });
      this.files.push(file);
    });
  }

  saveRoom() {
    const formData = this.buildFormData(this.roomForm, { images: this.files });
    if (this.room) {
      if (this.isViewMode) {
        this.router.navigate(['../../'], { relativeTo: this.route });
        return;
      } else {
        this.updateRoom(this.room._id, formData);
      }
    } else {
      this.addRoom(formData);
    }
  }
  addRoom(formData: FormData) {
    this._roomsService.addRoom(formData).subscribe({
      error: (error) => {
        this._ToastrService.error('Failed to add room.', 'Error');
      },
      complete: () => {
        this._ToastrService.success('Room added successfully!', 'Success');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    });
  }

  updateRoom(id: string, formData: FormData) {
    this._roomsService.updateRoom(id, formData).subscribe({
      error: (error) => {
        this._ToastrService.error('Failed to update room.', 'Error');
      },
      complete: () => {
        this._ToastrService.success('Room updated successfully!', 'Success');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
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
    });
  }

  onSelect(event: any) {
    if (this.isViewMode) return;
    this.files.push(...event.addedFiles);
    event.addedFiles.forEach((file: File) => {
      this.imagePreviews.push({ url: URL.createObjectURL(file), file });
    });
  }

  onRemove(event: any) {
    if (this.isViewMode) return;
    const index = this.files.indexOf(event.file);
    if (index !== -1) {
      this.files.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    }
  }

  buildFormData(
    formGroup: FormGroup,
    fileFields: { [key: string]: File[] }
  ): FormData {
    const formData = new FormData();
    Object.keys(formGroup.controls).forEach((key) => {
      const value = formGroup.get(key)?.value;
      if (key === 'facilities' && Array.isArray(value)) {
        value.forEach((facilityId: string) => {
          formData.append('facilities', facilityId);
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
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
