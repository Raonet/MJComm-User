import { Component } from '@angular/core';
import { LoginHttpService } from './login-http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private loginService: LoginHttpService, private cookies: CookieService) {}
  isCollapsed = false;
  isLogin = true;
  avaterimg;
  onLogin(Login: boolean) {
    this.isLogin = false;
  }
  outLogin() {
    this.loginService.userLoginData = undefined;
    this.loginService.delCookie();
    this.isLogin = true;
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    if (this.cookies.get('userId')) {
      this.isLogin = false;
    }
    if (this.loginService.userLoginData !== undefined) {
      if (this.loginService.userLoginData.status !== 0 ) {
      this.avaterimg = this.loginService.userLoginData.avatar;
      }
    } else {
      this.avaterimg = this.cookies.get('userAvater');
    }
  }
}
