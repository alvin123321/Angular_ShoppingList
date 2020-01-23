import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-fcbec.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    if (this.authService.user.value) {
      return this.http
        .get<Recipe[]>(
          'https://ng-course-recipe-book-fcbec.firebaseio.com/recipes.json'
        )
        .pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredient: recipe.ingredient ? recipe.ingredient : []
              };
            });
          }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes);
          })
        );
    }
  }
}
