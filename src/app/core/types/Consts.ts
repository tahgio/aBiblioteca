import { UnionToArray } from './Methods';
import { BookStatusList, MovieStatusList } from './Models';

/*
 * ENUMS
 */
export const EntryType = {
  books: 'books',
  films: 'films',
  albums: 'albums',
} as const;

export const SubItemType = {
  quotes: 'quotes',
  movieLines: 'movieLines',
  tracks: 'tracks',
} as const;

export const ItemType = {
  Livro: 'Livro',
  Filme: 'Filme',
  Album: 'Album',
} as const;

/*
 * CONVERTERS
 */
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
