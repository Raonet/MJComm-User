import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws: any;
  private message: Subject<any> = new Subject<any>();
  constructor() { }
  connectSocket(url) {
    this.ws = io(url);
    this.ws.on('connect_error', (error) => {
      console.log('connect_error');
    });
    this.ws.on('reconnecting', (timeout) => {
      if (timeout === 3) {
      this.ws.close();
      }
    });
    this.ws.on('events', (data) => {
      this.analysisMessage(data);
      console.log(data);
    });
  }
  sendMessage(msg: string) {
    this.ws.emit('events', { message: msg });
  }
  analysisMessage(data) {
    this.message.next(data);
  }
  getMessage(): Observable<any> {
    return this.message.asObservable();
  }
}
