import { Component, Inject } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    private noteService: NotesService,
    private routerService: RouterService,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.note = noteService.getNoteById(data.noteid);
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      data => {
        this.dialogRef.close();
      },
      err => {
        this.errMessage = err.message;
      }
    );
  }
}
