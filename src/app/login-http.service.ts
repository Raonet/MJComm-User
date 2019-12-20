import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'my-auth-token',
    })
  };
  userLoginData;
  createData;
  inCookie() {
    this.cookies.set('userId', this.userLoginData.result[0]._id);
    this.cookies.set('userName', this.userLoginData.result[0].user);
    this.cookies.set('userPhone', this.userLoginData.result[0].phone);
    this.cookies.set('userEmail', this.userLoginData.result[0].email);
    this.cookies.set('userAvater', this.userLoginData.result[0].avater);
    this.cookies.set('userDescription', this.userLoginData.result[0].description);
    this.cookies.set('userCreateTime', this.userLoginData.result[0].createTime);
  }
  delCookie() {
    this.cookies.delete('userId');
    this.cookies.delete('userName');
    this.cookies.delete('userPhone');
    this.cookies.delete('userEmail');
    this.cookies.delete('userAvater');
    this.cookies.delete('userDescription');
    this.cookies.delete('userCreateTime');
  }
  async postLoginUser(username, password) {
    const data = {email: username, pwd: password };
    // tslint:disable-next-line: arrow-return-shorthand
    await this.http.post('api/user/login', data, this.httpOptions ).toPromise()
    .then(res => {this.userLoginData = res; });
    if (this.userLoginData.status === 0) {
      return this.userLoginData;
    }
    this.inCookie();
    return this.userLoginData;
  }
  async postRegister(useremail, password, username, phones) {
    // tslint:disable-next-line: max-line-length
    const data = {user: username, pwd: password, email: useremail, phone: phones, avater: 'http://localhost:3000/static/static/default-avater.png', description: '这个人很懒，暂时没有个人介绍', createTime: new Date()};
    await this.http.post('api/user/create', data, this.httpOptions).toPromise()
    .then(res => {this.createData = res; });
    return this.createData;
  }
  async changeInfo(data) {
    await this.http.post('api/user/updata', data, this.httpOptions).toPromise()
    .then(res => {console.log(res); } );
  }
}
