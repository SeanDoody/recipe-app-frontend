import { Component, OnInit } from '@angular/core';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeId: string = "";
  recipeSaved: boolean = false;
  currentRecipe: Recipe = {
    recipeName: "",
    recipeId: "",
    recipeLink: "",
    source: "",  
    cuisineType: [],
    healthLabels: [],
    imageUrl: "",
    ingredients: [],
    totalTime: 0,
    url: "",
    dishType: [],
    yield: 0
  };

  constructor(private edamamApiService: EdamamApiService, private favoritesService: FavoritesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params.recipeId;
    this.getRecipeInfo();
  }

  getRecipeInfo(): void {
    this.edamamApiService.getRecipeById(this.recipeId).subscribe((data: any) => {
      console.log(data);
      this.currentRecipe = {
        recipeName: data.recipe.label,
        recipeId: this.recipeId,
        recipeLink: data._links.self.href,
        source: data.recipe.source,  
        cuisineType: data.recipe.cuisineType,
        healthLabels: data.recipe.healthLabels,
        imageUrl: data.recipe.image,
        ingredients: data.recipe.ingredientLines,
        totalTime: data.recipe.totalTime,
        url: data.recipe.url,
        dishType: data.recipe.dishType,
        yield: data.recipe.yield
      };
      console.log(this.currentRecipe);
    })
  }

  isRecipeSaved(recipe: Recipe): boolean {
    return this.favoritesService.isRecipeSaved(recipe);
  }

  addToFavorites(recipe: Recipe): void {
    this.favoritesService.addToFavorites(recipe);
  }

  deleteFromFavorites(recipe: Recipe): void {
    this.favoritesService.deleteFromFavorites(recipe);
  }

}