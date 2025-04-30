import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { IRoomParams } from '../../../shared/interface/params/params.interface';
import { IRoom } from '../../../shared/interface/room/room.interface';
import { AuthService } from '../../auth/services/auth.service';
import { RoomsService } from '../services/rooms/rooms.service';
import { HelperService } from '../../../shared/services/helpers/helper.service';

interface IExploreParams {
  page: number;
  size: number;
  startDate: Date | null;
  endDate: Date | null;
  capacity: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  // Services
  private readonly roomsService = inject(RoomsService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly authService = inject(AuthService);
  private readonly helperService = inject(HelperService);
  // Pagination
  private readonly page = 1;
  private readonly size = 20;

  // Signals
  readonly rooms = signal<IRoom[]>([]);
  readonly capacitySignal = signal<number>(1);
  readonly currentLangSignal = signal<string>(this.helperService.isPlatformBrowser() ? localStorage.getItem('lang') ?? 'en' : 'en');

  // Computed values
  readonly popularRooms = computed(() => this.rooms().slice(0, 5));
  readonly firstRoomsSection = computed(() => this.rooms().slice(0, 4));
  readonly secondRoomsSection = computed(() => this.rooms().slice(3, 7));
  readonly thirdRoomsSection = computed(() => this.rooms().slice(6, 10));
  readonly capacityDisplay = computed(() => {
    const value = this.capacitySignal();
    const translationKey = value > 1 ? 'home-page.booking.capacity.people' : 'home-page.booking.capacity.person';
    return this.translate.stream(translationKey, { value });
  });

  // Form
  readonly roomFiltersForm = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    capacity: new FormControl<number>(1),
  });

  constructor() {
    this.translate.setDefaultLang(this.currentLangSignal());
    this.translate.use(this.currentLangSignal());
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.getAllRooms();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeSubscriptions(): void {
    this.capacity.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.capacitySignal.set(value ?? 1);
      });

    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => {
        this.currentLangSignal.set(event.lang);
      });
  }

  private getAllRooms(): void {
    const params: IRoomParams = {
      page: this.page,
      size: this.size,
    };

    this.roomsService.getAllRooms(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.rooms.set(res.data.rooms as IRoom[]);
        },
        error: (error) => {
          console.error('Error fetching rooms:', error);
          // TODO: Add proper error handling (e.g., show error message to user)
        }
      });
  }

  exploreWithFilters(): void {
    const params: IExploreParams = {
      page: this.page,
      size: this.size,
      startDate: this.roomFiltersForm.get('startDate')?.value ?? null,
      endDate: this.roomFiltersForm.get('endDate')?.value ?? null,
      capacity: this.roomFiltersForm.get('capacity')?.value ?? 1
    };

    this.router.navigate(['/explore'], { queryParams: params });
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  get capacity(): FormControl<number> {
    return this.roomFiltersForm.get('capacity') as FormControl<number>;
  }

  incrementCapacity(): void {
    const currentValue = this.capacity.value ?? 0;
    this.capacity.setValue(currentValue + 1);
  }

  decrementCapacity(): void {
    const currentValue = this.capacity.value ?? 1;
    if (currentValue > 1) {
      this.capacity.setValue(currentValue - 1);
    }
  }
}
