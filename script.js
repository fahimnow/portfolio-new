'use strict';

/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById('header');

const navMenu = document.getElementById('nav-menu');

const navToggle = document.getElementById('nav-toggle');

const navClose = document.getElementById('nav-close');

const navLinks = document.querySelectorAll('.nav-link');

const themeToggle = document.getElementById('theme-toggle');

const backToTop = document.getElementById('back-to-top');

const sections = document.querySelectorAll('section[id]');

const revealElements = document.querySelectorAll('.reveal');

const contactForm = document.getElementById('contact-form');

const formMessage = document.getElementById('form-message');

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function openMenu() {
  navMenu.classList.add('show');

  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('show');

  document.body.style.overflow = '';
}

if (navToggle) {
  navToggle.addEventListener('click', openMenu);
}

if (navClose) {
  navClose.addEventListener('click', closeMenu);
}

/* Close mobile menu when clicking a nav link */

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

/* Close menu when pressing Escape */

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function handleHeader() {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeader, { passive: true });

handleHeader();

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    const activeEntry = entries.find((entry) => entry.isIntersecting);
    console.log(activeEntry);

    if (!activeEntry) return;

    const sectionId = activeEntry.target.id;

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${sectionId}`,
      );
    });
  },
  {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  },
);

sections.forEach((section) => {
  activeSectionObserver.observe(section);
});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   THEME TOGGLE
========================================================= */

const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {
  document.body.classList.add('light-theme');

  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');

  if (document.body.classList.contains('light-theme')) {
    icon.classList.remove('fa-moon');

    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');

    icon.classList.add('fa-moon');
  }
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  const isLight = document.body.classList.contains('light-theme');

  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');

  updateThemeIcon();
});

/* =========================================================
   BACK TO TOP
========================================================= */

function handleBackToTop() {
  backToTop.classList.toggle('show', window.scrollY > 500);
}

// handleBackToTop();

window.addEventListener('scroll', handleBackToTop, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

/* =========================================================
   CONTACT FORM
========================================================= */

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();

  const email = document.getElementById('email').value.trim();

  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please complete all fields.';

    formMessage.style.color = '#ff6b6b';

    return;
  }

  formMessage.textContent = 'Thanks! Your message is ready to send.';

  formMessage.style.color = '#6cff8f';

  contactForm.reset();
});

/* =========================================================
   SMOOTH ANCHOR NAVIGATION
========================================================= */

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');

    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    // const headerHeight = header.offsetHeight;
    // window.scrollTo({
    //   top: target.offsetTop - headerHeight,
    //   behavior: 'smooth',
    // });

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    history.pushState(null, '', targetId);
  });
});

/* =========================================================
   DYNAMIC CURRENT YEAR
========================================================= */

const footerText = document.querySelector('.footer p');

if (footerText) {
  const currentYear = new Date().getFullYear();

  footerText.innerHTML = `© ${currentYear} MD. Fahim Islam — Designed & built with HTML, CSS & JavaScript.`;
}
