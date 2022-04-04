import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    // local
    // backendUrl: string = 'http://localhost:3000/favorite-recipes';

    // heroku
    backendUrl: string = 'https://recipe-roulette-backend.herokuapp.com/favorite-recipes';

    constructor(private http: HttpClient) { }

    getFavoriteRecipes(): Observable<any> {
        return this.http.get<any>(this.backendUrl);
    }

    addToFavorites(recipe: Recipe): Observable<any> {
        return this.http.post<Recipe>(this.backendUrl, recipe);
    }

    deleteFromFavorites(apiUri: string): Observable<any> {
        return this.http.delete(`${this.backendUrl}/${apiUri}`);
    }

}
