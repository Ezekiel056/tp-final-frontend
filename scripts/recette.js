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
    recipeContainer.innerHTML = `
<img
  src="assets/images/${recipe.image}"
  alt="image de ${recipe.image}"
/>
<h1>Recette de <span class="recipe-name">${recipe.name}</span></h1>
<div>
  <ul class="tags-list">
    <li class="tag category">${Globals.capitalize(recipe.category)}</li>
    <li class="tag duration">${recipe.duration} min</li>
    <li class="tag level">${Globals.capitalize(recipe.level)}</li>
  </ul>
</div>
${
  recipe.favorite === false
    ? `<button class="primary" id="btn-add-to-favorites">Ajouter cette recette à mes favoris</button>`
    : ``
}

<div class="recipe-heading-bloc">
  <i class="fa-solid fa-bowl-food"></i>
  <p>Ingrédients</p>
</div>
<ul class="ingredients-list card">
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

<ol class="steps-list card">
  ${(() => {
    let list = "";
    for (const step of recipe.steps) {
      list += `<li>${Globals.capitalize(step)}</li>`;
    }
    return list;
  })()}
</ol>
  }
`;
  } else {
    recipeContainer.innerHTML = "<h1>Aucune recette à afficher !</h1>";
    return FontFaceSetLoadEvent;
  }

  return true;
}
