import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRoom } from '../../../../../../shared/interface/room /room.interface';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.scss',
})
export class UpdateRoomComponent implements AfterViewInit {
  resMsg: any = '';
  currentRoomId: string = '';
  currentRoom!: IRoom;
  files: File[] = [];
  imgSrc: any;
  facilitiesArr: string[] = [];
  selectedAmenities: string[] = [];
  dropdownOpen: boolean = false;
  updateRoomForm!: FormGroup;
  constructor(
    private _roomsService: RoomsService,
    private _ToastrService: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.getCurrentRoomData();
  }
  ngAfterViewInit(): void {
    this.getFacilities();
    this.getCurrentRoomData();
  }
  updateRoom() {
    if (this.updateRoomForm.valid) {
      const myData = new FormData();
      Object.keys(this.updateRoomForm.controls).forEach((key) => {
        const value = this.updateRoomForm.get(key)?.value;
        if (value) {
          myData.append(key, value);
        }
      });
      myData.append('imgs', this.imgSrc);
      myData.append('facilities', JSON.stringify(this.selectedAmenities));
      this._roomsService.updateByID(this.currentRoomId!, myData).subscribe({
        next: (res) => {
          this.resMsg = res;
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error');
        },
        complete: () => {
          this._ToastrService.success(this.resMsg, 'Success');
        },
      });
    }
  }
  getFacilities() {
    this._roomsService.getFacilities().subscribe({
      next: (res) => {
        res.data.facilities.forEach((fa) => {
          this.facilitiesArr.push(fa.name);
        });
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error');
      },
      complete: () => {
        // console.log(this.facilitiesArr)
      },
    });
  }
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  cancelAction() {
    this._router.navigate(['/admin/dashboard/rooms']);
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if (checkbox.checked) {
      if (!this.selectedAmenities.includes(value)) {
        this.selectedAmenities.push(value);
      }
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(
        (item) => item !== value
      );
    }
    console.log(this.selectedAmenities);
  }
  getCurrentRoomData() {
    this.currentRoomId = this._route.snapshot.paramMap.get('id')!; // Get route param
    this._roomsService.getRoomByID(this.currentRoomId).subscribe((res: any) => {
      this.updateRoomForm = new FormGroup({
        roomNumber: new FormControl(res.data.room.roomNumber, [
          Validators.required,
          Validators.pattern(/^[0-9]+[-][0-9]+$/),
        ]),
        price: new FormControl(res.price, [
          Validators.required,
          Validators.pattern(/^[0-9]{0,9}$/),
        ]),
        capacity: new FormControl(res.capacity, [
          Validators.required,
          Validators.pattern(/^[0-9]{0,9}$/),
        ]),
        discount: new FormControl(res.discount, [
          Validators.required,
          Validators.pattern(/^[0-9]{0,9}$/),
        ]),
      });
    });
  }
}
