import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'my-auth-token',
    })
  };
  postLoginUser(username, password) {
    const data = {user: username, pwd: password };
    return this.http.post('api/user/login', data, this.httpOptions );
  }
  postRegister(useremail, password, username, phones) {
    const data = {user: username, pwd: password, email: useremail, phone: phones};
    return this.http.post('api/user/create', data, this.httpOptions);
  }
}
