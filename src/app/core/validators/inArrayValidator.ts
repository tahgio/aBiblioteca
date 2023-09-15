import { AbstractControl, ValidatorFn } from '@angular/forms';

export function inArrayValidator(array: readonly any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;
    if (array.includes(inputValue)) {
      return null;
    } else {
      return { notInArray: { value: inputValue } };
    }
  };
}
