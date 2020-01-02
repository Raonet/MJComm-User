import { Component, OnInit } from '@angular/core';
import { LoginHttpService } from '../login-http.service';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-mydetail',
  templateUrl: './mydetail.component.html',
  styleUrls: ['./mydetail.component.css']
})
export class MydetailComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private loginService: LoginHttpService, private cookies: CookieService, private msg: NzMessageService, private appComponent: AppComponent) { }
  loading = false;
  avatarUrl = this.cookies.get('userAvater');
  isVisible = false;
  username = this.cookies.get('userName');
  createtime = this.cookies.get('userCreateTime');
  userdes = this.cookies.get('userDescription');
  userid = this.cookies.get('userId');
  ngOnInit() {
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.postChange();
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.avatarUrl = info.file.response.url;
        this.appComponent.avaterimg = this.avatarUrl;
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
  async postChange() {
    const data = {_id: this.userid, user: this.username, description: this.userdes, avater: this.avatarUrl };
    const ok = await this.loginService.changeInfo(data);
    if (ok.result.ok === 1) {
      this.msg.info('更新成功，请重新登录!');
      this.appComponent.outLogin();
    } else {
      this.msg.info('更新失败，请稍后再试!');
    }
  }
}
