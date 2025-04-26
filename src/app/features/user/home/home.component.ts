import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IRoomParams } from '../../../shared/interface/params/params.interface';
import { IRoom } from '../../../shared/interface/room/room.interface';
import { AuthService } from '../../auth/services/auth.service';
import { RoomsService } from '../services/rooms/rooms.service';
import { TranslationService } from '../services/translation/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  page: number = 1;
  size: number = 20;
  rooms = signal<IRoom[]>([]);
  capacitySignal = signal<number>(1);
  popularRooms = computed(() => this.rooms().slice(0, 5));
  firstRoomsSection = computed(() => this.rooms().slice(0, 4));
  secondRoomsSection = computed(() => this.rooms().slice(3, 7));
  thirdRoomsSection = computed(() => this.rooms().slice(6, 10));
  currentLangSignal = signal<string>(this._authServices.currentLang ?? 'en');
  roomFiltersForm = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    capacity: new FormControl<number>(1),
  });
  constructor(private _RoomService: RoomsService,
    private router: Router,
    private translate: TranslateService,
    private _authServices: AuthService) {
    this.translate.setDefaultLang(this.currentLangSignal() as string);
    this.translate.use(this.currentLangSignal() as string);
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.getAllRooms();
    this.capacity.valueChanges?.subscribe(value => {
      this.capacitySignal.set(value ?? 1);
    });
    this.translate.onLangChange.subscribe((event) => {
      this.currentLangSignal.set(event.lang);
    });
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
  capacityDisplay = computed(() => {
    const value = this.capacitySignal();
    this.currentLangSignal();
    const translationKey = value > 1 ? 'home-page.booking.capacity.people' : 'home-page.booking.capacity.person';
    return this.translate.stream(translationKey, { value });

  });

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

