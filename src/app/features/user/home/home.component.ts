import { Component, computed, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRoom } from '../../../shared/interface/room/room.interface';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';
import { IRoomParams } from '../../../shared/interface/params/params.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  rooms = signal<IRoom[]>([]);
  popularRooms = computed(() => this.rooms().slice(0, 5));
  firstRoomsSection = computed(() => this.rooms().slice(0, 4));
  secondRoomsSection = computed(() => this.rooms().slice(3, 7));
  thirdRoomsSection = computed(() => this.rooms().slice(6, 10));
  roomFiltersForm = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    capacity: new FormControl<number>(1),
  });

  constructor(private _RoomService: RoomsService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllRooms();
  }
  getAllRooms() {
    let params: IRoomParams = {
      page: this.page,
      size: this.size,
    }
    this._RoomService.getAllRooms(params).subscribe({
      next: (res) => {
        this.rooms.set(res.data.rooms as IRoom[]);
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
    this.router.navigate(['/explore'], { queryParams: params });
  }

  get capacity() {
    return this.roomFiltersForm.get('capacity')!;
  }

  getCapacityDisplay(): string {
    const value = this.capacity.value || 0;
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

