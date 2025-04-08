import {fetchInitialRecipes} from "./utils.js";
// import {addRecipe} from "./utils.js";

const recipesContainer = document.getElementById('recipes');

const addRecipeButton = document.getElementById('addRecipeButton'); 

let newRecipes = [];

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(function(recipe) {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Instructions: ${recipe.instructions}</p>
            `;
        recipesContainer.appendChild(recipeElement);
    });
}

async function handleAddRecipe() {

    const name = prompt("Enter name of recipe.");
    const ingredients = prompt('Enter ingredients (comma separated):').split(',');
    const instructions = prompt("Enter instructions.");

    try {
        const newRecipe = { name, ingredients, instructions };
        newRecipes.push(newRecipe);
        displayRecipes([...initialRecipes, ...newRecipes]);
    } catch (error) {
            console.error('Error adding recipe:', error);
    }
}

addRecipeButton.addEventListener('click', handleAddRecipe);

let initialRecipes = []; 
async function init() {
    try {
        initialRecipes = await fetchInitialRecipes();
        displayRecipes(initialRecipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

init();