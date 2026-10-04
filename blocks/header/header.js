import { loadFragment } from '../fragment/fragment.js';
import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  /* =====================================================
     LOAD NAVIGATION FRAGMENT
     ===================================================== */

  const navMeta = document.querySelector('meta[name="nav"]');

  const navPath = navMeta?.content || '/nav';

  const fragment = await loadFragment(navPath);

  if (!fragment) {
    return;
  }

  /* Clear default block content */
  block.textContent = '';

  /* =====================================================
     CREATE HEADER NAV
     ===================================================== */

  const nav = document.createElement('nav');

  nav.className = 'recipe-header-nav';

  nav.setAttribute(
    'aria-label',
    'Main Navigation'
  );

  /* =====================================================
     CREATE HEADER CONTAINER
     ===================================================== */

  const navWrapper = document.createElement('div');

  navWrapper.className = 'recipe-header-wrapper';

  /* =====================================================
     LOGO
     ===================================================== */

  const brand = document.createElement('div');

  brand.className = 'recipe-header-brand';

  const brandLink = document.createElement('a');

  brandLink.href = '/';

  brandLink.setAttribute(
    'aria-label',
    'Recipe Finder Home'
  );

  /*
   * Find the logo from the navigation fragment.
   */
  const logo = fragment.querySelector('img');

  if (logo) {
    const logoImage = logo.cloneNode(true);

    logoImage.classList.add(
      'recipe-header-logo'
    );

    brandLink.append(logoImage);
  } else {
    /*
     * Fallback logo path.
     *
     * Change this path if your logo is stored somewhere else.
     */
    const logoImage = document.createElement('img');

    logoImage.src =
      '/icons/recipe-finder-logo.png';

    logoImage.alt = 'Recipe Finder';

    logoImage.className =
      'recipe-header-logo';

    brandLink.append(logoImage);
  }

  brand.append(brandLink);

  /* =====================================================
     NAVIGATION LINKS
     ===================================================== */

  const navSections =
    document.createElement('div');

  navSections.className =
    'recipe-header-sections';

  const navList =
    document.createElement('ul');

  navList.className =
    'recipe-header-list';

  /*
   * Get all links from the navigation fragment.
   */
  const links = fragment.querySelectorAll('a');

  links.forEach((link) => {
    /*
     * Don't treat the logo link as a navigation link.
     */
    if (link.querySelector('img')) {
      return;
    }

    const listItem =
      document.createElement('li');

    listItem.className =
      'recipe-header-item';

    const navLink =
      document.createElement('a');

    navLink.href =
      link.getAttribute('href') || '#';

    navLink.textContent =
      link.textContent.trim();

    /*
     * Preserve target if present.
     */
    if (link.target) {
      navLink.target = link.target;
    }

    /*
     * Mark current page.
     */
    const currentPath =
      window.location.pathname.replace(
        /\/$/,
        ''
      );

    const linkPath =
      new URL(
        navLink.href,
        window.location.origin
      ).pathname.replace(
        /\/$/,
        ''
      );

    if (
      linkPath === currentPath ||
      (currentPath === '' && linkPath === '')
    ) {
      navLink.setAttribute(
        'aria-current',
        'page'
      );
    }

    listItem.append(navLink);

    navList.append(listItem);
  });

  navSections.append(navList);

  /* =====================================================
     MOBILE MENU BUTTON
     ===================================================== */

  const hamburger =
    document.createElement('button');

  hamburger.className =
    'recipe-header-hamburger';

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

  /* =====================================================
     BUILD HEADER
     ===================================================== */

  navWrapper.append(
    brand,
    navSections,
    hamburger
  );

  nav.append(navWrapper);

  block.append(nav);

  /* =====================================================
     MOBILE MENU FUNCTIONALITY
     ===================================================== */

  hamburger.addEventListener(
    'click',
    () => {
      const isOpen =
        nav.classList.contains(
          'menu-open'
        );

      nav.classList.toggle(
        'menu-open',
        !isOpen
      );

      hamburger.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );

      hamburger.setAttribute(
        'aria-label',
        isOpen
          ? 'Open navigation'
          : 'Close navigation'
      );
    }
  );

  /* =====================================================
     DECORATE ICONS
     ===================================================== */

  decorateIcons(nav);
}