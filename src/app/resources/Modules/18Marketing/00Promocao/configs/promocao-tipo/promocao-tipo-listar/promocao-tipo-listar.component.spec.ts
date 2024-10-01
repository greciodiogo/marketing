import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPromocaoListarComponent } from './promocao-tipo-listar.component';

describe('TipoPromocaoListarComponent', () => {
  let component: TipoPromocaoListarComponent;
  let fixture: ComponentFixture<TipoPromocaoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPromocaoListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPromocaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
