import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasAutomacaoComponent } from './regras-automacao.component';

describe('RegrasAutomacaoComponent', () => {
  let component: RegrasAutomacaoComponent;
  let fixture: ComponentFixture<RegrasAutomacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegrasAutomacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasAutomacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
