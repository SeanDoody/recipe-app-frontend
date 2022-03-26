export interface Recipe {
    name: string;           // hits[i].recipe.label (prev recipeName)
    apiUri: string;         // hits[i]._links.self.href.substring(38, 70) (prev recipeId)
    apiUrl: string;         // hits[i]._links.self.href (prev link)
    sourceName: string;     // hits[i].recipe.source (prev source)
    sourceUrl: string;      // hits[i].recipe.url (prev url)
    imageUrl: string;       // hits[i].recipe.image
    cuisineType: string[];  // hits[i].recipe.cuisineType
    healthLabels: string[]; // hits[i].recipe.healthLabels
    ingredients: string[];  // hits[i].recipe.ingredientLines
    totalTime: number;      // hits[i].recipe.totalTime
    dishType: string[];     // hits[i].recipe.dishType
    yield: number;          // hits[i].recipe.yield
}