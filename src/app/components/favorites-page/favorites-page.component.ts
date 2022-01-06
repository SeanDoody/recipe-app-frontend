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
  noFavorites: boolean = true;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    console.log("init FavoritesPageComponent");
    this.recipeList = this.favoritesService.getFavoriteRecipes();
    if (this.recipeList.length === 0) {
      this.noFavorites = true;
    } else {
      this.noFavorites = false;
    }
    console.log(this.recipeList);
  }

  deleteFromFavorites(recipe: Recipe): void {
    this.favoritesService.deleteFromFavorites(recipe);
    this.recipeList = this.favoritesService.getFavoriteRecipes();
    if (this.recipeList.length === 0) {
      this.noFavorites = true;
    } else {
      this.noFavorites = false;
    }
    console.log(this.recipeList);
  }

}
