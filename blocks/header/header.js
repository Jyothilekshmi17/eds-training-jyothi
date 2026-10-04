import { loadFragment } from '../fragment/fragment.js';
import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  const navMeta = document.querySelector('meta[name="nav"]');

  const navPath = navMeta
    ? navMeta.content
    : '/nav';

  const fragment = await loadFragment(navPath);

  if (!fragment) {
    return;
  }

  /*
   * Create navigation element.
   */
  const nav = document.createElement('nav');

  nav.id = 'nav';

  nav.setAttribute(
    'aria-label',
    'Main Navigation',
  );

  /*
   * Move the complete /nav fragment
   * into the navigation element.
   */
  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  /*
   * Clear the original header block.
   */
  block.textContent = '';

  /*
   * Add the navigation.
   */
  block.append(nav);

  /*
   * Decorate any icons used in the navigation.
   */
  decorateIcons(block);

  /*
   * Mobile menu button.
   */
  const hamburger = document.createElement('button');

  hamburger.className = 'nav-hamburger';

  hamburger.type = 'button';

  hamburger.setAttribute(
    'aria-label',
    'Open navigation',
  );

  hamburger.setAttribute(
    'aria-expanded',
    'false',
  );

  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  nav.append(hamburger);

  /*
   * Mobile menu interaction.
   */
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');

    hamburger.setAttribute(
      'aria-expanded',
      String(isOpen),
    );

    hamburger.setAttribute(
      'aria-label',
      isOpen
        ? 'Close navigation'
        : 'Open navigation',
    );
  });
}