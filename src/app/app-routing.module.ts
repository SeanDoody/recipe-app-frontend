import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

const routes: Routes = [
    { path: 'search', component: RecipeListComponent },
    { path: 'search/:recipeId', component: RecipeDetailComponent },
    { path: 'favorites', component: FavoritesPageComponent },
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: '**', redirectTo: 'search' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }