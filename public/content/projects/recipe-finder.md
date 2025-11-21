---
id: recipe-finder
title: Recipe Finder
description: An application to search for recipes based on ingredients you have.
tags: [JavaScript, API, CSS]
githubUrl: https://github.com/
demoUrl: https://example.com
featured: true
---

# Recipe Finder

An application to search for recipes based on ingredients you have.

## Features

- Ingredient-based recipe search
- Recipe details and instructions
- Nutritional information
- Favorite recipes
- Shopping list generation

## API Integration

Uses Spoonacular API for recipe data:

```javascript
const API_KEY = 'your-api-key';

async function findRecipes(ingredients) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
  );
  return response.json();
}
```

Great for discovering new recipes with ingredients you already have!
