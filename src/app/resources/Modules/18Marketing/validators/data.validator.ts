import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dataInicio = control.get('data_inicio')?.value;
    const dataFim = control.get('data_fim')?.value;

    if (dataInicio && dataFim) {
      if (new Date(dataInicio) > new Date(dataFim)) {
        return { dateRangeInvalid: true };
      }
    }

    return null; 
  };
}

export function valordateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valorMaximo = control.get('valorMaximo')?.value;
    const valorMinimo = control.get('valorMinimo')?.value;
    
    if (valorMinimo && valorMaximo) {
      if (valorMinimo > valorMaximo) {
        return { valorRangeInvalid: true };
      }
    }

    return null; 
  };
}

export function idadedateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const idadeMinima = control.get('idadeMinima')?.value;
    const idadeMaxima = control.get('idadeMaxima')?.value;
    
    if (idadeMinima && idadeMaxima) {
      if (idadeMinima > idadeMaxima) {
        return { idadeRangeInvalid: true };
      }
    }
    return null; 
  };
}

export function emptyFieldsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allFieldsEmpty = Object.values(control.value).every(value => value === null || value === '');
    return allFieldsEmpty ? { allFieldsEmpty: true } : null;
  };
}