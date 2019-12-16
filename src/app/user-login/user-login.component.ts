import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginHttpService } from '../login-http.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  validateForm: FormGroup;
  passwordVisible = false;
  password: string;
  isVisible = false;
  constructor(private fb: FormBuilder, private loginService: LoginHttpService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  loginUser(): void {
    console.log(this.validateForm.controls.userName.value);
    console.log(this.validateForm.controls.password.value);
    // tslint:disable-next-line: max-line-length
    const userdata = this.loginService.postLoginUser(this.validateForm.controls.userName.value, this.validateForm.controls.password.value).toPromise().then(res => {
      return res; });
    this.isVisible = false;
  }
}
