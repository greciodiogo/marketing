import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanairDistribuicaoComponent } from './canais-distribuicao.component';

describe('CanairDistribuicaoComponent', () => {
  let component: CanairDistribuicaoComponent;
  let fixture: ComponentFixture<CanairDistribuicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanairDistribuicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanairDistribuicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
