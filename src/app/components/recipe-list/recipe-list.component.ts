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
        private searchService: SearchService, private favoritesService: FavoritesService) { }

    ngOnInit(): void {
        this.recipeList = this.searchService.getSearchResults();
    }

    updateRecipeList(apiData: any): void {
        this.recipeList = [];
        let newRecipe: Recipe;
        let newRecipeApiUrl: string = '';
        let newRecipeApiUri: string = '';
        for (let hit of apiData.hits) {
            newRecipeApiUrl = hit._links.self.href;
            newRecipeApiUri = newRecipeApiUrl.substring(38, 70);
            newRecipe = {
                name: hit.recipe.label,
                apiUri: newRecipeApiUri,
                apiUrl: newRecipeApiUrl,
                sourceName: hit.recipe.source,
                sourceUrl: hit.recipe.url,
                imageUrl: hit.recipe.image,
                cuisineType: hit.recipe.cuisineType,
                healthLabels: hit.recipe.healthLabels,
                ingredients: hit.recipe.ingredientLines,
                totalTime: hit.recipe.totalTime,
                dishType: hit.recipe.dishType,
                yield: hit.recipe.yield
            };
            this.recipeList.push(newRecipe);
        }
        this.searchService.setSearchResults(this.recipeList);
    }

    searchForRecipes(searchEvent: any): void {
        this.edamamApiService.getRecipes(searchEvent).subscribe((data: any) => {
            this.updateRecipeList(data);
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