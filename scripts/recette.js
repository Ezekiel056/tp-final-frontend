import RecipesManager from "./RecipesManager.js";

const recipeManager = new RecipesManager();

main(); // <-- Script starts here

function main() {
  const params = new URLSearchParams(window.location.search);
  const recipeName = params.get("name");
  if (recipeName) {
    const recipe = recipeManager.getRecipeByName(recipeName);
    console.log(recipe);
  }
}
