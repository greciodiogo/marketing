import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreFacturacaoFormLacamentoComponent } from './pre-facturacao-form-lacamento.component';

describe('PreFacturacaoFormLacamentoComponent', () => {
  let component: PreFacturacaoFormLacamentoComponent;
  let fixture: ComponentFixture<PreFacturacaoFormLacamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreFacturacaoFormLacamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreFacturacaoFormLacamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
