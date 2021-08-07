import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcutComponent } from './groupcut.component';

describe('GroupcutComponent', () => {
  let component: GroupcutComponent;
  let fixture: ComponentFixture<GroupcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupcutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
