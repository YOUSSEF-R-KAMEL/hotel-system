import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRoom } from '../../../shared/interface/room/room.interface';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  rooms: IRoom[] = [];
  roomFiltersForm = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    capacity: new FormControl<number>(1), // Default initial value is 1
  });

  constructor(private _RoomService: RoomsService) { }

  ngOnInit(): void {
    this.getAllRooms();
  }
  getAllRooms() {
    this._RoomService.getAllRooms({ page: this.page, size: this.size }).subscribe({
      next: (res) => {
        this.rooms = res.data.rooms as IRoom[];
        console.log(this.rooms);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  exploreWithFilters() {
    let params = {
      page: this.page,
      size: this.size,
      startDate: this.roomFiltersForm.get('startDate')?.value,
      endDate: this.roomFiltersForm.get('endDate')?.value,
      capacity: this.roomFiltersForm.get('capacity')?.value
    }
    this._RoomService.getAllRooms(params).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get capacity() {
    return this.roomFiltersForm.get('capacity')!;
  }

  getCapacityDisplay(): string {
    const value = this.capacity.value || 0; // Fallback to 0 if null
    return `${value} person${value > 1 ? 's' : ''}`;
  }

  incrementCapacity(): void {
    const currentValue = this.capacity.value || 0;
    this.capacity.setValue(currentValue + 1);
  }

  decrementCapacity(): void {
    const currentValue = this.capacity.value || 1;
    if (currentValue > 1) {
      this.capacity.setValue(currentValue - 1);
    }
  }
}

