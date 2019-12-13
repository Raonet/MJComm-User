import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydetailComponent } from './mydetail.component';

describe('MydetailComponent', () => {
  let component: MydetailComponent;
  let fixture: ComponentFixture<MydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
