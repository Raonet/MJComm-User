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
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  ngOnInit() {
    this.getHomeImg();
  }
  async getHomeImg() {
    const homeimg = await this.deHttpService.getHomeImgs();
    this.array = homeimg;
  }
}
