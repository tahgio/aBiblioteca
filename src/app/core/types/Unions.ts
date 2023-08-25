import {
  AlbumModel,
  BookModel,
  FilmModel,
  MovieLineModel,
  QuoteModel,
  TrackModel,
} from './Models';

/*
 *  TOAST
 */
export type ToastTypes = 'success' | 'warning' | 'error' | 'info';

export type ToastIcons =
  | 'heroCheckCircle'
  | 'heroInformationCircle'
  | 'heroExclamationCircle'
  | 'heroExclamationTriangle';

/*
 *  STORE AND ADDFORM
 */
export type EntryType = 'books' | 'films' | 'albums';

export type ItemType = 'Livro' | 'Filme' | 'Album';

export type SubItemType = 'quotes' | 'tracks' | 'movieLines';

export type SubFormModels = QuoteModel | TrackModel | MovieLineModel;

export type FormModels = BookModel | FilmModel | AlbumModel;
