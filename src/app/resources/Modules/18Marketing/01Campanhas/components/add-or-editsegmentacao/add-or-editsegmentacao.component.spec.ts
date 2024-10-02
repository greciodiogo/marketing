import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditsegmentacaoComponent } from './add-or-editsegmentacao.component';

describe('AddOrEditsegmentacaoComponent', () => {
  let component: AddOrEditsegmentacaoComponent;
  let fixture: ComponentFixture<AddOrEditsegmentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditsegmentacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditsegmentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
