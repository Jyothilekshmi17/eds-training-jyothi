export default function decorate(block) {
  const rows = [...block.children];
  rows.shift();

  const recipes = rows.map((row) => {
    const cells = [...row.children];

    const image = cells[0]?.querySelector('img');
    const name = cells[1]?.textContent.trim() || '';
    const category = cells[2]?.textContent.trim() || '';
    const time = cells[3]?.textContent.trim() || '';
    const link = cells[4]?.querySelector('a')?.href || '#';

    return {
      image,
      name,
      category,
      time,
      link,
    };
  });

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'recipe-cards-container';

  function normalizeCategory(category) {
    return category
      .toLowerCase()
      .trim()
      .replace(/s$/, '');
  }

  function renderRecipes(category = 'all') {
    cardsContainer.innerHTML = '';

    const filteredRecipes = category === 'all'
      ? recipes
      : recipes.filter(
        (recipe) => normalizeCategory(recipe.category) === normalizeCategory(category),
      );

    if (filteredRecipes.length === 0) {
      cardsContainer.innerHTML = `
        <div class="no-recipes">
          <h3>No recipes found</h3>
          <p>No recipes are available in the ${category} category.</p>
        </div>
      `;
      return;
    }

    filteredRecipes.forEach((recipe) => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <div class="recipe-card-image">
          ${recipe.image ? recipe.image.outerHTML : ''}
        </div>

        <div class="recipe-card-content">
          <div class="recipe-card-category">
            ${recipe.category}
          </div>

          <h3 class="recipe-card-title">
            ${recipe.name}
          </h3>

          <p class="recipe-card-time">
            ⏱ ${recipe.time}
          </p>

          <a class="recipe-card-button" href="${recipe.link}">
            View Recipe
          </a>
        </div>
      `;

      cardsContainer.append(card);
    });
  }

  block.innerHTML = '';
  block.append(cardsContainer);

  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'all';

  renderRecipes(category);
}
