import { effect, Injectable, signal } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteRecipesService {
  private favoriteRecipesSignal = signal(
    this.getFavoriteRecipesFromLocalStorage(),
  );

  public favoriteRecipes = this.favoriteRecipesSignal.asReadonly();

  constructor() {
    effect(() => {
      const favoriteRecipes = this.favoriteRecipesSignal();
      console.log('favorites updated');
      console.log(favoriteRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    });
  }

  private getFavoriteRecipesFromLocalStorage(): Recipe[] {
    let favoriteRecipes: Recipe[] = [];
    const favoriteRecipesLocalStorage = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesLocalStorage) {
      favoriteRecipes = JSON.parse(favoriteRecipesLocalStorage);
    }
    return favoriteRecipes;
  }

  public isRecipeSaved(apiUri: string): boolean {
    let recipeSaved: boolean = false;
    for (let recipe of this.favoriteRecipesSignal()) {
      if (recipe.apiUri === apiUri) {
        recipeSaved = true;
        break;
      }
    }
    return recipeSaved;
  }

  public addToFavorites(newRecipe: Recipe): void {
    this.favoriteRecipesSignal.update((favoriteRecipes) => [
      ...favoriteRecipes,
      newRecipe,
    ]);
  }

  public deleteFromFavorites(recipeToDelete: Recipe): void {
    this.favoriteRecipesSignal.update((favoriteRecipes) =>
      favoriteRecipes.filter((recipe) => recipe !== recipeToDelete),
    );
  }
}
