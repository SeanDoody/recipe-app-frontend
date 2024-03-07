import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.interface';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  private apiUri: string;
  public recipe$: Observable<Recipe>;

  constructor(
    private edamamApiService: EdamamApiService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute
  ) {
    this.apiUri = this.route.snapshot.params.apiUri;
    this.recipe$ = this.edamamApiService.getRecipeByUri(this.apiUri);
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
