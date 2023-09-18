import {
  PathType as PathTypeEnum,
  itemConverter,
  pathConverter,
  subItemGetter,
} from './Consts';
import { AlbumModel, BookModel, FilmModel } from './Models';
import {
  EntryType,
  FormModels,
  ItemType,
  PathType,
  SubItemType,
} from './Unions';
import { EntryType as EntryTypeEnum } from './Consts';
/*
 *  TYPE FUNCTIONS
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

export type Nullable<T> = T | null;

export type TupleToUnion<T extends readonly any[]> = T[number];

export type EntryToModels<T extends EntryType> =
  T extends typeof EntryTypeEnum.albums
    ? AlbumModel
    : T extends typeof EntryTypeEnum.books
    ? BookModel
    : T extends typeof EntryTypeEnum.films
    ? FilmModel
    : never;

/*
 *  ASSERTION AND CHECKING FUNCTIONS
 */
export function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error('Not a string');
}

export function isPathType(value: unknown): value is PathType {
  return typeof value === 'string' && value in PathTypeEnum;
}

export function assureNever(value: never): Error {
  return new Error(value);
}

/*
 *  CONVERSION FUNCTIONS
 */
export function convertPathToEntry(item: PathType): EntryType {
  return pathConverter[item as keyof typeof pathConverter];
}

export function convertItemToEntry(item: ItemType): EntryType {
  return itemConverter[item as keyof typeof itemConverter];
}

export function getSubItemType(item: EntryType): SubItemType {
  return subItemGetter[item as keyof typeof subItemGetter];
}
