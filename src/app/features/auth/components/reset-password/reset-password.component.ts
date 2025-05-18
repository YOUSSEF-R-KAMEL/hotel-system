import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HelperService } from '../../../../shared/services/helpers/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private _AuthService = inject(AuthService);
  private _ToastrService = inject(ToastrService);
  private _router = inject(Router);
  private helperService = inject(HelperService);
  resMsg: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  resPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(
      this.helperService.isPlatformBrowser() ? localStorage.getItem('email') || null : null,
      [Validators.email, Validators.required]
    ),
    seed: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)
    ]),
    confirmPassword: new FormControl(null, Validators.required)
  }, { validators: this.checkPasswords });

  reqRes() {
    if (this.resPasswordForm.valid) {
      this._AuthService.onResPassword(this.resPasswordForm.value).subscribe({
        next: (res: any) => {
          this.resMsg = res.message;
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.user.role);
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error');
        },
        complete: () => {
          this._ToastrService.success(this.resMsg, 'Success');
          this._router.navigateByUrl('/auth/login');
        },
      });
    }
  }

  toggleShowPass(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPass(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswords(g: AbstractControl) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  getPasswordErrorMessage(): string {
    const control = this.resPasswordForm.get('confirmPassword');
    if (control?.hasError('required')) {
      return 'Confirm password is required';
    }
    if (control?.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }
}
