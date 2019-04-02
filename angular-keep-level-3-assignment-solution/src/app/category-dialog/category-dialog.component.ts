import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent {

  category: Category;
  errMessage: string;

  constructor(private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryService) {
      this.category = new Category();
  }

  onCategorySave() {
    this.categoryService.addCategory(this.category).subscribe(
      data => {
        this.dialogRef.close();
      },
      err => {
        this.errMessage = err.message;
      }
    );
  }

}
