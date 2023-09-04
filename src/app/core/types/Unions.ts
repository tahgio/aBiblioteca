import {
  AppState,
  EntryType,
  ItemType,
  PathType,
  SubItemType,
  ToastTypes,
} from './Consts';
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
export type ToastTypes = keyof typeof ToastTypes;

export type ToastIcons =
  | 'heroCheckCircle'
  | 'heroInformationCircle'
  | 'heroExclamationCircle'
  | 'heroExclamationTriangle';

/*
 *  STORE AND ADDFORM
 */
export type EntryType = keyof typeof EntryType;

export type PathType = keyof typeof PathType;

export type ItemType = keyof typeof ItemType;

export type SubItemType = keyof typeof SubItemType;

export type AppState = keyof typeof AppState;

export type SubFormModels = QuoteModel | TrackModel | MovieLineModel;

export type FormModels = BookModel | FilmModel | AlbumModel;
