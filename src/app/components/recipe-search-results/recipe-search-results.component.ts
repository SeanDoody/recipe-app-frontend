import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.interface';
import { SearchEvent } from 'src/app/models/search-event.interface';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-recipe-search-results',
  templateUrl: './recipe-search-results.component.html',
  styleUrls: ['./recipe-search-results.component.scss'],
})
export class SearchResultsComponent {
  public recipes$: Observable<Recipe[]> | null = null;

  constructor(
    private edamamApiService: EdamamApiService,
    private favoritesService: FavoritesService
  ) {}

  public onSearch(searchEvent: SearchEvent): void {
    this.recipes$ = this.edamamApiService.getRecipes(searchEvent);
  }

  public isRecipeSaved(apiUri: string): boolean {
    return this.favoritesService.isRecipeSaved(apiUri);
  }

  public addToFavorites(recipe: Recipe): void {
    this.favoritesService.addToFavorites(recipe);
  }

  public deleteFromFavorites(recipe: Recipe): void {
    this.favoritesService.deleteFromFavorites(recipe);
  }
}
