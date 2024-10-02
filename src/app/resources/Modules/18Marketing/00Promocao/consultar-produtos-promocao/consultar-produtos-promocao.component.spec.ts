import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProdutosPromocaoComponent } from './consultar-produtos-promocao.component';

describe('ConsultarProdutosPromocaoComponent', () => {
  let component: ConsultarProdutosPromocaoComponent;
  let fixture: ComponentFixture<ConsultarProdutosPromocaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarProdutosPromocaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarProdutosPromocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
