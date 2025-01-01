import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  resMsg: string = '';
  showOldPassword:boolean = false
  showNewPassword:boolean = false
  showConfirmPassword:boolean = false
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]),
    confirmPassword: new FormControl(null, Validators.required)
  }, { validators: this.checkPasswords })

  constructor(
    private _dashboardService: DashboardService,
    private _ToastrService: ToastrService
  ) {}
  changePass() {
    if (this.changePasswordForm.valid) {
      this._dashboardService.changePassword(this.changePasswordForm.value).subscribe({
        next: (res:any) => {
          console.log(res);
          this.resMsg = res.message;
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error');
        },
        complete: () => {
          this._ToastrService.success(this.resMsg, 'Success');
        },
      });
    }
  }

  toggleShowOldPass(): void{
    this.showOldPassword = !this.showOldPassword
  }

  toggleShowNewPass(): void{
    this.showNewPassword = !this.showNewPassword
  }

  toggleShowConfirmPass(): void{
    this.showConfirmPassword = !this.showConfirmPassword
  }

  checkPasswords(g:AbstractControl) {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true }
  }
}
