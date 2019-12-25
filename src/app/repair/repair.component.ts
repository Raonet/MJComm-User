import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent {

  constructor(private fb: FormBuilder) {}
  inputValue: string;
  placeValue = 101;
  selectedProvince = '一区';
  selectedCity = '一';
  selectedAbc = 'A栋';
  provinceAbc = ['A栋', 'B栋', 'C栋'];
  provinceData = ['一区', '二区', '三区', '四区'];
  cityData: { [place: string]: string[] } = {
    四区: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'],
    三区: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'],
    二区: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一'],
    一区: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一']
  };
}
