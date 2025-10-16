import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
import { NoteList } from './note-list/note-list';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { AddNoteDialog } from './add-note-dialog/add-note-dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NoteList, Footer, Header, AddNoteDialog],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'DAKeep';
  addDialogOpen = false;
}
