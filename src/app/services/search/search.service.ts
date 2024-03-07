import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResults: Recipe[] = [];

  public setSearchResults(recipeArray: Recipe[]): void {
    this.searchResults = recipeArray;
  }

  public getSearchResults(): Recipe[] {
    return this.searchResults;
  }
}
