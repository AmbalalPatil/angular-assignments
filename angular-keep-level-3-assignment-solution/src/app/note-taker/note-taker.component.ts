import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note: Note;
  errMessage: string;
  categoryList: Array<Category>;

  constructor(private noteService: NotesService, private categoryDialog: MatDialog, private categoryService: CategoryService) {
    this.note = new Note();
    this.categoryList = [];
  }

  openCreateCategoryDialog(){
    this.categoryDialog.open(CategoryDialogComponent).afterClosed().subscribe(
      data => {
      this.categoryService.getCategories().subscribe(
        data => {
          this.categoryList = data;
        },
        err => {
          this.errMessage = err.message;
        });
      },
      err =>{
        this.errMessage = err.message;
      }
    )
  }

  takeNote() {
    console.log("add", this.note);
    if (this.note.noteContent === '' || this.note.noteTitle === '' || typeof this.note.category === 'undefined') {
      this.errMessage = 'Title and Text both are required fields';
    }

    this.noteService.addNote(this.note).subscribe(
      data => {

      },
      error => {
        this.errMessage = error.message;
      }
    );
    this.note = new Note();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data;
      },
      err => {
        this.errMessage = err.message;
      }
    );
  }
}
