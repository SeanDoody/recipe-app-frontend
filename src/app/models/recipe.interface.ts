export interface IRecipe {
  name: string;
  apiUri: string;
  apiUrl: string;
  sourceName: string;
  sourceUrl: string;
  imageUrl: string;
  cuisineType: string[];
  healthLabels: string[];
  ingredients: string[];
  dishType: string[];
  totalTime: number;
  yield: number;
}

export class Recipe implements IRecipe {
  name: string;
  apiUri: string;
  apiUrl: string;
  sourceName: string;
  sourceUrl: string;
  imageUrl: string;
  cuisineType: string[];
  healthLabels: string[];
  ingredients: string[];
  dishType: string[];
  totalTime: number;
  yield: number;

  constructor(source: string, data: any) {
    if (source === 'favorites') {
      this.name = data.name;
      this.apiUri = data.api_uri;
      this.apiUrl = data.api_url;
      this.sourceName = data.source_name;
      this.sourceUrl = data.source_url;
      this.imageUrl = data.image_url;
      this.cuisineType = data.cuisine_type;
      this.healthLabels = data.health_labels;
      this.ingredients = data.ingredients;
      this.dishType = data.dish_type;
      this.totalTime = data.total_time;
      this.yield = data.yield;
    } else {
      // source === 'edamamApi'
      this.name = data.recipe.label;
      this.apiUri = data._links.self.href.substring(38, 70);
      this.apiUrl = data._links.self.href;
      this.sourceName = data.recipe.source;
      this.sourceUrl = data.recipe.url;
      this.imageUrl = data.recipe.image;
      this.cuisineType = data.recipe.cuisineType;
      this.healthLabels = data.recipe.healthLabels;
      this.ingredients = data.recipe.ingredientLines;
      this.dishType = data.recipe.dishType;
      this.totalTime = data.recipe.totalTime;
      this.yield = data.recipe.yield;
    }
  }
}
