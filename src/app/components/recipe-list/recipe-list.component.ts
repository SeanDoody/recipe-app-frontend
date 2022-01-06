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

  constructor(private edamamApiService: EdamamApiService, 
    private searchService: SearchService, private favoritesService: FavoritesService ) { }

  ngOnInit(): void {
    console.log("init RecipeListComponent");
    this.recipeList = this.searchService.getSearchResults();
  }

  updateRecipeList(apiData: any): void {
    this.recipeList = [];
    let newRecipe: Recipe;
    let newRecipeLink: string = "";
    let newRecipeId: string = "";

    for (let hit of apiData.hits) {

      newRecipeLink = hit._links.self.href;
      newRecipeId = newRecipeLink.substring(38, 70);

      newRecipe = {
        recipeName: hit.recipe.label,
        recipeId: newRecipeId,
        recipeLink: newRecipeLink,
        source: hit.recipe.source,  
        cuisineType: hit.recipe.cuisineType,
        healthLabels: hit.recipe.healthLabels,
        imageUrl: hit.recipe.image,
        ingredients: hit.recipe.ingredientLines,
        totalTime: hit.recipe.totalTime,
        url: hit.recipe.url,
        dishType: hit.recipe.dishType,
        yield: hit.recipe.yield
      };

      this.recipeList.push(newRecipe);

    }

    this.searchService.setSearchResults(this.recipeList);
    console.log("recipe list updated");
    console.log(this.recipeList);
    
  }

  searchForRecipes(searchEvent: any): void {
    this.edamamApiService.getRecipes(searchEvent).subscribe((data: any) => {
      this.updateRecipeList(data);
      console.log("API data from new search:");
      console.log(data);
    })
  }

  isRecipeSaved(recipe: Recipe): boolean {
    return this.favoritesService.isRecipeSaved(recipe);
  }

  addToFavorites(recipe: Recipe): void {
    this.favoritesService.addToFavorites(recipe);
  }

  deleteFromFavorites(recipe: Recipe): void {
    this.favoritesService.deleteFromFavorites(recipe);
  }

}