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
  docData,
  getDocs,
  limit,
  orderBy,
  writeBatch,
  doc,
} from '@angular/fire/firestore';
import { EntryType } from '../../types/Unions';
import { first, map, mergeAll } from 'rxjs';
import { BookModel, QuoteModel } from '../../types/Models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private firestore: Firestore) {}

  //Collection
  loadCollection(entry: EntryType) {
    const instance = collection(this.firestore, entry);
    return collectionData(instance, { idField: 'id' });
  }

  // -- Add Form main method
  addToCollection(entry: EntryType, objtoAdd: BookModel, subObj: QuoteModel[]) {
    // Init
    const instance = collection(this.firestore, entry);
    // Add to collection and to subSelection
    addDoc(instance, objtoAdd).then((res) => {
      const subInstance = collection(this.firestore, res.path, 'quotes');

      const docRef = doc(this.firestore, entry, res.id);
      this.getLastRandomNumber('quotes').subscribe((lastRandom) => {
        subObj.forEach((e, i) => {
          const subWithRandom: QuoteModel = {
            ...e,
            _random: lastRandom + i + 1,
            _parent: docRef,
            _parentTitle: objtoAdd.title,
          };
          addDoc(subInstance, subWithRandom);
        });
      });
    });
    //sub.unsubscribe()
  }

  //SubCollection
  loadSub(entry: 'books', id: string, field: 'quotes'): DocumentData;
  loadSub(entry: 'films', id: string, field: 'movieLines'): DocumentData;
  loadSub(entry: 'albums', id: string, field: 'tracks'): DocumentData;
  loadSub(
    entry: EntryType,
    id: string,
    field: 'quotes' | 'tracks' | 'movieLines'
  ): DocumentData {
    const instance = collection(this.firestore, entry, id, field);
    return collectionData(instance);
  }

  getLastRandomNumber(field: 'quotes' | 'tracks' | 'movieLines') {
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
    // Return observable mapped
    return lastNumber$.pipe(
      first(),
      map((n) => n[0])
    );
  }

  //Collection group
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
    const qConverter = {
      toFirestore: () => ({}),
      fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ) => {
        const data = snapshot.data(options);
        const title$ = docData(data['book']).pipe(
          map((e) => {
            return {
              title: e['title'],
              quote: data['quote'],
              page: data['page'],
            };
          })
        );
        return title$;
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
              ).withConverter(qConverter)
            ).pipe(
              map((el) => el[0]),
              mergeAll()
            );
          })
        )
        // merge all
        .pipe(mergeAll())
    );
  }

  //Get Only tags from a Collection
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
}
