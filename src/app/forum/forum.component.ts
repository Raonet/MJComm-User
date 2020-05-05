import { Component, OnInit } from '@angular/core';
import { ForumHttpService } from '../forum-http.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private forumService: ForumHttpService) { }
  data;
  ngOnInit(): void {
    this.getForums();
  }
  async getForums() {
    let forum;
    await this.forumService.getForums().then(res => {forum = res; } );
    this.data = forum;
    console.log(forum);
  }
}
