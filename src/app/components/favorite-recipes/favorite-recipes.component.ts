import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.scss'],
})
export class FavoriteRecipesComponent implements OnInit {
  public favoriteRecipes: Recipe[] = [];
  public noFavorites: boolean = true;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  private getFavorites(): void {
    this.favoriteRecipes = this.favoritesService.getFavorites();
    this.noFavorites = this.favoriteRecipes.length === 0;
  }

  public deleteFromFavorites(recipe: Recipe): void {
    this.favoritesService.deleteFromFavorites(recipe);
    this.getFavorites();
  }
}
