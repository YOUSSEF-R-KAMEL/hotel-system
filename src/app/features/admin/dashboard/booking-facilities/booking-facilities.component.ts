import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IApiResponse, IData } from '../../../../shared/interface/api-data-response/api-response.interface';
import { ITableAction, ITableInput } from '../../../../shared/interface/table/table-input.interface';
import { ViewBookingDialogComponent } from './components/view-booking-dialog/view-booking-dialog.component';
import { IBooking } from './interfaces/booking-facility.interface';
import { BookingFacilitiesService } from './services/booking-facilities.service';

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
  constructor(private dialog: MatDialog, private bookingService: BookingFacilitiesService) {
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
        bookings: [],
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
        console.log(res);
        this.passDataToTable(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  passDataToTable(data: IData) {
    console.log(data);
    this.bookingFacilitiesData = {
      data: {
        bookings: data.bookings,
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
