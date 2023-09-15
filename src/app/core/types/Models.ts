import {
  DocumentData,
  DocumentReference,
  FieldValue,
  Timestamp,
} from '@angular/fire/firestore';
import { bookStatusList, filmStatusList } from './Consts';
import { TupleToUnion } from './Methods';

/*
 * SHARED
 */

interface FormCommonModel {
  _addedAt?: Timestamp;
  _lastModified?: Timestamp;
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
export type BookStatusList = TupleToUnion<typeof bookStatusList>;

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
export type MovieStatusList = TupleToUnion<typeof filmStatusList>;

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
