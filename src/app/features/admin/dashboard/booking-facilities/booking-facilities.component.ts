import { IBooking } from './interfaces/booking-facility.interface';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITableInput, ITableAction } from '../../../../shared/interface/table/table-input.interface';
import { BookingFacilitiesService } from './services/booking-facilities.service';
import { IApiResponse, IData } from '../../../../shared/interface/api-data-response/api-response.interface';
import { ViewBookingDialogComponent } from './components/view-booking-dialog/view-booking-dialog.component';

@Component({
  selector: 'app-booking-facilities',
  templateUrl: './booking-facilities.component.html',
  styleUrl: './booking-facilities.component.scss'
})
export class BookingFacilitiesComponent {
  bookingFacilitiesData: ITableInput;
  page = 1;
  size = 10;
  bookingsColumns: string[] = [];
  actions: ITableAction[] = [];
  private dialog = inject(MatDialog);
  private bookingService = inject(BookingFacilitiesService);
  constructor() {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (booking: IBooking) => this.openViewDialog(booking)
      }
    ]
    this.bookingFacilitiesData = {
      data: {
        booking: [],
        totalCount: 0
      },
      actions: this.actions
    }
  }
  ngOnInit(): void {
    this.getBookings();
  }
  getBookings() {
    let bookingParams = {
      page: this.page,
      size: this.size
    }
    this.bookingService.getBookingFacilities(bookingParams).subscribe({
      next: (res: IApiResponse) => {
        this.passDataToTable(res.data);
      },
      error: (err) => {
      }
    });
  }

  passDataToTable(data: IData) {
    this.bookingFacilitiesData = {
      data: {
        booking: data.booking,
        totalCount: data.totalCount
      },
      actions: this.actions
    }
    this.bookingsColumns = [
      'Start date',
      'End date',
      'Total price',
      'User',
      'Room',
      'Status',
    ]
  }

  handlePageChange(event: { pageNumber: number; pageSize: number }) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getBookings();
  }

  openViewDialog(booking: IBooking) {
    this.dialog.open(ViewBookingDialogComponent, {
      data: booking,
    });
  }
}
