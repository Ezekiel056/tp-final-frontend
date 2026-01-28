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
    let recipes = localStorage.getItem("recipes");
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
        image: "/assets/images/tarte-aux-pommes.png",
      },
      {
        name: "Ratatouille provençale",
        category: "plat",
        duration: "45",
        level: "moyen",
        favortie: false,
        image: "/assets/images/ratatouille-provencale.png",
      },
      {
        name: "Velouté de potiron",
        category: "entrée",
        duration: "30",
        level: "facile",
        favortie: false,
        image: "/assets/images/veloute-de-potiron.png",
      },
    ];

    localStorage.setItem("recipes", JSON.stringify(recipes));
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
