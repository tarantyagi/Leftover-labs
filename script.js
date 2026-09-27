const apiKey = 'e6437709bcab4f20876199ea45675962'; // Replace with your Spoonacular API Key
const findRecipesBtn = document.getElementById('findRecipesBtn');
const ingredientsInput = document.getElementById('ingredients');
const recipesDiv = document.getElementById('recipes');
const recipeDetailsDiv = document.getElementById('recipe-details');

findRecipesBtn.addEventListener('click', () => {
    const ingredients = ingredientsInput.value;
    if (ingredients) {
        fetchRecipes(ingredients);
    } else {
        alert('Please enter some ingredients!');
    }
});

function fetchRecipes(ingredients) {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => displayRecipes(data))
        .catch(error => console.log('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    recipesDiv.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>Used ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missing ingredients: ${recipe.missedIngredientCount}</p>
            <img src="${recipe.image}" loading="lazy" alt="${recipe.title}">
        `;
        recipeCard.addEventListener('click', () => {
            fetchRecipeDetails(recipe.id);
        });
        recipesDiv.appendChild(recipeCard);
    });
}
function fetchRecipeDetails(recipeId) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayRecipeDetails(data))
        .catch(error => console.log('Error fetching recipe details:', error));
}
function displayRecipeDetails(recipe) {
    recipeDetailsDiv.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" style="max-width:100%; border-radius: 5px;">
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions || 'No instructions available.'}</p>
    `;
}
