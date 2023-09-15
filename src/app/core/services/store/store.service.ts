import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  query,
  where,
  addDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  doc,
  serverTimestamp,
  getDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { EntryType, FormModels, SubFormModels } from '../../types/Unions';
import { Observable, first, from, map, mergeAll } from 'rxjs';
import { Nullable, getSubItemType } from '../../types/Methods';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private firestore: Firestore) {}

  /*
   * Collection
   */
  //-- Load Collection
  loadCollection(entry: EntryType) {
    const instance = collection(this.firestore, entry);
    return collectionData(instance, { idField: 'id' });
  }
  //-- Add Form main method
  async addToCollection(
    entry: EntryType,
    objtoAdd: FormModels,
    subObj: SubFormModels[],
    form: FormGroup
  ): Promise<void> {
    // Check for Form Errors
    if (form.invalid) {
      return Promise.reject(new Error('invalid form'));
    }
    // Init
    const instance = collection(this.firestore, entry);
    const objWithTimeStamp: FormModels = {
      ...objtoAdd,
      _addedAt: serverTimestamp() as Timestamp,
      _lastModified: undefined,
    };
    // Add to collection and to subSelection
    const res = await addDoc(instance, objWithTimeStamp);
    const subInstance = collection(
      this.firestore,
      res.path,
      getSubItemType(entry)
    );
    const docRef = doc(this.firestore, entry, res.id);
    this.getLastRandomNumber('quotes').subscribe((lastRandom) => {
      subObj.forEach((e, i) => {
        const subWithMetadata: SubFormModels = {
          ...e,
          _random: lastRandom + i + 1,
          _parent: docRef,
          _parentTitle: objtoAdd.title,
        };
        addDoc(subInstance, subWithMetadata);
      });
    });
  }

  //-- Get Only tags from a Collection
  async getAllTags(entry: EntryType): Promise<string[]> {
    let tagArray: string[] = [];
    const qConverter = {
      toFirestore: () => ({}),
      fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ) => {
        const data = snapshot.data(options);
        return data['tags'];
      },
    };
    const instance = collection(this.firestore, entry);
    const q = query(instance, where('tags', '!=', [])).withConverter(
      qConverter
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tagArray = [...tagArray, ...data];
    });
    return Array.from(new Set(tagArray.flat()));
  }

  //-- Collection group
  loadRandomDocFromSub(field: 'quotes' | 'tracks' | 'movieLines') {
    const randomNumberConverter = {
      toFirestore: () => ({}),
      fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ) => {
        const data = snapshot.data(options);
        return data['_random'] as number;
      },
    };
    // get last "_random" entry field
    return (
      this.getLastRandomNumber(field)
        .pipe(
          map((number) => {
            // get a random number between 1 and last _random entry
            const randomNumber = Math.floor(Math.random() * number + 1);
            // fecth data with _random entry equals randomNumber created
            return collectionData(
              query(
                collectionGroup(this.firestore, field),
                where('_random', '==', randomNumber),
                limit(1)
              )
            ).pipe(mergeAll());
          })
        )
        // merge all
        .pipe(mergeAll())
    );
  }

  /*
   * SubCollection
   */
  //-- Load SubCollection
  loadSub(entry: EntryType, id: string): DocumentData {
    const instance = collection(
      this.firestore,
      entry,
      id,
      getSubItemType(entry)
    );
    return collectionData(instance);
  }

  /*
   * Item
   */
  // Load item from entry using key
  loadItem(entry: EntryType, key: string): Observable<Nullable<FormModels>> {
    const instance = doc(this.firestore, entry, key);
    return from(getDoc(instance)).pipe(
      map((el) => {
        if (el.exists()) {
          return el.data() as FormModels;
        } else {
          throw new Error('Data not found');
        }
      })
    );
  }

  /*
   * Utils
   */
  private getLastRandomNumber(field: 'quotes' | 'tracks' | 'movieLines') {
    // Init converter
    const randomNumberConverter = {
      toFirestore: () => ({}),
      fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ) => {
        const data = snapshot.data(options);
        return data['_random'] as number;
      },
    };
    // Create an observable
    const lastNumber$ = collectionData(
      query(
        collectionGroup(this.firestore, field),
        orderBy('_random', 'desc'),
        limit(1)
      ).withConverter(randomNumberConverter)
    );
    // Return observable mapped getting only the first result and unsubscribing
    return lastNumber$.pipe(
      first(),
      map((n) => n[0])
    );
  }
}
