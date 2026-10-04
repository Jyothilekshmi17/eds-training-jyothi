export default function decorate(block) {
  // ========================================
  // MAIN CONTACT CONTAINER
  // ========================================

  const container = document.createElement('div');
  container.className = 'contact-container';

  // ========================================
  // INTRODUCTION
  // ========================================

  const intro = document.createElement('div');
  intro.className = 'contact-intro';

  const heading = document.createElement('h1');
  heading.textContent = 'Contact Us';

  const description = document.createElement('p');
  description.textContent =
    'Have a question, suggestion, or feedback? We would love to hear from you. Get in touch with the Recipe Finder team.';

  intro.append(heading, description);

  // ========================================
  // CONTACT CONTENT
  // ========================================

  const content = document.createElement('div');
  content.className = 'contact-content';

  // ========================================
  // LEFT SIDE - CONTACT INFORMATION
  // ========================================

  const info = document.createElement('div');
  info.className = 'contact-info';

  const infoHeading = document.createElement('h2');
  infoHeading.textContent = 'Get in Touch';

  const infoText = document.createElement('p');
  infoText.textContent =
    'Whether you have a recipe suggestion or need help using Recipe Finder, feel free to contact us.';

  info.append(infoHeading, infoText);

  // Email
  const emailCard = document.createElement('div');
  emailCard.className = 'contact-info-item';

  const emailIcon = document.createElement('div');
  emailIcon.className = 'contact-info-icon';
  emailIcon.textContent = '✉';

  const emailContent = document.createElement('div');

  const emailTitle = document.createElement('h3');
  emailTitle.textContent = 'Email';

  const emailLink = document.createElement('a');
  emailLink.href = 'mailto:hello@recipefinder.com';
  emailLink.textContent = 'hello@recipefinder.com';

  emailContent.append(emailTitle, emailLink);
  emailCard.append(emailIcon, emailContent);

  // Phone
  const phoneCard = document.createElement('div');
  phoneCard.className = 'contact-info-item';

  const phoneIcon = document.createElement('div');
  phoneIcon.className = 'contact-info-icon';
  phoneIcon.textContent = '☎';

  const phoneContent = document.createElement('div');

  const phoneTitle = document.createElement('h3');
  phoneTitle.textContent = 'Phone';

  const phoneLink = document.createElement('a');
  phoneLink.href = 'tel:+919876543210';
  phoneLink.textContent = '+91 98765 43210';

  phoneContent.append(phoneTitle, phoneLink);
  phoneCard.append(phoneIcon, phoneContent);

  // Address
  const addressCard = document.createElement('div');
  addressCard.className = 'contact-info-item';

  const addressIcon = document.createElement('div');
  addressIcon.className = 'contact-info-icon';
  addressIcon.textContent = '⌖';

  const addressContent = document.createElement('div');

  const addressTitle = document.createElement('h3');
  addressTitle.textContent = 'Address';

  const addressText = document.createElement('p');
  addressText.textContent =
    'Recipe Finder, Kochi, Kerala, India';

  addressContent.append(addressTitle, addressText);
  addressCard.append(addressIcon, addressContent);

  info.append(
    emailCard,
    phoneCard,
    addressCard,
  );

  // ========================================
  // RIGHT SIDE - CONTACT FORM
  // ========================================

  const formWrapper = document.createElement('div');
  formWrapper.className = 'contact-form-wrapper';

  const formHeading = document.createElement('h2');
  formHeading.textContent = 'Send Us a Message';

  const form = document.createElement('form');
  form.className = 'contact-form';

  form.setAttribute('novalidate', '');

  // ========================================
  // NAME FIELD
  // ========================================

  const nameGroup = document.createElement('div');
  nameGroup.className = 'form-group';

  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = 'contact-name';
  nameLabel.textContent = 'Full Name';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'contact-name';
  nameInput.name = 'name';
  nameInput.placeholder = 'Enter your name';
  nameInput.required = true;

  nameGroup.append(nameLabel, nameInput);

  // ========================================
  // EMAIL FIELD
  // ========================================

  const emailGroup = document.createElement('div');
  emailGroup.className = 'form-group';

  const formEmailLabel = document.createElement('label');
  formEmailLabel.htmlFor = 'contact-email';
  formEmailLabel.textContent = 'Email Address';

  const formEmailInput = document.createElement('input');
  formEmailInput.type = 'email';
  formEmailInput.id = 'contact-email';
  formEmailInput.name = 'email';
  formEmailInput.placeholder = 'Enter your email';
  formEmailInput.required = true;

  emailGroup.append(
    formEmailLabel,
    formEmailInput,
  );

  // ========================================
  // SUBJECT FIELD
  // ========================================

  const subjectGroup = document.createElement('div');
  subjectGroup.className = 'form-group';

  const subjectLabel = document.createElement('label');
  subjectLabel.htmlFor = 'contact-subject';
  subjectLabel.textContent = 'Subject';

  const subjectInput = document.createElement('input');
  subjectInput.type = 'text';
  subjectInput.id = 'contact-subject';
  subjectInput.name = 'subject';
  subjectInput.placeholder = 'What is this about?';
  subjectInput.required = true;

  subjectGroup.append(
    subjectLabel,
    subjectInput,
  );

  // ========================================
  // MESSAGE FIELD
  // ========================================

  const messageGroup = document.createElement('div');
  messageGroup.className = 'form-group';

  const messageLabel = document.createElement('label');
  messageLabel.htmlFor = 'contact-message';
  messageLabel.textContent = 'Message';

  const messageInput = document.createElement('textarea');
  messageInput.id = 'contact-message';
  messageInput.name = 'message';
  messageInput.placeholder = 'Write your message here...';
  messageInput.rows = 6;
  messageInput.required = true;

  messageGroup.append(
    messageLabel,
    messageInput,
  );

  // ========================================
  // SUBMIT BUTTON
  // ========================================

  const submitButton = document.createElement('button');

  submitButton.type = 'submit';
  submitButton.className = 'contact-submit';
  submitButton.textContent = 'Send Message';

  // ========================================
  // SUCCESS MESSAGE
  // ========================================

  const successMessage = document.createElement('div');

  successMessage.className = 'contact-success';
  successMessage.setAttribute('role', 'status');

  successMessage.textContent =
    'Thank you! Your message has been received. We will get back to you soon.';

  // ========================================
  // ERROR MESSAGE
  // ========================================

  const errorMessage = document.createElement('div');

  errorMessage.className = 'contact-error';
  errorMessage.setAttribute('role', 'alert');

  errorMessage.textContent =
    'Please fill in all the required fields correctly.';

  // ========================================
  // FORM ASSEMBLY
  // ========================================

  form.append(
    nameGroup,
    emailGroup,
    subjectGroup,
    messageGroup,
    submitButton,
    successMessage,
    errorMessage,
  );

  formWrapper.append(
    formHeading,
    form,
  );

  // ========================================
  // CONTENT ASSEMBLY
  // ========================================

  content.append(
    info,
    formWrapper,
  );

  container.append(
    intro,
    content,
  );

  // ========================================
  // FORM SUBMISSION
  // ========================================

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = formEmailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    // Validation
    if (
      !name ||
      !email ||
      !subject ||
      !message ||
      !emailPattern.test(email)
    ) {
      errorMessage.classList.add('show');
      return;
    }

    // Show success
    successMessage.classList.add('show');

    // Clear form
    form.reset();
  });

  // ========================================
  // REPLACE AUTHORED BLOCK CONTENT
  // ========================================

  block.replaceChildren(container);
}