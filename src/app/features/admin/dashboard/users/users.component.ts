import { Component, OnInit } from '@angular/core';
import { ITableAction, ITableInput } from '../../../../shared/interface/table/table-input.interface';
import { IUserWithCount } from './interfaces/get-users-interface';
import { UsersService } from './services/users.service';
import { IUser } from './interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserDialogComponent } from './components/view-user-dialog/view-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  usersData: ITableInput;
  page = 1;
  size = 10;
  actions: ITableAction[] = [];
  constructor(private dialog: MatDialog, private usersService: UsersService) {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'visibility',
        callback: (row: IUser) => this.openViewDialog(row)
      }
    ]
    this.usersData = {
      data: {
        users: [],
        totalCount: 0
      },
      actions: this.actions
    }
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    let userParams = {
      page: this.page,
      size: this.size
    }
    this.usersService.getUsers(userParams).subscribe({
      next: (res) => {
        this.passDataToTable(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  passDataToTable(data: IUserWithCount) {
    this.usersData = {
      data: {
        users: data.users,
        totalCount: data.totalCount
      },
      actions: this.actions
    }
  }

  handlePageChange(event : {pageNumber: number; pageSize: number}) {
    this.page = event.pageNumber;
    this.size = event.pageSize;
    this.getUsers();
  }

  openViewDialog(row: IUser) {
    this.dialog.open(ViewUserDialogComponent, {
      data: row,
    });
  }
}
