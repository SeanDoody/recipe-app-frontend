import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteRecipes: Recipe[] = [];

  public getFavorites(): Recipe[] {
    return this.favoriteRecipes;
  }

  public isRecipeSaved(apiUri: string): boolean {
    let recipeSaved: boolean = false;
    for (let recipe of this.favoriteRecipes) {
      if (recipe.apiUri === apiUri) {
        recipeSaved = true;
        break;
      }
    }
    return recipeSaved;
  }

  public addToFavorites(recipe: Recipe): void {
    console.log('add to favorites', recipe);
  }

  public deleteFromFavorites(recipe: Recipe): void {
    console.log('delete from favorites', recipe);
  }
}
