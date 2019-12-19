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
  data ;
  datalist;
  width = document.body.clientWidth - 20;
  ngOnInit() {
    this.getHomeImg();
    this.getNews();
  }
  async getHomeImg() {
    const homeimg = await this.deHttpService.getHomeImgs();
    this.array = homeimg;
  }
  async getNews() {
    const news = await this.deHttpService.getNews();
    this.data = news;
    console.log(this.data);
  }
}
