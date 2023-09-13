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

export const PathType = {
  livros: 'livros',
  filmes: 'filmes',
  albums: 'albums',
} as const;

export const ToastTypes = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

export const AppState = {
  stable: 'stable',
  error: 'error',
  loading: 'loading',
} as const;

/*
 * CONVERTERS
 */
export const itemConverter = {
  Livro: EntryType.books,
  Filme: EntryType.films,
  Album: EntryType.albums,
} as const;

export const subItemGetter = {
  books: SubItemType.quotes,
  films: SubItemType.movieLines,
  albums: SubItemType.tracks,
} as const;

export const pathConverter = {
  livros: EntryType.books,
  filmes: EntryType.films,
  albums: EntryType.albums,
} as const;

/*
 * CONSTANTS
 */
export const bookStatusList = [
  'Lido',
  'Lendo',
  'Quero Ler',
  'Em Espera',
  'Abandonado',
] as const;

export const filmStatusList = ['Abandonado', 'Visto', 'Quero Ver'] as const;
