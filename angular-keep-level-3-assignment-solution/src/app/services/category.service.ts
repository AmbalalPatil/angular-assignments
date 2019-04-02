import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Category } from '../category';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  categories: Array<Category>;
  categoriesSubject: BehaviorSubject<Array<Category>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.categories = [];
    this.categoriesSubject = new BehaviorSubject(this.categories);
  }

  fetchCategoriesFromServer() {
    return this.httpClient.get<Array<Category>>(`http://localhost:8765/category-service/api/v1/category/all/${this.authService.getUserId()}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(categories => {
      this.categories = categories;
      this.categoriesSubject.next(this.categories);
    });
  }

  getCategories(): BehaviorSubject<Array<Category>> {
    return this.categoriesSubject;
  }

  addCategory(category: Category): Observable<Category> {
    category.categoryCreatedBy = this.authService.getUserId();
    return this.httpClient.post<Category>('http://localhost:8765/category-service/api/v1/category', category, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedCategory => {
      this.categories.push(addedCategory);
      this.categoriesSubject.next(this.categories);
    });
  }

  getCaytegoryById(categoryId): Category {
    const category = this.categories.find(categoryItem => categoryId == categoryItem.id);
    return Object.assign({}, category);
  }
}
