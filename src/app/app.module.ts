import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    EdamamApiService,
    FavoritesService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
