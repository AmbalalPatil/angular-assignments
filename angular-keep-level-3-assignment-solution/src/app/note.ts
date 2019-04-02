import { Category } from "./category";

export class Note {
  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreatedBy: string;
  category: Category;

  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteCreatedBy = '';
    this.noteStatus = 'not-started'
  }
}
