export default function decorate(block) {
  // Header container
  const container = document.createElement('div');
  container.className = 'header-container';

  // Logo
  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';
  logo.setAttribute('aria-label', 'Recipe Finder Home');

  const logoImage = document.createElement('img');
  logoImage.className = 'header-logo-image';
  logoImage.src = '/icons/recipe-finder-logo.png';
  logoImage.alt = 'Recipe Finder';

  logo.appendChild(logoImage);

  // Navigation
  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const navItems = [
    { text: 'Home', href: '/' },
    { text: 'Recipes', href: '/recipes' },
    { text: 'About Us', href: '/about-us' },
    { text: 'Contact', href: '/contact' },
  ];

  const currentPath =
    window.location.pathname.replace(/\/$/, '') || '/';

  navItems.forEach(({ text, href }) => {
    const link = document.createElement('a');
    link.className = 'header-nav-link';
    link.href = href;
    link.textContent = text;

    const linkPath = href.replace(/\/$/, '') || '/';

    if (currentPath === linkPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }

    nav.appendChild(link);
  });

  // Mobile menu button
  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'header-menu-button';
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

  const renderMenuIcon = (isOpen) => {
    menuButton.innerHTML = isOpen
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6H20M4 12H20M4 18H20"/></svg>';

    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close menu' : 'Open menu',
    );

    menuButton.setAttribute('aria-expanded', String(isOpen));
  };

  renderMenuIcon(false);

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-menu-open');
    renderMenuIcon(isOpen);
  });

  nav.querySelectorAll('.header-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-menu-open');
      renderMenuIcon(false);
    });
  });

  // Assemble header
  container.append(logo, nav, menuButton);

  block.replaceChildren(container);
}