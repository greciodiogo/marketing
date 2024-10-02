import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { CampanhaService } from '../../../services/campanhas.service';

@Component({
  selector: 'app-validar-campanha',
  templateUrl: './validar-campanha.component.html',
  styleUrls: ['./validar-campanha.component.css']
})
export class ValidarCampanhaComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() is_modal: boolean = false;
  @Input() title: string = 'Validar Campanha';
  @Input() campanha: any;

  decisoes: any = [{ id: 1, slug: 'APROVADO', nome: 'APROVAR' }, { id: 2, slug: 'REJEITADO', nome: 'REJEITAR' }];

  submitted = false;
  private loading: boolean = false;
  @Input() campanhaForm: FormGroup;

  @Output() private loadList = new EventEmitter<any>();
  @Output() private close = new EventEmitter<any>();

  constructor(
    public campanhaService: CampanhaService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.campanhaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      validacaoSlug: [null, Validators.required],
      descricao_validacao:[null,Validators.required]
    });
  }

  get f() {
    return this.campanhaForm?.controls;
  }


  onReset() {
    this.submitted = false;

    // Reseta o formulário e o campo 'canais'
    this.campanhaForm.reset();
    this.close.emit();
  }


  onSubmit() {
    this.submitted = true;

    if (this.campanhaForm.invalid) {
      return;
    }
    this.loading = true;
    this.createOrEdit(this.campanhaForm);
  }

  createOrEdit(formulario: FormGroup) {
    this.campanhaService
      .validarCampanha(this.campanha.id, formulario.value)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          this.loadList.emit(Object(response).data);
          this.closeModal.nativeElement.click();
        },
        (error) => {
          this.submitted = false;
          this.loading = false;
        }
      );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.campanha) {
      this.campanhaForm.patchValue(this.campanha);
    }
  }
}
