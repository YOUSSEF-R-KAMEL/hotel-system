import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.component.html',
  styleUrl: './add-new-room.component.scss'
})
export class AddNewRoomComponent implements OnInit {
  resMsg:any = ''
  facilitiesArr:string[] = []
  newRoomForm: FormGroup = new FormGroup({
    roomNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[-][0-9]+$/)]),
    price: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    capacity: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    discount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,9}$/)]),
    facilities: new FormControl(null, [Validators.required]),
  });
  constructor(
      private _roomsService: RoomsService,
      private _ToastrService: ToastrService,
  ){}

  ngOnInit(): void {
      this.getFacilities()
  }

  addRoom() {
    if (this.newRoomForm.valid) {
      this._roomsService.addNewRoom(this.newRoomForm.value).subscribe({
        next: (res) => {
          console.log(res)
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
  getFacilities(){
    this._roomsService.getFacilities().subscribe({
      next: (res) => {
        res.data.facilities.forEach(fa =>{
          this.facilitiesArr.push(fa.name)
        })
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error');
      },
      complete: () => {
        console.log(this.facilitiesArr)
      },
    })
  }
}
