import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      index => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    if (value.name !== '' && value.amount !== '') {
      const newIngredient = new Ingredient(value.name, value.amount);

      if (this.editMode) {
        this.shoppingListService.updateIngredient(
          this.editedItemIndex,
          newIngredient
        );
      } else {
        this.shoppingListService.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset();
      // (document.getElementById('addIngredient') as HTMLFormElement).reset();
    }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
