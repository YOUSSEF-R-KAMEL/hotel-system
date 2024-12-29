import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  resMsg: string = '';
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  login() {
    this._AuthService.onLogin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.resMsg = res.message;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('userId', res.data.user._id);
        localStorage.setItem('userName', res.data.user.userName);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.message, 'Error');
      },
      complete: () => {
        this._ToastrService.success(this.resMsg, 'Success');
        if (localStorage.getItem('role') == 'admin') {
          this._Router.navigate(['/admin/dashboard/home']);
        } else if (localStorage.getItem('role') == 'user') {
          this._Router.navigate(['/user/home']);
        }
      },
    });
  }
  toggleShowPass(): void {
    this.showPassword = !this.showPassword;
  }
}
