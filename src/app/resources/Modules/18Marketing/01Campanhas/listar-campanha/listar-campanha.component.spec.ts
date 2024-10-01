import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCampanhaComponent } from './listar-campanha.component';

describe('ListarCampanhaComponent', () => {
  let component: ListarCampanhaComponent;
  let fixture: ComponentFixture<ListarCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
