import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportplantcutComponent } from './reportplantcut.component';

describe('ReportplantcutComponent', () => {
  let component: ReportplantcutComponent;
  let fixture: ComponentFixture<ReportplantcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportplantcutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportplantcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
