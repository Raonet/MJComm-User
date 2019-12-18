import { Component, OnInit } from '@angular/core';
import { DefaultmsgService } from '../defaultmsg.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  array;
  constructor( private deHttpService: DefaultmsgService) { }
  ngOnInit() {
    this.getHomeImg();
  }
  async getHomeImg() {
    const homeimg = await this.deHttpService.getHomeImgs();
    this.array = homeimg;
  }

}
