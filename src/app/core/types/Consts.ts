/*
 * CONVERTERS
 */

import { UnionToArray } from './Methods';
import { BookStatusList, MovieStatusList } from './Models';

export const itemConverter = {
  Livro: 'books',
  Filme: 'films',
  Album: 'albums',
} as const;

export const subItemGetter = {
  books: 'quotes',
  films: 'movieLines',
  albums: 'tracks',
} as const;

/*
 * CONSTANTS
 */
export const bookStatusList: UnionToArray<BookStatusList> = [
  'Lido',
  'Lendo',
  'Quero Ler',
  'Em Espera',
  'Abandonado',
];

export const filmStatusList: UnionToArray<MovieStatusList> = [
  'Abandonado',
  'Visto',
  'Quero Ver',
];
