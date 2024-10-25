import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { CampanhaService } from '../../../services/campanhas.service';
import { TipoCampanhaService } from '../../../services/tipocampanha.service';
import { dateRangeValidator } from '../../../validators/data.validator';

@Component({
  selector: 'app-add-or-edit-campanha',
  templateUrl: './add-or-edit-campanha.component.html',
  styleUrls: ['./add-or-edit-campanha.component.css']
})
export class AddOrEditCampanhaComponent implements OnInit {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registar Campanha';
  @Input() campanha: any;

  tipocampanhas: any = [];

  submitted = false;
  private loading: boolean = false;
  @Input() campanhaForm: FormGroup;

  @Output() private loadList = new EventEmitter<any>();
  @Output() private close = new EventEmitter<any>();

  constructor(
    public campanhaService: CampanhaService,
    public tipoCampanhaService: TipoCampanhaService,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.getTipoCampanhas()
  }

  ngOnInit() {
    this.getTipoCampanhas()
  }

  createForm() {
    this.campanhaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: ['', Validators.required],
      descricao: [''],
      objectivo: [''],
      orcamento: ['', [Validators.required, Validators.min(0)]],
      data_inicio: ['', Validators.required],
      data_fim: ['', Validators.required],
      tipo_campanha_id: [null, Validators.required],
      is_gratuita: [null],
      files: [''],
    },
      { validators: dateRangeValidator() }
    );
  }

  get f() {
    return this.campanhaForm?.controls;
  }


  onReset() {
    this.submitted = false;
    this.campanhaForm.reset();
    this.close.emit();
  }


  onSubmit() {
    this.submitted = true;

    if (this.campanhaForm.invalid) {
      return;
    }
    this.loading = true;
    const id = this.campanhaForm.getRawValue().id;
    this.createOrEdit(this.campanhaForm, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    this.campanhaForm.patchValue({ is_gratuita: 0 });
    this.campanhaService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          if (isCreate) {
            this.onReset()
          }
          this.loadList.emit(Object(response).data);
        },
        (error) => {
          this.submitted = false;
          this.loading = false;
        }
      );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.campanha) {
      this.title = 'Editar Campanha';
      // Converter as datas para o formato 'YYYY-MM-DD'
      const data_inicio = this.formatDate(this.campanha.data_inicio);
      const data_fim = this.formatDate(this.campanha.data_fim);

      this.campanhaForm.patchValue({
        ...this.campanha,
        data_inicio: data_inicio,
        data_fim: data_fim,
      });
    } else {
      this.title = 'Registar Campanha';
    }
  }

  // Função para converter a data para o formato 'YYYY-MM-DD'
  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  public getTipoCampanhas() {
    this.tipoCampanhaService.list().subscribe(data => {
      this.tipocampanhas = data.data
    }, error => {
      this.campanhaService.loading = false
    });
  }

  filePreviews: { file: { path: string; filename: string; base64: any, type: string }, type: number}[] = [];
  selectedFiles: File[] = [];
  // Função para gerenciar a seleção de arquivos
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const fileConvertedToBase64Path = e?.target?.result;
          this.filePreviews.push({
            file: {
            path: e?.target?.result,
            base64: fileConvertedToBase64Path,
            filename: file.name,
            type: file.type,
        },
        type: 16
      });
          this.selectedFiles.push(file);
          this.campanhaForm.patchValue({files: this.filePreviews})
        };
        reader.readAsDataURL(file);
      });

      // Limpar o valor do input para permitir nova seleção após a remoção
      input.value = '';
    }
  }

  // Função para remover arquivos selecionados
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }

  clearFileInput(): void {
    // this.fileInput.nativeElement.value = ''; // Limpar o input
    this.filePreviews = []; // Limpar as pré-visualizações
    this.selectedFiles = []; // Limpar os arquivos selecionados
    for(let i=0;i<this.filePreviews.length;i++){
      this.removeFile(i)
    }
  }

}
