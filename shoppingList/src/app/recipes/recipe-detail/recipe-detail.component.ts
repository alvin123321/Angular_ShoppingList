import { RecipeService } from './../recipe.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetail: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipeDetail.ingerdient
    );
  }
}
