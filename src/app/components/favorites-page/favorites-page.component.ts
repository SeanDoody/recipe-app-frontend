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
        this.updateFavoritesList();
    }

    updateFavoritesList(): void {
        this.favoritesService.getFavoriteRecipes().subscribe((data: any) => {
            this.favoriteRecipes = [];
            for (let record of data) {
                this.favoriteRecipes.push(new Recipe('favorites', record));
            }
            if (this.favoriteRecipes.length === 0) {
                this.noFavorites = true;
            } else {
                this.noFavorites = false;
            }
        });
    }

    deleteFromFavorites(apiUri: string): void {
        this.favoritesService.deleteFromFavorites(apiUri).subscribe(() => {
            console.log(`${apiUri} deleted from favorites`);
        });
        this.updateFavoritesList();
    }

}
