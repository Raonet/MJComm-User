import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws: any;
  private message: Subject<any> = new Subject<any>();
  constructor(private msg: NzMessageService, private http: HttpClient, private sanitizer: DomSanitizer) { }
  chatlist: any = {data: []};
  httpOptions = {
    headers: new HttpHeaders ({
      'Content-type': 'application/json',
      Authorization: 'my-auth-token',
    })
  };
  connectSocket(url) {
    this.ws = io(url);
    this.ws.on('connect_error', (error) => {
      this.msg.info('连接聊天服务器失败，请检测网络连接！');
    });
    this.ws.on('reconnecting', (timeout) => {
      if (timeout === 3) {
      this.ws.close();
      this.msg.info('连接聊天服务器失败，请检测网络连接！');
      }
    });
    this.ws.on('connect', (data) => {
      this.msg.info('连接聊天服务器成功！');
    });
    this.ws.on('events', (data) => {
      this.analysisMessage(data);
      this.chatlist = data;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.chatlist.data.length; i++) {
        this.chatlist.data[i].msg = this.sanitizer.bypassSecurityTrustHtml(this.chatlist.data[i].msg);
      }
    });
  }
  sendMessage(data) {
    this.ws.emit('events',  data );
  }
  analysisMessage(data) {
    this.message.next(data);
  }
  getMessage(): Observable<any> {
    console.log(this.message.asObservable());
    return this.message.asObservable();
  }
  async getChatInfo(chatname) {
    const data = {name: chatname};
    await this.http.post('api/chatroom/chatlist', data, this.httpOptions).toPromise()
    .then( res => {
      this.chatlist = res;
    });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.chatlist.data.length; i++) {
      this.chatlist.data[i].msg = this.sanitizer.bypassSecurityTrustHtml(this.chatlist.data[i].msg);
    }
    return this.chatlist;
  }
}
