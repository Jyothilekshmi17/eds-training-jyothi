export default function decorate(block) {
  block.innerHTML = `
    <div class="recipe-categories-container">
      <button type="button" data-category="all">All</button>
      <button type="button" data-category="breakfast">Breakfast</button>
      <button type="button" data-category="lunch">Lunch</button>
      <button type="button" data-category="dinner">Dinner</button>
      <button type="button" data-category="desserts">Desserts</button>
      <button type="button" data-category="snacks">Snacks</button>
      <button type="button" data-category="healthy">Healthy</button>
    </div>
  `;

  const buttons = block.querySelectorAll('button');
  const params = new URLSearchParams(window.location.search);
  const currentCategory = params.get('category') || 'all';

  buttons.forEach((button) => {
    const category = button.dataset.category;

    if (category === currentCategory) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      if (category === 'all') {
        window.location.href = '/recipes';
      } else {
        window.location.href = `/recipes?category=${encodeURIComponent(category)}`;
      }
    });
  });
}
