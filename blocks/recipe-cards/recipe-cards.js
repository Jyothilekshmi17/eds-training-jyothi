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

      const id = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return {
        image,
        id,
        name,
        category,
        time,
      };
    })
    .filter((recipe) => recipe.name);

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'recipe-cards-container';

  let loadMoreWrapper = block.parentElement?.querySelector('.recipe-load-more-wrapper');
  let loadMoreBtn;

  if (!loadMoreWrapper) {
    loadMoreWrapper = document.createElement('div');
    loadMoreWrapper.className = 'recipe-load-more-wrapper';

    loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'recipe-load-more-btn';
    loadMoreBtn.textContent = 'View More Recipes';

    loadMoreWrapper.append(loadMoreBtn);
  } else {
    loadMoreBtn = loadMoreWrapper.querySelector('.recipe-load-more-btn');
  }

  block.innerHTML = '';
  block.append(cardsContainer);

  if (block.parentElement && !block.parentElement.contains(loadMoreWrapper)) {
    block.parentElement.appendChild(loadMoreWrapper);
  }

  let currentSearch = '';
  let currentCategory = 'all';

  const CARDS_PER_PAGE = 9;
  let visibleCount = CARDS_PER_PAGE;
  let shouldScrollOnSearch = false;

  function normalize(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  }

  function matchesSearch(recipe) {
    if (!currentSearch) return true;
    const searchText = normalize(currentSearch);
    return [recipe.name, recipe.category, recipe.time].some((value) =>
      normalize(value).includes(searchText),
    );
  }

  function matchesCategory(recipe) {
    if (currentCategory === 'all') return true;
    return normalize(recipe.category) === normalize(currentCategory);
  }

  // Smooth scroll helper
  function scrollToCards() {
    const targetOffset = cardsContainer.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth',
    });
  }

  // Local Storage feedback handlers
  function getFeedbackState(recipeId) {
    return localStorage.getItem(`recipe_feedback_${recipeId}`) || null;
  }

  function setFeedbackState(recipeId, state) {
    if (state) {
      localStorage.setItem(`recipe_feedback_${recipeId}`, state);
    } else {
      localStorage.removeItem(`recipe_feedback_${recipeId}`);
    }
  }

  function createCard(recipe) {
    const card = document.createElement('article');
    card.className = 'recipe-card';

    // Image & Category Badge Overlay
    const imageContainer = document.createElement('div');
    imageContainer.className = 'recipe-card-image';

    const category = document.createElement('div');
    category.className = 'recipe-card-category';
    category.textContent = recipe.category;
    imageContainer.append(category);

    if (recipe.image) {
      const imgNode = recipe.image.cloneNode(true);
      imgNode.setAttribute('loading', 'lazy');
      imageContainer.append(imgNode);
    }

    // Card Details
    const content = document.createElement('div');
    content.className = 'recipe-card-content';

    const title = document.createElement('h3');
    title.className = 'recipe-card-title';
    title.textContent = recipe.name;

    const time = document.createElement('p');
    time.className = 'recipe-card-time';
    time.textContent = `⏱ ${recipe.time}`;

    // Card Footer with Button + Reactions
    const footer = document.createElement('div');
    footer.className = 'recipe-card-footer';

    const link = document.createElement('a');
    link.className = 'recipe-card-button';
    link.href = `/recipe-detail?recipe=${encodeURIComponent(recipe.id)}`;
    link.textContent = 'View Recipe';

    const reactions = document.createElement('div');
    reactions.className = 'recipe-card-reactions';

    const currentFeedback = getFeedbackState(recipe.id);

    const likeBtn = document.createElement('button');
    likeBtn.type = 'button';
    likeBtn.className = `reaction-btn like-btn ${currentFeedback === 'like' ? 'active' : ''}`;
    likeBtn.setAttribute('aria-label', 'Like recipe');
    likeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1zm20-10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 7.58 6.59C7.22 6.95 7 7.45 7 8v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
      </svg>
    `;

    const dislikeBtn = document.createElement('button');
    dislikeBtn.type = 'button';
    dislikeBtn.className = `reaction-btn dislike-btn ${currentFeedback === 'dislike' ? 'active' : ''}`;
    dislikeBtn.setAttribute('aria-label', 'Dislike recipe');
    dislikeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M15 4H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l5.59-5.59c.36-.36.58-.86.58-1.41V6c0-1.1-.9-2-2-2zm7 0h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1z"/>
      </svg>
    `;

    likeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const active = likeBtn.classList.contains('active');
      if (active) {
        likeBtn.classList.remove('active');
        setFeedbackState(recipe.id, null);
      } else {
        likeBtn.classList.add('active');
        dislikeBtn.classList.remove('active');
        setFeedbackState(recipe.id, 'like');
      }
    });

    dislikeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const active = dislikeBtn.classList.contains('active');
      if (active) {
        dislikeBtn.classList.remove('active');
        setFeedbackState(recipe.id, null);
      } else {
        dislikeBtn.classList.add('active');
        likeBtn.classList.remove('active');
        setFeedbackState(recipe.id, 'dislike');
      }
    });

    reactions.append(likeBtn, dislikeBtn);
    footer.append(link, reactions);

    content.append(title, time, footer);
    card.append(imageContainer, content);

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

      message.innerHTML = `
        <div class="no-recipes-icon">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            <path d="M8 15s1.5-2 4-2 4 2 4 2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <h3>No Recipes Found</h3>
        <p>${
          currentSearch
            ? `We couldn't find anything matching "<strong>${currentSearch}</strong>".`
            : 'No recipes are currently available under this category.'
        }</p>
        <button type="button" class="reset-filters-btn">Reset All Filters</button>
      `;

      const resetBtn = message.querySelector('.reset-filters-btn');
      resetBtn.addEventListener('click', () => {
        currentSearch = '';
        currentCategory = 'all';
        visibleCount = CARDS_PER_PAGE;

        document.dispatchEvent(new CustomEvent('recipe-search', { detail: { query: '' } }));
        document.dispatchEvent(new CustomEvent('recipe-category', { detail: { category: 'all' } }));

        const searchInput = document.querySelector('.recipe-search-input');
        if (searchInput) searchInput.value = '';

        renderRecipes();
      });

      cardsContainer.append(message);
      loadMoreWrapper.setAttribute('style', 'display: none !important;');
      return;
    }

    const itemsToDisplay = filteredRecipes.slice(0, visibleCount);
    itemsToDisplay.forEach((recipe) => {
      cardsContainer.append(createCard(recipe));
    });

    if (visibleCount >= filteredRecipes.length) {
      loadMoreWrapper.setAttribute('style', 'display: none !important;');
    } else {
      loadMoreWrapper.setAttribute(
        'style',
        'display: flex !important; justify-content: center !important; width: 100% !important; margin-top: 36px !important;',
      );
    }
  }

  loadMoreBtn.onclick = () => {
    visibleCount += CARDS_PER_PAGE;
    renderRecipes();
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('.recipe-search-button')) {
      shouldScrollOnSearch = true;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.closest('.recipe-search-input')) {
      shouldScrollOnSearch = true;
    }
  });

  document.addEventListener('recipe-search', (event) => {
    currentSearch = event.detail.query ?? event.detail;
    visibleCount = CARDS_PER_PAGE;
    renderRecipes();

    if (shouldScrollOnSearch) {
      scrollToCards();
      shouldScrollOnSearch = false;
    }
  });

  document.addEventListener('recipe-category', (event) => {
    currentCategory = event.detail.category ?? event.detail;
    visibleCount = CARDS_PER_PAGE;
    renderRecipes();
    scrollToCards();
  });

  renderRecipes();

  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('recipe-categories-updated'));
  }, 100);
}