export default function decorate(block) {
  /*
   * ============================================
   * HEADER CONTAINER
   * ============================================
   */

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  /*
   * ============================================
   * LOGO
   * ============================================
   */

  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';
  logo.setAttribute('aria-label', 'Recipe Finder Home');

  /*
   * Leaf icon
   */

  const logoIcon = document.createElement('span');
  logoIcon.className = 'header-logo-icon';

  logoIcon.innerHTML = `
    <svg
      viewBox="0 0 60 60"
      aria-hidden="true"
      focusable="false"
    >
      <path
        class="leaf-shape"
        d="M12 43C10 27 17 12 43 7C47 29 37 47 19 51C16 49 14 46 12 43Z"
      ></path>

      <path
        class="leaf-line"
        d="M14 48C23 38 31 28 39 17"
      ></path>

      <path
        class="leaf-line"
        d="M22 38L18 27"
      ></path>

      <path
        class="leaf-line"
        d="M27 32L39 31"
      ></path>

      <path
        class="leaf-line"
        d="M32 25L29 17"
      ></path>
    </svg>
  `;

  /*
   * Logo text
   */

  const logoText = document.createElement('span');
  logoText.className = 'header-logo-text';
  logoText.textContent = 'Recipe Finder';

  logo.appendChild(logoIcon);
  logo.appendChild(logoText);

  /*
   * ============================================
   * NAVIGATION
   * ============================================
   */

  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const navItems = [
    {
      text: 'Home',
      href: 'https://main--eds-training-jyothi--jyothilekshmi17.aem.live/',
    },
    {
      text: 'Recipes',
      href: '/recipes',
    },
    {
      text: 'About Us',
      href: 'https://main--eds-training-sinchanaamin--sinchana05-arch.aem.page/aboutus',
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

    nav.appendChild(link);
  });

  /*
   * ============================================
   * MOBILE MENU BUTTON
   * ============================================
   */

  const menuButton = document.createElement('button');

  menuButton.type = 'button';
  menuButton.className = 'header-menu-button';

  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

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

  /*
   * ============================================
   * MOBILE MENU FUNCTIONALITY
   * ============================================
   */

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
     * Change hamburger icon to X
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

  /*
   * ============================================
   * CLOSE MOBILE MENU AFTER CLICKING A LINK
   * ============================================
   */

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

  /*
   * ============================================
   * BUILD HEADER
   * ============================================
   */

  headerContainer.appendChild(logo);
  headerContainer.appendChild(nav);
  headerContainer.appendChild(menuButton);

  /*
   * Remove existing block content
   */

  block.innerHTML = '';

  /*
   * Add new header
   */

  block.appendChild(headerContainer);
}