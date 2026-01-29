import Globals from "./Globals.js";
const btnDarkMode = document.getElementById("display-mod");
const btnBurger = document.getElementById("burger-btn");
const btnCloseMenu = document.getElementById("btn-close-menu");

main();

function main() {
  Globals.getUserPreferences();
  applyDisplayMode();
}

function applyDisplayMode() {
  if (Globals.userPreferences.displayMode === "light")
    document.body.classList.remove("dark");
  else document.body.classList.add("dark");
}

function toggleDarkMode() {
  Globals.toggleDisplayMode();
  applyDisplayMode();
}

function showMainMenu() {
  const mainMenuElem = document.getElementById("main-nav");
  if (mainMenuElem) {
    mainMenuElem.classList.toggle("hidden");
  }
}



/*****************************************
 ******* WHEN ALL DOM ELEMENTS ARE LOADED
 *****************************************/

window.addEventListener("DOMContentLoaded", () => {
  /*****************************************
   ******* EVENT LISTENERS
   *****************************************/

  btnDarkMode.addEventListener("click", toggleDarkMode);
  btnBurger.addEventListener("click", showMainMenu);
  btnCloseMenu.addEventListener("click", showMainMenu);
});
