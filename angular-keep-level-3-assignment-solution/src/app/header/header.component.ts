import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;

  switchToListView() {
    this.isNoteView = false;
  }

  switchToNoteView() {
    this.isNoteView = true;
  }
}
