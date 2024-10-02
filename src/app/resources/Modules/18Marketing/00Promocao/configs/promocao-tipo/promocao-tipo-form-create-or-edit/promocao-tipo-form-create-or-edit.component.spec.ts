import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPromocaoFormCreateOrEditComponent } from './promocao-tipo-form-create-or-edit.component';

describe('TipoPromocaoFormCreateOrEditComponent', () => {
  let component: TipoPromocaoFormCreateOrEditComponent;
  let fixture: ComponentFixture<TipoPromocaoFormCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPromocaoFormCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPromocaoFormCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
