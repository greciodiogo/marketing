import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCampanhaComponent } from './visualizar-campanha.component';

describe('VisualizarCampanhaComponent', () => {
  let component: VisualizarCampanhaComponent;
  let fixture: ComponentFixture<VisualizarCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
