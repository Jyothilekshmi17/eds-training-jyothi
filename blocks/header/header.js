export default function decorate(block) {
  /* =========================================================
     HEADER CONTAINER
     ========================================================= */

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  /* =========================================================
     LOGO
     ========================================================= */

  const logo = document.createElement('a');

  logo.className = 'header-logo';
  logo.href = '/';
  logo.setAttribute('aria-label', 'Recipe Finder Home');

  const logoImage = document.createElement('img');

  logoImage.className = 'header-logo-image';
  logoImage.src = '/icons/recipe-finder-logo.png';
  logoImage.alt = 'Recipe Finder';

  logo.appendChild(logoImage);

  /* =========================================================
     NAVIGATION
     ========================================================= */

  const nav = document.createElement('nav');

  nav.className = 'header-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const navItems = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Recipes',
      href: '/recipes',
    },
    {
      text: 'About Us',
      href: '/about-us',
    },
    {
      text: 'Contact',
      href: '/contact',
    },
  ];

  navItems.forEach((item) => {
    const link = document.createElement('a');

    link.className = 'header-nav-link';
    link.href = item.href;
    link.textContent = item.text;

    /*
     * Highlight the current page
     */

    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const linkPath = item.href.replace(/\/$/, '') || '/';

    if (currentPath === linkPath) {
      link.classList.add('active');
    }

    nav.appendChild(link);
  });

  /* =========================================================
     MOBILE MENU BUTTON
     ========================================================= */

  const menuButton = document.createElement('button');

  menuButton.type = 'button';
  menuButton.className = 'header-menu-button';

  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

  /*
   * Hamburger icon
   */

  menuButton.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 6H20"></path>
      <path d="M4 12H20"></path>
      <path d="M4 18H20"></path>
    </svg>
  `;

  /* =========================================================
     MOBILE MENU TOGGLE
     ========================================================= */

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-menu-open');

    menuButton.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false',
    );

    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close menu' : 'Open menu',
    );

    /*
     * Change hamburger to X
     */

    if (isOpen) {
      menuButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 5L19 19"></path>
          <path d="M19 5L5 19"></path>
        </svg>
      `;
    } else {
      menuButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 6H20"></path>
          <path d="M4 12H20"></path>
          <path d="M4 18H20"></path>
        </svg>
      `;
    }
  });

  /* =========================================================
     CLOSE MOBILE MENU WHEN LINK IS CLICKED
     ========================================================= */

  nav.querySelectorAll('.header-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-menu-open');

      menuButton.setAttribute(
        'aria-expanded',
        'false',
      );

      menuButton.setAttribute(
        'aria-label',
        'Open menu',
      );

      menuButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 6H20"></path>
          <path d="M4 12H20"></path>
          <path d="M4 18H20"></path>
        </svg>
      `;
    });
  });

  /* =========================================================
     BUILD HEADER
     ========================================================= */

  headerContainer.appendChild(logo);
  headerContainer.appendChild(nav);
  headerContainer.appendChild(menuButton);

  block.innerHTML = '';

  block.appendChild(headerContainer);
}