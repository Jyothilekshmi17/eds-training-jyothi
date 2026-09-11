export default function decorate(block) {
  block.innerHTML = `
    <div class="recipe-categories-container"></div>
  `;

  const container = block.querySelector('.recipe-categories-container');

  let selectedCategory = 'all';

  function getCategories() {
    const categoryElements = document.querySelectorAll(
      '.recipe-card-category',
    );

    const categories = [...categoryElements]
      .map((element) => element.textContent.trim())
      .filter(Boolean);

    return [...new Set(categories)].sort();
  }

  function createButton(label, value) {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'recipe-category-button';
    button.textContent = label;

    if (value === selectedCategory) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      selectedCategory = value;

      document.dispatchEvent(
        new CustomEvent('recipe-category', {
          detail: {
            category: value,
          },
        }),
      );

      renderCategories();
    });

    return button;
  }

  function renderCategories() {
    const categories = getCategories();

    container.innerHTML = '';

    container.append(createButton('All', 'all'));

    categories.forEach((category) => {
      container.append(createButton(category, category));
    });
  }

  document.addEventListener('recipe-categories-updated', () => {
    renderCategories();
  });

  renderCategories();

  setTimeout(renderCategories, 300);
  setTimeout(renderCategories, 1000);
}
