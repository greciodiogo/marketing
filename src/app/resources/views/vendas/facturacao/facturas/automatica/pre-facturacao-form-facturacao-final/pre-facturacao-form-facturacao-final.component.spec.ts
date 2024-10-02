import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreFacturacaoFormFacturacaoFinalComponent } from './pre-facturacao-form-facturacao-final.component';

describe('PreFacturacaoFormFacturacaoFinalComponent', () => {
  let component: PreFacturacaoFormFacturacaoFinalComponent;
  let fixture: ComponentFixture<PreFacturacaoFormFacturacaoFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreFacturacaoFormFacturacaoFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreFacturacaoFormFacturacaoFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
