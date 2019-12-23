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
  isVisible = false;
  data ;
  datalist;
  width = document.body.clientWidth - 20;
  height = 480;
  ngOnInit() {
    this.getHomeImg();
    this.getNews();
    this.giveHight();
  }
  async giveHight() {
    if (this.width < 600 ) {
      this.height = 160;
      this.width = document.body.clientWidth;
    }
  }
  async getHomeImg() {
    const homeimg = await this.deHttpService.getHomeImgs();
    this.array = homeimg;
  }
  async getNews() {
    const news = await this.deHttpService.getNews();
    this.data = news;
  }
}
