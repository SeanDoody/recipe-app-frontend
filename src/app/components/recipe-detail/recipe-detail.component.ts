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
    });
  }

  isRecipeSaved(apiUri: string): boolean {
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
