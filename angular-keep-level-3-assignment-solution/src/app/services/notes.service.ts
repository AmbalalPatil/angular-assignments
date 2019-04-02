import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
@Injectable()
export class NotesService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  fetchNotesFromServer() {
    return this.httpClient.get<Array<Note>>(`http://localhost:8765/note-service/api/v1/note/${this.authService.getUserId()}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    note.noteCreatedBy = this.authService.getUserId();
    console.log("new note", note);
    return this.httpClient.post<Note>('http://localhost:8765/note-service/api/v1/note', note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });
  }

  editNote(updatedNote: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:8765/note-service/api/v1/note/${this.authService.getUserId()}/${updatedNote.noteId}`, updatedNote, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(editedNote => {
      const note = this.notes.find(noteItem => noteItem.noteId == editedNote.noteId);
      Object.assign(note, editedNote);
      this.notesSubject.next(this.notes);
    });
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(noteItem => noteId == noteItem.noteId);
    return Object.assign({}, note);
  }

}
