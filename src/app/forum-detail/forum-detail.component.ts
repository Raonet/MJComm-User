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
  detail: any = {
    auther: '',
    comment: '',
    forum: '',
    praise: '',
    step: '',
  };
  ngOnInit() {
    this.id = this.routerinfo.snapshot.queryParams.id;
    this.getForum(this.id);
  }
  async getForum(id) {
    this.detail = await this.forumService.getForumDetail(id);
    this.detail.forum.content = this.sanitizer.bypassSecurityTrustHtml(this.detail.forum.content);
  }
}
