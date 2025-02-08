import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteRecipesComponent } from './components/favorite-recipes/favorite-recipes.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeSearchFormComponent } from './components/recipe-search-form/recipe-search-form.component';
import { SearchResultsComponent } from './components/recipe-search-results/recipe-search-results.component';
import { EdamamApiService } from './services/edamam-api/edamam-api.service';
import { FavoritesService } from './services/favorites/favorites.service';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteRecipesComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeSearchFormComponent,
    SearchResultsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [EdamamApiService, FavoritesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
