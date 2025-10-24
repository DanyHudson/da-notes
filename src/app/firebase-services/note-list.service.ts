import { Injectable, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { NoteInterface } from '../interfaces/note-interface';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  // orderBy,
  limit,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService implements OnDestroy {
  trashNotes: NoteInterface[] = [];
  normalNotes: NoteInterface[] = [];
  normalMarkedNotes: NoteInterface[] = [];

  unsubTrash: () => void;
  unsubNotes: () => void;
  unsubMarkedNotes: () => void;

  firestore = inject(Firestore);


  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();
    this.unsubMarkedNotes = this.subMarkedNotesList();

  }

  async deleteNote(colId: "notes" | "trash", docId: string) {
    await deleteDoc(this.getSingleDocRef(colId, docId)).catch(
      (err) => { console.error('Error deleting document: ', err); }
    )
  }

  async updateNote(item: NoteInterface) {
    if (item.id) {
      let docRef = this.getSingleDocRef(this.getColIdFromNote(item), item.id);
      await updateDoc(docRef, this.getCleanJson(item)).catch(
        (err) => {
          console.error('Error updating document: ', err);
        }
      ).then(
        () => {
          console.log("Document successfully updated!"
          )
        }
      );
    }
  }

  getCleanJson(item: NoteInterface): {} {
    return {
      id: item.id,
      type: item.type,
      title: item.title,
      content: item.content,
      marked: item.marked
    };
  }

  getColIdFromNote(item: NoteInterface): string {
    return item.type === 'trash' ? 'trash' : 'notes';
  }

  async addNote(item: NoteInterface, colId: "notes" | "trash" = "notes") {
    let collectionRef;
    if (colId === "trash") {
      collectionRef = this.getTrashRef();
    } else {
      collectionRef = this.getNotesRef();
    }

    await addDoc(collectionRef, item)
      .catch(err => {
        console.error('Error adding document: ', err);
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef?.id);
      });
  }

  ngOnDestroy() {
    this.unsubTrash();
    this.unsubNotes();
    this.unsubMarkedNotes();
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
    const q = query(this.getNotesRef(), limit(100));
    return onSnapshot(q, (list) => {
      this.normalNotes = [];
      list.forEach((element) => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
      this.logDocChanges(list);
    });

  }


  logDocChanges(list: any) {
    list.docChanges().forEach((change: any) => {
      if (change.type === "added") {
        console.log("New Note: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified Note: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed Note: ", change.doc.data());
      }
    });
  }

  subMarkedNotesList() {
    const q = query(this.getNotesRef(), where('marked', '==', true), limit(100));
    return onSnapshot(q, (list) => {
      this.normalMarkedNotes = [];
      list.forEach((element) => {
        this.normalMarkedNotes.push(this.setNoteObject(element.data(), element.id));
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
