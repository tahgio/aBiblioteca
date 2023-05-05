import { Injectable } from '@angular/core';
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, getDocs } from '@angular/fire/firestore';
import { DocumentData, Firestore, collection, collectionData, query, where } from '@angular/fire/firestore'
import { Book, BookModel } from '../../types/Books';
import { EntryType } from '../../types/Unions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private firestore: Firestore) { }

  loadCollection(entry: EntryType){
    const instance = collection(this.firestore, entry)
    return collectionData(instance, {idField: "id"})
  }

  loadQuotes(entry:"books" | "films", id: string, field: "quotes") : DocumentData
  loadQuotes(entry: "albums", id: string, field: "tracks") : DocumentData 
  loadQuotes(entry: EntryType, id: string, field: "quotes" | "tracks"): DocumentData {
    const instance = collection(this.firestore, entry, id, field )
    return collectionData(instance)
  }

  async getAllTags(entry: EntryType): Promise<string[]> {
    const qConverter = {
      toFirestore: (book: BookModel): DocumentData => {
        return {
          tags: book.tags
        }
      },
      fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return data['tags']
    }}
    const instance = collection(this.firestore, entry)
    const q = query(instance, where("tags", "!=", [])).withConverter(qConverter)

    const querySnapshot = await getDocs(q);
    let tagArray : string[] = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data()
      tagArray = [...tagArray, ...data]
    });
    return Array.from(new Set(tagArray))
  }


}
