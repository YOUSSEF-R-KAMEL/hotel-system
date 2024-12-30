import { Component, OnInit } from '@angular/core';
import { ITableAction, ITableInput } from '../../../../shared/interface/table/table-input.interface';
import { IUserWithCount } from './interfaces/get-users-interface';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  usersData: ITableInput;
  page = 1;
  size = 5;
  actions: ITableAction[] = [];
  constructor(private usersService: UsersService) {
    this.actions = [
      {
        type: 'icon',
        color: 'primary',
        label: 'View',
        icon: 'view',
        callback: (row) => {
          console.log('View', row);
        }
      }
    ]
    this.usersData = {
      data: {
        data: [],
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
        console.log(res.data.users)
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
        data: data.users,
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
}
