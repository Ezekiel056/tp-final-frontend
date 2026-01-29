export default class Globals {
  static LS_PREFIX = "6agf54df";
  static LS_USER_PREF = Globals.LS_PREFIX + "_userPreferences";
  static LS_RECIPES = Globals.LS_PREFIX + "_recipes";

  static userPreferences = {};

  static getUserPreferences() {
    let prefs = localStorage.getItem(Globals.LS_USER_PREF);

    if (!prefs) {
      Globals.initUserPreferences();
    } else {
      Globals.userPreferences = JSON.parse(prefs);
    }
  }

  static initUserPreferences() {
    Globals.userPreferences.displayMode = "light";
    Globals.saveUserPreferences();
  }

  static saveUserPreferences() {
    localStorage.setItem(
      Globals.LS_USER_PREF,
      JSON.stringify(Globals.userPreferences),
    );
  }

  static toggleDisplayMode() {
    Globals.userPreferences.displayMode =
      Globals.userPreferences.displayMode === "light" ? "dark" : "light";
    Globals.saveUserPreferences();
  }

  static capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
}
