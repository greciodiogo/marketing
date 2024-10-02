import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentacaoPublicoComponent } from './segmentacao-publico.component';

describe('SegmentacaoPublicoComponent', () => {
  let component: SegmentacaoPublicoComponent;
  let fixture: ComponentFixture<SegmentacaoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentacaoPublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentacaoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
