import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { FavoriteRecipesService } from 'src/app/services/favorite-recipes/favorite-recipes.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.scss'],
  standalone: false,
})
export class FavoriteRecipesComponent implements OnInit {
  public favoriteRecipes: Recipe[] = [];
  public noFavorites: boolean = true;

  constructor(private favoriteRecipesService: FavoriteRecipesService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  private getFavorites(): void {
    this.favoriteRecipes = this.favoriteRecipesService.getFavorites();
    this.noFavorites = this.favoriteRecipes.length === 0;
  }

  public deleteFromFavorites(recipe: Recipe): void {
    this.favoriteRecipesService.deleteFromFavorites(recipe);
    this.getFavorites();
  }
}
