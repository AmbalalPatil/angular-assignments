import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  errorMessage: String;
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private noteService: NotesService) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe(
      data => {
        this.notStartedNotes = data.filter( note => {
          return note.noteStatus === 'not-started';
        });
        this.startedNotes = data.filter( note => {
          return note.noteStatus === 'started';
        });
        this.completedNotes = data.filter( note => {
          return note.noteStatus === 'completed';
        });
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
