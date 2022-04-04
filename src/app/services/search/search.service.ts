import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    searchResults: Recipe[] = [];

    constructor() { }

    setSearchResults(recipeArray: Recipe[]): void {
        this.searchResults = recipeArray;
    }

    getSearchResults(): Recipe[] {
        return this.searchResults;
    }

}
