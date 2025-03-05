import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  private edamamApiService = inject(EdamamApiService);
  private favoriteRecipesService = inject(FavoriteRecipesService);
  private route = inject(ActivatedRoute);

  private apiUri: string = this.route.snapshot.params.apiUri;

  private recipe$: Observable<Recipe> = this.edamamApiService.getRecipeByUri(
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
