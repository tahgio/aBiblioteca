import { Injectable } from '@angular/core';
import {
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
  updateDoc,
  UpdateData,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  EntryType,
  FormModels,
  SubFormModels,
  SubItemType,
} from '../../types/Unions';
import { Observable, first, from, map, mergeAll } from 'rxjs';
import {
  EntryToModels,
  Nullable,
  assureNever,
  getSubItemType,
} from '../../types/Methods';
import { FormGroup } from '@angular/forms';
import { AlbumModel, BookModel, FilmModel } from '../../types/Models';
import { EntryType as EntryTypeEnum } from '../../types/Consts';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private firestore: Firestore, private msg: MessageService) {}

  /*
   * Collection
   */
  //-- Load Collection
  loadCollection(entry: EntryType) {
    const instance = collection(this.firestore, entry);
    return collectionData(instance, { idField: 'id' }).pipe() as Observable<
      FormModels[]
    >;
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
    };
    // Add to collection and to subSelection
    const res = await addDoc(instance, objWithTimeStamp);
    const subInstance = collection(
      this.firestore,
      res.path,
      getSubItemType(entry)
    );
    const docRef = doc(this.firestore, entry, res.id);
    this.getLastRandomNumber(getSubItemType(entry)).subscribe((lastRandom) => {
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

  async updateEntry(
    id: string,
    entry: EntryType,
    updateObj: FormModels,
    subObj: SubFormModels[]
  ) {
    // Init
    const docRef = doc(this.firestore, entry, id);
    const objWithTimeStamp: UpdateData<FormModels> = {
      ...updateObj,
      _lastModified: serverTimestamp() as Timestamp,
    };
    try {
      // Update Collection
      await updateDoc(docRef, objWithTimeStamp);
    } catch (error: any) {
      this.msg.showToast(
        'error',
        'Algo de errado aconteceu ao atualizar o item'
      );
      throw new Error(error);
    }
    // Update SubCollection
    this.getLastRandomNumber(getSubItemType(entry)).subscribe((lastRandom) => {
      let randomCount = 0;
      subObj.map((e, i) => {
        let subWithMetadata: SubFormModels = { ...e };
        if (!e?._random) {
          subWithMetadata = {
            ...e,
            _random: lastRandom + randomCount + 1,
            _parent: docRef,
            _parentTitle: updateObj.title,
          };
          ++randomCount;
        }

        try {
          setDoc(docRef, subWithMetadata);
        } catch (error: any) {
          this.msg.showToast(
            'error',
            'Algo de errado aconteceu ao atualizar o subitem'
          );
          throw new Error(error);
        }
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
  loadRandomDocFromSub(field: SubItemType) {
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
                where('_random', '<=', randomNumber),
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
  loadSub(entry: EntryType, id: string): Observable<SubFormModels[]> {
    const instance = collection(
      this.firestore,
      entry,
      id,
      getSubItemType(entry)
    );
    return collectionData(instance).pipe(
      map((el) => {
        if (el !== null) {
          return el as SubFormModels[];
        } else {
          throw new Error('Data not found');
        }
      })
    );
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

  removeItem(entry: EntryType, key: string) {
    const docRef = doc(this.firestore, entry, key);
    return deleteDoc(docRef);
  }

  /*
   * Utils
   */
  private getLastRandomNumber(field: SubItemType) {
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
