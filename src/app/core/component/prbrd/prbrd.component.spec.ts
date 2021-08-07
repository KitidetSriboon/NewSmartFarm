import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrbrdComponent } from './prbrd.component';

describe('PrbrdComponent', () => {
  let component: PrbrdComponent;
  let fixture: ComponentFixture<PrbrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrbrdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrbrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
