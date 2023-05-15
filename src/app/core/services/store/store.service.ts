import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot, SnapshotOptions, collectionGroup, docData, fromRef, getDoc, getDocs, limit, orderBy, startAt } from '@angular/fire/firestore';
import { DocumentData, Firestore, collection, collectionData, query, where } from '@angular/fire/firestore'
import { EntryType } from '../../types/Unions';
import { Observable, combineLatestAll, from, map, merge, mergeAll, of, switchMap } from 'rxjs';

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
  loadSub(entry: EntryType, id: string, field: "quotes" | "tracks"| "movieLines"): DocumentData {
    const instance = collection(this.firestore, entry, id, field )
    return collectionData(instance)
  }

  //Collection group
  loadRandomDocFromSub(field: "quotes" | "tracks" | "movieLines"){
    // const instance = collection(this.firestore, "book")
    const randomNumberConverter = {
      toFirestore: () => ({}),
      fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return data["_random"] as number
    }
  }
  const qConverter = {
    toFirestore: () => ({}),
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
      const data = snapshot.data(options);
      const title$ = docData(data["book"]).pipe(map(e => {
          return {
            title: e["title"],
            quote: data["quote"],
            page: data["page"]
        }
      }));
      return title$
  }}
    return collectionData(query(collectionGroup(this.firestore, field), orderBy("_random", "desc"), limit(1)).withConverter(randomNumberConverter)).pipe(map( number => {
      const randomNumber = Math.floor(Math.random() * number[0] + 1)
      return collectionData(query(collectionGroup(this.firestore, field), where("_random", "==", randomNumber), limit(1)).withConverter(qConverter)).pipe(map((el) => el[0]), mergeAll())
    })).pipe(mergeAll())
    
    // return collectionData(collectionGroup(this.firestore, field).withConverter(qConverter))
    // return collectionData(query(collectionGroup(this.firestore, field), orderBy("_random", "desc"), limit(1)).withConverter(randomNumberConverter))
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
