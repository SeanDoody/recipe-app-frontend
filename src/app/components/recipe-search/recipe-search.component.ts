import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import {
  catchError,
  delay,
  filter,
  map,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { DishType } from 'src/app/models/dish-type.enum';
import { RecipeSearchForm } from 'src/app/models/recipe-search-form.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { SearchEvent } from 'src/app/models/search-event.interface';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { FavoriteRecipesService } from 'src/app/services/favorite-recipes/favorite-recipes.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
  standalone: false,
})
export class RecipeSearchComponent {
  private edamamApiService = inject(EdamamApiService);
  private favoriteRecipesService = inject(FavoriteRecipesService);

  public readonly DishType = DishType;

  public spinWheel = signal(false);

  public searchForm = new FormGroup<RecipeSearchForm>({
    keywords: new FormControl(),
    dishType: new FormControl(),
    glutenFree: new FormControl(),
    vegan: new FormControl(),
    vegetarian: new FormControl(),
  });

  public formSubmit = new Subject<void>();

  private searchEvent$ = this.formSubmit.pipe(
    map(() => {
      const formValue = this.searchForm.value;
      const dietaryRestrictions = [];

      if (formValue.glutenFree) {
        dietaryRestrictions.push('gluten-free');
      }
      if (formValue.vegan) {
        dietaryRestrictions.push('vegan');
      }
      if (formValue.vegetarian) {
        dietaryRestrictions.push('vegetarian');
      }

      // To-Do: replace with custom validator
      if (
        formValue.keywords === '' &&
        formValue.dishType?.length === 0 &&
        dietaryRestrictions.length === 0
      ) {
        alert('At least one criteria must be chosen to search.');
        return null;
      } else {
        this.spinWheel.set(true);
        const newEvent: SearchEvent = {
          keywords: formValue.keywords ?? '',
          dishType: formValue.dishType ?? [],
          dietaryRestrictions: dietaryRestrictions,
        };
        return newEvent;
      }
    }),
    delay(1000),
    tap(() => this.spinWheel.set(false)),
  );

  private recipes$ = this.searchEvent$.pipe(
    filter((searchEvent) => !!searchEvent),
    tap(() => this.spinWheel.set(true)),
    switchMap((searchEvent) =>
      this.edamamApiService.getRecipes(searchEvent).pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
        tap(() => this.spinWheel.set(false)),
      ),
    ),
    startWith(null),
  );

  public recipes = toSignal(this.recipes$);

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
