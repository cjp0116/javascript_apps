import {elements} from './base';
// Read input

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {elements.searchInput.value = '';};
export const clearResults = () => {
    elements.searchResList.innerHTML = ""
};

// Pasta with tomatoe.split() 
// -> ['Pasta','with','tomatoe']
// acc: 0 / acc + "Pasta".length = 5
// acc: 5 / acc + "with".length = 9
// acc: 9 / acc + "tomatoe".length = 16 
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = 
    `<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
             <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
             <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

const renderButton = (page) => {
    
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // page 1 = 0-9
    // page 2 = 9 - 19
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

};