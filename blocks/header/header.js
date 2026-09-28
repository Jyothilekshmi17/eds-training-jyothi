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
    { text: 'Home', href: 'https://main--eds-training-jyothi--jyothilekshmi17.aem.page/' },
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

 