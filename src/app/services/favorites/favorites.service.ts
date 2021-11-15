import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  favoriteRecipes: Recipe[] = [];

  constructor() { }

  isRecipeSaved(recipe: Recipe): boolean {
    let recipeSaved: boolean = false;
    let recipeLink: string = recipe.recipeLink;
    for (let savedRecipe of this.favoriteRecipes) {
      if (savedRecipe.recipeLink === recipeLink) {
        recipeSaved = true;
        break;
      }
    }
    return recipeSaved;
  }

  addToFavorites(recipe: Recipe): void {
    this.favoriteRecipes.push(recipe);
    console.log("favorite added");
    console.log(this.favoriteRecipes);
  }

  deleteFromFavorites(recipe: Recipe): void {
    const index = this.favoriteRecipes.findIndex(element => element === recipe);
    this.favoriteRecipes.splice(index, 1);
    console.log("favorite deleted");
    console.log(this.favoriteRecipes);
  }

  getFavoriteRecipes(): Recipe[] {
    console.log("favorites from service");
    console.log(this.favoriteRecipes);
    return this.favoriteRecipes;  
  }

}
