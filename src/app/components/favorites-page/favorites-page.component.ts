import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {

    favoriteRecipes: Recipe[] = [];
    noFavorites: boolean = true;

    constructor(private favoritesService: FavoritesService) { }

    ngOnInit(): void {
        this.getFavorites();
    }

    async getFavorites(): Promise<any> {
        await this.favoritesService.updateFavorites();
        this.favoriteRecipes = this.favoritesService.getFavorites();
        this.noFavorites = this.favoriteRecipes.length === 0;
    }

    async deleteFromFavorites(apiUri: string) {
        await this.favoritesService.deleteFromFavorites(apiUri);
        await this.favoritesService.updateFavorites();
        this.getFavorites();
    }

}
