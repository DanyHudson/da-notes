import { Component, Output, EventEmitter } from '@angular/core';
import { NoteInterface } from '../interfaces/note-interface';
import { NoteListService } from '../firebase-services/note-list.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-note-dialog.html',
  styleUrl: './add-note-dialog.scss'
})
export class AddNoteDialog {
  @Output() addDialogClosed: EventEmitter<boolean> = new EventEmitter();
  title = "";
  description = "";

  constructor(public noteService: NoteListService){}

  closeDialog() {
    this.title = "";
    this.description = "";
    this.addDialogClosed.emit(false);
  }

  addNote(){
    //beachte das closeDialog() zum Schluss kommt, denn es leert die Variablen
    this.closeDialog();
  }
}
