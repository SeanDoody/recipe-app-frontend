import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeSearchComponent {
  private recipeSearchService = inject(RecipeSearchService);
  private favoriteRecipesService = inject(FavoriteRecipesService);

  public readonly DishType = DishType;

  public searchForm = new FormGroup<RecipeSearchForm>({
    keywords: new FormControl(),
    dishType: new FormControl(),
    glutenFree: new FormControl(),
    vegan: new FormControl(),
    vegetarian: new FormControl(),
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
