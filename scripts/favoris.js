import RecipesManager from "./RecipesManager.js";
import Globals from "./Globals.js";

const recipesManager = new RecipesManager();
const recipesList = document.getElementById("recipes-list");

let recipes = [];

/*****************************************
 *******  Main function
 *****************************************/

main(); // <-- script starts here.

function main() {
  recipes = recipesManager.getFavoritesRecipes();
  if (recipes) {
    showRecipes();
  }
}

/*****************************************
 ******* Functions
 *****************************************/

function showRecipes() {
  // Si aucune recettes n'a été trouvées dans les favoris
  if (!recipes || recipes.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Vous n'avez aucune recettes en favoris !";
    p.classList.add("no-recipes");
    recipesList.before(p);
    return;
  }

  // on affiche les recettes trouvées
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
          <li class="tag category">${Globals.capitalize(recipe.category)}</li>
          <li class="tag duration">${recipe.duration} min</li>
          <li class="tag level">${Globals.capitalize(recipe.level)}</li>
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
