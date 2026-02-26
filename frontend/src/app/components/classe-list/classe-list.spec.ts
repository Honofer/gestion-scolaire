import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseList } from './classe-list';

describe('ClasseList', () => {
  let component: ClasseList;
  let fixture: ComponentFixture<ClasseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
