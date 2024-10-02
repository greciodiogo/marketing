import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreFacturacaoListarComponent } from './pre-facturacao-listar.component';

describe('PreFacturacaoListarComponent', () => {
  let component: PreFacturacaoListarComponent;
  let fixture: ComponentFixture<PreFacturacaoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreFacturacaoListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreFacturacaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
