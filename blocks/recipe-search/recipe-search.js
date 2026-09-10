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

  const search = () => {
    const query = input.value.trim();

    if (!query) {
      input.focus();
      return;
    }

    window.location.href =
      `/search?q=${encodeURIComponent(query)}`;
  };

  button.addEventListener('click', search);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      search();
    }
  });
}
