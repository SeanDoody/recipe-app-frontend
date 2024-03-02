import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { SearchCriteriaComponent } from './components/search-criteria/search-criteria.component';
import { EdamamApiService } from './services/edamam-api/edamam-api.service';
import { FavoritesService } from './services/favorites/favorites.service';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesPageComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    SearchCriteriaComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [
    EdamamApiService,
    FavoritesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
