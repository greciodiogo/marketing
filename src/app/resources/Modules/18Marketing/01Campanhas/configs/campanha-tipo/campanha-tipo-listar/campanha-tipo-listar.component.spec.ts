import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCampanhaComponent } from './campanha-tipo-listar.component';

describe('TipoCampanhaComponent', () => {
  let component: TipoCampanhaComponent;
  let fixture: ComponentFixture<TipoCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
