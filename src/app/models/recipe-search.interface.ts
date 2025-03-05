import { FormControl } from '@angular/forms';
import { DishType } from './dish-type.enum';

export interface RecipeSearch {
  keywords: string | null;
  dishType: DishType[] | null;
  glutenFree: boolean | null;
  vegan: boolean | null;
  vegetarian: boolean | null;
}

export interface RecipeSearchForm {
  keywords: FormControl<string | null>;
  dishType: FormControl<DishType[] | null>;
  glutenFree: FormControl<boolean | null>;
  vegan: FormControl<boolean | null>;
  vegetarian: FormControl<boolean | null>;
}
