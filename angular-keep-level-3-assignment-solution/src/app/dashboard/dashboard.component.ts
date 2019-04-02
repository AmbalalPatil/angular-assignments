import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private notesService: NotesService, private categoryService: CategoryService) {
    this.notesService.fetchNotesFromServer();
    this.categoryService.fetchCategoriesFromServer();
  }

  ngOnInit() {}
}
