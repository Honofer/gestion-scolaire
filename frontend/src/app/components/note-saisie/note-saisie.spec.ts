import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSaisie } from './note-saisie';

describe('NoteSaisie', () => {
  let component: NoteSaisie;
  let fixture: ComponentFixture<NoteSaisie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSaisie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSaisie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
