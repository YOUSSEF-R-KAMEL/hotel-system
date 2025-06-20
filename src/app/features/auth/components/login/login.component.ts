import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../../shared/interface/user/IUserResponse';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../../../shared/services/helpers/helper.service'; // Import HelperService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  resMsg: string = '';
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
      ),
    ]),
  });
  private _AuthService = inject(AuthService);
  private _ToastrService = inject(ToastrService);
  private _Router = inject(Router);
  private _HelperService = inject(HelperService);

  login() {
    if (this.loginForm.valid) {
      this._AuthService.onLogin(this.loginForm.value).subscribe({
        next: (res) => {
          this.resMsg = res.message;
          if (this._HelperService.isPlatformBrowser()) {
            localStorage.setItem('token', res.data.token as string);
            localStorage.setItem('role', res.data.user?.role as string);
            localStorage.setItem('userId', res.data.user?._id as string);
            localStorage.setItem('userName', res.data.user?.userName as string);
            localStorage.setItem('lang', 'en');
          }
          this._AuthService.updateUser(res.data.user as IUser);
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error');
        },
        complete: () => {
          this._ToastrService.success(this.resMsg, 'Success');
          const role = localStorage.getItem('role');
          if (role === 'admin') {
            this._Router.navigate(['/admin/dashboard/home']);
          } else if (role === 'user') {
            this._Router.navigate(['/home']);
          }
        },
      });
    }
  }

  toggleShowPass(): void {
    this.showPassword = !this.showPassword;
  }
}
