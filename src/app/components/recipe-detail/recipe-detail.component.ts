import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.interface';
import { FavoriteRecipesService } from 'src/app/services/favorite-recipes/favorite-recipes.service';
import { RecipeSearchService } from 'src/app/services/recipe-search/recipe-search.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  private recipeSearchService = inject(RecipeSearchService);
  private favoriteRecipesService = inject(FavoriteRecipesService);
  private route = inject(ActivatedRoute);

  private apiUri: string = this.route.snapshot.params.apiUri;

  private recipe$: Observable<Recipe> = this.recipeSearchService.getRecipeByUri(
    this.apiUri,
  );

  public recipe = toSignal(this.recipe$);

  public isRecipeSaved(apiUri: string): boolean {
    return this.favoriteRecipesService.isRecipeSaved(apiUri);
  }

  public addToFavorites(recipe: Recipe): void {
    this.favoriteRecipesService.addToFavorites(recipe);
  }

  public deleteFromFavorites(recipe: Recipe): void {
    this.favoriteRecipesService.deleteFromFavorites(recipe);
  }
}
