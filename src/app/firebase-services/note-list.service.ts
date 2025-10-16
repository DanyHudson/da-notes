import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  firestore = inject(Firestore);

  constructor() { }


  //  itemCollection = collection(this.firestore, 'items');

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }
  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleDocRef(colId: string, docId: string) {
   return doc(collection(this.firestore, colId), docId);
  }


}
