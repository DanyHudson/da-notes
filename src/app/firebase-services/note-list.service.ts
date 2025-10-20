import { Injectable, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import {NoteInterface} from '../interfaces/note-interface';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService implements OnDestroy {
  // trashNotes: Note[] = [];
  // normalNotes: Note[] = [];

  // unsubList: () => void;
  // unsubSingle: () => void;
  unsubList;
  unsubSingle;
  firestore = inject(Firestore);
  items$ = collectionData(this.getNotesRef());


  constructor() {
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element.id);
      });

    });


    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', 'V9rRYF7XuegxVuceghBm'), (element) => {
      console.log(element);

    });


    this.items$.subscribe();



  }
  // ngOnDestroy() {
  //   this.unsubList();
  //   this.unsubSingle();
  // }

  ngOnDestroy() {

    if (this.unsubList) {
      this.unsubList();
    }
    if (this.unsubSingle) {
      this.unsubSingle();
    }
  }

  setNoteObject(obj: any, id: string): NoteInterface {
    return {
      id: id || '',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false,
      type: obj.type || 'note'
    }
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
