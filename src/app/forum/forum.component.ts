import { Component, OnInit } from '@angular/core';
import { ForumHttpService } from '../forum-http.service';
import { utf8Encode } from '@angular/compiler/src/util';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private forumService: ForumHttpService) { }
  data = [];
  searchdata = [];
  ngOnInit(): void {
    this.getForums();
  }
  async getForums() {
    let forum;
    await this.forumService.getForums().then(res => {forum = res; } );
    this.data = forum;
    this.searchdata = forum;
  }
  async search(value) {
    if (value === '') {
      this.getForums();
      return ;
    }
    const searchData = [];
    for (const index in this.searchdata) {
      if (this.searchdata[index].title.indexOf(value) !== -1) {
        searchData.push(this.searchdata[index]);
      }
    }
    this.data = searchData;
  }
}
