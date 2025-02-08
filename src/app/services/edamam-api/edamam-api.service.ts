import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.interface';
import { SearchEvent } from 'src/app/models/search-event.interface';

@Injectable({
  providedIn: 'root',
})
export class EdamamApiService {
  private httpClient = inject(HttpClient);

  private appId = 'e553ac8f';
  private appKey = '9c3ee177f88bade1db44bab948fdd0bc';
  private apiUrl = 'https://api.edamam.com/api/recipes/v2';

  public getRecipes(searchEvent: SearchEvent) {
    const source$ = this.httpClient.get<any>(this.apiUrl, {
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
      })
    );
  }

  public getRecipeByUri(recipeUri: string): Observable<Recipe> {
    const source$ = this.httpClient.get(`${this.apiUrl}/${recipeUri}`, {
      params: {
        app_id: this.appId,
        app_key: this.appKey,
        type: 'public',
      },
    });

    return source$.pipe(map((result) => new Recipe('edamamApi', result)));
  }
}
