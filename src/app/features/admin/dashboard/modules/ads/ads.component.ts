import { Component, OnInit } from '@angular/core';
import {
  ITableAction,
  ITableInput,
} from '../../../../../shared/interface/table/table-input.interface';
import { IAdsData } from './interfaces/IAdsResponse';
import { AdsService } from './services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
})
export class AdsComponent implements OnInit {
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
        callback: (row) => {
          console.log('View', row);
        },
      },
      {
        type: 'icon',
        color: 'primary',
        label: 'Edit',
        icon: 'edit_square',
        callback: (row) => {
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
}
