import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-recipe-search-results',
  templateUrl: './recipe-search-results.component.html',
  styleUrls: ['./recipe-search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  public recipeList: Recipe[] = [];

  constructor(
    private edamamApiService: EdamamApiService,
    private searchService: SearchService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.recipeList = this.searchService.getSearchResults();
  }

  private updateRecipeList(apiData: any): void {
    this.recipeList = [];
    for (let hit of apiData.hits) {
      this.recipeList.push(new Recipe('edamamApi', hit));
    }
    this.searchService.setSearchResults(this.recipeList);
  }

  public searchForRecipes(searchEvent: any): void {
    this.edamamApiService.getRecipes(searchEvent).subscribe((data: any) => {
      this.updateRecipeList(data);
    });
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
