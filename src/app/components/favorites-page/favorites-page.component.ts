import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {

  recipeList: Recipe[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    console.log("init FavoritesPageComponent");
    this.recipeList = this.favoritesService.getFavoriteRecipes();
    console.log(this.recipeList);
  }

  deleteFromFavorites(recipe: Recipe): void {
    this.favoritesService.deleteFromFavorites(recipe);
    this.recipeList = this.favoritesService.getFavoriteRecipes();
    console.log(this.recipeList);
  }

}
