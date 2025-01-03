import { Component, OnInit } from '@angular/core';
import { IUserResponse } from '../../../shared/interface/user/IUserResponse';
import { HelperService } from '../../../shared/services/helper/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isExpand: boolean = false;
  profileImage: string = '';
  imageUrl: string = 'https://upskilling-egypt.com:3000/';
  constructor(private _HelperService: HelperService) {}
  toggleSidebar(): void {
    this.isExpand = !this.isExpand;
  }

  ngOnInit(): void {
    const id = localStorage.getItem('userId');

    if (id !== null) {
      this._HelperService.onGetUser(id).subscribe({
        next: (res: IUserResponse) => {
          if (res) {
            this.profileImage = res.data.user.profileImage;
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      console.log('User ID not found in local storage');
    }
  }
}
