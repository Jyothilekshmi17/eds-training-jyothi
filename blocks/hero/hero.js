export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length < 2) {
    return;
  }

  /*
   * DA.live authoring:
   *
   * Row 1 = Image
   * Row 2 = Text + Button
   */

  const imageRow = rows[0];
  const contentRow = rows[1];

  /* =========================
     HERO IMAGE
     ========================= */

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'hero-image';

  if (imageRow) {
    [...imageRow.children].forEach((cell) => {
      [...cell.childNodes].forEach((node) => {
        imageWrapper.appendChild(node.cloneNode(true));
      });
    });
  }

  /* =========================
     HERO CONTENT
     ========================= */

  const content = document.createElement('div');
  content.className = 'hero-content';

  if (contentRow) {
    [...contentRow.children].forEach((cell) => {
      [...cell.childNodes].forEach((node) => {
        content.appendChild(node.cloneNode(true));
      });
    });
  }

  /* =========================
     HERO OVERLAY
     ========================= */

  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';

  /* =========================
     HERO WRAPPER
     ========================= */

  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'hero-wrapper';

  heroWrapper.appendChild(imageWrapper);
  heroWrapper.appendChild(overlay);
  heroWrapper.appendChild(content);

  /* =========================
     BUILD BLOCK
     ========================= */

  block.innerHTML = '';
  block.appendChild(heroWrapper);
}