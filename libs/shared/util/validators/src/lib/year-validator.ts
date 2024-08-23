import { type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';

export function YearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const currentYear = new Date().getFullYear();
    const year = parseInt(value, 10) + 2000;

    if (year < currentYear || year > currentYear + 5 || year === currentYear) {
      return { yearValidator: true };
    }
    return null;
  };
}
