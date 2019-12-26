import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {

  constructor( private http: HttpClient) { }
  httpOptions = {
    header: new HttpHeaders ({
      'Content-type': 'application/json',
      Authorization: 'my-auth-token',
    })
  };
  async getChatRoom() {
    let chatlist;
    await this.http.get('api/chatroom').toPromise()
    .then(res => {chatlist = res; });
    return chatlist;
  }
}
