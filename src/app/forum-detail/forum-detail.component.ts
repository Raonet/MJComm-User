import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumHttpService } from '../forum-http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {

  constructor(private routerinfo: ActivatedRoute, private forumService: ForumHttpService, private sanitizer: DomSanitizer) { }
  id;
  detail = {
    _id: '',
    content: '',
    title: '',
    createtime: '',
  };
  ngOnInit() {
    this.id = this.routerinfo.snapshot.queryParams.id;
    this.getNews();
  }
  async getNews() {
    const data = this.forumService.data;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === this.id) {
        data[i].content = this.sanitizer.bypassSecurityTrustHtml(data[i].content);
        this.detail = data[i];
        return ;
      }
    }
  }
}
