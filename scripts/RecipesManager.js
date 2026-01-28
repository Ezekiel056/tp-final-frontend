import Globals from "./Globals.js";
export default class RecipesManager {
  #recipes;

  constructor() {
    this.#recipes = this.#getRecipesFromLocalStorage();
  }

  get recipes() {
    return this.#recipes;
  }

  static getTagColor(type, value) {}

  #getRecipesFromLocalStorage() {
    let recipes = localStorage.getItem(Globals.LS_RECIPES);
    return recipes != null ? JSON.parse(recipes) : this.initFirstVisit();
  }

  initFirstVisit() {
    const recipes = [
      {
        name: "Tarte aux pommes",
        category: "dessert",
        duration: "60",
        level: "facile",
        favortie: false,
        image: "tarte-aux-pommes.png",
      },
      {
        name: "Ratatouille provençale",
        category: "plat",
        duration: "45",
        level: "moyen",
        favortie: false,
        image: "ratatouille-provencale.png",
      },
      {
        name: "Velouté de potiron",
        category: "entrée",
        duration: "30",
        level: "facile",
        favortie: false,
        image: "veloute-de-potiron.png",
      },
      {
        name: "Salade César",
        category: "entrée",
        duration: "30",
        level: "facile",
        favortie: false,
        image: "salade-cesar.png",
      },
      {
        name: "Bœuf bourguignon",
        category: "plat",
        duration: "60",
        level: "difficile",
        favortie: false,
        image: "boeuf-bourgignon.png",
      },
      {
        name: "Pâtes carbonara",
        category: "plat",
        duration: "30",
        level: "facile",
        favortie: false,
        image: "pates-carbo.png",
      },
      {
        name: "Mousse au chocolat",
        category: "dessert",
        duration: "45",
        level: "facile",
        favortie: false,
        image: "mousse-chocolat.png",
      },
      {
        name: "Crème brûlée",
        category: "dessert",
        duration: "30",
        level: "moyen",
        favortie: false,
        image: "creme-brulee.png",
      },
      {
        name: "Burger",
        category: "plat",
        duration: "30",
        level: "facile",
        favortie: false,
        image: "burger.png",
      },
      {
        name: "Mille-feuiles",
        category: "dessert",
        duration: "60",
        level: "difficile",
        favortie: false,
        image: "mille-feuille.png",
      },
    ];

    localStorage.setItem(Globals.LS_RECIPES, JSON.stringify(recipes));
    return recipes;
  }

  filterRecipes(categories, duration, level, search) {
    let filteredRecipes = [...this.#recipes];
    /*
    On recherche dans un premier temps une eventuelle recherche par le nom
    */
    if (search.trim() !== "") {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.trim().toLowerCase()),
      );
    }

    filteredRecipes = filteredRecipes.filter((recipe) => {
      if (
        (categories == "" || categories.includes(recipe.category)) &&
        (duration == "" || duration.includes(recipe.duration)) &&
        (level == "" || level.includes(recipe.level))
      ) {
        return true;
      }

      return false;
    });

    return filteredRecipes;
  }
}
