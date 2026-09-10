export default function decorate(block) {
  const rows = [...block.children];

  // Remove the header row
  rows.shift();

  rows.forEach((row) => {
    const cells = [...row.children];

    const imageCell = cells[0];
    const nameCell = cells[1];
    const categoryCell = cells[2];
    const timeCell = cells[3];
    const linkCell = cells[4];

    const image = imageCell?.querySelector('img');
    const name = nameCell?.textContent.trim() || '';
    const category = categoryCell?.textContent.trim() || '';
    const time = timeCell?.textContent.trim() || '';
    const link = linkCell?.querySelector('a')?.href || '#';

    row.innerHTML = `
      <div class="recipe-card">
        <div class="recipe-card-image">
          ${image ? image.outerHTML : ''}
        </div>

        <div class="recipe-card-content">
          <div class="recipe-card-category">${category}</div>

          <h3 class="recipe-card-title">
            ${name}
          </h3>

          <p class="recipe-card-time">
            ⏱ ${time}
          </p>

          <a class="recipe-card-button" href="${link}">
            View Recipe
          </a>
        </div>
      </div>
    `;
  });
}