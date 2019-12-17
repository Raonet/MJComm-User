import { Component, OnInit } from '@angular/core';
import { LoginHttpService } from '../login-http.service';

@Component({
  selector: 'app-mydetail',
  templateUrl: './mydetail.component.html',
  styleUrls: ['./mydetail.component.css']
})
export class MydetailComponent implements OnInit {

  constructor(private loginService: LoginHttpService) { }

  ngOnInit() {
  }

}
