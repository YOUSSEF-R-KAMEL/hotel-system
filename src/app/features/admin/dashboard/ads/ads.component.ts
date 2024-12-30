import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../../../../shared/components/delete-item/delete-item.component';
import { TableTypeEnum } from '../../../../shared/enums/table-type-enum';
import {
  ITableAction,
  ITableInput,
} from '../../../../shared/interface/table/table-input.interface';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { UpdateAdComponent } from './components/update-ad/update-ad.component';
import { ViewAdComponent } from './components/view-ad/view-ad.component';
import { Ads, IAdsData } from './interfaces/IAdsResponse';
import { IUpdateAd } from './interfaces/IUpdateAd';
import { AdsService } from './services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
})
export class AdsComponent implements OnInit {
  type = TableTypeEnum.Ads;
  apiResponse = '';
  adsData: ITableInput;
  page = 1;
  size = 5;
  actions: ITableAction[] = [];
  constructor(private toast: ToastrService, private _AdsService: AdsService, private dialog: MatDialog) {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (row: Ads) => {
          this.onViewAd(row);
        },
      },
      {
        type: 'icon',
        color: 'primary',
        label: 'Edit',
        icon: 'edit_square',
        callback: (row: Ads) => {
          this.onUpdateAds(row);
        },
      },
      {
        type: 'icon',
        color: 'accent',
        label: 'Delete',
        icon: 'delete',
        callback: (row) => {
          this.onDeleteAds(row);
        },
      },
    ];
    this.adsData = {
      data: {
        data: [],
        totalCount: 0,
      },

      actions: this.actions,
    };
  }
  ngOnInit(): void {
    this.getAllAds();
  }
  getAllAds() {
    let adsParams = {
      page: this.page,
      size: this.size,
    };
    this._AdsService.onGetAllAds(adsParams).subscribe({
      next: (res) => {
        console.log(res);
        this.passDataToTable(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  passDataToTable(data: IAdsData) {
    if (!data || !data.ads) {
      return;
    }
    console.log(data);
    this.adsData = {
      data: {
        data: data.ads,
        totalCount: data.totalCount,
      },
      actions: this.actions,
    };
  }

  handlePageChange(event: { pageNumber: number; pageSize: number }) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getAllAds();
  }
  onViewAd(data: Ads) {
    const dialogRef = this.dialog.open(ViewAdComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._AdsService.onAdsDetails(data).subscribe({
          next: (res) => {
          },
          error: (err) => {
            this.toast.error(err.error.message)
          },
          complete: () => {
            this.getAllAds();
          }
        });
      }
    });
  }
  onDeleteAds(data: Ads) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: { text: 'Ad' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._AdsService.onDeleteAds(data).subscribe({
          next: (res) => {
          },
          error: (err) => {
            this.toast.error(err.error.message);
          },
          complete: () => {
            this.toast.success('Ad Deleted Successfully');
            this.getAllAds();
          }
        });
      }
    });
  }

  onUpdateAds(data: Ads) {
    const dialogRef = this.dialog.open(UpdateAdComponent, {
      data: { text: 'Update Ad', data },
    });
    dialogRef.afterClosed().subscribe((result: IUpdateAd) => {
      if (result) {
        console.log(result);
        this._AdsService.onUpdateAds(data._id, result).subscribe({
          next: (res) => {
            this.apiResponse = res.message;
          },
          error: (err) => {
            this.toast.error(err.error.message);
          },
          complete: () => {
            this.toast.success(this.apiResponse);
            this.getAllAds();
          },
        });
      }
    });
  }
  onAddAds() {
    const dialogRef = this.dialog.open(AddAdComponent, {
      data: { text: 'Add Ads' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._AdsService.onCreateAds(result).subscribe({
          next: (res: any) => {
            this.apiResponse = res.message;
          },
          error: (err) => {
            this.toast.error(err.error.message);
          },
          complete: () => {
            this.toast.success(this.apiResponse);
            this.getAllAds();
          },
        });
      }
    });
  }
}
