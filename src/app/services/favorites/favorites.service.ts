import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteRecipes: Recipe[];

  constructor() {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      this.favoriteRecipes = JSON.parse(favoriteRecipes);
    } else {
      this.favoriteRecipes = [];
    }
  }

  private setFavorites(): void {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(this.favoriteRecipes)
    );
  }

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
    this.favoriteRecipes.push(recipe);
    this.setFavorites();
  }

  public deleteFromFavorites(recipe: Recipe): void {
    const index = this.favoriteRecipes.findIndex(
      (r) => r.apiUri === recipe.apiUri
    );

    if (index >= 0) {
      this.favoriteRecipes.splice(index, 1);
      this.setFavorites();
    }
  }
}
