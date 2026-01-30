import RecipesManager from "./RecipesManager.js";
import Globals from "./Globals.js";

const recipeManager = new RecipesManager();
const recipeContainer = document.getElementById("recipe-article");

main(); // <-- Script starts here

function main() {
  const params = new URLSearchParams(window.location.search);
  const recipeName = params.get("name");
  if (recipeName) {
    const recipe = recipeManager.getRecipeByName(recipeName);

    if (showRecipe(recipe)) {
      const btnFav = document.getElementById("btn-add-to-favorites");
      if (!btnFav) return;

      btnFav.addEventListener("click", () => {
        console.log(recipe);
        if (recipeManager.toggleFavorite(recipe.name)) {
          btnFav.remove();
        }
      });
    }
  }
}

function showRecipe(recipe) {
  if (recipe) {
    document.title = `GourmeTech - ${recipe.name}`;
    recipeContainer.innerHTML = `<img
      src="assets/images/${recipe.image}"
      alt="image de ${recipe.name}"
    />
    <h1>Recette de <span class="recipe-name">${recipe.name}</span></h1>
    <div class="user-note no-print">
      <div class="stars">
      
        <i class="fa-solid fa-star ${recipe.rating >= 1 ? "active" : ""}"></i>
        <i class="fa-solid fa-star ${recipe.rating >= 2 ? "active" : ""}"></i>
        <i class="fa-solid fa-star ${recipe.rating >= 3 ? "active" : ""}"></i>
        <i class="fa-solid fa-star ${recipe.rating >= 4 ? "active" : ""}"></i>
        <i class="fa-solid fa-star ${recipe.rating >= 5 ? "active" : ""}"></i>
      </div>
    </div>
    <div>
      <ul class="tags-list">
        <li tabindex="0" class="tag category" aria-label="Type de recette : ${recipe.category}">${Globals.capitalize(recipe.category)}</li>
        <li tabindex="0" class="tag duration" aria-label="Durée de préparation : ${recipe.duration} minutes">${recipe.duration} min</li>
        <li tabindex="0" class="tag level" aria-label="Difficulté de préparation : ${recipe.level}">${Globals.capitalize(recipe.level)}</li>
      </ul>
    </div>
    ${
      recipe.favorite === false
        ? `<button class="primary no-print" id="btn-add-to-favorites">Ajouter cette recette à mes favoris</button>`
        : ``
    }
    </div>
    <div class="recipe-heading-bloc">
      <i class="fa-solid fa-bowl-food"></i>
      <p>Ingrédients</p>
    </div>
    <ul class="ingredients-list">
      ${(() => {
        let list = "";
        for (const ingredient of recipe.ingredients) {
          list += `<li>${ingredient.qty} ${Globals.capitalize(ingredient.ingredient)}</li>`;
        }
        return list;
      })()}
    </ul>
    <div class="recipe-heading-bloc">
      <i class="fa-solid fa-list-ol"></i>
      <p>Etapes de préparation</p>
    </div>

    <ol class="steps-list">
      ${(() => {
        let list = "";
        for (const step of recipe.steps) {
          list += `<li>${Globals.capitalize(step)}</li>`;
        }
        return list;
      })()}
    </ol>
      
    `;

    /*****************************************
     ******* Gestion du clic sur les étoiles
     *****************************************/
    const stars = document.querySelectorAll(".stars i");
    stars.forEach((star, index1) => {
      star.addEventListener("click", () => {
        stars.forEach((star, index2) => {
          index1 >= index2
            ? star.classList.add("active")
            : star.classList.remove("active");
        });

        const note = document.querySelectorAll(".stars i.active");
        recipeManager.setRecipeNote(recipe.name, note.length); // on met a jour la base de données (LocalStorage)
      });
    });
  } else {
    recipeContainer.innerHTML = "<h1>Aucune recette à afficher !</h1>";
    return FontFaceSetLoadEvent;
  }

  return true;
}
