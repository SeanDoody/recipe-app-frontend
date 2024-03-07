import { Component, OnInit } from '@angular/core';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.interface';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  private apiUri: string = '';
  private recipeSaved: boolean = false;
  public currentRecipe: Recipe = {
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
    yield: 0,
  };

  constructor(
    private edamamApiService: EdamamApiService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiUri = this.route.snapshot.params.apiUri;
    this.getRecipeInfo();
  }

  private getRecipeInfo(): void {
    this.edamamApiService.getRecipeByUri(this.apiUri).subscribe((data: any) => {
      this.currentRecipe = new Recipe('edamamApi', data);
    });
  }

  public isRecipeSaved(apiUri: string): boolean {
    return this.favoritesService.isRecipeSaved(apiUri);
  }

  public addToFavorites(recipe: Recipe) {
    this.favoritesService.addToFavorites(recipe);
  }

  public deleteFromFavorites(recipe: Recipe) {
    this.favoritesService.deleteFromFavorites(recipe);
  }
}
