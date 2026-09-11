export default function decorate(block) {
  const rows = [...block.children];

  rows.shift();

  const recipes = rows
    .map((row) => {
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
    })
    .filter((recipe) => recipe.name);

  const cardsContainer = document.createElement('div');

  cardsContainer.className = 'recipe-cards-container';

  block.innerHTML = '';
  block.append(cardsContainer);

  let currentSearch = '';
  let currentCategory = 'all';

  function normalize(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  }

  function matchesSearch(recipe) {
    if (!currentSearch) {
      return true;
    }

    const searchText = normalize(currentSearch);

    return [
      recipe.name,
      recipe.category,
      recipe.time,
    ].some((value) => normalize(value).includes(searchText));
  }

  function matchesCategory(recipe) {
    if (currentCategory === 'all') {
      return true;
    }

    return normalize(recipe.category) === normalize(currentCategory);
  }

  function createCard(recipe) {
    const card = document.createElement('article');

    card.className = 'recipe-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'recipe-card-image';

    if (recipe.image) {
      imageContainer.append(recipe.image.cloneNode(true));
    }

    const content = document.createElement('div');
    content.className = 'recipe-card-content';

    const category = document.createElement('div');
    category.className = 'recipe-card-category';
    category.textContent = recipe.category;

    const title = document.createElement('h3');
    title.className = 'recipe-card-title';
    title.textContent = recipe.name;

    const time = document.createElement('p');
    time.className = 'recipe-card-time';
    time.textContent = `⏱ ${recipe.time}`;

    const link = document.createElement('a');
    link.className = 'recipe-card-button';
    link.href = recipe.link;
    link.textContent = 'View Recipe';

    content.append(
      category,
      title,
      time,
      link,
    );

    card.append(
      imageContainer,
      content,
    );

    return card;
  }

  function renderRecipes() {
    const filteredRecipes = recipes.filter(
      (recipe) => matchesSearch(recipe) && matchesCategory(recipe),
    );

    cardsContainer.innerHTML = '';

    if (filteredRecipes.length === 0) {
      const message = document.createElement('div');

      message.className = 'no-recipes';

      const heading = document.createElement('h3');
      heading.textContent = 'No recipes found';

      const text = document.createElement('p');

      if (currentSearch && currentCategory !== 'all') {
        text.textContent =
          `No recipes found for "${currentSearch}" in ${currentCategory}.`;
      } else if (currentSearch) {
        text.textContent =
          `No recipes found for "${currentSearch}".`;
      } else if (currentCategory !== 'all') {
        text.textContent =
          `No recipes are available in the ${currentCategory} category.`;
      } else {
        text.textContent = 'No recipes are currently available.';
      }

      message.append(heading, text);
      cardsContainer.append(message);

      return;
    }

    filteredRecipes.forEach((recipe) => {
      cardsContainer.append(createCard(recipe));
    });
  }

  document.addEventListener('recipe-search', (event) => {
    currentSearch = event.detail.query;
    renderRecipes();
  });

  document.addEventListener('recipe-category', (event) => {
    currentCategory = event.detail.category;
    renderRecipes();
  });

  renderRecipes();

  setTimeout(() => {
    document.dispatchEvent(
      new CustomEvent('recipe-categories-updated'),
    );
  }, 100);
}
