import Globals from "./Globals.js";
export default class RecipesManager {
  #recipes;

  constructor() {
    this.#recipes = this.#getRecipesFromLocalStorage();
  }

  get recipes() {
    return this.#recipes;
  }

  /*****************************************
   ******* PRIVATE FUNCTIONS
   *****************************************/
  #getRecipesFromLocalStorage() {
    let recipes = localStorage.getItem(Globals.LS_RECIPES);
    return recipes != null ? JSON.parse(recipes) : this.initFirstVisit();
  }

  #saveToLocalStorage(recipes = this.#recipes) {
    localStorage.setItem(Globals.LS_RECIPES, JSON.stringify(recipes));
  }

  #getRecipeIndexByName(recipeName) {
    return this.#recipes.findIndex(
      (r) => r.name.trim().toLowerCase() === recipeName.trim().toLowerCase(),
    );
  }

  /*****************************************
   ******* PUBLIC FUNCTIONS
   *****************************************/
  initFirstVisit() {
    const recipes = [
      {
        name: "Tarte aux pommes",
        category: "dessert",
        duration: "60",
        level: "facile",
        rating: 0,
        favorite: true,
        image: "tarte-aux-pommes.png",
        ingredients: [
          { ingredient: "pommes", qty: 4 },
          { ingredient: "pâte brisée", qty: 1 },
          { ingredient: "sucre", qty: "80 g" },
          { ingredient: "beurre", qty: "30 g" },
        ],
        steps: [
          "Préchauffer le four à 180°C",
          "Éplucher et couper les pommes en lamelles",
          "Étaler la pâte dans un moule",
          "Disposer les pommes et saupoudrer de sucre",
          "Ajouter des noisettes de beurre",
          "Enfourner pendant 40 minutes",
        ],
      },

      {
        name: "Ratatouille provençale",
        category: "plat",
        duration: "45",
        level: "moyen",
        rating: 4,
        favorite: false,
        image: "ratatouille-provencale.png",
        ingredients: [
          { ingredient: "courgettes", qty: 2 },
          { ingredient: "aubergine", qty: 1 },
          { ingredient: "poivrons", qty: 2 },
          { ingredient: "tomates", qty: 4 },
          { ingredient: "oignon", qty: 1 },
        ],
        steps: [
          "Laver et couper tous les légumes en morceaux",
          "Faire revenir l’oignon dans l’huile d’olive",
          "Ajouter les légumes progressivement",
          "Laisser mijoter à feu doux 30 minutes",
          "Rectifier l’assaisonnement",
        ],
      },

      {
        name: "Velouté de potiron",
        category: "entrée",
        duration: "30",
        level: "facile",
        favorite: false,
        rating: 2,
        image: "veloute-de-potiron.png",
        ingredients: [
          { ingredient: "potiron", qty: "600 g" },
          { ingredient: "pomme de terre", qty: 2 },
          { ingredient: "oignon", qty: 1 },
          { ingredient: "crème fraîche", qty: "10 cl" },
        ],
        steps: [
          "Éplucher et couper les légumes",
          "Faire revenir l’oignon",
          "Ajouter les légumes et couvrir d’eau",
          "Cuire 20 minutes",
          "Mixer et ajouter la crème",
        ],
      },

      {
        name: "Salade César",
        category: "entrée",
        duration: "30",
        level: "facile",
        favorite: false,
        rating: 2,
        image: "salade-cesar.png",
        ingredients: [
          { ingredient: "salade romaine", qty: 1 },
          { ingredient: "blanc de poulet", qty: 2 },
          { ingredient: "croûtons", qty: "50 g" },
          { ingredient: "parmesan", qty: "40 g" },
        ],
        steps: [
          "Griller le poulet et le couper en morceaux",
          "Laver et couper la salade",
          "Ajouter croûtons et parmesan",
          "Mélanger avec la sauce César",
          "Ajouter le poulet",
        ],
      },

      {
        name: "Bœuf bourguignon",
        category: "plat",
        duration: "60",
        level: "difficile",
        favorite: false,
        rating: 5,
        image: "boeuf-bourgignon.png",
        ingredients: [
          { ingredient: "bœuf", qty: "800 g" },
          { ingredient: "oignons", qty: 2 },
          { ingredient: "champignons", qty: "250 g" },
          { ingredient: "vin rouge", qty: "50 cl" },
        ],
        steps: [
          "Faire revenir le bœuf",
          "Ajouter les oignons",
          "Verser le vin rouge",
          "Laisser mijoter longuement",
          "Ajouter les champignons en fin de cuisson",
        ],
      },

      {
        name: "Pâtes carbonara",
        category: "plat",
        duration: "30",
        level: "facile",
        favorite: false,
        rating: 0,
        image: "pates-carbo.png",
        ingredients: [
          { ingredient: "pâtes", qty: "400 g" },
          { ingredient: "lardons", qty: "150 g" },
          { ingredient: "œufs", qty: 3 },
          { ingredient: "parmesan", qty: "60 g" },
        ],
        steps: [
          "Cuire les pâtes",
          "Faire revenir les lardons",
          "Mélanger œufs et parmesan",
          "Incorporer aux pâtes hors du feu",
          "Ajouter les lardons",
        ],
      },

      {
        name: "Mousse au chocolat",
        category: "dessert",
        duration: "45",
        level: "facile",
        favorite: false,
        rating: 5,
        image: "mousse-chocolat.png",
        ingredients: [
          { ingredient: "chocolat noir", qty: "200 g" },
          { ingredient: "œufs", qty: 4 },
          { ingredient: "sucre", qty: "30 g" },
        ],
        steps: [
          "Faire fondre le chocolat",
          "Séparer les blancs des jaunes",
          "Mélanger jaunes et chocolat",
          "Monter les blancs en neige",
          "Incorporer délicatement",
        ],
      },

      {
        name: "Crème brûlée",
        category: "dessert",
        duration: "30",
        level: "moyen",
        favorite: false,
        rating: 5,
        image: "creme-brulee.png",
        ingredients: [
          { ingredient: "crème liquide", qty: "50 cl" },
          { ingredient: "jaunes d’œufs", qty: 4 },
          { ingredient: "sucre", qty: "80 g" },
          { ingredient: "vanille", qty: 1 },
        ],
        steps: [
          "Chauffer la crème avec la vanille",
          "Mélanger jaunes et sucre",
          "Verser la crème",
          "Cuire au bain-marie",
          "Caraméliser le dessus",
        ],
      },

      {
        name: "Burger",
        category: "plat",
        duration: "30",
        level: "facile",
        favorite: false,
        rating: 1,
        image: "burger.png",
        ingredients: [
          { ingredient: "pain burger", qty: 2 },
          { ingredient: "steak haché", qty: 2 },
          { ingredient: "fromage", qty: 2 },
          { ingredient: "salade", qty: 2 },
        ],
        steps: [
          "Cuire les steaks",
          "Griller les pains",
          "Assembler le burger",
          "Ajouter garniture et fromage",
          "Servir chaud",
        ],
      },

      {
        name: "Mille-feuiles",
        category: "dessert",
        duration: "60",
        level: "difficile",
        favorite: false,
        rating: 3,
        image: "mille-feuille.png",
        ingredients: [
          { ingredient: "pâte feuilletée", qty: 3 },
          { ingredient: "lait", qty: "50 cl" },
          { ingredient: "œufs", qty: 4 },
          { ingredient: "sucre", qty: "120 g" },
        ],
        steps: [
          "Cuire la pâte feuilletée",
          "Préparer la crème pâtissière",
          "Laisser refroidir",
          "Monter le mille-feuille",
          "Glacer le dessus",
        ],
      },
    ];

    this.#saveToLocalStorage(recipes);
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

  toggleFavorite(recipeName) {
    let index = this.#getRecipeIndexByName(recipeName);
    if (index > -1) {
      this.#recipes[index].favorite = !this.#recipes[index].favorite;
      this.#saveToLocalStorage();
      return true;
    }

    return false;
  }

  getRecipeByName(recipeName) {
    let index = this.#getRecipeIndexByName(recipeName);
    if (index > -1) {
      return { ...this.#recipes[index] };
    }
  }

  getFavoritesRecipes() {
    return this.#recipes.filter((recipe) => recipe.favorite);
  }

  setRecipeNote(name, rating) {
    let i = this.#getRecipeIndexByName(name);
    if (i > -1) {
      this.#recipes[i].rating = rating;
      this.#saveToLocalStorage();
      return true;
    }
    return false;
  }
}
