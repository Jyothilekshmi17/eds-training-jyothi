export default function decorate(block) {
  block.innerHTML = `
    <div class="recipe-categories-container">
      <button data-category="all">All</button>
      <button data-category="breakfast">Breakfast</button>
      <button data-category="lunch">Lunch</button>
      <button data-category="dinner">Dinner</button>
      <button data-category="desserts">Desserts</button>
      <button data-category="snacks">Snacks</button>
      <button data-category="healthy">Healthy</button>
    </div>
  `;

  const buttons = block.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      window.location.href =
        `/recipes?category=${encodeURIComponent(category)}`;
    });
  });
}
