import {
  DocumentData,
  DocumentReference,
  FieldValue,
} from '@angular/fire/firestore';

/*
 * SHARED
 */

interface FormCommonModel {
  _addedAt?: FieldValue;
  _lastModified?: FieldValue;
  id?: string;
  title: string;
  cover: string;
  genre: string;
  rating: number;
  tags: string[];
  year: number;
}

interface SubEntryModel {
  _random?: number;
  _parent?: DocumentReference<DocumentData>;
  _parentTitle?: string;
}

/*
 * BOOKS
 */
export type BookStatusList =
  | 'Lido'
  | 'Lendo'
  | 'Quero Ler'
  | 'Em Espera'
  | 'Abandonado';

export interface BookModel extends FormCommonModel {
  pages: number;
  author: string;
  status: BookStatusList;
}

export interface QuoteModel extends SubEntryModel {
  page: number;
  quote: string;
}

/*
 * FILMS
 */
export type MovieStatusList = 'Visto' | 'Quero Ver' | 'Abandonado';

export interface FilmModel extends FormCommonModel {
  director: string;
  writer: string;
  storyline: string;
  country: string;
  runtime: string;
  status: MovieStatusList;
}

export interface MovieLineModel extends SubEntryModel {
  movieLine: string;
}

/*
 * ALBUMS
 */
export interface AlbumModel extends FormCommonModel {
  artist: string;
  albumReview: {
    reviewer: string;
    review: string;
  };
}

export interface TrackModel extends SubEntryModel {
  trackName: string;
  trackNumber: number;
  time: string;
}
