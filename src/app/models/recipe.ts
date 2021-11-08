export interface Recipe {
    recipeName: string;     // label
    cuisineType: string[];  // cuisineType
    healthLabels: string[]; // healthLabels
    imageUrl: string;       // image
    ingredients: string[];  // ingredientLines
    totalTime: number;      // totalTime
    url: string;            // url
    dishType: string[];     // dishType
    yield: number;          // yield
}