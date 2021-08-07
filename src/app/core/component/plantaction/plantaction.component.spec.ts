import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantactionComponent } from './plantaction.component';

describe('PlantactionComponent', () => {
  let component: PlantactionComponent;
  let fixture: ComponentFixture<PlantactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
