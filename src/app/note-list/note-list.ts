import { Component } from '@angular/core';
import { NoteInterface } from '../interfaces/note-interface';
import { NoteListService } from '../firebase-services/note-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from './note/note';



@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [FormsModule, CommonModule, Note], 
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList {
  noteList: NoteInterface[] = [];
  favFilter: "all" | "fav" = "all";
  status: "notes" | "trash" = "notes";

  constructor(private noteService: NoteListService) {
    
  }

  getList(): NoteInterface[] {
    if (this.status === "notes") {
      return this.noteService.normalNotes;
    } else {
      return this.noteService.trashNotes;
    }
  }

  changeFavFilter(filter:"all" | "fav"){
    this.favFilter = filter;
  }

  changeTrashStatus(){
    if(this.status == "trash"){
      this.status = "notes";
    } else {
      this.status = "trash";
      this.favFilter = "all";
    }
    
  }





}
