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
    favoriteUris: string[] = [];

    constructor(private edamamApiService: EdamamApiService, private searchService: SearchService,
        private favoritesService: FavoritesService) { }

    ngOnInit(): void {
        this.updateFavoriteUris();
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

    updateFavoriteUris(): void {
        this.favoritesService.getFavoriteRecipes().subscribe((data: any) => {
            this.favoriteUris = [];
            for (let record of data) {
                this.favoriteUris.push(record.api_uri);
            }
        });
    }

    isRecipeSaved(apiUri: string): boolean {
        let recipeSaved: boolean = false;
        for (let favoriteUri of this.favoriteUris) {
            if (favoriteUri === apiUri) {
                recipeSaved = true;
                break;
            }
        }
        return recipeSaved;
    }

    addToFavorites(recipe: Recipe): void {
        this.favoritesService.addToFavorites(recipe).subscribe((data: any) => {
            console.log(`${recipe.apiUri} added to favorites`);
        });
        this.updateFavoriteUris();
    }

    deleteFromFavorites(apiUri: string): void {
        this.favoritesService.deleteFromFavorites(apiUri).subscribe(() => {
            console.log(`${apiUri} deleted from favorites`);
        });
        this.updateFavoriteUris();
    }

}