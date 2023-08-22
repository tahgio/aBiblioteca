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
