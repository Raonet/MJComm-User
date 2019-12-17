import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginHttpService } from '../login-http.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  @Output() isLogin = new EventEmitter<boolean>();
  validateForm: FormGroup;
  passwordVisible = false;
  password: string;
  isVisible = false;
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private loginService: LoginHttpService, private cookies: CookieService, private msg: NzMessageService) {}
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

  async loginUser(): Promise<void> {
    // tslint:disable-next-line: max-line-length
    await this.loginService.postLoginUser(this.validateForm.controls.userName.value, this.validateForm.controls.password.value);
    console.log(this.loginService.userLoginData);
    // tslint:disable-next-line: no-conditional-assignment
    if (this.loginService.userLoginData.status === 0) {
      this.msg.info('帐号或密码错误，登录失败！');
    } else {
      this.msg.info('登录成功！');
      this.isVisible = false;
      this.isLogin.emit();
    }
  }
}
