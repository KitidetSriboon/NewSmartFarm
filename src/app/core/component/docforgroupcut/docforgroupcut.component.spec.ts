import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocforgroupcutComponent } from './docforgroupcut.component';

describe('DocforgroupcutComponent', () => {
  let component: DocforgroupcutComponent;
  let fixture: ComponentFixture<DocforgroupcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocforgroupcutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocforgroupcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
