export default function decorate(block) {
  const rows = [...block.children];
  rows.shift();

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'recipe-cards-container';

  rows.forEach((row) => {
    const cells = [...row.children];

    const image = cells[0]?.querySelector('img');
    const name = cells[1]?.textContent.trim() || '';
    const category = cells[2]?.textContent.trim() || '';
    const time = cells[3]?.textContent.trim() || '';
    const link = cells[4]?.querySelector('a')?.href || '#';

    const card = document.createElement('div');
    card.className = 'recipe-card';

    card.innerHTML = `
      <div class="recipe-card-image">
        ${image ? image.outerHTML : ''}
      </div>

      <div class="recipe-card-content">
        <div class="recipe-card-category">${category}</div>

        <h3 class="recipe-card-title">${name}</h3>

        <p class="recipe-card-time">⏱ ${time}</p>

        <a class="recipe-card-button" href="${link}">
          View Recipe
        </a>
      </div>
    `;

    cardsContainer.append(card);
  });

  block.innerHTML = '';
  block.append(cardsContainer);
}

