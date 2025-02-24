import { Component, inject } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { FavoriteRecipesService } from 'src/app/services/favorite-recipes/favorite-recipes.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.scss'],
  standalone: false,
})
export class FavoriteRecipesComponent {
  private favoriteRecipesService = inject(FavoriteRecipesService);

  public favoriteRecipes = this.favoriteRecipesService.favoriteRecipes;

  public deleteFromFavorites(recipe: Recipe): void {
    this.favoriteRecipesService.deleteFromFavorites(recipe);
  }
}
