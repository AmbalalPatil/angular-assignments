import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private routerService: RouterService) {
    this.dialog.open( EditNoteViewComponent, {
      data: {noteid: this.activatedRoute.snapshot.paramMap.get('noteId')}
    }).afterClosed().subscribe(
      data => {
        this.routerService.routeBack();
      }
    );
  }
}
