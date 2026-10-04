export default function decorate(block) {
  // Create main header container
  const container = document.createElement('div');
  container.className = 'header-container';

  // ==============================
  // LOGO
  // ==============================

  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';
  logo.setAttribute('aria-label', 'Recipe Finder Home');

  const logoImage = document.createElement('img');
  logoImage.className = 'header-logo-image';
  logoImage.src = '/icons/recipe-finder-logo.png';
  logoImage.alt = 'Recipe Finder';

  logo.append(logoImage);

  // ==============================
  // NAVIGATION
  // ==============================

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

  const currentPath =
    window.location.pathname.replace(/\/$/, '') || '/';

  navItems.forEach(({ text, href }) => {
    const link = document.createElement('a');

    link.className = 'header-nav-link';
    link.href = href;
    link.textContent = text;

    const linkPath =
      href.replace(/\/$/, '') || '/';

    if (currentPath === linkPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }

    nav.append(link);
  });

  // ==============================
  // MOBILE MENU BUTTON
  // ==============================

  const menuButton = document.createElement('button');

  menuButton.type = 'button';
  menuButton.className = 'header-menu-button';
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

  menuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-menu-open');

    menuButton.classList.toggle('is-open', isOpen);

    menuButton.setAttribute(
      'aria-expanded',
      String(isOpen),
    );

    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close menu' : 'Open menu',
    );
  });

  // Close mobile menu after clicking a link
  nav.querySelectorAll('.header-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-menu-open');
      menuButton.classList.remove('is-open');

      menuButton.setAttribute(
        'aria-expanded',
        'false',
      );

      menuButton.setAttribute(
        'aria-label',
        'Open menu',
      );
    });
  });

  // ==============================
  // ASSEMBLE HEADER
  // ==============================

  container.append(
    logo,
    nav,
    menuButton,
  );

  // Remove DA.live authored content
  block.replaceChildren(container);
}