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

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    // tslint:disable-next-line: no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        // tslint:disable-next-line: no-non-null-assertion
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
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
