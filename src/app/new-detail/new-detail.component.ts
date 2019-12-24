import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultmsgService } from '../defaultmsg.service';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css']
})

export class NewDetailComponent implements OnInit {

  constructor(private routerinfo: ActivatedRoute, private dehttpService: DefaultmsgService) { }
  id;
  news = {
    title: '',
    _id: '',
    content: ''
  };
  ngOnInit() {
    this.id = this.routerinfo.snapshot.queryParams.id;
    console.log(this.id);
    this.getNews();
  }
  async getNews() {
    let data;
    await this.dehttpService.getNews().then(res => {data = res; });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === this.id) {
        this.news = data[i];
        return ;
      }
    }
  }
}
