import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat',
  standalone: true,
})
export class CreditCardFormatPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) {
      return '';
    }

    // Convert the value to a string
    const stringValue = value.toString();

    // Use a regular expression to add spaces after every 4 digits
    return stringValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
