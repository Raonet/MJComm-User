import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-feiyan',
  templateUrl: './feiyan.component.html',
  styleUrls: ['./feiyan.component.css']
})
export class FeiyanComponent implements OnInit {

  data: ItemData[] = [];

  FeiyanData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadData(1);
    this.loadFeiyan();
  }

  loadData(pi: number): void {
    this.data = new Array(5).fill({}).map((_, index) => {
      return {
        href: 'http://ant.design',
        title: `ant design part ${index} (page: ${pi})`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources ' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      };
    });
  }

  async loadFeiyan() {
    let feiyan: any ;
    await this.http.get('http://api.tianapi.com/txapi/rumour/index?key=2ba9220b9bfe136843741a5aac22453e').toPromise()
    .then(res => { feiyan = res; });
    this.FeiyanData = feiyan;
    console.log(this.FeiyanData);
  }
}
