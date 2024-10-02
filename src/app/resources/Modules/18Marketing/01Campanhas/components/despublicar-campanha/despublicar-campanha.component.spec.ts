import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespublicarCampanhaComponent } from './despublicar-campanha.component';

describe('DespublicarCampanhaComponent', () => {
  let component: DespublicarCampanhaComponent;
  let fixture: ComponentFixture<DespublicarCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespublicarCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespublicarCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
