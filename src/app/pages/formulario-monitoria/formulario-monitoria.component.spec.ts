import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMonitoria } from './formulario-monitoria.component';

describe('FormularioMonitoria', () => {
  let component: FormularioMonitoria;
  let fixture: ComponentFixture<FormularioMonitoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioMonitoria],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioMonitoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
