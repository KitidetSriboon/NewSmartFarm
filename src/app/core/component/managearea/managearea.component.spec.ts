import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageareaComponent } from './managearea.component';

describe('ManageareaComponent', () => {
  let component: ManageareaComponent;
  let fixture: ComponentFixture<ManageareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
