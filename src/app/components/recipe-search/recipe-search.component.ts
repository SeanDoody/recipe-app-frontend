import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
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

  public spinWheel = new BehaviorSubject<boolean>(false);

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
        this.spinWheel.next(true);
        const newEvent: SearchEvent = {
          keywords: formValue.keywords ?? '',
          dishType: formValue.dishType ?? [],
          dietaryRestrictions: dietaryRestrictions,
        };
        return newEvent;
      }
    }),
    tap(() =>
      setTimeout(() => {
        this.spinWheel.next(false);
      }, 1000),
    ),
  );

  public recipes$ = this.searchEvent$.pipe(
    switchMap((searchEvent) => {
      if (searchEvent) {
        return this.edamamApiService.getRecipes(searchEvent);
      }
      return of(null);
    }),
    startWith(null),
  );

  public viewModel$ = combineLatest([this.spinWheel, this.recipes$]).pipe(
    map(([spinWheel, recipes]) => ({ spinWheel, recipes })),
  );

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
