import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCampanhaComponent } from './add-or-edit-campanha.component';

describe('AddOrEditCampanhaComponent', () => {
  let component: AddOrEditCampanhaComponent;
  let fixture: ComponentFixture<AddOrEditCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditCampanhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
