import { DocumentData, DocumentReference } from '@angular/fire/firestore';

/*
 * SHARED
 */

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

export interface BookModel {
  pages: number;
  rating: number;
  genre: string;
  title: string;
  author: string;
  tags: string[];
  status: BookStatusList;
  year: number;
  cover: string;
  id?: string;
}

export interface QuoteModel extends SubEntryModel {
  page: number;
  quote: string;
}
