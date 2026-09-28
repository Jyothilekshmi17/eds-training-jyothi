export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  /* =========================
     LOGO
     ========================= */

  const logo = document.createElement('a');
  logo.className = 'header-logo';
  logo.href = '/';

  const logoIcon = document.createElement('span');
  logoIcon.className = 'header-logo-icon';

  logoIcon.innerHTML = `
    <svg viewBox="0 0 60 60" aria-hidden="true">
      <path
        class="leaf-shape"
        d="M12 43C10 27 17 12 43 7C47 29 37 47 19 51C16 49 14 46 12 43Z">
      </path>

      <path
        class="leaf-line"
        d="M14 48C23 38 31 28 39 17">
      </path>

      <path
        class="leaf-line"
        d="M22 38L18 27">
      </path>

      <path
        class="leaf-line"
        d="M27 32L39 31">
      </path>

      <path
        class="leaf-line"
        d="M32 25L29 17">
      </path>
    </svg>
  `;

  const logoText = document.createElement('span');
  logoText.className = 'header-logo-text';
  logoText.textContent = 'Recipe Finder';

  logo.appendChild(logoIcon);
  logo.appendChild(logoText);

  /* =========================
     NAVIGATION
     ========================= */

  const nav = document.createElement('nav');
  nav.className = 'header-nav';

  const navItems = [
    { text: 'Home', href: '/' },
    { text: 'Recipes', href: '/recipes' },
    { text: 'About Us', href: 'https://main--eds-training-sinchanaamin--sinchana05-arch.aem.page/aboutus' },
    { text: 'Contact', href: '/contact' },
  ];

  navItems.forEach((item) => {
    const link = document.createElement('a');

    link.className = 'header-nav-link';
    link.href = item.href;
    link.textContent = item.text;

    nav.appendChild(link);
  });

  /* =========================
     SEARCH
     ========================= */

  const searchForm = document.createElement('form');
  searchForm.className = 'header-search';

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search recipes...';
  searchInput.setAttribute('aria-label', 'Search recipes');

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.className = 'header-search-button';
  searchButton.setAttribute('aria-label', 'Search');

  searchButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5"></circle>
      <path d="M15.5 15.5L21 21"></path>
    </svg>
  `;

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchButton);

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = searchInput.value.trim();

    if (value) {
      window.location.href =
        `/recipes?search=${encodeURIComponent(value)}`;
    }
  });

  /* =========================
     DESKTOP / MOBILE TOGGLE
     ========================= */

  const viewToggle = document.createElement('div');
  viewToggle.className = 'view-toggle';

  const desktopButton = document.createElement('button');
  desktopButton.type = 'button';
  desktopButton.className = 'view-button desktop-button';
  desktopButton.textContent = 'Desktop';

  const mobileButton = document.createElement('button');
  mobileButton.type = 'button';
  mobileButton.className = 'view-button mobile-button';
  mobileButton.textContent = 'Mobile';

  viewToggle.appendChild(desktopButton);
  viewToggle.appendChild(mobileButton);

  /* =========================
     MOBILE MENU BUTTON
     ========================= */

  const menuButton = document.createElement('button');

  menuButton.type = 'button';
  menuButton.className = 'header-menu-button';
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.setAttribute('aria-expanded', 'false');

  menuButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6H20"></path>
      <path d="M4 12H20"></path>
      <path d="M4 18H20"></path>
    </svg>
  `;

  /* =========================
     VIEW CHANGE
     ========================= */

  function changeView(view) {
    document.body.classList.remove(
      'view-desktop',
      'view-mobile',
    );

    document.body.classList.add(`view-${view}`);

    desktopButton.classList.remove('active');
    mobileButton.classList.remove('active');

    if (view === 'desktop') {
      desktopButton.classList.add('active');

      nav.classList.remove('mobile-menu-open');

      menuButton.setAttribute(
        'aria-expanded',
        'false',
      );
    } else {
      mobileButton.classList.add('active');
    }
  }

  desktopButton.addEventListener('click', () => {
    changeView('desktop');
  });

  mobileButton.addEventListener('click', () => {
    changeView('mobile');
  });

  /* =========================
     MOBILE MENU
     ========================= */

  menuButton.addEventListener('click', () => {
    const isOpen =
      nav.classList.toggle('mobile-menu-open');

    menuButton.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false',
    );
  });

  /* =========================
     BUILD HEADER
     ========================= */

  headerContainer.appendChild(logo);
  headerContainer.appendChild(nav);
  headerContainer.appendChild(searchForm);
  headerContainer.appendChild(viewToggle);
  headerContainer.appendChild(menuButton);

  block.innerHTML = '';
  block.appendChild(headerContainer);

  // Desktop by default
  changeView('desktop');
}