import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciclagemListarComponent } from './reciclagem-listar.component';

describe('ReciclagemListarComponent', () => {
  let component: ReciclagemListarComponent;
  let fixture: ComponentFixture<ReciclagemListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciclagemListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciclagemListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
