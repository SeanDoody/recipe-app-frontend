import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchEvent } from 'src/app/models/search-event';

@Component({
  selector: 'app-recipe-search-form',
  templateUrl: './recipe-search-form.component.html',
  styleUrls: ['./recipe-search-form.component.scss'],
})
export class RecipeSearchFormComponent implements OnInit {
  @Output() newSearchEvent = new EventEmitter<SearchEvent>();

  keywords: string = '';
  dishType: string[] = [];
  dietaryRestrictions: string[] = [];
  glutenFree: boolean = false;
  vegan: boolean = false;
  vegetarian: boolean = false;
  spinWheel: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  newSearch(): void {
    this.dietaryRestrictions = [];
    if (this.glutenFree) {
      this.dietaryRestrictions.push('gluten-free');
    }
    if (this.vegan) {
      this.dietaryRestrictions.push('vegan');
    }
    if (this.vegetarian) {
      this.dietaryRestrictions.push('vegetarian');
    }
    if (
      this.keywords === '' &&
      this.dishType.length === 0 &&
      this.dietaryRestrictions.length === 0
    ) {
      alert('At least one criteria must be chosen to search.');
    } else {
      this.spinWheel = true;
      const newEvent: SearchEvent = {
        keywords: this.keywords,
        dishType: this.dishType,
        dietaryRestrictions: this.dietaryRestrictions,
      };
      setTimeout(() => {
        this.newSearchEvent.emit(newEvent);
      }, 1000);
      setTimeout(() => {
        this.spinWheel = false;
      }, 1000);
    }
  }
}
