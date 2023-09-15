import { Pipe, PipeTransform } from '@angular/core';
import { EntryToModels, assureNever } from '../types/Methods';
import { AlbumModel, BookModel, FilmModel } from '../types/Models';
import { EntryType as EntryTypeEnum } from '../types/Consts';
import { EntryType } from '../types/Unions';

@Pipe({
  name: 'as',
})
export class AsPipe implements PipeTransform {
  transform<T extends any[]>(input: unknown, ...baseItem: T): T[number] {
    return input as T[number];
  }
}
