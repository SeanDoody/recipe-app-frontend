import { Component, OnInit } from '@angular/core';
import { EdamamApiService } from 'src/app/services/edamam-api/edamam-api.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: Recipe[] = [];
  favoriteRecipes: Recipe[] = [];

  constructor(private service: EdamamApiService) { }

  ngOnInit(): void {
    
  }

  updateRecipeList(apiData: any): void {
    this.recipeList = [];
    let newRecipe: Recipe;
    for (let hit of apiData.hits) {
      newRecipe = {
        recipeName: hit.recipe.label,
        recipeLink: hit._links.self.href,
        source: hit.recipe.source,  
        cuisineType: hit.recipe.cuisineType,
        healthLabels: hit.recipe.healthLabels,
        imageUrl: hit.recipe.image,
        ingredients: hit.recipe.ingredientLines,
        totalTime: hit.recipe.totalTime,
        url: hit.recipe.url,
        dishType: hit.recipe.dishType,
        yield: hit.recipe.yield
      };
      this.recipeList.push(newRecipe);
    }
    console.log("recipe list updated");
    console.log(this.recipeList);
  }

  searchForRecipes(searchEvent: any): void {
    this.service.getRecipes(searchEvent).subscribe((data: any) => {
      this.updateRecipeList(data);
      console.log("API data from new search:");
      console.log(data);
    })
  }

  isRecipeSaved(recipe: Recipe): boolean {
    let recipeSaved: boolean = false;
    let recipeLink: string = recipe.recipeLink;
    for (let savedRecipe of this.favoriteRecipes) {
      if (savedRecipe.recipeLink === recipeLink) {
        recipeSaved = true;
        break;
      }
    }
    return recipeSaved;
  }

  addToFavorites(recipe: Recipe): void {
    this.favoriteRecipes.push(recipe);
    console.log("favorite added");
    console.log(this.favoriteRecipes);
  }

  deleteFromFavorites(recipe: Recipe): void {
    const index = this.favoriteRecipes.findIndex(element => element === recipe);
    this.favoriteRecipes.splice(index, 1);
    console.log("favorite deleted");
    console.log(this.favoriteRecipes);
  }

}