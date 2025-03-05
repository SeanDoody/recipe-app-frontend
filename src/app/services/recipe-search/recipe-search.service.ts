import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.interface';
import { SearchEvent } from 'src/app/models/search-event.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeSearchService {
  private httpClient = inject(HttpClient);

  private appId = 'e553ac8f';
  private appKey = '9c3ee177f88bade1db44bab948fdd0bc';
  private apiUrl = 'https://api.edamam.com/api/recipes/v2';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Edamam-Account-User': 'sdoody95',
  });

  public getRecipes(searchEvent: SearchEvent): Observable<Recipe[]> {
    const source$ = this.httpClient.get<any>(this.apiUrl, {
      headers: this.headers,
      params: {
        app_id: this.appId,
        app_key: this.appKey,
        type: 'public',
        random: true,
        q: searchEvent.keywords,
        dishType: searchEvent.dishType,
        health: searchEvent.dietaryRestrictions,
      },
    });

    return source$.pipe(
      map((result) => {
        return result.hits.map((hit: any) => new Recipe('edamamApi', hit));
      }),
    );
  }

  public getRecipeByUri(recipeUri: string): Observable<Recipe> {
    const source$ = this.httpClient.get(`${this.apiUrl}/${recipeUri}`, {
      headers: this.headers,
      params: {
        app_id: this.appId,
        app_key: this.appKey,
        type: 'public',
      },
    });

    return source$.pipe(map((result) => new Recipe('edamamApi', result)));
  }
}
