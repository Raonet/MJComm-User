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
  useravater = this.cookies.get('userAvater');
  username = this.cookies.get('userName');
  createtime = this.cookies.get('userCreateTime');
  userdes = this.cookies.get('userDescription');
  ngOnInit() {
  }
}
