let recipes = [];

function LoadRecipeFromLocalStorage() {
  recipes = localStorage.getItem("recipes");
}

window.addEventListener("DOMContentLoaded", () => {
  LoadRecipeFromLocalStorage();
});
