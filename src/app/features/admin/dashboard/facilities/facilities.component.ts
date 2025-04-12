import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITableAction, ITableInput } from '../../../../shared/interface/table/table-input.interface';
import { AddEditViewDialogComponent } from './components/add-edit-view-dialog/add-edit-view-dialog.component';
import { IFacilitiesResponse, IFacility, IFacilityDataWithCount } from './interfaces/facitlities.interface';
import { FacilitiesService } from './services/facilities.service';
import { DeleteItemComponent } from '../../../../shared/components/delete-item/delete-item.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent {
  facilitiesData: ITableInput;
  apiResponse = '';
  page = 1;
  size = 10;
  facilitiesColumns: string[] = [];
  actions: ITableAction[] = [];
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  private facilitiesService = inject(FacilitiesService);
  constructor() {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (row: IFacility) => this.openFacilityDialog('View', row)
      },
      {
        type: 'icon',
        color: 'primary',
        label: 'Edit',
        icon: 'edit_square',
        callback: (row: IFacility) => this.openFacilityDialog('Edit', row)
      },
      {
        type: 'icon',
        color: 'warn',
        label: 'Delete',
        icon: 'delete',
        callback: (row: IFacility) => this.openDeleteDialog(row._id)
      },
    ]
    this.facilitiesData = {
      data: {
        facilities: [],
        totalCount: 0
      },
      actions: this.actions
    }
  }
  ngOnInit(): void {
    this.getFacilities();
  }
  getFacilities() {
    let facilityParams = {
      page: this.page,
      size: this.size
    }
    this.facilitiesService.getFacilities(facilityParams).subscribe({
      next: (res: IFacilitiesResponse) => {
        this.passDataToTable(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  passDataToTable(data: IFacilityDataWithCount) {
    this.facilitiesData = {
      data: {
        facilities: data.facilities,
        totalCount: data.totalCount
      },
      actions: this.actions
    }
    this.facilitiesColumns = [
      'Name',
      'Created by'
    ]
  }

  handlePageChange(event: { pageNumber: number; pageSize: number }) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getFacilities();
  }
  openFacilityDialog(type: string, data: IFacility | null) {
    const dialogRef = this.dialog.open(AddEditViewDialogComponent, {
      data: {
        type: type,
        data: data
      },
    })
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        if (type === 'Edit' && data) {
          this.editFacility(data._id, result);
        } else if (type === 'Add') {
          this.addFacility(result);
        }
        else {
          return;
        }
      }
    })
  }
  editFacility(id: string, name: string) {
    this.facilitiesService.updateFacility(id, name).subscribe({
      next: (res: any) => {
        this.apiResponse = res.message;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.toast.success(this.apiResponse);
        this.getFacilities();
      }
    })
  }
  addFacility(name: string) {
    this.facilitiesService.addFacility(name).subscribe({
      next: (res: any) => {
        this.apiResponse = res.message;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.toast.success(this.apiResponse);
        this.getFacilities();
      }
    })
  }
  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {text: 'Facility'}
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteFacility(id);
      }
    })
  }
  deleteFacility(id: string) {
    this.facilitiesService.deleteFacility(id).subscribe({
      next: (res: any) => {
        this.apiResponse = res.message;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.toast.success(this.apiResponse);
        this.getFacilities();
      }
    })
  }

}
