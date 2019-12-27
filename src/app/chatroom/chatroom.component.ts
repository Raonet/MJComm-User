import { Component, OnInit } from '@angular/core';
import { ChatHttpService } from '../chat-http.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor( private chatService: ChatHttpService) { }
  data;
  ngOnInit() {
    this.getChatList();
  }
  async getChatList() {
    this.data = await this.chatService.getChatRoom();
  }
}
