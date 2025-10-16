import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  // trashNotes: Note[] = [];
  // normalNotes: Note[] = [];

  // firestore = inject(Firestore);

  
  firestore = inject(Firestore);
  items$ = collectionData(this. getNotesRef());


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
