import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCampanhaComponent } from './dados-campanha.component';

describe('DadosCampanhaComponent', () => {
  let component: DadosCampanhaComponent;
  let fixture: ComponentFixture<DadosCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
