export interface Recipe {
    recipeName: string;     // hits[i].recipe.label
    recipeId: string;       // hits[i]._links.self.href.substring(38, 70);
    recipeLink: string;     // hits[i]._links.self.href
    source: string;         // hits[i].recipe.source
    cuisineType: string[];  // hits[i].recipe.cuisineType
    healthLabels: string[]; // hits[i].recipe.healthLabels
    imageUrl: string;       // hits[i].recipe.image
    ingredients: string[];  // hits[i].recipe.ingredientLines
    totalTime: number;      // hits[i].recipe.totalTime
    url: string;            // hits[i].recipe.url
    dishType: string[];     // hits[i].recipe.dishType
    yield: number;          // hits[i].recipe.yield
}