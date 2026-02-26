import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereList } from './matiere-list';

describe('MatiereList', () => {
  let component: MatiereList;
  let fixture: ComponentFixture<MatiereList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatiereList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatiereList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
