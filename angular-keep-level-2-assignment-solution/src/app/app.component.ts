import { Component } from '@angular/core';
import { Note } from './note';
import { NotesService } from './services/notes.service';
import { HttpClient} from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor() {}
  ngOnInit() {}
}
