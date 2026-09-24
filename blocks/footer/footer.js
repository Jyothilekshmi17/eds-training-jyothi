import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  const fragment = await loadFragment(footerPath);

  block.textContent = '';

  const footer = document.createElement('div');
  footer.className = 'footer-content';

  const table = fragment.querySelector('table');

  if (table) {
    const rows = [...table.querySelectorAll('tr')];

    const columns = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
    ];

    columns.forEach((column) => {
      column.className = 'footer-column';
    });

    rows.forEach((row) => {
      const cells = [...row.children];

      cells.forEach((cell, index) => {
        if (columns[index]) {
          const content = document.createElement('div');
          content.className = 'footer-item';
          content.innerHTML = cell.innerHTML;

          if (content.textContent.trim() || content.querySelector('a, img')) {
            columns[index].append(content);
          }
        }
      });
    });

    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'footer-columns';

    columns.forEach((column) => {
      columnsContainer.append(column);
    });

    footer.append(columnsContainer);
  }

  // Add copyright text
  const copyright = document.createElement('div');
  copyright.className = 'footer-bottom';

  copyright.innerHTML = `
    <p>© 2026 Recipe Finder. All rights reserved.</p>
    <p>Made with ♥ for food lovers.</p>
  `;

  footer.append(copyright);
  block.append(footer);
}