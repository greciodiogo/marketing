import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarCampanhaComponent } from './validar-campanha.component';

describe('ValidarCampanhaComponent', () => {
  let component: ValidarCampanhaComponent;
  let fixture: ComponentFixture<ValidarCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
