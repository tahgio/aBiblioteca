import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot, SnapshotOptions, getDocs } from '@angular/fire/firestore';
import { DocumentData, Firestore, collection, collectionData, query, where } from '@angular/fire/firestore'
import { EntryType } from '../../types/Unions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private firestore: Firestore) { }

  //Collection
  loadCollection(entry: EntryType){
    const instance = collection(this.firestore, entry)
    return collectionData(instance, {idField: "id"})
  }
  
  //SubCollection
  loadSub(entry:"books" | "films", id: string, field: "quotes") : DocumentData
  loadSub(entry: "albums", id: string, field: "tracks") : DocumentData
  loadSub(entry: EntryType, id: string, field: "quotes" | "tracks"): DocumentData {
    const instance = collection(this.firestore, entry, id, field )
    return collectionData(instance)
  }

  //Get Only tags from a Collection
  async getAllTags(entry: EntryType): Promise<string[]> {
    let tagArray : string[] = []
    const qConverter = {
      toFirestore: () => ({}),
      fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return data['tags']
    }}
    const instance = collection(this.firestore, entry)
    const q = query(instance, where("tags", "!=", [])).withConverter(qConverter)

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      tagArray = [...tagArray, ...data]
    });
    return Array.from(new Set(tagArray.flat()))
  }


}
