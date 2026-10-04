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

  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main Navigation');

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  /* ------------------------------------------------------
     Logo
     ------------------------------------------------------ */

  const brand = document.createElement('div');
  brand.className = 'nav-brand';

  const brandContent = fragment.querySelector(
    '.nav-brand, picture, img'
  );

  if (brandContent) {
    if (brandContent.closest('.nav-brand')) {
      brand.append(brandContent.closest('.nav-brand').cloneNode(true));
    } else {
      const link = document.createElement('a');
      link.href = '/';

      if (brandContent.tagName === 'IMG') {
        link.append(brandContent.cloneNode(true));
      } else {
        link.append(brandContent.cloneNode(true));
      }

      brand.append(link);
    }
  }

  /* ------------------------------------------------------
     Navigation
     ------------------------------------------------------ */

  const sections = document.createElement('div');
  sections.className = 'nav-sections';

  const sourceSections = fragment.querySelector('.nav-sections');

  if (sourceSections) {
    sections.innerHTML = sourceSections.innerHTML;
  } else {
    const links = fragment.querySelectorAll('a');

    const ul = document.createElement('ul');

    links.forEach((link) => {
      const li = document.createElement('li');
      li.append(link.cloneNode(true));
      ul.append(li);
    });

    sections.append(ul);
  }

  /* ------------------------------------------------------
     Hamburger
     ------------------------------------------------------ */

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';

  const button = document.createElement('button');

  button.type = 'button';
  button.setAttribute('aria-label', 'Open navigation');
  button.setAttribute('aria-expanded', 'false');

  const icon = document.createElement('span');
  icon.className = 'nav-hamburger-icon';

  button.append(icon);
  hamburger.append(button);

  /* ------------------------------------------------------
     Build Header
     ------------------------------------------------------ */

  navWrapper.append(
    brand,
    sections,
    hamburger
  );

  nav.append(navWrapper);
  block.append(nav);

  /* ------------------------------------------------------
     Mobile Menu
     ------------------------------------------------------ */

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute(
      'aria-expanded',
      String(!expanded)
    );

    nav.classList.toggle('nav-open', !expanded);

    if (!expanded) {
      sections.style.display = 'flex';
    } else {
      sections.style.display = '';
    }
  });

  /* ------------------------------------------------------
     Icons
     ------------------------------------------------------ */

  decorateIcons(nav);
}