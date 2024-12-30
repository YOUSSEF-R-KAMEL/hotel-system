import { Component, OnInit } from '@angular/core';
import { TableTypeEnum } from '../../../../shared/enums/table-type-enum';
import {
  ITableAction,
  ITableInput,
} from '../../../../shared/interface/table/table-input.interface';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { UpdateAdComponent } from './components/update-ad/update-ad.component';
import { ViewAdComponent } from './components/view-ad/view-ad.component';
import { Ads, IAdsData } from './interfaces/IAdsResponse';
import { AdsService } from './services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
})
export class AdsComponent implements OnInit {
  type = TableTypeEnum.Ads;
  adsData: ITableInput;
  page = 1;
  size = 5;
  actions: ITableAction[] = [];
  constructor(private _AdsService: AdsService) {
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
          console.log('Edit', row);
        },
      },
      {
        type: 'icon',
        color: 'accent',
        label: 'Delete',
        icon: 'delete',
        callback: (row) => {
          console.log('Delete', row);
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
      data: this.adsData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._AdsService.onAdsDetails(data).subscribe({
          next: (res) => {
            this.getAllAds();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
  onDeleteAds(data: Ads) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: { text: 'Ads' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._AdsService.onDeleteAds(data).subscribe({
          next: (res) => {
            this.getAllAds();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  onUpdateAds(data: Ads) {
    const dialogRef = this.dialog.open(UpdateAdComponent, {
      data: { text: 'Update Ads' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this._AdsService.onUpdateAds(data).subscribe({
          next: (res) => {
            this.getAllAds();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
  onAddAds(data: Ads) {
    const dialogRef = this.dialog.open(AddAdComponent, {
      data: { text: 'Add Ads' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this._AdsService.onCreateAds(data).subscribe({
          next: (res) => {
            this.getAllAds();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
