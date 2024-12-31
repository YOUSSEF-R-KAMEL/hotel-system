import { IBooking } from './interfaces/booking-facility.interface';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITableInput, ITableAction } from '../../../../shared/interface/table/table-input.interface';
import { ViewUserDialogComponent } from '../users/components/view-user-dialog/view-user-dialog.component';
import { IUserWithCount } from '../users/interfaces/get-users-interface';
import { IUser } from '../users/interfaces/user.interface';
import { BookingFacilitiesService } from './services/booking-facilities.service';
import { IApiResponse, IData } from '../../../../shared/interface/api-data-response/api-response.interface';

@Component({
  selector: 'app-booking-facilities',
  templateUrl: './booking-facilities.component.html',
  styleUrl: './booking-facilities.component.scss'
})
export class BookingFacilitiesComponent {
  bookingFacilitiesData: ITableInput;
  page = 1;
  size = 10;
  actions: ITableAction[] = [];
  constructor(private dialog: MatDialog, private bookingService: BookingFacilitiesService) {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (row: IUser) => this.openViewDialog(row)
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
        console.log(res);
        this.passDataToTable(res.data);
      },
      error: (err) => {
        console.log(err);
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
  }

  handlePageChange(event: { pageNumber: number; pageSize: number }) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getBookings();
  }

  openViewDialog(row: IUser) {
    this.dialog.open(ViewUserDialogComponent, {
      data: row,
    });
  }
}
