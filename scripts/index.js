import RecipesManager from "./RecipesManager.js";

/*****************************************
 ******* GLOBALS VARIABLES
 *****************************************/
const recipesManager = new RecipesManager();
let recipes = recipesManager.recipes;

/*****************************************
 ******* DOM ELEMENTS
 *****************************************/

// ---- Buttons :
const btnSearch = document.getElementById("search-recipe-btn");

// ---- Recipies container :
const recipesList = document.getElementById("recipes-list");

/*****************************************
 ******* START SCRIPT
 *****************************************/

main(); // <-- script starts here

/*****************************************
 ******* FUNCTIONS
 *****************************************/
function main() {
  refreshList(); // <- first render of recipes
}

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

/*****************************************
 ******* Generate recipe list from recipes array
 *****************************************/
function generateRecipesList() {
  recipes.forEach((recipe) => {
    recipesList.innerHTML += `
  <article class="recipe card" tabindex="0" aria-label="${recipe.name}">
  <button type="button" class="favorite no-hover ${recipe.favorite ? "is-favorite" : ""}" data-name="${recipe.name}" tabindex="0" aria-label="Ajouter ${recipe.name} aux favoris">
      <img src="./assets/icons/favorite.png" alt="Icone favoris"/>
  </button>
    <img
      src="./assets/images/${recipe.image}"
      alt="une image de ${recipe.name}"
    />
    <div class="recipe-content">
      <h2>${recipe.name}</h2>
      <div class="tags-list">
        <ul>
          <li class="tag category">${capitalize(recipe.category)}</li>
          <li class="tag duration">${recipe.duration} min</li>
          <li class="tag level">${capitalize(recipe.level)}</li>
        </ul>
      </div>
      <a href="recette.html?name=${recipe.name}" class="buttonlink primary" aria-label="Afficher la recette de ${recipe.name}">Voir la recette</a>
    </div>
    </article>
`;
  });

  // Add clic event on each Favorite ---------------------------------------
  const favButtons = recipesList.querySelectorAll(".favorite");
  for (const elem of favButtons) {
    if (elem) {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        if (recipesManager.toggleFavorite(elem.getAttribute("data-name"))) {
          // refreshList(); // ne pas rafraichir la liste permet de conserver la navigation tab pour accessiblité ..
          elem.classList.toggle("is-favorite");
        }
      });
    }
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/*****************************************
 ******* WHEN ALL DOM ELEMENTS ARE LOADED
 *****************************************/

window.addEventListener("DOMContentLoaded", () => {
  /*****************************************
   ******* EVENT LISTENERS
   *****************************************/

  btnSearch.addEventListener("click", filterRecipes);
  const filters = document.querySelector(".filters-container");
  filters.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      filterRecipes(e);
    }
  });
});
