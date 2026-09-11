export default function decorate(block) {
  block.innerHTML = `
    <div class="recipe-search-container">
      <input
        class="recipe-search-input"
        type="search"
        placeholder="Search for a recipe..."
        aria-label="Search for a recipe"
      />
      <button
        class="recipe-search-button"
        type="button"
      >
        Search
      </button>
    </div>
  `;

  const input = block.querySelector('.recipe-search-input');
  const button = block.querySelector('.recipe-search-button');

  function performSearch() {
    const query = input.value.trim().toLowerCase();

    document.dispatchEvent(
      new CustomEvent('recipe-search', {
        detail: {
          query,
        },
      }),
    );
  }

  button.addEventListener('click', performSearch);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  });

  input.addEventListener('input', () => {
    performSearch();
  });
}
