import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableTypeEnum } from '../../enums/table-type-enum';
import { ITableColumn } from '../../interface/table/table-columns.interface';
import { Ads } from '../../../features/admin/dashboard/ads/interfaces/IAdsResponse';
import { ITableInput } from '../../interface/table/table-input.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  data: ITableInput;
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: ITableColumn[] = [];
  defaultImage =
    '../../../../assets/images/svg/profile-picture-placeholder.svg';

  @Input() type: TableTypeEnum = TableTypeEnum.Users;
  @Input() set tableInput(data: ITableInput) {
    this.data = data;
    this.totalRecords = data.data.totalCount;
    this.initializeTable(data);
  }
  @Output() pageChange = new EventEmitter<{
    pageNumber: number;
    pageSize: number;
  }>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('imageTemplate', { static: true }) imageTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<any>;
  @ViewChild('booleanTemplate', { static: true }) booleanTemplate!: TemplateRef<any>;
  @ViewChild('userTemplate', { static: true }) userTemplate!: TemplateRef<any>;
  @ViewChild('roomTemplate', { static: true }) roomTemplate!: TemplateRef<any>;
  @ViewChild('facilitiesArrayTemplate', { static: true }) facilitiesArrayTemplate!: TemplateRef<any>;
  @ViewChild('discountTemplate', { static: true }) discountTemplate!: TemplateRef<any>;
  @ViewChild('imagesArrayTemplate', { static: true }) imagesArrayTemplate!: TemplateRef<any>;
  @ViewChild('defaultTemplate', { static: true }) defaultTemplate!: TemplateRef<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.data = {
      data: {
        data: [],
        totalCount: 0,
      },
      actions: [],
    };
  }

  initializeTable(tableData: ITableInput): void {
    if (!tableData || tableData.data.data.length === 0) {
      return;
    }
    let tableDataArray = tableData.data.data;
    if (this.type === TableTypeEnum.Ads) {
      tableDataArray = tableDataArray.map((ad: Ads) => {
        return {
          ...ad,
          discount: ad.room?.discount ?? 'N/A',
        };
      });
    }
    const excludedFields = ['_id', 'createdAt', 'updatedAt', 'verified'];
    const columns = Object.keys(tableDataArray[0]).filter((field) => !excludedFields.includes(field));
    console.log(columns);
    this.displayedColumns = [
      ...columns.map((column) => {
        return {
          field: column,
          header: this.formatHeader(column),
        };
      }),
    ];
    if (tableData.actions?.length > 0) {
      this.displayedColumns.push({ field: 'actions', header: 'Actions' });
    }
    this.dataSource.data = tableDataArray;

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }


  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  onPageChange(event: PageEvent): void {
    this.pageChange.emit({
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTemplate(field: string): TemplateRef<any> {
    switch (field) {
      case 'profileImage':
      case 'imagePath':
        return this.imageTemplate;
      case 'createdAt':
      case 'updatedAt':
        return this.dateTemplate;
      case 'isActive':
        return this.booleanTemplate;
      case 'room':
        return this.roomTemplate;
      case 'createdBy':
        return this.userTemplate;
      case 'actions':
        return this.actionsTemplate;
      case 'discount':
        return this.discountTemplate;
      case 'facilities':
        return this.facilitiesArrayTemplate;
      case 'images':
        return this.imagesArrayTemplate;
      default:
        return this.defaultTemplate;
    }
  }

  formatHeader(header: string): string {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/\s([a-z])/g, (match, group) => group.toLowerCase());
  }
  get displayedColumnFields() {
    return this.displayedColumns.map((column) => column.field);
  }
}
