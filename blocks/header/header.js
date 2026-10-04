import { loadFragment } from '../fragment/fragment.js';
import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  const navMeta = document.querySelector('meta[name="nav"]');
  const navPath = navMeta ? navMeta.content : '/nav';

  const fragment = await loadFragment(navPath);

  if (!fragment) {
    return;
  }

  /* Create navigation */
  const nav = document.createElement('nav');

  nav.id = 'nav';

  nav.setAttribute(
    'aria-label',
    'Main Navigation'
  );

  /*
   * Move the complete /nav fragment
   * into the header.
   */
  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  /*
   * Clear the existing header block.
   */
  block.textContent = '';

  /*
   * Add navigation to header.
   */
  block.append(nav);

  /*
   * Decorate icons if present.
   */
  decorateIcons(nav);

  /* =====================================================
     MOBILE MENU
     ===================================================== */

  const hamburger = document.createElement('button');

  hamburger.className = 'nav-hamburger';

  hamburger.type = 'button';

  hamburger.setAttribute(
    'aria-label',
    'Open navigation'
  );

  hamburger.setAttribute(
    'aria-expanded',
    'false'
  );

  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  nav.append(hamburger);

  hamburger.addEventListener('click', () => {
    const open =
      nav.classList.toggle('nav-open');

    hamburger.setAttribute(
      'aria-expanded',
      String(open)
    );

    hamburger.setAttribute(
      'aria-label',
      open
        ? 'Close navigation'
        : 'Open navigation'
    );
  });
}