import { Injectable, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { NoteInterface } from '../interfaces/note-interface';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService implements OnDestroy {
  trashNotes: NoteInterface[] = [];
  normalNotes: NoteInterface[] = [];

  unsubTrash: () => void;
  unsubNotes: () => void;

  firestore = inject(Firestore);


  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();

  }

  ngOnDestroy() {
    this.unsubTrash();
    this.unsubNotes();

  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach((element) => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  subNotesList() {
     return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach((element) => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });


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
