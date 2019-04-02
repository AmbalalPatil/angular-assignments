import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  errorMessage: string;
  notes: Array<Note>;

  constructor(private noteService: NotesService) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe(
      data => {
        this.notes = data;
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
}
