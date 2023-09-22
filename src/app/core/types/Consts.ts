import { Validators } from '@angular/forms';
import { inArrayValidator } from '../validators/inArrayValidator';

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

export const Colors = {
  secondary: 'secondary',
  card: 'card',
  main: 'main',
  highlight: 'highlight',
  detail: 'detail',
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

export const MESSAGE_ICONS = {
  success: 'heroCheckCircle',
  info: 'heroInformationCircle',
  warning: 'heroExclamationTriangle',
  error: 'heroExclamationCircle',
} as const;

export const filmStatusList = ['Abandonado', 'Visto', 'Quero Ver'] as const;

export const allItemsInfo = {
  books: {
    img: '../../../assets/booksAndCup.png',
    imgAlt: 'Cat on a bookshelf',
    title: 'Livros',
    subTitle:
      'Aqui, você encontrará uma coleção cuidadosamente selecionada de livros, filmes e músicas que são muito importantes para mim. Esta biblioteca é um reflexo do meu gosto pessoal e dos meus interesses. Espero que você goste!',
  },
  films: {
    img: '../../../assets/popcornBowl.png',
    imgAlt: 'Green typewriter with folded papers around',
    title: 'Filmes',
    subTitle:
      'Aqui, você encontrará uma coleção cuidadosamente selecionada de livros, filmes e músicas que são muito importantes para mim. Esta biblioteca é um reflexo do meu gosto pessoal e dos meus interesses. Espero que você goste!',
  },
  albums: {
    img: '../../../assets/microphone.png',
    imgAlt: 'Pink microphone',
    title: 'Albums',
    subTitle:
      'Aqui, você encontrará uma coleção cuidadosamente selecionada de livros, filmes e músicas que são muito importantes para mim. Esta biblioteca é um reflexo do meu gosto pessoal e dos meus interesses. Espero que você goste!',
  },
} as const;

export const formGroups = {
  books: {
    title: ['', Validators.required],
    author: ['', Validators.required],
    genre: [''],
    cover: ['', Validators.required],
    year: ['', Validators.required],
    pages: [
      '',
      [Validators.min(10), Validators.max(9999), Validators.required],
    ],
    tags: [[]],
    status: ['', [Validators.required, inArrayValidator(bookStatusList)]],
    rating: [1, [Validators.min(1), Validators.max(5)]],
  },
  films: {
    title: ['', Validators.required],
    director: ['', Validators.required],
    writer: ['', Validators.required],
    storyline: ['', Validators.required],
    country: ['', Validators.required],
    genre: [''],
    cover: ['', Validators.required],
    year: ['', Validators.required],
    runtime: ['', [Validators.required]],
    tags: [[]],
    status: ['', [Validators.required, inArrayValidator(filmStatusList)]],
    rating: [1, [Validators.min(1), Validators.max(5)]],
  },
  albums: {
    title: ['', Validators.required],
    artist: ['', Validators.required],
    genre: [''],
    cover: ['', Validators.required],
    albumReview: {
      reviewer: [''],
      review: [''],
    },
    year: ['', Validators.required],
    tags: [[]],
    rating: [1, [Validators.min(1), Validators.max(5)]],
  },
};
