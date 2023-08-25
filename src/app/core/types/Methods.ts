import { itemConverter, subItemGetter } from './Consts';
import { EntryType, ItemType, SubItemType } from './Unions';
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

/*
 *  ASSERTION AND CHECKING FUNCTIONS
 */
export function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error('Not a string');
}

export function assureNever(value: never): Error {
  return new Error(value);
}

/*
 *  CONVERSION FUNCTIONS
 */
export function convertToEntrytype(item: ItemType): EntryType {
  return itemConverter[item as keyof typeof itemConverter];
}

export function getSubItemType(item: EntryType): SubItemType {
  return subItemGetter[item as keyof typeof subItemGetter];
}
