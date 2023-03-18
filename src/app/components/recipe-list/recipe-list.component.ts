import { Component, OnInit } from '@angular/core';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { Recipe } from 'src/app/models/recipe';
import { SearchService } from 'src/app/services/search/search.service';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: Recipe[] = [];

  constructor(private edamamApiService: EdamamApiService, private searchService: SearchService,
    private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.recipeList = this.searchService.getSearchResults();
  }

  updateRecipeList(apiData: any): void {
    this.recipeList = [];
    for (let hit of apiData.hits) {
      this.recipeList.push(new Recipe('edamamApi', hit));
    }
    this.searchService.setSearchResults(this.recipeList);
  }

  searchForRecipes(searchEvent: any): void {
    this.edamamApiService.getRecipes(searchEvent).subscribe((data: any) => {
      this.updateRecipeList(data);
    });
  }

  isRecipeSaved(apiUri: string) {
    return this.favoritesService.isRecipeSaved(apiUri);
  }

  async addToFavorites(recipe: Recipe) {
    await this.favoritesService.addToFavorites(recipe);
    await this.favoritesService.updateFavorites();
  }

  async deleteFromFavorites(apiUri: string) {
    await this.favoritesService.deleteFromFavorites(apiUri);
    await this.favoritesService.updateFavorites();
  }

}
