import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetail = this.recipeService.getRecipe(this.id - 1);
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipeDetail.ingredient
    );
    alert('Ingredient has been added into shopping cart');
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });

    // equalvalient to the below
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDelete() {
    const comfirm = confirm('You are about to delete a recipe!');
    if (comfirm === true) {
      this.recipeService.deleteRecipe(this.id - 1);
      this.router.navigate(['/recipes']);
    }
  }
}
