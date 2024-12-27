import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  resMsg: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}
  onSubmit(data: FormGroup) {
    const formValue = data.value;
    if (data.valid) {
      this._AuthService.onLogin(formValue).subscribe({
        next: (res) => {
          console.log(res);
          this.resMsg = res.message;
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.user.role);
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error(err.message, 'Error');
        },
        complete: () => {
          this._ToastrService.success(this.resMsg, 'Success');
        },
      });
    }
  }
}
