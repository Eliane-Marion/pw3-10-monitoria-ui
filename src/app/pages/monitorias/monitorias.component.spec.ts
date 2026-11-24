import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monitorias } from './monitorias.component';

describe('Monitorias', () => {
  let component: Monitorias;
  let fixture: ComponentFixture<Monitorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monitorias],
    }).compileComponents();

    fixture = TestBed.createComponent(Monitorias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
