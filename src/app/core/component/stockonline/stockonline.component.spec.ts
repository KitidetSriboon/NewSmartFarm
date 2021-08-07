import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockonlineComponent } from './stockonline.component';

describe('StockonlineComponent', () => {
  let component: StockonlineComponent;
  let fixture: ComponentFixture<StockonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockonlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
