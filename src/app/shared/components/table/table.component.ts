import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableTypeEnum } from '../../enums/table-type-enum';
import { ITableInput } from '../../interface/table/table-input.interface';
import { PageEvent } from '@angular/material/paginator';
import { ITableColumn } from '../../interface/table/table-columns.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  data: ITableInput;
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: ITableColumn[] = [];
  projectNames: string[] = [];
  defaultImage = '../../../../assets/images/svg/profile-picture-placeholder.svg';
  @Input() type: TableTypeEnum = TableTypeEnum.Users;
  @Input() set tableInput(data: ITableInput) {
    this.data = data;
    this.totalRecords = data.data.totalCount;
    this.initializeTable(data);
  }
  @Output() pageChange = new EventEmitter<{ pageNumber: number; pageSize: number }>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.data = {
      data: {
        data: [],
        totalCount: 0,
      },
      actions: [],
    }
  }

  ngOnInit(): void { }

  initializeTable(tableData: ITableInput): void {
    if (!tableData || tableData.data.data.length === 0) {
      return;
    }
    const excludedFields = ['_id', 'createdAt', 'updatedAt'];
    let columns = Object.keys(tableData.data.data[0]).filter((field) => !excludedFields.includes(field));
    this.displayedColumns = [
      ...columns.map((column) => {
        return {
          field: column,
          header: this.formatHeader(column),
        };
      })
    ];
    // if (tableData.actions?.length > 0) {
    //   this.displayedColumns.push({ field: 'actions', header: 'Actions' });
    // }
    this.dataSource.data = tableData.data.data;
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
    this.pageChange.emit({ pageNumber: event.pageIndex + 1, pageSize: event.pageSize });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isArray(element: any) {
    return Array.isArray(element);
  }

  getTemplate(field: string): any {
    switch (field) {
      case 'task': return 'arrayTemplate';
      case 'creationDate': return 'dateTemplate';
      case 'modificationDate': return 'dateTemplate';
      case 'imagePath': return 'imageTemplate';
      case 'isActive': return 'booleanTemplate';
      case 'project': return 'projectTemplate';
      case 'employee': return 'employeeTemplate';
      default: return 'defaultTemplate';
    }
  }

  formatHeader(header: string): string {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/\s([a-z])/g, (match, group) => group.toLowerCase());
  }

  get displayedColumnFields(): string[] {
    return this.displayedColumns.map((col) => col.field);
  }
}

