import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvaluesComponent } from './myvalues.component';

describe('MyvaluesComponent', () => {
  let component: MyvaluesComponent;
  let fixture: ComponentFixture<MyvaluesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyvaluesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
