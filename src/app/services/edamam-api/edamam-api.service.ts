import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchEvent } from 'src/app/models/search-event';

@Injectable({
  providedIn: 'root'
})
export class EdamamApiService {

  appId: string = 'e553ac8f';
  appKey: string = '4a65f97aed92762ca9818cfaef595dcf';
  edamamUrl: string = 'https://api.edamam.com/api/recipes/v2';

  constructor(private http: HttpClient) { }

  getRecipes(searchEvent: SearchEvent): any {
    return this.http.get(this.edamamUrl, {
      params: {
        app_id: this.appId,
        app_key: this.appKey,
        type: 'public',
        random: true,
        q: searchEvent.keywords,
        dishType: searchEvent.dishType,
        health: searchEvent.dietaryRestrictions
      }
    });
  }

  getRecipeByUri(recipeUri: string): any {
    return this.http.get(`${this.edamamUrl}/${recipeUri}`, {
      params: {
        app_id: this.appId,
        app_key: this.appKey,
        type: 'public'
      }
    });
  }

}
