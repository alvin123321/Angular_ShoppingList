import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 3)
  ];

  getIngredient() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
    console.log(this.ingredients);
  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
