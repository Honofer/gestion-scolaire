import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveList } from './eleve-list';

describe('EleveList', () => {
  let component: EleveList;
  let fixture: ComponentFixture<EleveList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleveList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
