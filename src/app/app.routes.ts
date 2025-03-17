import { Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { FavoriteRecipesComponent } from './components/favorite-recipes/favorite-recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'favorites', component: FavoriteRecipesComponent },
  { path: 'recipe/:apiUri', component: RecipeDetailComponent },
  { path: 'search', component: RecipeSearchComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: 'search' },
];
