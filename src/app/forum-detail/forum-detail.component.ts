import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumHttpService } from '../forum-http.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {

  constructor(private routerinfo: ActivatedRoute, private forumService: ForumHttpService) { }
  id;
  detail = {
    _id: '',
    title: '',
    content: '',
    createtime: '',
  };
  ngOnInit() {
    this.id = this.routerinfo.snapshot.queryParams.id;
    console.log(this.id);
    this.getNews();
  }
  async getNews() {
    const data = this.forumService.data;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === this.id) {
        this.detail = data[i];
        return ;
      }
    }
  }
}
