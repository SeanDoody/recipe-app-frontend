import { Component, OnInit } from '@angular/core';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    apiUri: string = '';
    favoriteUris: string[] = [];
    recipeSaved: boolean = false;
    currentRecipe: Recipe = {
        name: '',
        apiUri: '',
        apiUrl: '',
        sourceName: '',
        sourceUrl: '',
        imageUrl: '',
        cuisineType: [],
        healthLabels: [],
        ingredients: [],
        dishType: [],
        totalTime: 0,
        yield: 0
    };

    constructor(private edamamApiService: EdamamApiService, private favoritesService: FavoritesService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.apiUri = this.route.snapshot.params.apiUri;
        this.getRecipeInfo();
    }

    getRecipeInfo(): void {
        this.edamamApiService.getRecipeByUri(this.apiUri).subscribe((data: any) => {
            this.currentRecipe = new Recipe('edamamApi', data);
            // this.currentRecipe = {
            //     name: data.recipe.label,
            //     apiUri: this.apiUri,
            //     apiUrl: data._links.self.href,
            //     sourceName: data.recipe.source,
            //     sourceUrl: data.recipe.url,
            //     imageUrl: data.recipe.image,
            //     cuisineType: data.recipe.cuisineType,
            //     healthLabels: data.recipe.healthLabels,
            //     ingredients: data.recipe.ingredientLines,
            //     dishType: data.recipe.dishType,
            //     totalTime: data.recipe.totalTime,
            //     yield: data.recipe.yield
            // };
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