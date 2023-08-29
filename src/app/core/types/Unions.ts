import { EntryType, SubItemType } from './Consts';
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
export type EntryType = keyof typeof EntryType;

export type ItemType = 'Livro' | 'Filme' | 'Album';

export type SubItemType = keyof typeof SubItemType;

export type SubFormModels = QuoteModel | TrackModel | MovieLineModel;

export type FormModels = BookModel | FilmModel | AlbumModel;
