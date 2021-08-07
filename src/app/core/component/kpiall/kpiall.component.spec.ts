import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiallComponent } from './kpiall.component';

describe('KpiallComponent', () => {
  let component: KpiallComponent;
  let fixture: ComponentFixture<KpiallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
