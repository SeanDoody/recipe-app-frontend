import { KeyValuePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { DishType } from 'src/app/models/dish-type.enum';
import {
  RecipeSearch,
  RecipeSearchForm,
} from 'src/app/models/recipe-search.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { FavoriteRecipesService } from 'src/app/services/favorite-recipes/favorite-recipes.service';
import { RecipeSearchService } from 'src/app/services/recipe-search/recipe-search.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatCheckbox,
    NgClass,
    RouterLink,
    MatIcon,
    KeyValuePipe,
  ],
})
export class RecipeSearchComponent {
  private recipeSearchService = inject(RecipeSearchService);
  private favoriteRecipesService = inject(FavoriteRecipesService);

  public readonly DishType = DishType;

  private previousSearch = this.recipeSearchService.recipeSearch$.value;

  public searchForm = new FormGroup<RecipeSearchForm>({
    keywords: new FormControl(this.previousSearch.keywords),
    dishType: new FormControl(this.previousSearch.dishType),
    glutenFree: new FormControl(this.previousSearch.glutenFree),
    vegan: new FormControl(this.previousSearch.vegan),
    vegetarian: new FormControl(this.previousSearch.vegetarian),
  });

  public onFormSubmit(): void {
    // To-Do: replace with custom validator

    const formValue = this.searchForm.value;

    const hasDietaryRestrictions =
      !!formValue.glutenFree || !!formValue.vegan || !!formValue.vegetarian;

    if (
      formValue.keywords === '' &&
      formValue.dishType?.length === 0 &&
      !hasDietaryRestrictions
    ) {
      alert('At least one criteria must be chosen to search.');
    } else {
      const recipeSearch: RecipeSearch = {
        keywords: formValue.keywords ?? '',
        dishType: formValue.dishType ?? [],
        glutenFree: !!formValue.glutenFree,
        vegan: !!formValue.vegan,
        vegetarian: !!formValue.vegetarian,
      };
      this.recipeSearchService.recipeSearch$.next(recipeSearch);
    }
  }

  public recipes = this.recipeSearchService.recipes;

  public spinWheel = this.recipeSearchService.spinWheel;

  public isRecipeSaved(apiUri: string): boolean {
    return this.favoriteRecipesService.isRecipeSaved(apiUri);
  }

  public addToFavorites(recipe: Recipe): void {
    this.favoriteRecipesService.addToFavorites(recipe);
  }

  public deleteFromFavorites(recipe: Recipe): void {
    this.favoriteRecipesService.deleteFromFavorites(recipe);
  }
}
