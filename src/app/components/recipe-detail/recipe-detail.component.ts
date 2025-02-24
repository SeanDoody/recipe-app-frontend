import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.interface';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { FavoriteRecipesService } from 'src/app/services/favorite-recipes/favorite-recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: false,
})
export class RecipeDetailComponent {
  private apiUri: string;
  public recipe$: Observable<Recipe>;

  constructor(
    private edamamApiService: EdamamApiService,
    private favoriteRecipesService: FavoriteRecipesService,
    private route: ActivatedRoute,
  ) {
    this.apiUri = this.route.snapshot.params.apiUri;
    this.recipe$ = this.edamamApiService.getRecipeByUri(this.apiUri);
  }

  public isRecipeSaved(apiUri: string): boolean {
    return this.favoriteRecipesService.isRecipeSaved(apiUri);
  }

  public addToFavorites(recipe: Recipe) {
    this.favoriteRecipesService.addToFavorites(recipe);
  }

  public deleteFromFavorites(recipe: Recipe) {
    this.favoriteRecipesService.deleteFromFavorites(recipe);
  }
}
