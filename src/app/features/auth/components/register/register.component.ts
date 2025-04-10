import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl  = '';
  showPassword:boolean = false
  showConfirmPassword:boolean = false
  files: File[] = [];
  imgSrc:any;
  errorsMsgs!:string[];
  isLoading:boolean = false
  resMsg:string = ''
  private readonly _authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  registerForm:FormGroup = new FormGroup({
    role : new FormControl('user'),
    profileImage : new FormControl(null),
    userName: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)[a-zA-Z\d]{1,8}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country : new FormControl(null, [Validators.required]),
    phoneNumber  : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(17)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]),
    confirmPassword : new FormControl(null, [Validators.required])
  }, { validators: this.checkPasswords })
  constructor(){}
  register(){
    this.isLoading = true
    const regData = new FormData()
    Object.keys(this.registerForm.controls).forEach((key) => {
      const value = this.registerForm.get(key)?.value
      if(value){
        regData.append(key, value)
      }
    });
    regData.append('profileImage', this.imgSrc)
    this._authService.onRegister(regData).subscribe({
      next: (res:any) => {
        this.isLoading = false
        this.resMsg = res.message
      },
      error: (err) => {
        this.isLoading = false
        let errorsArr = err.error.additionalInfo.errors
        if(errorsArr){
          Object.entries(errorsArr).forEach(([key, value]) => {
            this.errorsMsgs = Array.isArray(value) ? value : [value];  // Ensure value is an array
            this.errorsMsgs.forEach((message: string) => {
              this.toastr.error(message, 'Error')
            });
          });
        } else {
          this.toastr.error(err.error.message, 'Error')
        }
      },
      complete: () => {
        this.toastr.success(this.resMsg,'Successfully')
      }
    })
  }
  onSelect(event:any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0]
    console.log(this.imgSrc)
  }
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
