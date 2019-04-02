import { Component } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';
import { HttpClient} from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  note: Note;
  notes: Array<Note>;

  constructor(private noteService: NotesService) {
    this.note = new Note();
    this.notes = [];
  }

  takeNote() {
    if (this.note.text === '' || this.note.title === '') {
      this.errMessage = 'Title and Text both are required fields';
    }
    this.notes.push(this.note);

    this.noteService.addNote(this.note).subscribe(
      data => {

      },
      error => {
        this.errMessage = error.message;
        const index = this.notes.findIndex(note => note.title === this.note.title);
        this.notes.splice(index, 1);
      }
    );
    this.note = new Note();
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(
      data => {
        this.notes = data;
      },
      error => {
        this.errMessage = error.message;
      }
    );
  }
}
