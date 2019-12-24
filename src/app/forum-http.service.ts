import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ForumHttpService {

  constructor(private http: HttpClient, private cookies: CookieService) { }
  data;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'my-auth-token',
    })
  };
  async postForum(forumTitle,  contents, descriptions) {
    let forum;
    // tslint:disable-next-line: max-line-length
    const data = {title: forumTitle, content: contents, description: descriptions , createtime: new Date(), moditime: new Date(), heat: 0, author: {userid: this.cookies.get('userId'), name: this.cookies.get('userName'), avatar: this.cookies.get('userAvater')}};
    await this.http.post('api/forum/addforum', data, this.httpOptions).toPromise()
    .then(res => { forum = res; } );
    return forum;
  }
  async getForums() {
    let forums;
    await this.http.get('api/forum/getall').toPromise()
    .then(res => { forums = res; this.data = res; });
    return forums;
  }
}
