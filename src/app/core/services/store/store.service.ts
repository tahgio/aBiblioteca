import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore'

type EntryType = "books" | "films" | "albums"


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




}
