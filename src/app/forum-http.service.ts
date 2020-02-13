import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ForumHttpService {

  constructor(private http: HttpClient, private cookies: CookieService, private message: NzMessageService) { }
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
  async getForumDetail(id) {
    let forum;
    await this.http.get(`api/forum/getforum/${id}`).toPromise()
    .then(res => { forum = res; });
    return forum;
  }
  async givePraise(forumid) {
    const uid = this.cookies.get('userId');
    const uname = this.cookies.get('userName');
    let praise;
    await this.http.post('api/forum/praise', {forumId: forumid, praises: {userid: uid, name: uname}}, this.httpOptions).toPromise()
    .then(res => { praise = res; });
    if (praise === 0) {
      this.message.info('点赞失败，你已点过赞!');
      return 0;
    } else {
      this.message.info('点赞成功!');
      return 1;
    }
  }
  async giveStep(forumid) {
    const uid = this.cookies.get('userId');
    const uname = this.cookies.get('userName');
    let step;
    await this.http.post('api/forum/step', {forumId: forumid, steps: {userid: uid, name: uname}}, this.httpOptions).toPromise()
    .then(res => { step = res; });
    if (step === 0) {
      this.message.info('你已经踩过这篇文章啦!');
      return 0;
    } else {
      this.message.info('成功的踩了一下!');
      return 1;
    }
  }
  async giveComment(forumid, comments) {
    // tslint:disable-next-line: max-line-length
    const data = {forumId: forumid, comment: {userId: this.cookies.get('userId'), userName: this.cookies.get('userName'), content: comments, date: new Date(), avatar: this.cookies.get('userAvater')}};
    await this.http.post('api/forum/comments', data, this.httpOptions ).toPromise()
    .then(res => {
      const comp: any = res;
      if (comp.ok === 1) {
        this.message.info('评论成功！');
        return 0;
      } else {
        this.message.info('评论失败，请稍后再试！');
        return 0;
      }
    } )
    .catch(error => {console.log(error); });
  }
}
