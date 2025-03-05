import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { RecipeSearch } from 'src/app/models/recipe-search.interface';
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

  public recipeSearch$ = new BehaviorSubject<RecipeSearch>({
    keywords: null,
    dishType: null,
    glutenFree: null,
    vegan: null,
    vegetarian: null,
  });

  private searchEvent$ = this.recipeSearch$.pipe(
    map((search) => {
      const dietaryRestrictions: string[] = [];

      if (search.glutenFree) {
        dietaryRestrictions.push('gluten-free');
      }
      if (search.vegan) {
        dietaryRestrictions.push('vegan');
      }
      if (search.vegetarian) {
        dietaryRestrictions.push('vegetarian');
      }

      const searchEvent: SearchEvent = {
        keywords: search.keywords ?? '',
        dishType: search.dishType ?? [],
        dietaryRestrictions: dietaryRestrictions,
      };

      return searchEvent;
    }),
  );

  public spinWheel = signal(false);

  private recipes$ = this.searchEvent$.pipe(
    tap(() => this.spinWheel.set(true)),
    switchMap((searchEvent) =>
      this.getRecipes(searchEvent).pipe(
        tap(() => this.spinWheel.set(false)),
        catchError((error) => {
          this.spinWheel.set(false);
          console.error(error);
          return of(null);
        }),
      ),
    ),
    shareReplay(1),
  );

  public recipes = toSignal(this.recipes$);

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
