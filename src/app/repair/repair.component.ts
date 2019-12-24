import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  constructor(private fb: FormBuilder) {}
  validateForm: FormGroup;

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
  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      agree: [false]
    });
  }

  provinceChange(value: string): void {
    this.selectedCity = this.cityData[value][0];
  }
}
