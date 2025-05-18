import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.scss'
})
export class RequestResetPasswordComponent {
  resMsg: string = '';
  reqResForm: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

  private _AuthService = inject(AuthService);
  private _ToastrService = inject(ToastrService);
  private _router = inject(Router);
  reqRes() {
    if (this.reqResForm.valid) {
      this._AuthService.onReqResPassword(this.reqResForm.value).subscribe({
        next: (res:any) => {
          this.resMsg = res.message;
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.user.role);
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error');
        },
        complete: () => {
          this._ToastrService.success(this.resMsg, 'Success');
          this._router.navigate(['/auth/reset-password'])
        },
      });
    }
  }
}
