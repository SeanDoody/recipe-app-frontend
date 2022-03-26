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
        totalTime: 0,
        dishType: [],
        yield: 0
    };

    constructor(private edamamApiService: EdamamApiService, private favoritesService: FavoritesService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.apiUri = this.route.snapshot.params.apiUri;
        this.getRecipeInfo();
    }

    getRecipeInfo(): void {
        this.edamamApiService.getRecipeByUri(this.apiUri).subscribe((data: any) => {
            this.currentRecipe = {
                name: data.recipe.label,
                apiUri: this.apiUri,
                apiUrl: data._links.self.href,
                sourceName: data.recipe.source,
                sourceUrl: data.recipe.url,
                imageUrl: data.recipe.image,
                cuisineType: data.recipe.cuisineType,
                healthLabels: data.recipe.healthLabels,
                ingredients: data.recipe.ingredientLines,
                totalTime: data.recipe.totalTime,
                dishType: data.recipe.dishType,
                yield: data.recipe.yield
            };
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