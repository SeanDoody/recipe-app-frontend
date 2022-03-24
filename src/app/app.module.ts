import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCriteriaComponent } from './components/search-criteria/search-criteria.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { EdamamApiService } from './services/edamam-api/edamam-api.service';
import { FavoritesService } from './services/favorites/favorites.service';
import { HeaderComponent } from './components/header/header.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        AppComponent,
        SearchCriteriaComponent,
        RecipeListComponent,
        FavoritesPageComponent,
        HeaderComponent,
        RecipeDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCheckboxModule
    ],
    providers: [
        EdamamApiService,
        FavoritesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
