import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoAlterarEstadoPromocaoCreateOrEditComponent } from './descricao-alterar-estado-promocao-create-or-edit.component';

describe('DescricaoAlterarEstadoPromocaoCreateOrEditComponent', () => {
  let component: DescricaoAlterarEstadoPromocaoCreateOrEditComponent;
  let fixture: ComponentFixture<DescricaoAlterarEstadoPromocaoCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaoAlterarEstadoPromocaoCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoAlterarEstadoPromocaoCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
