import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws: any;
  private message: Subject<any> = new Subject<any>();
  constructor(private msg: NzMessageService) { }
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
      console.log(data);
    });
  }
  sendMessage(data) {
    this.ws.emit('events',  data );
  }
  analysisMessage(data) {
    this.message.next(data);
  }
  getMessage(): Observable<any> {
    return this.message.asObservable();
  }
}
