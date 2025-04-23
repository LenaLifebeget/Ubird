const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
viewportWidth: 1400, // Լայնությունը 1400px
    viewportHeight: 900 // Բարձրությունը 900px
});