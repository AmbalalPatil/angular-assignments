import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';

import { Component } from '@angular/core/src/metadata/directives';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NotesService} from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RegisterComponent } from './register/register.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoryService } from './services/category.service';


const appRouts: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path: 'dashboard',
    component : DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: '',
        component: NoteViewComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    NoteTakerComponent,
    RegisterComponent,
    CategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forRoot(appRouts),
    ReactiveFormsModule
  ],
  providers: [
    NotesService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard,
    CategoryService
   ],
  bootstrap: [ AppComponent ],
  entryComponents: [ EditNoteViewComponent, CategoryDialogComponent ]
})
export class AppModule { }
