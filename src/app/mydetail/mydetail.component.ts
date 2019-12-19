import { Component, OnInit } from '@angular/core';
import { LoginHttpService } from '../login-http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mydetail',
  templateUrl: './mydetail.component.html',
  styleUrls: ['./mydetail.component.css']
})
export class MydetailComponent implements OnInit {

  constructor(private loginService: LoginHttpService, private cookies: CookieService) { }
  isVisible = false;
  useravater = this.cookies.get('userAvater');
  username = this.cookies.get('userName');
  createtime = this.cookies.get('userCreateTime');
  userdes = this.cookies.get('userDescription');
  userid = this.cookies.get('userId');
  ngOnInit() {
    console.log(this.userid);
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
