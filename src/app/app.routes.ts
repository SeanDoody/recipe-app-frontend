import { Routes } from '@angular/router';
import { FavoriteRecipesComponent } from './components/favorite-recipes/favorite-recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';

export const routes: Routes = [
  { path: 'search', component: RecipeSearchComponent },
  { path: 'recipe/:apiUri', component: RecipeDetailComponent },
  { path: 'favorites', component: FavoriteRecipesComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: 'search' },
];
