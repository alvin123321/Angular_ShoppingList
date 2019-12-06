import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  igChanged: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
    this.igChanged = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }

  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }
}
