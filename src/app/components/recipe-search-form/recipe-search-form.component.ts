import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeSearchForm } from 'src/app/models/recipe-search-form.interface';
import { SearchEvent } from 'src/app/models/search-event.interface';

@Component({
  selector: 'app-recipe-search-form',
  templateUrl: './recipe-search-form.component.html',
  styleUrls: ['./recipe-search-form.component.scss'],
})
export class RecipeSearchFormComponent {
  @Output() newSearchEvent = new EventEmitter<SearchEvent>();

  public searchForm = new FormGroup<RecipeSearchForm>({
    keywords: new FormControl(),
    dishType: new FormControl(),
    glutenFree: new FormControl(),
    vegan: new FormControl(),
    vegetarian: new FormControl(),
  });
  public spinWheel: boolean = false;

  public onSubmit(): void {
    const formValue = this.searchForm.value;
    const dietaryRestrictions = [];

    if (formValue.glutenFree) {
      dietaryRestrictions.push('gluten-free');
    }
    if (formValue.vegan) {
      dietaryRestrictions.push('vegan');
    }
    if (formValue.vegetarian) {
      dietaryRestrictions.push('vegetarian');
    }
    if (
      formValue.keywords === '' &&
      formValue.dishType?.length === 0 &&
      dietaryRestrictions.length === 0
    ) {
      alert('At least one criteria must be chosen to search.');
    } else {
      this.spinWheel = true;
      const newEvent: SearchEvent = {
        keywords: formValue.keywords ?? '',
        dishType: formValue.dishType ?? [],
        dietaryRestrictions: dietaryRestrictions,
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
