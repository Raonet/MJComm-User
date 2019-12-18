import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DefaultmsgService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    header: new HttpHeaders ({
      'Content-type': 'application/json',
      Authorization: 'my-auth-token',
    })
  };
  async getHomeImgs() {
    let homeimg;
    await this.http.get('api/homepage/homeimg').toPromise()
    .then(res => { homeimg = res; });
    return homeimg;
  }
}
