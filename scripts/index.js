import RecipesManager from "./RecipesManager.js";
import Globals from "./Globals.js";

/*
 ******* GLOBALS VARIABLES ***************
 */
const recipesManager = new RecipesManager();
let recipes = recipesManager.recipes;

/*
 ******* DOM ELEMENTS *******************
 */
const btnSearch = document.getElementById("search-recipe-btn");
const recipesList = document.getElementById("recipes-list");

/*
  START SCRIPT
*/
Globals.getUserPreferences();

function filterRecipes(e = null) {
  e.preventDefault();

  let formData = new FormData(document.getElementById("search-form"));
  let searchtext = formData.get("search-text-input");
  let filterCategory = formData.getAll("category");
  let filterDuration = formData.getAll("duration");
  let filterLevel = formData.getAll("level");

  recipes = recipesManager.filterRecipes(
    filterCategory,
    filterDuration,
    filterLevel,
    searchtext,
  );

  refreshList();
}

function refreshList() {
  clearRecipesList();
  generateRecipesList();
}

function clearRecipesList() {
  recipesList.innerHTML = "";
}

function generateRecipesList() {
  recipes.forEach((recipe) => {
    recipesList.innerHTML += `
  <article class="recipe card">
    <img
      src="/assets/images/${capitalize(recipe.image)}"
      alt="une image de ${recipe.name}"
    />
    <div class="recipe-content">
      <h2>${recipe.name}</h2>
      <div class="tags-list">
        <ul>
          <li class="tag orange">${capitalize(recipe.category)}</li>
          <li class="tag green">${recipe.duration} min</li>
          <li class="tag blue">${capitalize(recipe.level)}</li>
        </ul>
      </div>
      <button class="primary">Voir la recette</button>
    </div>
    </article>
`;
  });
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
refreshList();
window.addEventListener("DOMContentLoaded", () => {
  btnSearch.addEventListener("click", filterRecipes);

  const filters = document.querySelector(".filters-container");
  filters.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      filterRecipes(e);
    }
  });
});
