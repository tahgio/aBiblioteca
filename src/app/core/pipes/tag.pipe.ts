import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag',
})
export class TagPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const words = value.split(' ');
    if (value.length > 14 && words.length > 1) {
      const abbr = `${words[0].slice(0, 3)}.`;
      return words.slice(1).reduce((prev, current) => {
        return `${prev} ${current}`;
      }, abbr);
    }
    return value;
  }
}
