import { Component } from '@angular/core';
import {
  ITableAction,
  ITableInput,
} from '../../../../../shared/interface/table/table-input.interface';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
})
export class AdsComponent {
  adsData: ITableInput;
  page = 1;
  size = 5;
  actions: ITableAction[] = [];
  constructor() {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'view',
        callback: (row) => {
          console.log('View', row);
        },
      },
      {
        type: 'icon',
        color: 'primary',
        label: 'Edit',
        icon: 'edit',
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
  getAllAds(): void {}
  handlePageChange(event: { pageNumber: number; pageSize: number }) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getAllAds();
  }
}
