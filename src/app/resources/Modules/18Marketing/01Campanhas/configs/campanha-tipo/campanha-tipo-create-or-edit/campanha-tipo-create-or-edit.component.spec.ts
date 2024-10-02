import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCampanhaCreateOrEditComponent } from './campanha-tipo-create-or-edit.component';

describe('TipoCampanhaCreateOrEditComponent', () => {
  let component: TipoCampanhaCreateOrEditComponent;
  let fixture: ComponentFixture<TipoCampanhaCreateOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCampanhaCreateOrEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCampanhaCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
