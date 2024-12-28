import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resMsg: string = '';
  showPassword:boolean = false
  showConfirmPassword:boolean = false
  resPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email'), [Validators.email, Validators.required]),
    seed: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]),
    confirmPassword: new FormControl(null, Validators.required)
  }, { validators: this.checkPasswords })

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}
  reqRes() {
    if (this.resPasswordForm.valid) {
      this._AuthService.onResPassword(this.resPasswordForm.value).subscribe({
        next: (res:any) => {
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

  toggleShowPass(): void{
    this.showPassword = !this.showPassword
  }

  toggleShowConfirmPass(): void{
    this.showConfirmPassword = !this.showConfirmPassword
  }

  checkPasswords(g:AbstractControl) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true }
  }
}

