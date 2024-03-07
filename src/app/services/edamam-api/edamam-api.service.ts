import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.interface';
import { SearchEvent } from 'src/app/models/search-event.interface';

@Injectable({
  providedIn: 'root',
})
export class EdamamApiService {
  // temporarily disable
  appId: string = '';
  appKey: string = '';
  edamamUrl: string = '';

  //   appId: string = 'e553ac8f';
  //   appKey: string = '4a65f97aed92762ca9818cfaef595dcf';
  //   edamamUrl: string = 'https://api.edamam.com/api/recipes/v2';

  constructor(private httpClient: HttpClient) {}

  public getRecipes(searchEvent: SearchEvent) {
    const source$ = this.httpClient.get<any>(this.edamamUrl, {
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

  public getRecipeByUri(recipeUri: string): Observable<Object> {
    const source$ = this.httpClient.get(`${this.edamamUrl}/${recipeUri}`, {
      params: {
        app_id: this.appId,
        app_key: this.appKey,
        type: 'public',
      },
    });

    return source$;
  }
}
