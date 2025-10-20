import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  // trashNotes: Note[] = [];
  // normalNotes: Note[] = [];


  unsubList;
  unsubSingle;
  firestore = inject(Firestore);
  // items$ = collectionData(this. getNotesRef());


  constructor() {
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });

    });


    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', 'PkflA6MAVxzCLrdpwabN'), (element) => {
      console.log(element);

    });

    this.unsubList();
    this.unsubSingle();




  }


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
