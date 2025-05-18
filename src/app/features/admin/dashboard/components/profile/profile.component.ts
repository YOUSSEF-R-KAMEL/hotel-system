import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../../../shared/interface/user/IUserResponse';
import { UsersService } from '../../users/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements AfterViewInit {
  resMessage: string = '';
  user: IUser | undefined = undefined;
  private _ToastrService = inject(ToastrService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _UsersService = inject(UsersService);
  ngAfterViewInit(): void {
    const userId = this._ActivatedRoute.snapshot.paramMap.get('id');
    if (userId) {
      this._UsersService.getCurrentUser(userId).subscribe({
        next: (res) => {
          this.user = res.data.user;
        },
        error: (err) => {
          this._ToastrService.error('Failed to fetch user data');
          console.error(err);
        },
      });
    }
  }
}
