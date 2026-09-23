async function getRecipeData() {
  try {
    const response = await fetch('/recipes-data.plain.html');

    if (!response.ok) {
      throw new Error('Unable to load recipe data');
    }

    const html = await response.text();

    const parser = new DOMParser();
    const documentData = parser.parseFromString(html, 'text/html');

    const block = documentData.querySelector('.recipe-data');

    if (!block) {
      console.error('Recipe Data block not found');
      return [];
    }

    const rows = [...block.children];

    if (rows.length < 2) {
      console.error('Recipe data rows not found');
      return [];
    }

    return rows
      .slice(1)
      .map((row) => {
        const cells = [...row.children];

        const image = cells[1]?.querySelector('img');

        return {
          id: cells[0]?.textContent.trim().toLowerCase() || '',
          image: image?.src || '',
          name: cells[2]?.textContent.trim() || '',
          category: cells[3]?.textContent.trim() || '',
          time: cells[4]?.textContent.trim() || '',
          description: cells[5]?.textContent.trim() || '',
          ingredients: cells[6]?.textContent.trim() || '',
          instructions: cells[7]?.textContent.trim() || '',
        };
      })
      .filter((recipe) => recipe.id && recipe.name);
  } catch (error) {
    console.error('Recipe data error:', error);
    return [];
  }
}

function getRecipeId() {
  const params = new URLSearchParams(window.location.search);

  return params.get('recipe')?.trim().toLowerCase() || '';
}

function createListItems(text) {
  const items = text
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return items
    .map((item) => `<li>${item}</li>`)
    .join('');
}

function createInstructions(text) {
  const items = text
    .split(/\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return items
    .map((item) => `<li>${item.replace(/^\d+\.\s*/, '')}</li>`)
    .join('');
}

export default async function decorate(block) {
  block.innerHTML = `
    <div class="recipe-detail-loading">
      Loading recipe...
    </div>
  `;

  const recipeId = getRecipeId();

  if (!recipeId) {
    block.innerHTML = `
      <div class="recipe-detail-message">
        <h2>Recipe not found</h2>
        <p>Please select a recipe from the home page.</p>
        <a href="/" class="recipe-detail-back">
          Back to Recipes
        </a>
      </div>
    `;

    return;
  }

  const recipes = await getRecipeData();

  const recipe = recipes.find(
    (item) => item.id === recipeId,
  );

  if (!recipe) {
    block.innerHTML = `
      <div class="recipe-detail-message">
        <h2>Recipe not found</h2>
        <p>We couldn't find this recipe.</p>
        <a href="/" class="recipe-detail-back">
          Back to Recipes
        </a>
      </div>
    `;

    return;
  }

  const ingredients = createListItems(recipe.ingredients);
  const instructions = createInstructions(recipe.instructions);

  block.innerHTML = `
    <article class="recipe-detail-container">

      <a href="/" class="recipe-detail-back">
        ← Back to Recipes
      </a>

      <div class="recipe-detail-card">

        <div class="recipe-detail-image">
          <img
            src="${recipe.image}"
            alt="${recipe.name}"
          />
        </div>

        <div class="recipe-detail-content">

          <div class="recipe-detail-category">
            ${recipe.category}
          </div>

          <h1 class="recipe-detail-title">
            ${recipe.name}
          </h1>

          <div class="recipe-detail-time">
            ⏱ ${recipe.time}
          </div>

          <p class="recipe-detail-description">
            ${recipe.description}
          </p>

          <div class="recipe-detail-section">

            <h2>Ingredients</h2>

            <ul class="recipe-detail-ingredients">
              ${ingredients}
            </ul>

          </div>

          <div class="recipe-detail-section">

            <h2>Instructions</h2>

            <ol class="recipe-detail-instructions">
              ${instructions}
            </ol>

          </div>

        </div>

      </div>

    </article>
  `;
}