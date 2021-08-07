import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindlanddataComponent } from './findlanddata.component';

describe('FindlanddataComponent', () => {
  let component: FindlanddataComponent;
  let fixture: ComponentFixture<FindlanddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindlanddataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindlanddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
