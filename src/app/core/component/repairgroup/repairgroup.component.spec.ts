import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairgroupComponent } from './repairgroup.component';

describe('RepairgroupComponent', () => {
  let component: RepairgroupComponent;
  let fixture: ComponentFixture<RepairgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
