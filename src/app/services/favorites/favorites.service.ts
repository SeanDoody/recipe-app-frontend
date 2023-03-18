import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  // local
  // backendUrl: string = 'http://localhost:3000/favorite-recipes';

  // heroku
  backendUrl: string = 'https://recipe-roulette-backend.herokuapp.com/favorite-recipes';
  favoriteRecipes: Recipe[] = [];

  constructor(private http: HttpClient) {
    this.updateFavorites();
  }

  async updateFavorites() {
    let data: any = this.http.get(this.backendUrl);
    data = await lastValueFrom(data);
    this.favoriteRecipes = [];
    for (let record of data) {
      this.favoriteRecipes.push(new Recipe('favorites', record));
    }
  }

  getFavorites(): Recipe[] {
    return this.favoriteRecipes;
  }

  isRecipeSaved(apiUri: string): boolean {
    let recipeSaved: boolean = false;
    for (let recipe of this.favoriteRecipes) {
      if (recipe.apiUri === apiUri) {
        recipeSaved = true;
        break;
      }
    }
    return recipeSaved;
  }

  async addToFavorites(recipe: Recipe) {
    let data: any = this.http.post<Recipe>(this.backendUrl, recipe);
    data = await lastValueFrom(data);
  }

  async deleteFromFavorites(apiUri: string) {
    let data: any = this.http.delete(`${this.backendUrl}/${apiUri}`);
    data = await lastValueFrom(data);
  }

}
